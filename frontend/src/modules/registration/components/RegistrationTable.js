
"use client";

import {
  Eye,
  Pencil,
  MoreHorizontal,
  BookOpen,
} from "lucide-react";

const statusStyles = {
  Registered: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Waitlisted: "bg-blue-100 text-blue-700",
  Dropped: "bg-gray-100 text-gray-600",
  Withdrawn: "bg-red-100 text-red-700",
};

export default function RegistrationTable({
  registrations = [],
  onView,
  onEdit,
  onStatusChange,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#EAE4D9] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="bg-[#F8F7F4]">
            <tr className="text-sm font-semibold text-[#716B76]">
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Course</th>
              <th className="px-5 py-4">Program</th>
              <th className="px-5 py-4">Term</th>
              <th className="px-5 py-4">Credits</th>
              <th className="px-5 py-4">Registration Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EAE4D9]">
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="transition hover:bg-[#FEFBF2]"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#28212D]">
                      {registration.studentName}
                    </p>
                    <p className="mt-1 text-xs text-[#716B76]">
                      {registration.studentId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#28212D]">
                      {registration.courseName}
                    </p>
                    <p className="mt-1 text-xs text-[#716B76]">
                      {registration.courseCode}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#514A57]">
                    {registration.program}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#514A57]">
                    {registration.term}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-[#28212D]">
                    {registration.credits}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#514A57]">
                    {registration.registrationDate}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={registration.status}
                      onChange={(event) =>
                        onStatusChange?.(
                          registration.id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                        statusStyles[registration.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                      aria-label={`Status for ${registration.studentName}`}
                    >
                      {[
                        "Registered",
                        "Pending",
                        "Waitlisted",
                        "Dropped",
                        "Withdrawn",
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView?.(registration)}
                        title="View registration"
                        className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#F0EBF5] hover:text-[#280A47]"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit?.(registration)}
                        title="Edit registration"
                        className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#FFF3DE] hover:text-[#A66B12]"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        title="More actions"
                        className="rounded-lg p-2 text-[#716B76] transition hover:bg-gray-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center">
                  <BookOpen
                    size={34}
                    className="mx-auto mb-3 text-[#B8AFBF]"
                  />
                  <p className="font-semibold text-[#28212D]">
                    No registrations found
                  </p>
                  <p className="mt-1 text-sm text-[#716B76]">
                    Try changing your search or filter criteria.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#EAE4D9] px-5 py-3">
        <p className="text-sm text-[#716B76]">
          Showing <span className="font-semibold text-[#28212D]">
            {registrations.length}
          </span>{" "}
          registration(s)
        </p>
      </div>
    </div>
  );
}
