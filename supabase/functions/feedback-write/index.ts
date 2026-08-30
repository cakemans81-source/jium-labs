import { createClient } from "npm:@supabase/supabase-js@2.112.4";

const PROD_ORIGINS = new Set(["https://jiumlabs.com", "https://www.jiumlabs.com"]);
const ACTIONS = new Set(["feedback.create", "comment.create", "vote.set", "vote.state"]);
const ID = /^[A-Za-z0-9_-]{1,128}$/;
const FEEDBACK_ID = /^[A-Za-z0-9_-]{1,64}$/;
const PROJECTS = new Set(["threadr", "loomi", "stackbench", "notedeck", "general"]);
const TYPES = new Set(["bug", "feature", "improve", "other"]);
const text = (v: unknown, max: number, required = true) =>
  typeof v === "string" && [...v].length <= max && (!required || v.trim().length > 0);
const exact = (value: unknown, keys: string[]) =>
  !!value && typeof value === "object" && !Array.isArray(value) &&
  Object.keys(value as Record<string, unknown>).every((k) => keys.map((x) => x.replace(/\?$/, "")).includes(k)) &&
  keys.filter((k) => !k.endsWith("?")).every((k) => k in (value as Record<string, unknown>));
const headers = (origin: string) => ({
  "access-control-allow-origin": origin, "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "apikey, content-type", "cache-control": "no-store",
  "x-content-type-options": "nosniff", "vary": "Origin",
});
const reply = (status: number, origin: string, body?: unknown, extra: Record<string, string> = {}) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { ...headers(origin), ...extra, ...(body === undefined ? {} : { "content-type": "application/json; charset=utf-8" }) } });
const fail = (status: number, origin: string, code: string, retry?: number) =>
  reply(status, origin, { ok: false, error: code }, retry ? { "retry-after": String(retry) } : {});
function allowedOrigin(origin: string, requestUrl: string, supabaseUrl: string) {
  if (PROD_ORIGINS.has(origin)) return true;
  const local = (host: string) => host === "localhost" || host === "127.0.0.1" || host === "kong";
  let requestHost = ""; let supabaseHost = "";
  try { requestHost = new URL(requestUrl).hostname; supabaseHost = new URL(supabaseUrl).hostname; } catch { return false; }
  return (local(requestHost) || local(supabaseHost)) && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}
function validate(action: string, p: Record<string, unknown>) {
  if (action === "feedback.create") return exact(p, ["project", "type", "title", "body", "author?"]) && PROJECTS.has(p.project as string) && TYPES.has(p.type as string) && text(p.title, 80) && text(p.body, 800) && (!("author" in p) || text(p.author, 24));
  if (action === "comment.create") return exact(p, ["feedback_id", "body", "author?"]) && typeof p.feedback_id === "string" && FEEDBACK_ID.test(p.feedback_id) && text(p.body, 500) && (!("author" in p) || text(p.author, 24));
  return exact(p, ["feedback_id", ...(action === "vote.set" ? ["desired"] : [])]) && typeof p.feedback_id === "string" && FEEDBACK_ID.test(p.feedback_id) && (action !== "vote.set" || typeof p.desired === "boolean");
}
const project = (action: string, data: Record<string, unknown>) => {
  const keys = action === "feedback.create" ? ["ok","id","project","type","status","title","body","author","date","votes","comments","voted"] : action === "comment.create" ? ["ok","id","feedback_id","author","body","created_at"] : action === "vote.set" ? ["ok","feedback_id","votes","voted","changed"] : ["ok","feedback_id","votes","voted"];
  if (!keys.every((k) => k in data) || data.ok !== true) return null;
  return Object.fromEntries(keys.map((k) => [k, data[k]]));
};
Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  if (!origin || !allowedOrigin(origin, req.url, Deno.env.get("SUPABASE_URL") ?? "")) return new Response(null, { status: 403 });
  if (req.method === "OPTIONS") return reply(204, origin);
  if (req.method !== "POST") return fail(405, origin, "method_not_allowed");
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return fail(415, origin, "invalid_content_type");
  const length = Number(req.headers.get("content-length") ?? "0"); if (!Number.isFinite(length) || length > 8192) return fail(413, origin, "payload_too_large");
  let keys: { default?: string }; let secrets: { default?: string };
  try { keys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? ""); secrets = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? ""); } catch { return fail(503, origin, "unavailable"); }
  const url = Deno.env.get("SUPABASE_URL"); if (!url || typeof keys.default !== "string" || typeof secrets.default !== "string" || req.headers.get("apikey") !== keys.default) return fail(503, origin, "unavailable");
  let raw: string; try { raw = await req.text(); } catch { return fail(400, origin, "invalid_json"); }
  if (new TextEncoder().encode(raw).length > 8192) return fail(413, origin, "payload_too_large");
  let input: Record<string, unknown>; try { input = JSON.parse(raw); } catch { return fail(400, origin, "invalid_json"); }
  if (!exact(input, ["action", "actor_id", "payload"]) || typeof input.action !== "string" || !ACTIONS.has(input.action) || typeof input.actor_id !== "string" || !ID.test(input.actor_id) || !validate(input.action, input.payload as Record<string, unknown>)) return fail(400, origin, "invalid_request");
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim(); if (!ip) return fail(400, origin, "invalid_request");
  const p = input.payload as Record<string, unknown>;
  try {
    const db = createClient(url, secrets.default, { auth: { persistSession: false, autoRefreshToken: false } });
    const call = input.action === "feedback.create" ? db.rpc("feedback_create", { p_project:p.project, p_type:p.type, p_title:p.title, p_body:p.body, p_author:p.author ?? "", p_actor:input.actor_id, p_ip:ip }) : input.action === "comment.create" ? db.rpc("feedback_comment_create", { p_feedback_id:p.feedback_id, p_author:p.author ?? "", p_body:p.body, p_actor:input.actor_id, p_ip:ip }) : input.action === "vote.set" ? db.rpc("feedback_vote_set", { p_feedback_id:p.feedback_id, p_voted:p.desired, p_actor:input.actor_id, p_ip:ip }) : db.rpc("feedback_vote_state", { p_feedback_id:p.feedback_id, p_actor:input.actor_id, p_ip:ip });
    const { data, error } = await call.abortSignal(AbortSignal.timeout(15000));
    if (error || !data || typeof data !== "object") return fail(503, origin, "unavailable");
    const r = data as Record<string, unknown>; if (r.ok === false) return fail(r.error === "feedback_not_found" ? 404 : r.error === "rate_limited" ? 429 : 400, origin, String(r.error ?? "invalid_request"), typeof r.retry_after_seconds === "number" ? r.retry_after_seconds : undefined);
    const out = project(input.action, r); return out ? reply(200, origin, out) : fail(500, origin, "unavailable");
  } catch { return fail(503, origin, "unavailable"); }
});
