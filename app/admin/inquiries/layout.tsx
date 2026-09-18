import { redirect } from "next/navigation";
import {
  deleteAdminSession,
  getAdminSession,
} from "../../../lib/admin-auth";

export default async function InquiriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";

    await deleteAdminSession();
    redirect("/admin/login");
  }

  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-3 sm:px-8">
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-yellow-400 hover:text-yellow-500"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      {children}
    </>
  );
}