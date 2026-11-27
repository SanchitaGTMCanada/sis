
"use client";

import { MapPin, UserRound, Clock3 } from "lucide-react";
import { weekDays, timeSlots } from "../data/timetableData";

const colorStyles = {
  purple: "border-l-[#280A47] bg-[#F0EBF5]",
  blue: "border-l-blue-600 bg-blue-50",
  amber: "border-l-amber-500 bg-amber-50",
  green: "border-l-green-600 bg-green-50",
};

const textStyles = {
  purple: "text-[#280A47]",
  blue: "text-blue-800",
  amber: "text-amber-800",
  green: "text-green-800",
};

function timeToMinutes(time) {
  const [clock, period] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export default function TimetableGrid({
  schedules = [],
  onView,
}) {
  const getScheduleForSlot = (day, slot) => {
    const slotStart = timeToMinutes(slot);

    return schedules.filter((schedule) => {
      const start = timeToMinutes(schedule.startTime);
      const end = timeToMinutes(schedule.endTime);

      return (
        schedule.day === day &&
        slotStart >= start &&
        slotStart < end
      );
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#EAE4D9] bg-white">
      <div className="min-w-[1050px]">
        {/* Weekday headings */}
        <div className="grid grid-cols-[100px_repeat(5,minmax(0,1fr))] border-b border-[#EAE4D9] bg-[#F8F7F4]">
          <div className="border-r border-[#EAE4D9] p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#716B76]">
              Time
            </span>
          </div>

          {weekDays.map((day) => (
            <div
              key={day}
              className="border-r border-[#EAE4D9] p-4 text-center last:border-r-0"
            >
              <p className="font-bold text-[#280A47]">{day}</p>
            </div>
          ))}
        </div>

        {/* Timetable rows */}
        {timeSlots.map((slot) => (
          <div
            key={slot}
            className="grid min-h-[105px] grid-cols-[100px_repeat(5,minmax(0,1fr))] border-b border-[#EAE4D9] last:border-b-0"
          >
            <div className="border-r border-[#EAE4D9] p-3">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#514A57]">
                <Clock3 size={14} />
                {slot}
              </div>
            </div>

            {weekDays.map((day) => {
              const slotSchedules = getScheduleForSlot(day, slot);

              return (
                <div
                  key={`${day}-${slot}`}
                  className="border-r border-[#EAE4D9] p-1.5 last:border-r-0"
                >
                  <div className="space-y-1.5">
                    {slotSchedules.map((schedule) => {
                      const isFirstSlot =
                        timeToMinutes(schedule.startTime) ===
                        timeToMinutes(slot);

                      if (!isFirstSlot) return null;

                      return (
                        <button
                          type="button"
                          key={schedule.id}
                          onClick={() => onView?.(schedule)}
                          className={`w-full rounded-lg border-l-4 p-2.5 text-left transition hover:shadow-md ${
                            colorStyles[schedule.color] ||
                            colorStyles.purple
                          }`}
                        >
                          <p
                            className={`text-xs font-bold ${
                              textStyles[schedule.color] ||
                              textStyles.purple
                            }`}
                          >
                            {schedule.courseCode}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs font-semibold text-[#28212D]">
                            {schedule.courseName}
                          </p>

                          <div className="mt-2 space-y-1 text-[11px] text-[#716B76]">
                            <p className="flex items-center gap-1">
                              <Clock3 size={11} />
                              {schedule.startTime} – {schedule.endTime}
                            </p>

                            <p className="flex items-center gap-1">
                              <UserRound size={11} />
                              <span className="truncate">
                                {schedule.instructor}
                              </span>
                            </p>

                            <p className="flex items-center gap-1">
                              <MapPin size={11} />
                              <span className="truncate">
                                {schedule.room}
                              </span>
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
