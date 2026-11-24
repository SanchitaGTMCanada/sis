
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Search,
  Plus,
  Users,
  GraduationCap,
  UserCheck,
  Clock3,
  Eye,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";

const initialStudents = [
  {
    id: "PINC-2026-001",
    name: "John Anderson",
    email: "john.anderson@example.com",
    program: "Business Administration",
    year: "Year 1",
    status: "Active",
  },
  {
    id: "PINC-2026-002",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    program: "Information Technology",
    year: "Year 2",
    status: "Active",
  },
  {
    id: "PINC-2026-003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    program: "Construction Management",
    year: "Year 1",
    status: "Pending",
  },
  {
    id: "PINC-2026-004",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    program: "Business Administration",
    year: "Year 3",
    status: "Active",
  },
  {
    id: "PINC-2026-005",
    name: "David Thompson",
    email: "david.thompson@example.com",
    program: "Information Technology",
    year: "Year 2",
    status: "Inactive",
  },
  {
    id: "PINC-2026-006",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    program: "Healthcare Administration",
    year: "Year 1",
    status: "Active",
  },
];

const statusStyles = {
  Active: "bg-[#EDF5EF] text-[#527A5B]",
  Pending: "bg-[#FBF2DF] text-[#A87925]",
  Inactive: "bg-[#FBECEE] text-[#B02D30]",
};

