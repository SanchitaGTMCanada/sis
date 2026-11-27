
"use client";

import { useState } from "react";
import { X, CalendarDays, Clock, MapPin, BookOpen } from "lucide-react";

import {
  weekDays,
  academicTerms,
  availableCourses,
  availableRooms,
  timeSlots,
} from "../data/timetableData";

export default function ScheduleFormModal({
  schedule,
  onClose,
  onSave,
  existingSchedules = [],
}) {
  const isEditing = Boolean(schedule);

  const [formData, setFormData] = useState({
    courseCode: schedule?.courseCode || "",
    day: schedule?.day || "Monday",
    startTime: schedule?.startTime || "09:00 AM",
    endTime: schedule?.endTime || "10:30 AM",
    room: schedule?.room || "",
    term: schedule?.term || "Fall 2026",
    status: schedule?.status || "Scheduled",
  });

  const selectedCourse = availableCourses.find(
    (course) => course.courseCode === formData.courseCode
  );

  const selectedRoom = availableRooms.find(
    (room) => room.room === formData.room
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toMinutes = (time) => {
    const [clock, period] = time.split(" ");
    let [hours, minutes] = clock.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const hasTimeConflict = () => {
    if (!formData.room || !formData.startTime || !formData.endTime) {
      return false;
    }

    const newStart = toMinutes(formData.startTime);
    const newEnd = toMinutes(formData.endTime);

    if (newEnd <= newStart) return true;

    return existingSchedules.some((item) => {
      if (item.id === schedule?.id) return false;

      if (
        item.day !== formData.day ||
        item.term !== formData.term ||
        item.room !== formData.room
      ) {
        return false;
      }

      const existingStart = toMinutes(item.startTime);
      const existingEnd = toMinutes(item.endTime);

      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const conflict = hasTimeConflict();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCourse || !selectedRoom || conflict) return;

    const scheduleData = {
      ...schedule,
      id: schedule?.id || Date.now(),
      courseCode: selectedCourse.courseCode,
      courseName: selectedCourse.courseName,
      program: selectedCourse.program,
      instructor: selectedCourse.instructor,
      room: selectedRoom.room,
      building: selectedRoom.building,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      term: formData.term,
      status: formData.status,
      color: schedule?.color || "purple",
    };

    onSave?.(scheduleData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EAE4D9] bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#280A47]">
              {isEditing ? "Edit Class Schedule" : "Add Class Schedule"}
            </h2>

            <p className="mt-1 text-sm text-[#716B76]">
              Assign a course, instructor, classroom, and time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#716B76] hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">

          {/* Course */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#280A47]">
              <BookOpen size={19} />
              Course Information
            </h3>

            <label className="mb-2 block text-sm font-semibold text-[#514A57]">
              Select Course
            </label>

            <select
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
            >
              <option value="">Select a course</option>

              {availableCourses.map((course) => (
                <option key={course.courseCode} value={course.courseCode}>
                  {course.courseCode} — {course.courseName}
                </option>
              ))}
            </select>

            {selectedCourse && (
              <div className="mt-3 rounded-lg bg-[#F8F7F4] p-4 text-sm">
                <p className="font-semibold text-[#28212D]">
                  {selectedCourse.courseName}
                </p>
                <p className="mt-1 text-[#716B76]">
                  Program: {selectedCourse.program}
                </p>
                <p className="mt-1 text-[#716B76]">
                  Instructor: {selectedCourse.instructor}
                </p>
              </div>
            )}
          </div>

          {/* Academic term and day */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#514A57]">
                <CalendarDays size={16} />
                Academic Term
              </label>

              <select
                name="term"
                value={formData.term}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
              >
                {academicTerms.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                Weekday
              </label>

              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
              >
                {weekDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#280A47]">
              <Clock size={19} />
              Class Timing
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                  Start Time
                </label>

                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                  End Time
                </label>

                <select
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Classroom */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#280A47]">
              <MapPin size={19} />
              Classroom Assignment
            </h3>

            <label className="mb-2 block text-sm font-semibold text-[#514A57]">
              Select Room
            </label>

            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
            >
              <option value="">Select a classroom</option>

              {availableRooms.map((room) => (
                <option key={room.room} value={room.room}>
                  {room.room} — {room.building}
                </option>
              ))}
            </select>

            {selectedRoom && (
              <p className="mt-2 text-sm text-[#716B76]">
                Capacity: {selectedRoom.capacity} students ·{" "}
                {selectedRoom.type}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514A57]">
              Schedule Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>

          {conflict && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              There is a room scheduling conflict or the end time must be
              later than the start time. Please choose another time or room.
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-[#EAE4D9] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D8D0DF] px-5 py-2.5 text-sm font-semibold text-[#514A57] hover:bg-[#F8F7F4]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={conflict || !selectedCourse || !selectedRoom}
              className="rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isEditing ? "Save Changes" : "Create Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
