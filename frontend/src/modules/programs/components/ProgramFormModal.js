
"use client";

import { useEffect, useState } from "react";
import { X, Save, GraduationCap, BookOpen } from "lucide-react";

const emptyProgram = {
  code: "",
  name: "",
  department: "Business",
  credential: "Diploma",
  duration: "2 Years",
  totalCredits: 60,
  status: "Active",
};

const emptyCourse = {
  code: "",
  name: "",
  department: "Business",
  credits: 3,
  semester: "Semester 1",
  programs: [],
  status: "Active",
};

const departments = [
  "Business",
  "Technology",
  "Construction",
  "Healthcare",
];

export default function ProgramFormModal({
  isOpen,
  onClose,
  onSave,
  editingItem = null,
  type = "program",
  programs = [],
}) {
  const isProgram = type === "program";

  const [form, setForm] = useState(
    isProgram ? emptyProgram : emptyCourse
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (editingItem) {
      setForm({
        ...(isProgram ? emptyProgram : emptyCourse),
        ...editingItem,
        programs: editingItem.programs || [],
      });
    } else {
      setForm(
        isProgram
          ? { ...emptyProgram }
          : { ...emptyCourse }
      );
    }

    setError("");
  }, [isOpen, editingItem, isProgram]);

  if (!isOpen) return null;

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.code.trim() || !form.name.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      !isProgram &&
      (!Number.isFinite(Number(form.credits)) ||
        Number(form.credits) < 1)
    ) {
      setError("Please enter a valid credit value.");
      return;
    }

    if (
      isProgram &&
      (!Number.isFinite(Number(form.totalCredits)) ||
        Number(form.totalCredits) < 1)
    ) {
      setError("Please enter valid total credits.");
      return;
    }

    onSave({
      ...form,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      ...(isProgram
        ? { totalCredits: Number(form.totalCredits) }
        : { credits: Number(form.credits) }),
    });
  }

  const inputClass =
    "w-full rounded-lg border border-[#EAE4D9] bg-white px-3.5 py-3 text-sm text-[#28212D] outline-none transition focus:border-[#280A47] focus:ring-2 focus:ring-[#280A47]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#28212D]";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="program-form-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EAE4D9] bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1EAF7]">
              {isProgram ? (
                <GraduationCap
                  size={23}
                  className="text-[#280A47]"
                />
              ) : (
                <BookOpen
                  size={21}
                  className="text-[#280A47]"
                />
              )}
            </div>

            <div>
              <h2
                id="program-form-title"
                className="text-xl font-bold text-[#280A47]"
              >
                {editingItem ? "Edit" : "Add"}{" "}
                {isProgram ? "Program" : "Course"}
              </h2>

              <p className="mt-1 text-sm text-[#716B76]">
                Enter the academic information below.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#F8F7F4]"
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <h3 className="mb-4 text-sm font-bold text-[#280A47]">
              Basic Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  {isProgram ? "Program Code" : "Course Code"} *
                </label>

                <input
                  required
                  value={form.code}
                  onChange={(event) =>
                    updateField("code", event.target.value)
                  }
                  placeholder={isProgram ? "e.g. BUS-AD" : "e.g. BUS101"}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {isProgram ? "Program Name" : "Course Name"} *
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Enter name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Department *
                </label>

                <select
                  value={form.department}
                  onChange={(event) =>
                    updateField("department", event.target.value)
                  }
                  className={inputClass}
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField("status", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EAE4D9] pt-5">
            <h3 className="mb-4 text-sm font-bold text-[#280A47]">
              {isProgram
                ? "Program Structure"
                : "Course Information"}
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {isProgram ? (
                <>
                  <div>
                    <label className={labelClass}>
                      Credential
                    </label>

                    <select
                      value={form.credential}
                      onChange={(event) =>
                        updateField("credential", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Certificate</option>
                      <option>Diploma</option>
                      <option>Advanced Diploma</option>
                      <option>Degree</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Duration
                    </label>

                    <select
                      value={form.duration}
                      onChange={(event) =>
                        updateField("duration", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>6 Months</option>
                      <option>1 Year</option>
                      <option>2 Years</option>
                      <option>3 Years</option>
                      <option>4 Years</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Total Credits *
                    </label>

                    <input
                      type="number"
                      min="1"
                      required
                      value={form.totalCredits}
                      onChange={(event) =>
                        updateField(
                          "totalCredits",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className={labelClass}>
                      Credit Value *
                    </label>

                    <input
                      type="number"
                      min="1"
                      required
                      value={form.credits}
                      onChange={(event) =>
                        updateField("credits", event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Semester
                    </label>

                    <select
                      value={form.semester}
                      onChange={(event) =>
                        updateField("semester", event.target.value)
                      }
                      className={inputClass}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                        <option
                          key={semester}
                          value={`Semester ${semester}`}
                        >
                          Semester {semester}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Assign to Program
                    </label>

                    <select
                      value={form.programs[0] || ""}
                      onChange={(event) =>
                        updateField(
                          "programs",
                          event.target.value
                            ? [event.target.value]
                            : []
                        )
                      }
                      className={inputClass}
                    >
                      <option value="">Select a program</option>

                      {programs.map((program) => (
                        <option
                          key={program.id}
                          value={program.name}
                        >
                          {program.name}
                        </option>
                      ))}
                    </select>

                    <p className="mt-2 text-xs text-[#919B89]">
                      You can assign this course to one program here.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-[#F2C9CD] bg-[#FBECEE] px-4 py-3 text-sm text-[#B02D30]">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#EAE4D9] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#EAE4D9] px-5 py-3 text-sm font-semibold text-[#716B76] transition hover:bg-[#F8F7F4]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#280A47] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
            >
              <Save size={17} />
              {editingItem ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
