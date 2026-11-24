
"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Users,
  ClipboardList,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  CircleAlert,
  TrendingUp,
  Plus,
  CalendarCheck,
  MoreHorizontal,
} from "lucide-react";

// Dashboard statistics
const statistics = [
  {
    title: "Total Students",
    value: "1,250",
    change: "+12.5%",
    description: "Compared to last term",
    icon: Users,
    color: "purple",
  },
  {
    title: "Applications",
    value: "86",
    change: "+8.2%",
    description: "Applications received",
    icon: ClipboardList,
    color: "red",
  },
  {
    title: "Active Programs",
    value: "18",
    change: "Active",
    description: "Currently available",
    icon: BookOpen,
    color: "gold",
  },
  {
    title: "Graduates",
    value: "245",
    change: "+15.4%",
    description: "This academic year",
    icon: GraduationCap,
    color: "sage",
  },
];

// Recent activities
const activities = [
  {
    name: "New student application",
    detail: "Business Administration",
    time: "10 min ago",
    status: "Pending",
    initials: "SA",
    color: "purple",
  },
  {
    name: "Student registration",
    detail: "New student record created",
    time: "35 min ago",
    status: "Completed",
    initials: "SR",
    color: "green",
  },
  {
    name: "Academic document uploaded",
    detail: "Transcript verification",
    time: "1 hour ago",
    status: "Review",
    initials: "AD",
    color: "gold",
  },
  {
    name: "Fee payment received",
    detail: "Tuition payment recorded",
    time: "2 hours ago",
    status: "Completed",
    initials: "FP",
    color: "red",
  },
];

// Icon background styles
const iconStyles = {
  purple: "bg-[#F1EAF7] text-[#280A47]",
  red: "bg-[#FBECEE] text-[#B02D30]",
  gold: "bg-[#FBF2DF] text-[#A87925]",
  sage: "bg-[#EDF1EA] text-[#687C5F]",
};

// Activity initials styles
const activityStyles = {
  purple: "bg-[#F1EAF7] text-[#280A47]",
  green: "bg-[#EDF5EF] text-[#527A5B]",
  gold: "bg-[#FBF2DF] text-[#A87925]",
  red: "bg-[#FBECEE] text-[#B02D30]",
};

