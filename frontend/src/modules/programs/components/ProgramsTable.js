
"use client";

import { Eye, Pencil, GraduationCap } from "lucide-react";

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-[#EDF5EF] text-[#527A5B]",
    Inactive: "bg-[#FBECEE] text-[#B02D30]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function ProgramsTable({
  programs = [],
  onView,
  onEdit,
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b border-[#EAE4D9] bg-[#F8F7F4]">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Program
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Department
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Credential
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Duration
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Credits
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Students
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EAE4D9]">
          {programs.length > 0 ? (
            programs.map((program) => (
              <tr
                key={program.id}
                className="transition-colors hover:bg-[#FEFBF2]"
              >
                {/* Program */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1EAF7]">
                      <GraduationCap
                        size={20}
                        className="text-[#280A47]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#28212D]">
                        {program.name}
                      </p>

                      <p className="mt-1 text-xs text-[#919B89]">
                        {program.code}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-[#716B76]">
                  {program.department}
                </td>

                {/* Credential */}
                <td className="px-6 py-4 text-sm text-[#716B76]">
                  {program.credential}
                </td>

                {/* Duration */}
                <td className="px-6 py-4 text-sm text-[#716B76]">
                  {program.duration}
                </td>

                {/* Credits */}
                <td className="px-6 py-4 text-sm font-medium text-[#28212D]">
                  {program.totalCredits}
                </td>

                {/* Students */}
                <td className="px-6 py-4 text-sm font-medium text-[#28212D]">
                  {program.students}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={program.status} />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView?.(program)}
                      title="View program"
                      aria-label={`View ${program.name}`}
                      className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#F1EAF7] hover:text-[#280A47]"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(program)}
                      title="Edit program"
                      aria-label={`Edit ${program.name}`}
                      className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#FBF2DF] hover:text-[#A87925]"
                    >
                      <Pencil size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-6 py-16 text-center"
              >
                <GraduationCap
                  size={36}
                  className="mx-auto text-[#C9C1CE]"
                />

                <p className="mt-3 text-sm font-semibold text-[#28212D]">
                  No programs found
                </p>

                <p className="mt-1 text-sm text-[#919B89]">
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
