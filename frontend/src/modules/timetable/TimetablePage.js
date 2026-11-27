
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  Users,
  Plus,
  Download,
  Search,
  MapPin,
  GraduationCap,
} from "lucide-react";

import TimetableGrid from "./components/TimetableGrid";
import ScheduleFormModal from "./components/ScheduleFormModal";
import ScheduleDetailsModal from "./components/ScheduleDetailsModal";

import {
  initialSchedules,
  academicTerms,
} from "./data/timetableData";

export default function TimetablePage() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [selectedTerm, setSelectedTerm] = useState("Fall 2026");
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [viewingSchedule, setViewingSchedule] = useState(null);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchesTerm = schedule.term === selectedTerm;

      const searchValue = search.toLowerCase();

      const matchesSearch =
        schedule.courseName.toLowerCase().includes(searchValue) ||
        schedule.courseCode.toLowerCase().includes(searchValue) ||
        schedule.instructor.toLowerCase().includes(searchValue) ||
        schedule.room.toLowerCase().includes(searchValue);

      const matchesDay =
        selectedDay === "All" || schedule.day === selectedDay;

      return matchesTerm && matchesSearch && matchesDay;
    });
  }, [schedules, selectedTerm, search, selectedDay]);

  const statistics = useMemo(() => {
    const termSchedules = schedules.filter(
      (schedule) => schedule.term === selectedTerm
    );

    return {
      total: termSchedules.length,
      scheduled: termSchedules.filter(
        (schedule) => schedule.status === "Scheduled"
      ).length,
      cancelled: termSchedules.filter(
        (schedule) => schedule.status === "Cancelled"
      ).length,
      rooms: new Set(
        termSchedules
          .filter((schedule) => schedule.status !== "Cancelled")
          .map((schedule) => schedule.room)
      ).size,
    };
  }, [schedules, selectedTerm]);

  const statCards = [
    {
      label: "Total Classes",
      value: statistics.total,
      icon: BookOpen,
      color: "bg-purple-100 text-[#280A47]",
    },
    {
      label: "Scheduled",
      value: statistics.scheduled,
      icon: CalendarDays,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Cancelled",
      value: statistics.cancelled,
      icon: Clock3,
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Rooms in Use",
      value: statistics.rooms,
      icon: MapPin,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const handleSaveSchedule = (scheduleData) => {
    setSchedules((previous) => {
      const exists = previous.some(
        (item) => item.id === scheduleData.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === scheduleData.id ? scheduleData : item
        );
      }

      return [...previous, scheduleData];
    });

    setShowForm(false);
    setEditingSchedule(null);
    setViewingSchedule(null);
  };

  const handleEditSchedule = (schedule) => {
    setViewingSchedule(null);
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const exportSchedules = () => {
    const headers = [
      "Course Code",
      "Course Name",
      "Program",
      "Instructor",
      "Day",
      "Start Time",
      "End Time",
      "Room",
      "Building",
      "Academic Term",
      "Status",
    ];

    const rows = filteredSchedules.map((item) => [
      item.courseCode,
      item.courseName,
      item.program,
      item.instructor,
      item.day,
      item.startTime,
      item.endTime,
      item.room,
      item.building,
      item.term,
      item.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `timetable-${selectedTerm
      .toLowerCase()
      .replaceAll(" ", "-")}.csv`;

    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-7">

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#716B76]">
            <GraduationCap size={17} />
            Academic Management
            <span>/</span>
            Timetable
          </div>

          <h1 className="text-2xl font-bold text-[#280A47] sm:text-3xl">
            Timetable Management
          </h1>

          <p className="mt-2 text-sm text-[#716B76] sm:text-base">
            Manage class schedules, instructors, classrooms, and academic
            sessions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportSchedules}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D8D0DF] bg-white px-4 py-2.5 text-sm font-semibold text-[#514A57] transition hover:bg-[#F8F7F4]"
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingSchedule(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#280A47] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
          >
            <Plus size={18} />
            Add Schedule
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#EAE4D9] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#716B76]">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-[#28212D]">
                    {stat.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-[#EAE4D9] bg-white p-5">
        <div className="grid gap-4 lg:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514A57]">
              Academic Term
            </label>

            <select
              value={selectedTerm}
              onChange={(event) => setSelectedTerm(event.target.value)}
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
              Search Classes
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#716B76]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search course, instructor, room..."
                className="w-full rounded-lg border border-[#EAE4D9] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#280A47]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514A57]">
              Weekday
            </label>

            <select
              value={selectedDay}
              onChange={(event) => setSelectedDay(event.target.value)}
              className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
            >
              <option value="All">All Weekdays</option>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timetable heading */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-[#280A47]">
            Weekly Class Schedule
          </h2>

          <p className="mt-1 text-sm text-[#716B76]">
            {selectedTerm} · Monday to Friday
          </p>
        </div>

        <span className="text-sm font-medium text-[#716B76]">
          {filteredSchedules.length} class schedules
        </span>
      </div>

      {/* Timetable grid */}
      {filteredSchedules.length > 0 ? (
        <TimetableGrid
          schedules={filteredSchedules}
          onView={setViewingSchedule}
        />
      ) : (
        <div className="rounded-xl border border-[#EAE4D9] bg-white px-5 py-16 text-center">
          <CalendarDays
            size={38}
            className="mx-auto mb-3 text-[#B8AFBF]"
          />

          <h3 className="font-semibold text-[#28212D]">
            No schedules found
          </h3>

          <p className="mt-1 text-sm text-[#716B76]">
            Try changing your filters or add a new class schedule.
          </p>
        </div>
      )}

      {/* Schedule legend */}
      <div className="rounded-xl border border-[#EAE4D9] bg-white p-5">
        <h3 className="mb-4 font-semibold text-[#280A47]">
          Program Legend
        </h3>

        <div className="flex flex-wrap gap-5 text-sm text-[#514A57]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#280A47]" />
            Business Administration
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-600" />
            Information Technology
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-amber-500" />
            Construction Management
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-green-600" />
            Healthcare Administration
          </div>
        </div>
      </div>

      {/* Schedule form */}
      {showForm && (
        <ScheduleFormModal
          schedule={editingSchedule}
          existingSchedules={schedules}
          onClose={() => {
            setShowForm(false);
            setEditingSchedule(null);
          }}
          onSave={handleSaveSchedule}
        />
      )}

      {/* Schedule details */}
      {viewingSchedule && (
        <ScheduleDetailsModal
          schedule={viewingSchedule}
          onClose={() => setViewingSchedule(null)}
          onEdit={handleEditSchedule}
        />
      )}
    </div>
  );
}
