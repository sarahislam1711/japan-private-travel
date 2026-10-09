import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * The admin area's sign-in: one team password (ADMIN_PASSWORD) and a signed,
 * HTTP-only session cookie (ADMIN_SECRET) that lasts 12 hours. A stand-in
 * until staff accounts move to Supabase Auth.
 */
const COOKIE = "hj_admin";
const HOURS = 12;

const sign = (payload: string) => createHmac("sha256", process.env.ADMIN_SECRET ?? "").update(payload).digest("base64url");

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);

export function passwordMatches(input: string) {
  return adminConfigured() && same(input, process.env.ADMIN_PASSWORD!);
}

export async function startSession() {
  const expires = Date.now() + HOURS * 3600_000;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: HOURS * 3600,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isSignedIn() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value ?? "";
  const [expires, sig] = value.split(".");
  return Boolean(expires && sig && Number(expires) > Date.now() && same(sig, sign(expires)));
}

/** For admin pages and actions: send anyone not signed in to the sign-in page. */
export async function requireAdmin() {
  if (!(await isSignedIn())) redirect("/admin/login");
}
