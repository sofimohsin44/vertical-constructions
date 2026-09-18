import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

type InquiryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InquiryDetailPage({
  params,
}: InquiryPageProps) {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id,
    },
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* TOP BAR */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Admin
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Inquiry Details
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Review the project request submitted by this customer.
            </p>
          </div>

          <Link
            href="/admin/inquiries"
            className="inline-flex w-fit items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-yellow-400"
          >
            ← Back to inquiries
          </Link>
        </div>

        {/* CUSTOMER CARD */}
        <section className="mt-10 rounded-[28px] border border-border bg-background p-7 sm:p-9">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Customer
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                {inquiry.name}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Inquiry received{" "}
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-yellow-400/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-yellow-700 dark:text-yellow-300">
              {inquiry.status}
            </span>

          </div>

          {/* CONTACT INFORMATION */}
          <div className="mt-8 grid gap-5 border-t border-border pt-8 sm:grid-cols-3">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Email
              </p>

              <a
                href={`mailto:${inquiry.email}`}
                className="mt-2 block break-all text-sm font-medium transition-colors hover:text-yellow-500"
              >
                {inquiry.email}
              </a>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Phone
              </p>

              {inquiry.phone ? (
                <a
                  href={`tel:${inquiry.phone}`}
                  className="mt-2 block text-sm font-medium transition-colors hover:text-yellow-500"
                >
                  {inquiry.phone}
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Not provided
                </p>
              )}
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Project Type
              </p>

              <p className="mt-2 text-sm font-medium">
                {inquiry.projectType}
              </p>
            </div>

          </div>
        </section>

        {/* MESSAGE CARD */}
        <section className="mt-6 rounded-[28px] border border-border bg-background p-7 sm:p-9">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Project Message
          </p>

          <div className="mt-5 rounded-2xl border border-border bg-card p-6">
            <p className="whitespace-pre-wrap text-sm leading-7 text-foreground sm:text-base">
              {inquiry.message}
            </p>
          </div>

        </section>

        {/* META CARD */}
        <section className="mt-6 grid gap-6 sm:grid-cols-2">

          <div className="rounded-[28px] border border-border bg-background p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Submitted
            </p>

            <p className="mt-3 text-sm font-medium">
              {new Date(inquiry.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-background p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Last Updated
            </p>

            <p className="mt-3 text-sm font-medium">
              {new Date(inquiry.updatedAt).toLocaleString()}
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}