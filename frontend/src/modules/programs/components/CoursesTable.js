
"use client";

import { Eye, Pencil, BookOpen } from "lucide-react";

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

export default function CoursesTable({
  courses = [],
  onView,
  onEdit,
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b border-[#EAE4D9] bg-[#F8F7F4]">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Course
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Department
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Credits
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Semester
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Assigned Programs
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
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr
                key={course.id}
                className="transition-colors hover:bg-[#FEFBF2]"
              >
                {/* Course */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1EAF7]">
                      <BookOpen
                        size={19}
                        className="text-[#280A47]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#28212D]">
                        {course.name}
                      </p>

                      <p className="mt-1 text-xs text-[#919B89]">
                        {course.code}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-[#716B76]">
                  {course.department}
                </td>

                {/* Credits */}
                <td className="px-6 py-4 text-sm font-medium text-[#28212D]">
                  {course.credits}
                </td>

                {/* Semester */}
                <td className="px-6 py-4 text-sm text-[#716B76]">
                  {course.semester}
                </td>

                {/* Assigned programs */}
                <td className="max-w-[220px] px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {course.programs?.length > 0 ? (
                      course.programs.map((program) => (
                        <span
                          key={program}
                          className="rounded-md bg-[#F1EAF7] px-2 py-1 text-xs font-medium text-[#68428A]"
                        >
                          {program}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#919B89]">
                        Not assigned
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={course.status} />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView?.(course)}
                      title="View course"
                      aria-label={`View ${course.name}`}
                      className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#F1EAF7] hover:text-[#280A47]"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(course)}
                      title="Edit course"
                      aria-label={`Edit ${course.name}`}
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
                colSpan={7}
                className="px-6 py-16 text-center"
              >
                <BookOpen
                  size={36}
                  className="mx-auto text-[#C9C1CE]"
                />

                <p className="mt-3 text-sm font-semibold text-[#28212D]">
                  No courses found
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
