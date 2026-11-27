
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  GraduationCap,
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  CalendarDays,
  Wallet,
  UserRoundCog,
  FileText,
  BarChart3,
  Settings,
  X,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
      {
        label: "Students",
        icon: Users,
        href: "/students",
      },
      {
        label: "Admissions",
        icon: ClipboardList,
        href: "/admissions",
        count: 24,
      },
    {
  label: "Programs & Courses",
  icon: BookOpen,
  href: "/programs",
},
      {
        label: "Course Registration",
        icon: CalendarDays,
      },
    ],
  },
  {
    title: "ACADEMIC MANAGEMENT",
    items: [
      {
        label: "Timetable",
        icon: CalendarDays,
      },
      {
        label: "Academic Records",
        icon: FileText,
      },
      {
        label: "Graduation",
        icon: GraduationCap,
      },
      {
        label: "Practicum",
        icon: Users,
      },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      {
        label: "Finance",
        icon: Wallet,
      },
      {
        label: "Staff Management",
        icon: UserRoundCog,
      },
      {
        label: "Reports & Analytics",
        icon: BarChart3,
      },
      {
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  // Prevent server/client active-state mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (item) => {
    if (!mounted || !item.href) return false;

    if (item.href === "/") {
      return pathname === "/";
    }

    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );
  };

  const renderNavigationItem = (item) => {
    const Icon = item.icon;
    const active = isActive(item);

    const className = `group relative flex h-[42px] w-full items-center gap-3 rounded-lg px-3 text-left text-[12px] transition-all duration-200 ${
      active
        ? "bg-white/[0.13] text-white"
        : "text-[#C8BBD2] hover:bg-white/[0.07] hover:text-white"
    }`;

    const content = (
      <>
        {active && (
          <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#F0B556]" />
        )}

        <Icon
          size={17}
          strokeWidth={1.8}
          className={`shrink-0 ${
            active
              ? "text-[#F0B556]"
              : "text-[#B8A4C8] group-hover:text-white"
          }`}
        />

        <span className="flex-1 truncate font-medium">
          {item.label}
        </span>

        {item.count !== undefined && (
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-[#E8DDEE]">
            {item.count}
          </span>
        )}

        {active && (
          <ChevronRight
            size={14}
            className="text-[#F0B556]"
          />
        )}
      </>
    );

    // Always render links as links
    if (item.href) {
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          className={className}
          aria-current={active ? "page" : undefined}
        >
          {content}
        </Link>
      );
    }

    // Items without routes remain disabled/coming soon
    return (
      <button
        key={item.label}
        type="button"
        onClick={onClose}
        className={className}
        title={`${item.label} - Coming soon`}
      >
        {content}
      </button>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[250px] flex-col bg-[#280A47] text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Branding */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.08] px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#280A47]">
              <GraduationCap size={24} />
            </div>

            <div>
              <h1 className="text-[17px] font-bold tracking-wide">
                PI-NC
              </h1>

              <p className="mt-0.5 text-[9px] tracking-[1px] text-white/50">
                STUDENT INFORMATION
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Scrollable navigation */}
        <nav className="sidebar-navigation min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5">
          {navigation.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 px-3 text-[9px] font-bold tracking-[1.7px] text-[#B8A4C8]/65">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) =>
                  renderNavigationItem(item)
                )}
              </div>
            </div>
          ))}
        </nav>

        {/* Fixed bottom profile */}
        <div className="shrink-0 border-t border-white/[0.08] bg-[#280A47] p-3">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0B556]/15 text-sm font-bold text-[#F0B556]">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-white">
                PI-NC Administration
              </p>

              <p className="mt-1 text-[9px] text-white/45">
                Management Portal
              </p>
            </div>

            <Settings
              size={15}
              className="shrink-0 text-white/40"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
