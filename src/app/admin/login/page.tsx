import { redirect } from "next/navigation";
import { adminConfigured, isSignedIn } from "@/lib/enquiries/admin-auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isSignedIn()) redirect("/admin");
  return (
    <main className="mx-auto flex min-h-svh max-w-sm flex-col justify-center px-6">
      <p className="font-serif text-[1.75rem]">
        <span className="text-pine">Hala</span>Japan
      </p>
      <h1 className="mt-1 text-small text-ink-soft">Trip plans · team sign-in</h1>
      {adminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="mt-8 rounded-[12px] bg-plate p-4 text-small text-ink-soft">
          The admin area is not set up: add ADMIN_PASSWORD and ADMIN_SECRET to the environment.
        </p>
      )}
    </main>
  );
}
