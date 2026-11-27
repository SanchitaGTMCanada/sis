
"use client";

import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  UserRound,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const statusStyles = {
  Scheduled: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Rescheduled: "bg-amber-100 text-amber-700",
};

export default function ScheduleDetailsModal({
  schedule,
  onClose,
  onEdit,
}) {
  if (!schedule) return null;

  const details = [
    {
      label: "Course Code",
      value: schedule.courseCode,
    },
    {
      label: "Course Name",
      value: schedule.courseName,
    },
    {
      label: "Program",
      value: schedule.program,
    },
    {
      label: "Instructor",
      value: schedule.instructor,
    },
    {
      label: "Academic Term",
      value: schedule.term,
    },
    {
      label: "Day",
      value: schedule.day,
    },
    {
      label: "Start Time",
      value: schedule.startTime,
    },
    {
      label: "End Time",
      value: schedule.endTime,
    },
    {
      label: "Classroom",
      value: schedule.room,
    },
    {
      label: "Building",
      value: schedule.building,
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAE4D9] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#280A47]">
              Schedule Details
            </h2>
            <p className="mt-1 text-sm text-[#716B76]">
              {schedule.courseCode} · {schedule.courseName}
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

        <div className="space-y-6 p-6">
          {/* Schedule overview */}
          <div className="rounded-xl bg-[#F0EBF5] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-3 text-[#280A47]">
                <BookOpen size={24} />
              </div>

              <div>
                <p className="font-bold text-[#280A47]">
                  {schedule.courseName}
                </p>
                <p className="mt-1 text-sm text-[#716B76]">
                  {schedule.courseCode}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-[#716B76]">
                  Day
                </p>
                <p className="mt-1 font-semibold text-[#28212D]">
                  {schedule.day}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#716B76]">
                  Start Time
                </p>
                <p className="mt-1 font-semibold text-[#28212D]">
                  {schedule.startTime}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#716B76]">
                  End Time
                </p>
                <p className="mt-1 font-semibold text-[#28212D]">
                  {schedule.endTime}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#514A57]">
              Schedule Status
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                statusStyles[schedule.status] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {schedule.status}
            </span>
          </div>

          {/* Details */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#280A47]">
              <GraduationCap size={19} />
              Schedule Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {details.map((detail) => (
                <div key={detail.label}>
                  <p className="mb-1 text-sm text-[#716B76]">
                    {detail.label}
                  </p>
                  <p className="font-medium text-[#28212D]">
                    {detail.value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick information */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[#EAE4D9] p-3">
              <CalendarDays size={19} className="mb-2 text-[#280A47]" />
              <p className="text-xs text-[#716B76]">Academic Term</p>
              <p className="mt-1 text-sm font-semibold text-[#28212D]">
                {schedule.term}
              </p>
            </div>

            <div className="rounded-lg border border-[#EAE4D9] p-3">
              <UserRound size={19} className="mb-2 text-[#280A47]" />
              <p className="text-xs text-[#716B76]">Instructor</p>
              <p className="mt-1 text-sm font-semibold text-[#28212D]">
                {schedule.instructor}
              </p>
            </div>

            <div className="rounded-lg border border-[#EAE4D9] p-3">
              <MapPin size={19} className="mb-2 text-[#280A47]" />
              <p className="text-xs text-[#716B76]">Classroom</p>
              <p className="mt-1 text-sm font-semibold text-[#28212D]">
                {schedule.room}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#EAE4D9] bg-[#F8F7F4] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#D8D0DF] px-5 py-2.5 text-sm font-semibold text-[#514A57] transition hover:bg-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onEdit?.(schedule)}
            className="rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
          >
            Edit Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
