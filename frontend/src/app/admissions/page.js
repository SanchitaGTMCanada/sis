
"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  Eye,
  Filter,
  CalendarDays,
  Mail,
  GraduationCap,
  Hash,
  X,
} from "lucide-react";

const applications = [
  {
    id: "APP-2026-001",
    name: "James Wilson",
    email: "james.wilson@example.com",
    program: "Business Administration",
    date: "20 Nov 2026",
    status: "Submitted",
  },
  {
    id: "APP-2026-002",
    name: "Sophia Martin",
    email: "sophia.martin@example.com",
    program: "Information Technology",
    date: "19 Nov 2026",
    status: "Under Review",
  },
  {
    id: "APP-2026-003",
    name: "Daniel Anderson",
    email: "daniel.anderson@example.com",
    program: "Construction Management",
    date: "18 Nov 2026",
    status: "Approved",
  },
  {
    id: "APP-2026-004",
    name: "Olivia Thompson",
    email: "olivia.thompson@example.com",
    program: "Healthcare Administration",
    date: "17 Nov 2026",
    status: "Submitted",
  },
  {
    id: "APP-2026-005",
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    program: "Business Administration",
    date: "15 Nov 2026",
    status: "Rejected",
  },
  {
    id: "APP-2026-006",
    name: "Isabella Davis",
    email: "isabella.davis@example.com",
    program: "Information Technology",
    date: "14 Nov 2026",
    status: "Under Review",
  },
];

const statusStyles = {
  Submitted: "bg-[#F1EAF7] text-[#68428A]",
  "Under Review": "bg-[#FBF2DF] text-[#A87925]",
  Approved: "bg-[#EDF5EF] text-[#527A5B]",
  Rejected: "bg-[#FBECEE] text-[#B02D30]",
};

const statistics = [
  {
    title: "Total Applications",
    value: "86",
    icon: ClipboardList,
    color: "purple",
  },
  {
    title: "Under Review",
    value: "24",
    icon: Clock3,
    color: "gold",
  },
  {
    title: "Approved",
    value: "42",
    icon: CheckCircle2,
    color: "sage",
  },
  {
    title: "Rejected",
    value: "8",
    icon: XCircle,
    color: "red",
  },
];

const iconStyles = {
  purple: "bg-[#F1EAF7] text-[#280A47]",
  gold: "bg-[#FBF2DF] text-[#A87925]",
  sage: "bg-[#EDF1EA] text-[#687C5F]",
  red: "bg-[#FBECEE] text-[#B02D30]",
};

export default function AdmissionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        application.name.toLowerCase().includes(searchText) ||
        application.email.toLowerCase().includes(searchText) ||
        application.id.toLowerCase().includes(searchText) ||
        application.program.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
  <>
      <div className="space-y-7">

        {/* Page heading */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B02D30]">
              <Users size={16} />
              Student Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#28212D]">
              Admissions
            </h1>

            <p className="mt-2 text-sm text-[#89818E]">
              Manage applications, review submissions and admission decisions.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#EAE4D9] bg-white p-5 shadow-[0_3px_15px_rgba(40,10,71,0.025)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#89818E]">
                    {item.title}
                  </p>

                  <div className={`rounded-xl p-3 ${iconStyles[item.color]}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="mt-5 text-3xl font-bold text-[#28212D]">
                  {item.value}
                </h2>
              </div>
            );
          })}
        </section>

        {/* Applications table */}
        <section className="overflow-hidden rounded-2xl border border-[#EAE4D9] bg-white shadow-[0_3px_15px_rgba(40,10,71,0.025)]">

          {/* Table header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#F0ECE5] p-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-base font-bold text-[#28212D]">
                All Applications
              </h2>

              <p className="mt-1 text-xs text-[#89818E]">
                {filteredApplications.length} applications found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex h-10 items-center gap-2 rounded-xl border border-[#EAE4D9] bg-[#FAF9F7] px-3 sm:w-64">
                <Search size={16} className="shrink-0 text-[#89818E]" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search applications..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#AAA3AC]"
                />
              </div>

              <div className="flex h-10 items-center gap-2 rounded-xl border border-[#EAE4D9] bg-white px-3">
                <Filter size={15} className="text-[#89818E]" />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="bg-transparent text-sm text-[#342C38] outline-none"
                >
                  <option>All Status</option>
                  <option>Submitted</option>
                  <option>Under Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#FCFBF9]">
                <tr className="text-xs uppercase tracking-wider text-[#89818E]">
                  <th className="px-6 py-4 font-bold">Applicant</th>
                  <th className="px-6 py-4 font-bold">Application ID</th>
                  <th className="px-6 py-4 font-bold">Program</th>
                  <th className="px-6 py-4 font-bold">Submitted Date</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0ECE5]">
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="transition hover:bg-[#FCFBF9]"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-[#342C38]">
                        {application.name}
                      </p>

                      <p className="mt-1 text-xs text-[#89818E]">
                        {application.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold text-[#716B76]">
                      {application.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-[#716B76]">
                      {application.program}
                    </td>

                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-xs text-[#716B76]">
                        <CalendarDays size={14} />
                        {application.date}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-2 text-xs font-bold ${statusStyles[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedApplication(application)}
                        aria-label={`View ${application.name} application`}
                        title="View application details"
                        className="inline-flex cursor-pointer rounded-lg p-2 text-[#89818E] transition hover:bg-[#F1EAF7] hover:text-[#280A47]"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-[#89818E]"
                    >
                      No applications found. Try another search or status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Application details modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#F0ECE5] px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#B02D30]">
                  Admissions
                </p>

                <h2
                  id="application-modal-title"
                  className="mt-1 text-xl font-bold text-[#28212D]"
                >
                  Application Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                aria-label="Close application details"
                className="rounded-lg p-2 text-[#89818E] transition hover:bg-[#F1EAF7] hover:text-[#280A47]"
              >
                <X size={21} />
              </button>
            </div>

            {/* Modal content */}
            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4 rounded-xl bg-[#F8F5FA] p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EDE5F4] text-xl font-bold text-[#280A47]">
                  {selectedApplication.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[#28212D]">
                    {selectedApplication.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#89818E]">
                    Applicant
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89818E]">
                    <Hash size={14} />
                    Application ID
                  </p>

                  <p className="break-all text-sm font-semibold text-[#342C38]">
                    {selectedApplication.id}
                  </p>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89818E]">
                    <CalendarDays size={14} />
                    Submitted Date
                  </p>

                  <p className="text-sm font-semibold text-[#342C38]">
                    {selectedApplication.date}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89818E]">
                    <Mail size={14} />
                    Email Address
                  </p>

                  <a
                    href={`mailto:${selectedApplication.email}`}
                    className="break-all text-sm font-semibold text-[#280A47] hover:underline"
                  >
                    {selectedApplication.email}
                  </a>
                </div>

                <div className="sm:col-span-2">
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89818E]">
                    <GraduationCap size={15} />
                    Applied Program
                  </p>

                  <p className="text-sm font-semibold text-[#342C38]">
                    {selectedApplication.program}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#89818E]">
                    Application Status
                  </p>

                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${statusStyles[selectedApplication.status]}`}
                  >
                    {selectedApplication.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end border-t border-[#F0ECE5] bg-[#FCFBF9] px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="rounded-xl bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
