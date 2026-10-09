"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { endSession, passwordMatches, requireAdmin, startSession } from "@/lib/enquiries/admin-auth";
import { STATUSES } from "@/lib/enquiries/schema";
import { enquiryStore } from "@/lib/enquiries/store";

export async function signIn(_: unknown, form: FormData) {
  if (!passwordMatches(String(form.get("password") ?? ""))) return { error: "That password is not right." };
  await startSession();
  redirect("/admin");
}

export async function signOut() {
  await endSession();
  redirect("/admin/login");
}

const Update = z.object({ id: z.uuid(), status: z.enum(STATUSES), notes: z.string().max(5000) });

export async function updateEnquiry(form: FormData) {
  await requireAdmin();
  const { id, status, notes } = Update.parse({ id: form.get("id"), status: form.get("status"), notes: form.get("notes") ?? "" });
  await enquiryStore().update(id, { status, notes });
  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
  redirect(`/admin/${id}?saved=1`);
}
