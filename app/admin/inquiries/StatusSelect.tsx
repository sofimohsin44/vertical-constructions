"use client";

import { useState } from "react";

export type Status = "new" | "contacted" | "completed";

type StatusSelectProps = {
  inquiryId: string;
  initialStatus: Status;
};

export default function StatusSelect({
  inquiryId,
  initialStatus,
}: StatusSelectProps) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(newStatus: Status) {
    const previousStatus = status;

    setStatus(newStatus);
    setSaving(true);

    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      setStatus(previousStatus);
      alert("Could not update the inquiry status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(event) =>
        handleChange(event.target.value as Status)
      }
      className={`rounded-full border px-3 py-1 text-xs font-bold outline-none transition ${
        status === "new"
          ? "border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300"
          : status === "contacted"
            ? "border-green-300 bg-green-100 text-green-800 dark:border-green-400/30 dark:bg-green-400/10 dark:text-green-300"
            : "border-gray-300 bg-gray-100 text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
      }`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="completed">Completed</option>
    </select>
  );
}