
"use client";

import { X, UserRound, BookOpen, CalendarDays, GraduationCap } from "lucide-react";

export default function RegistrationDetailsModal({
  registration,
  onClose,
  onSave,
  mode = "view",
}) {
  if (!registration) return null;

  const isEditing = mode === "edit";

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSave?.({
      ...registration,
      status: formData.get("status"),
      term: formData.get("term"),
      credits: Number(formData.get("credits")),
    });
  };

  const fields = [
    {
      label: "Registration ID",
      value: registration.registrationId,
    },
    {
      label: "Student ID",
      value: registration.studentId,
    },
    {
      label: "Student Name",
      value: registration.studentName,
    },
    {
      label: "Program",
      value: registration.program,
    },
    {
      label: "Course Code",
      value: registration.courseCode,
    },
    {
      label: "Course Name",
      value: registration.courseName,
    },
    {
      label: "Registration Date",
      value: registration.registrationDate,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EAE4D9] bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#280A47]">
              {isEditing ? "Edit Registration" : "Registration Details"}
            </h2>
            <p className="mt-1 text-sm text-[#716B76]">
              {registration.registrationId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#716B76] transition hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F8F7F4] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#716B76]">
                  <UserRound size={18} />
                  <span className="text-sm font-medium">Student</span>
                </div>
                <p className="font-semibold text-[#28212D]">
                  {registration.studentName}
                </p>
                <p className="mt-1 text-sm text-[#716B76]">
                  {registration.studentId}
                </p>
              </div>

              <div className="rounded-xl bg-[#F8F7F4] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#716B76]">
                  <BookOpen size={18} />
                  <span className="text-sm font-medium">Course</span>
                </div>
                <p className="font-semibold text-[#28212D]">
                  {registration.courseName}
                </p>
                <p className="mt-1 text-sm text-[#716B76]">
                  {registration.courseCode}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#280A47]">
                <GraduationCap size={19} />
                Registration Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.label}>
                    <p className="mb-1 text-sm text-[#716B76]">
                      {field.label}
                    </p>
                    <p className="font-medium text-[#28212D]">
                      {field.value || "—"}
                    </p>
                  </div>
                ))}

                <div>
                  <p className="mb-1 text-sm text-[#716B76]">Credits</p>
                  {isEditing ? (
                    <input
                      type="number"
                      name="credits"
                      min="0"
                      defaultValue={registration.credits}
                      required
                      className="w-full rounded-lg border border-[#EAE4D9] px-3 py-2 outline-none focus:border-[#280A47]"
                    />
                  ) : (
                    <p className="font-medium text-[#28212D]">
                      {registration.credits}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-1 flex items-center gap-2 text-sm text-[#716B76]">
                    <CalendarDays size={15} />
                    Academic Term
                  </p>
                  {isEditing ? (
                    <select
                      name="term"
                      defaultValue={registration.term}
                      className="w-full rounded-lg border border-[#EAE4D9] px-3 py-2 outline-none focus:border-[#280A47]"
                    >
                      {[
                        "Fall 2026",
                        "Winter 2027",
                        "Spring 2027",
                        "Summer 2027",
                      ].map((term) => (
                        <option key={term} value={term}>
                          {term}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-medium text-[#28212D]">
                      {registration.term}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <p className="mb-1 text-sm text-[#716B76]">
                    Registration Status
                  </p>

                  {isEditing ? (
                    <select
                      name="status"
                      defaultValue={registration.status}
                      className="w-full rounded-lg border border-[#EAE4D9] px-3 py-2 outline-none focus:border-[#280A47]"
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
                  ) : (
                    <span className="inline-flex rounded-full bg-[#F0EBF5] px-3 py-1.5 text-sm font-semibold text-[#280A47]">
                      {registration.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#EAE4D9] bg-[#F8F7F4] px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D8D0DF] px-5 py-2.5 text-sm font-semibold text-[#514A57] transition hover:bg-white"
            >
              Close
            </button>

            {isEditing && (
              <button
                type="submit"
                className="rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