// Application status styles
const statusStyles = {
  Completed: "bg-[#EDF5EF] text-[#527A5B]",
  Pending: "bg-[#FBF2DF] text-[#A87925]",
  Review: "bg-[#F1EAF7] text-[#280A47]",
};

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* Welcome banner */}
      <section className="relative mb-8 overflow-hidden rounded-2xl bg-[#280A47] px-6 py-8 text-white shadow-xl shadow-[#280A47]/10 sm:px-9 sm:py-10">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-32 h-80 w-80 rounded-full border border-white/[0.08]" />

        <div className="pointer-events-none absolute -right-2 -top-20 h-64 w-64 rounded-full border border-white/[0.08]" />

        <div className="pointer-events-none absolute -bottom-32 right-48 h-72 w-72 rounded-full bg-[#B02D30]/20 blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">

              <span className="h-1.5 w-1.5 rounded-full bg-[#F0B556]" />

              <span className="text-[10px] font-semibold tracking-wide text-white/80">
                INSTITUTIONAL OVERVIEW
              </span>

            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-[34px]">
              Welcome back, Administrator
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-6 text-white/65 sm:text-sm">
              Manage student information, admissions and academic
              operations from your central institutional workspace.
            </p>

            {/* Banner buttons */}
            <div className="mt-6 flex flex-wrap gap-3">

              <button className="flex items-center gap-2 rounded-xl bg-[#F0B556] px-4 py-3 text-xs font-bold text-[#280A47] transition hover:bg-[#F7C979]">
                <Plus size={16} />
                Quick action
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold text-white transition hover:bg-white/15">
                <CalendarCheck size={16} />
                Academic calendar
              </button>

            </div>

          </div>

          {/* Banner illustration */}
          <div className="hidden items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] p-7 lg:flex">
            <GraduationCap
              size={90}
              strokeWidth={1}
              className="text-[#F0B556]"
            />
          </div>

        </div>
      </section>

      {/* Dashboard heading */}
      <section className="mb-5 flex items-center justify-between gap-4">

        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Dashboard Overview
          </h2>

          <p className="mt-1 text-xs text-[#89818E]">
            Key institutional statistics and performance
          </p>
        </div>

        <div className="hidden rounded-lg border border-[#EAE4D9] bg-white px-3 py-2 text-[11px] text-[#716B76] sm:block">
          Academic Year 2026
        </div>

      </section>

      {/* Statistics cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-[#EAE4D9]/80 bg-white p-5 shadow-[0_3px_15px_rgba(40,10,71,0.025)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(40,10,71,0.08)]"
            >

              {/* Card heading */}
              <div className="flex items-center justify-between">

                <p className="text-xs font-semibold text-[#89818E]">
                  {item.title}
                </p>

                <div className={`rounded-xl p-3 ${iconStyles[item.color]}`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>

              </div>

              {/* Card value */}
              <div className="mt-5 flex items-end justify-between">

                <h3 className="text-3xl font-bold tracking-tight text-[#28212D]">
                  {item.value}
                </h3>

                <span className="mb-1 flex items-center gap-1 rounded-full bg-[#EDF5EF] px-2 py-1 text-[10px] font-bold text-[#527A5B]">
                  <TrendingUp size={12} />
                  {item.change}
                </span>

              </div>

              <p className="mt-2 text-[10px] text-[#A19AA4]">
                {item.description}
              </p>

            </div>
          );
        })}

      </section>

      {/* Activity and overview section */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">

        {/* Recent activity */}
        <div className="overflow-hidden rounded-2xl border border-[#EAE4D9]/80 bg-white shadow-[0_3px_15px_rgba(40,10,71,0.025)]">

          {/* Activity header */}
          <div className="flex items-center justify-between border-b border-[#F0ECE5] px-5 py-5 sm:px-6">

            <div>
              <h3 className="text-sm font-bold">
                Recent Activity
              </h3>

              <p className="mt-1 text-[11px] text-[#89818E]">
                Latest updates across the institution
              </p>
            </div>

            <button
              aria-label="More activity options"
              className="rounded-lg p-2 text-[#89818E] transition hover:bg-[#F8F5FA] hover:text-[#280A47]"
            >
              <MoreHorizontal size={20} />
            </button>

          </div>

          {/* Activity list */}
          <div className="divide-y divide-[#F3F0EB]">

            {activities.map((activity) => (
              <div
                key={activity.name}
                className="flex items-center justify-between gap-3 px-5 py-4 transition hover:bg-[#FCFBF9] sm:px-6"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${activityStyles[activity.color]}`}>
                    {activity.initials}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-xs font-bold text-[#342C38]">
                      {activity.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-[#89818E]">
                      {activity.detail}
                    </p>

                    <p className="mt-1.5 flex items-center gap-1 text-[9px] text-[#AAA3AC]">
                      <Clock3 size={11} />
                      {activity.time}
                    </p>

                  </div>

                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${statusStyles[activity.status]}`}
                >
                  {activity.status}
                </span>

              </div>
            ))}

          </div>

          {/* Activity footer */}
          <div className="border-t border-[#F0ECE5] px-6 py-4">

            <button className="flex items-center gap-2 text-[11px] font-bold text-[#280A47] transition hover:text-[#B02D30]">
              View all activities
              <ArrowUpRight size={14} />
            </button>

          </div>

        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Application overview */}
          <div className="rounded-2xl border border-[#EAE4D9]/80 bg-white p-5 shadow-[0_3px_15px_rgba(40,10,71,0.025)] sm:p-6">

            <div className="mb-5">

              <h3 className="text-sm font-bold">
                Application Overview
              </h3>

              <p className="mt-1 text-[11px] text-[#89818E]">
                Current admissions progress
              </p>

            </div>

            <div className="space-y-5">

              {/* Pending applications */}
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[#FBF2DF] p-2.5 text-[#A87925]">
                  <Clock3 size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold">
                    Pending Applications
                  </p>

                  <p className="mt-1 text-[10px] text-[#89818E]">
                    Awaiting review
                  </p>
                </div>

                <span className="text-lg font-bold">
                  24
                </span>

              </div>

              {/* Approved applications */}
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[#EDF5EF] p-2.5 text-[#527A5B]">
                  <CheckCircle2 size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold">
                    Approved Applications
                  </p>

                  <p className="mt-1 text-[10px] text-[#89818E]">
                    Successfully approved
                  </p>
                </div>

                <span className="text-lg font-bold">
                  42
                </span>

              </div>

              {/* Outstanding reviews */}
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[#FBECEE] p-2.5 text-[#B02D30]">
                  <CircleAlert size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold">
                    Outstanding Reviews
                  </p>

                  <p className="mt-1 text-[10px] text-[#89818E]">
                    Require attention
                  </p>
                </div>

                <span className="text-lg font-bold">
                  8
                </span>

              </div>

            </div>

          </div>

          {/* Academic information */}
          <div className="relative overflow-hidden rounded-2xl bg-[#919B89] p-6 text-white">

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15" />

            <div className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/15" />

            <div className="relative">

              <div className="mb-4 inline-flex rounded-lg bg-white/15 p-2">
                <GraduationCap size={21} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/70">
                Academic Information
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Academic Year 2026
              </h3>

              <p className="mt-2 max-w-xs text-[11px] leading-5 text-white/80">
                Access institutional academic schedules and
                important academic information.
              </p>

              <button className="mt-5 flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[10px] font-bold text-[#46543F] transition hover:bg-[#F7F7F3]">
                Academic calendar
                <ArrowUpRight size={14} />
              </button>

            </div>

          </div>

        </div>

      </section>

    </DashboardLayout>
  );
}