const emptyForm = {
  name: "",
  email: "",
  program: "",
  year: "Year 1",
};

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const router = useRouter();

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.program.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "All" ||
        student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const pendingCount = students.filter(
    (student) => student.status === "Pending"
  ).length;

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      id: `PINC-2026-${String(students.length + 1).padStart(3, "0")}`,
      name: form.name.trim(),
      email: form.email.trim(),
      program: form.program,
      year: form.year,
      status: "Pending",
    };

    setStudents((prev) => [newStudent, ...prev]);
    setForm(emptyForm);
    setShowModal(false);
  };

  return (
    <DashboardLayout>

      {/* Page heading */}
      <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-base font-semibold uppercase tracking-wider text-[#B02D30]">
            <Users size={14} />
            Student Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#28212D] sm:text-3xl">
            Students
          </h1>

          <p className="mt-2 text-sm text-[#89818E]">
            Manage student profiles, enrolment and academic information.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#280A47] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-[#280A47]/10 transition hover:bg-[#42146D]"
        >
          <Plus size={17} />
          Add Student
        </button>
      </section>

      {/* Statistics */}
      <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <StatCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="purple"
        />

        <StatCard
          title="Active Students"
          value={activeCount}
          icon={UserCheck}
          color="green"
        />

        <StatCard
          title="Pending Enrolment"
          value={pendingCount}
          icon={Clock3}
          color="gold"
        />

      </section>

      {/* Student table */}
      <section className="overflow-hidden rounded-2xl border border-[#EAE4D9] bg-white shadow-[0_3px_15px_rgba(40,10,71,0.025)]">

        {/* Table header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0ECE5] p-5 sm:p-6">

          <div>
            <h2 className="text-base font-bold">
              All Students
            </h2>

            <p className="mt-1 text-sm text-[#89818E]">
              {filteredStudents.length} students found
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-3 sm:w-auto">

            {/* Search */}
            <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#EAE4D9] bg-[#FAF9F7] px-3 sm:w-64 sm:flex-none">
              <Search size={16} className="shrink-0 text-[#938B98]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full bg-transparent text-base outline-none placeholder:text-[#AAA3AC]"
              />

              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={14} className="text-[#938B98]" />
                </button>
              )}
            </div>

            {/* Status filter */}
            <div className="relative">
              <Filter
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#938B98]"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-[#EAE4D9] bg-white pl-9 pr-8 text-base font-medium outline-none focus:border-[#280A47]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#938B98]"
              />
            </div>

          </div>
        </div>

        {/* Responsive table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">

            <thead className="bg-[#FAF9F7]">
              <tr className="text-sm font-bold uppercase tracking-wider text-[#89818E]">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F3F0EB]">

              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-[#FCFBF9]"
                >

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1EAF7] text-base font-bold text-[#280A47]">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>
                        <p className="text-base font-bold text-[#342C38]">
                          {student.name}
                        </p>

                        <p className="mt-1 text-sm text-[#89818E]">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-[#716B76]">
                      {student.id}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-base text-[#716B76]">
                      {student.program}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-base text-[#716B76]">
                      {student.year}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-base font-bold ${statusStyles[student.status]}`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => router.push(`/students/${encodeURIComponent(student.id)}`)}
                      aria-label={`View ${student.name} profile`}
                      title="View Student Profile"
                      className="rounded-lg p-2 text-[#716B76] transition hover:bg-[#F1EAF7] hover:text-[#280A47]"
                    >
                      <Eye size={17} />
                    </button>
                  </td>

                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1EAF7] text-[#280A47]">
                      <Users size={22} />
                    </div>

                    <p className="text-base font-semibold">
                      No students found
                    </p>

                    <p className="mt-1 text-sm text-[#89818E]">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </section>

      {/* Add student modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#170626]/50 p-4 backdrop-blur-sm">

          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-[#F0ECE5] px-6 py-5">

              <div>
                <h2 className="text-base font-bold">
                  Add New Student
                </h2>

                <p className="mt-1 text-sm text-[#89818E]">
                  Enter the student's basic information.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#89818E] hover:bg-[#F5F2F7]"
                aria-label="Close modal"
              >
                <X size={19} />
              </button>

            </div>

            <form onSubmit={handleAddStudent} className="space-y-5 p-6">

              <div>
                <label className="mb-2 block text-base font-semibold">
                  Full Name *
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  className="h-11 w-full rounded-xl border border-[#EAE4D9] px-4 text-base outline-none transition focus:border-[#280A47] focus:ring-2 focus:ring-[#280A47]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold">
                  Email Address *
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="student@example.com"
                  className="h-11 w-full rounded-xl border border-[#EAE4D9] px-4 text-base outline-none transition focus:border-[#280A47] focus:ring-2 focus:ring-[#280A47]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold">
                  Program *
                </label>

                <select
                  required
                  value={form.program}
                  onChange={(e) =>
                    setForm({ ...form, program: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-[#EAE4D9] bg-white px-4 text-base outline-none focus:border-[#280A47]"
                >
                  <option value="">Select a program</option>
                  <option>Business Administration</option>
                  <option>Information Technology</option>
                  <option>Construction Management</option>
                  <option>Healthcare Administration</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold">
                  Academic Year *
                </label>

                <select
                  value={form.year}
                  onChange={(e) =>
                    setForm({ ...form, year: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-[#EAE4D9] bg-white px-4 text-base outline-none focus:border-[#280A47]"
                >
                  <option>Year 1</option>
                  <option>Year 2</option>
                  <option>Year 3</option>
                  <option>Year 4</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#F0ECE5] pt-5">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[#EAE4D9] px-5 py-3 text-sm font-semibold text-[#716B76] hover:bg-[#FAF9F7]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#280A47] px-5 py-3 text-base font-semibold text-white hover:bg-[#42146D]"
                >
                  <Plus size={15} />
                  Add Student
                </button>

              </div>

            </form>
          </div>
        </div>
      )}



    </DashboardLayout>
  );
}

// Statistics card component
function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    purple: "bg-[#F1EAF7] text-[#280A47]",
    green: "bg-[#EDF5EF] text-[#527A5B]",
    gold: "bg-[#FBF2DF] text-[#A87925]",
  };

  return (
    <div className="rounded-2xl border border-[#EAE4D9] bg-white p-5 shadow-[0_3px_15px_rgba(40,10,71,0.025)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#89818E]">
          {title}
        </p>

        <div className={`rounded-xl p-3 ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
}
