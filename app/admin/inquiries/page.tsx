import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import StatusSelect, { type Status } from "./StatusSelect";
import { requireAdmin } from "../../../lib/admin-auth";

export default async function InquiriesPage() {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const inquiries = await prisma.inquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

    const total = inquiries.length;

    const newCount = inquiries.filter(
        (inquiry) => inquiry.status === "new"
    ).length;

    const contactedCount = inquiries.filter(
        (inquiry) => inquiry.status === "contacted"
    ).length;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* HEADER */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            Admin
                        </p>

                        <h1 className="mt-3 text-4xl font-black tracking-tight">
                            Inquiries
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                            Manage project inquiries submitted through the Vertical
                            Constructions website.
                        </p>
                    </div>

                    <a
                        href="/"
                        className="w-fit rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-yellow-400"
                    >
                        Back to website
                    </a>
                </div>

                {/* STATS */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            Total
                        </p>

                        <p className="mt-3 text-3xl font-black">
                            {total}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            New
                        </p>

                        <p className="mt-3 text-3xl font-black">
                            {newCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            Contacted
                        </p>

                        <p className="mt-3 text-3xl font-black">
                            {contactedCount}
                        </p>
                    </div>
                </div>

                {/* INQUIRIES */}
                <div className="mt-10 overflow-hidden rounded-[28px] border border-border bg-background">

                    <div className="border-b border-border px-6 py-5">
                        <h2 className="text-lg font-bold">
                            Recent inquiries
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Latest project requests received from customers.
                        </p>
                    </div>

                    {inquiries.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <p className="text-sm font-semibold">
                                No inquiries yet.
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                New inquiries will appear here when customers submit the
                                contact form.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left">

                                <thead className="border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                            Project
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                            Message
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {inquiries.map((inquiry) => (
                                        <tr
                                            key={inquiry.id}
                                            className="border-b border-border last:border-b-0"
                                        >
                                            {/* CUSTOMER */}
                                            <td className="px-6 py-5 align-top">
                                                <Link
                                                    href={`/admin/inquiries/${inquiry.id}`}
                                                    className="font-semibold transition-colors hover:text-yellow-500"
                                                >
                                                    {inquiry.name}
                                                </Link>

                                                <a
                                                    href={`mailto:${inquiry.email}`}
                                                    className="mt-1 block text-sm text-muted-foreground hover:text-yellow-500"
                                                >
                                                    {inquiry.email}
                                                </a>

                                                {inquiry.phone && (
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {inquiry.phone}
                                                    </p>
                                                )}
                                            </td>

                                            {/* PROJECT */}
                                            <td className="px-6 py-5 align-top">
                                                <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-semibold">
                                                    {inquiry.projectType}
                                                </span>
                                            </td>

                                            {/* MESSAGE */}
                                            <td className="max-w-md px-6 py-5 align-top">
                                                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                                                    {inquiry.message}
                                                </p>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-5 align-top">
                                                <StatusSelect
                                                    inquiryId={inquiry.id}
                                                    initialStatus={inquiry.status as "new" | "contacted" | "completed"}
                                                />
                                            </td>

                                            {/* DATE */}
                                            <td className="whitespace-nowrap px-6 py-5 align-top text-sm text-muted-foreground">
                                                {new Date(inquiry.createdAt).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}