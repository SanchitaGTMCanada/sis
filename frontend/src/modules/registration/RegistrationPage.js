
"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Users,
  Clock3,
  CheckCircle2,
  Search,
  Plus,
  Download,
  GraduationCap,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

import RegistrationTable from "./components/RegistrationTable";
import RegistrationDetailsModal from "./components/RegistrationDetailsModal";

import {
  initialRegistrations,
  academicTerms,
  availableCourses,
} from "./data/registrationData";

const statCards = [
  {
    label: "Total Registrations",
    key: "total",
    icon: ClipboardList,
    color: "bg-purple-100 text-[#280A47]",
  },
  {
    label: "Registered",
    key: "registered",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Pending",
    key: "pending",
    icon: Clock3,
    color: "bg-amber-100 text-amber-700",
  },
  {
    label: "Waitlisted",
    key: "waitlisted",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
  },
];

export default function RegistrationPage() {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [selectedTerm, setSelectedTerm] = useState("Fall 2026");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const matchesTerm = registration.term === selectedTerm;

      const searchValue = search.toLowerCase();

      const matchesSearch =
        registration.studentName.toLowerCase().includes(searchValue) ||
        registration.studentId.toLowerCase().includes(searchValue) ||
        registration.courseName.toLowerCase().includes(searchValue) ||
        registration.courseCode.toLowerCase().includes(searchValue) ||
        registration.registrationId.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || registration.status === statusFilter;

      return matchesTerm && matchesSearch && matchesStatus;
    });
  }, [registrations, selectedTerm, search, statusFilter]);

  const statistics = useMemo(() => {
    const termRegistrations = registrations.filter(
      (registration) => registration.term === selectedTerm
    );

    return {
      total: termRegistrations.length,
      registered: termRegistrations.filter(
        (item) => item.status === "Registered"
      ).length,
      pending: termRegistrations.filter(
        (item) => item.status === "Pending"
      ).length,
      waitlisted: termRegistrations.filter(
        (item) => item.status === "Waitlisted"
      ).length,
    };
  }, [registrations, selectedTerm]);

  const updateStatus = (id, status) => {
    setRegistrations((previous) =>
      previous.map((registration) =>
        registration.id === id
          ? { ...registration, status }
          : registration
      )
    );
  };

  const handleSaveRegistration = (updatedRegistration) => {
    setRegistrations((previous) =>
      previous.map((registration) =>
        registration.id === updatedRegistration.id
          ? updatedRegistration
          : registration
      )
    );

    setSelectedRegistration(null);
  };

  const handleAddRegistration = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const course = availableCourses.find(
      (item) => item.courseCode === formData.get("courseCode")
    );

    if (!course) return;

    const studentName = formData.get("studentName").trim();
    const studentId = formData.get("studentId").trim();

    const newRegistration = {
      id: Date.now(),
      registrationId: `REG-${Date.now()}`,
      studentId,
      studentName,
      program: formData.get("program"),
      courseCode: course.courseCode,
      courseName: course.courseName,
      credits: course.credits,
      term: selectedTerm,
      registrationDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      grade: null,
    };

    setRegistrations((previous) => [newRegistration, ...previous]);
    setShowAddModal(false);
  };

  const exportRegistrations = () => {
    const headers = [
      "Registration ID",
      "Student ID",
      "Student Name",
      "Program",
      "Course Code",
      "Course Name",
      "Credits",
      "Term",
      "Registration Date",
      "Status",
    ];

    const rows = filteredRegistrations.map((item) => [
      item.registrationId,
      item.studentId,
      item.studentName,
      item.program,
      item.courseCode,
      item.courseName,
      item.credits,
      item.term,
      item.registrationDate,
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
    link.download = `course-registrations-${selectedTerm
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
            Course Registration
          </div>

          <h1 className="text-2xl font-bold text-[#280A47] sm:text-3xl">
            Course Registration
          </h1>

          <p className="mt-2 text-sm text-[#716B76] sm:text-base">
            Manage student course enrolments, registration status, and
            academic term selections.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportRegistrations}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D8D0DF] bg-white px-4 py-2.5 text-sm font-semibold text-[#514A57] transition hover:bg-[#F8F7F4]"
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#280A47] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
          >
            <Plus size={18} />
            Add Registration
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.key}
              className="rounded-xl border border-[#EAE4D9] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#716B76]">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-[#28212D]">
                    {statistics[stat.key]}
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

      {/* Term selection and filters */}
      <div className="rounded-xl border border-[#EAE4D9] bg-white p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-xs">
            <label className="mb-2 block text-sm font-semibold text-[#514A57]">
              Academic Term
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#716B76]"
              />

              <select
                value={selectedTerm}
                onChange={(event) => setSelectedTerm(event.target.value)}
                className="w-full appearance-none rounded-lg border border-[#EAE4D9] bg-white py-3 pl-10 pr-4 text-sm font-medium text-[#28212D] outline-none focus:border-[#280A47]"
              >
                {academicTerms.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[520px]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                Search
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
                  placeholder="Search student or course..."
                  className="w-full rounded-lg border border-[#EAE4D9] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#280A47]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                Registration Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
              >
                {[
                  "All",
                  "Registered",
                  "Pending",
                  "Waitlisted",
                  "Dropped",
                  "Withdrawn",
                ].map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Registration table */}
      <div>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#280A47]">
              Student Registrations
            </h2>
            <p className="mt-1 text-sm text-[#716B76]">
              Registration records for {selectedTerm}
            </p>
          </div>

          <span className="text-sm font-medium text-[#716B76]">
            {filteredRegistrations.length} records found
          </span>
        </div>

        <RegistrationTable
          registrations={filteredRegistrations}
          onView={(registration) => {
            setSelectedRegistration(registration);
            setModalMode("view");
          }}
          onEdit={(registration) => {
            setSelectedRegistration(registration);
            setModalMode("edit");
          }}
          onStatusChange={updateStatus}
        />
      </div>

      {/* Registration details modal */}
      {selectedRegistration && (
        <RegistrationDetailsModal
          registration={selectedRegistration}
          mode={modalMode}
          onClose={() => setSelectedRegistration(null)}
          onSave={handleSaveRegistration}
        />
      )}

      {/* Add registration modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-[#EAE4D9] px-6 py-5">
              <h2 className="text-xl font-bold text-[#280A47]">
                Add Course Registration
              </h2>
              <p className="mt-1 text-sm text-[#716B76]">
                Enter the student and course information.
              </p>
            </div>

            <form onSubmit={handleAddRegistration} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                    Student Name
                  </label>
                  <input
                    name="studentName"
                    type="text"
                    required
                    placeholder="Enter student name"
                    className="w-full rounded-lg border border-[#EAE4D9] px-4 py-3 text-sm outline-none focus:border-[#280A47]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                    Student ID
                  </label>
                  <input
                    name="studentId"
                    type="text"
                    required
                    placeholder="e.g. STU-2026-007"
                    className="w-full rounded-lg border border-[#EAE4D9] px-4 py-3 text-sm outline-none focus:border-[#280A47]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                    Program
                  </label>
                  <input
                    name="program"
                    type="text"
                    required
                    placeholder="Enter program name"
                    className="w-full rounded-lg border border-[#EAE4D9] px-4 py-3 text-sm outline-none focus:border-[#280A47]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514A57]">
                    Course
                  </label>
                  <select
                    name="courseCode"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-[#EAE4D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#280A47]"
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    {availableCourses
                      .filter((course) => course.term === selectedTerm)
                      .map((course) => (
                        <option key={course.id} value={course.courseCode}>
                          {course.courseCode} — {course.courseName}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="rounded-lg bg-[#F8F7F4] p-3 text-sm text-[#716B76]">
                  <p className="font-semibold text-[#28212D]">
                    Academic Term: {selectedTerm}
                  </p>
                  <p className="mt-1">
                    New registrations will initially have Pending status.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-[#EAE4D9] pt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-[#D8D0DF] px-5 py-2.5 text-sm font-semibold text-[#514A57] hover:bg-[#F8F7F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3B1760]"
                >
                  Add Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
