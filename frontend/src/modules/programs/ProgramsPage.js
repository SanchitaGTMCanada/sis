
"use client";

import { useMemo, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  Plus,
  Search,
  Filter,
  Layers3,
  X,
} from "lucide-react";

import {
  initialPrograms,
  initialCourses,
} from "./data/programData";

import ProgramsTable from "./components/ProgramsTable";
import CoursesTable from "./components/CoursesTable";
import ProgramFormModal from "./components/ProgramFormModal";

const tabs = ["Programs", "Courses", "Curriculum"];

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-xl border border-[#EAE4D9] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#716B76]">
            {label}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#28212D]">
            {value}
          </h3>

          <p className="mt-2 text-sm text-[#919B89]">
            {description}
          </p>
        </div>

        <div className="rounded-xl bg-[#F1EAF7] p-3">
          <Icon size={22} className="text-[#280A47]" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-[#EDF5EF] text-[#527A5B]",
    Inactive: "bg-[#FBECEE] text-[#B02D30]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("Programs");

  const [programs, setPrograms] = useState(initialPrograms);
  const [courses, setCourses] = useState(initialCourses);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const isProgramTab = activeTab === "Programs";
  const isCourseTab = activeTab === "Courses";

  const activePrograms = programs.filter(
    (program) => program.status === "Active"
  ).length;

  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  ).length;

  const totalStudents = programs.reduce(
    (total, program) => total + Number(program.students || 0),
    0
  );

  const totalDepartments = new Set(
    programs.map((program) => program.department)
  ).size;

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = [
        program.name,
        program.code,
        program.department,
        program.credential,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        program.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [programs, search, statusFilter]);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = [
        course.name,
        course.code,
        course.department,
        ...(course.programs || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, search, statusFilter]);

  // Open add modal
  function handleAdd() {
    setEditingItem(null);
    setModalOpen(true);
  }

  // Open edit modal
  function handleEdit(item) {
    setEditingItem(item);
    setModalOpen(true);
  }

  // Save program or course
  function handleSave(formData) {
    if (isProgramTab) {
      if (editingItem) {
        setPrograms((previous) =>
          previous.map((program) =>
            program.id === editingItem.id
              ? { ...program, ...formData }
              : program
          )
        );
      } else {
        setPrograms((previous) => [
          ...previous,
          {
            ...formData,
            id: Date.now(),
            students: 0,
          },
        ]);
      }
    }

    if (isCourseTab) {
      if (editingItem) {
        setCourses((previous) =>
          previous.map((course) =>
            course.id === editingItem.id
              ? { ...course, ...formData }
              : course
          )
        );
      } else {
        setCourses((previous) => [
          ...previous,
          {
            ...formData,
            id: Date.now(),
          },
        ]);
      }
    }

    setModalOpen(false);
    setEditingItem(null);
  }

  // Close form
  function handleCloseModal() {
    setModalOpen(false);
    setEditingItem(null);
  }

  // Reset search and filters
  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
  }

  const currentCount = isProgramTab
    ? filteredPrograms.length
    : filteredCourses.length;

  return (
    <div className="space-y-6 pb-8">

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-[#716B76]">
            <span>Academic Management</span>
            <span>/</span>
            <span className="font-medium text-[#280A47]">
              Programs & Courses
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#28212D] sm:text-3xl">
            Programs & Courses
          </h1>

          <p className="mt-2 text-sm text-[#716B76]">
            Manage academic programs, courses and curriculum structures.
          </p>
        </div>

        {activeTab !== "Curriculum" && (
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#280A47] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
          >
            <Plus size={18} />
            Add {isProgramTab ? "Program" : "Course"}
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={GraduationCap}
          label="Total Programs"
          value={programs.length}
          description={`${activePrograms} active programs`}
        />

        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={courses.length}
          description={`${activeCourses} active courses`}
        />

        <StatCard
          icon={Users}
          label="Enrolled Students"
          value={totalStudents.toLocaleString()}
          description="Across all programs"
        />

        <StatCard
          icon={Building2}
          label="Departments"
          value={totalDepartments}
          description="Academic departments"
        />
      </div>

      {/* Main content */}
      <div className="overflow-hidden rounded-xl border border-[#EAE4D9] bg-white">

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-[#EAE4D9] px-4 pt-3 sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                resetFilters();
              }}
              className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-[#280A47] text-[#280A47]"
                  : "border-transparent text-[#716B76] hover:text-[#280A47]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and filters */}
        {activeTab !== "Curriculum" && (
          <div className="flex flex-col justify-between gap-4 border-b border-[#EAE4D9] p-4 sm:flex-row sm:items-center sm:px-6">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919B89]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="w-full rounded-lg border border-[#EAE4D9] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#280A47]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-[#716B76]">
                <Filter size={17} />
                Status
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="rounded-lg border border-[#EAE4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#280A47]"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {(search || statusFilter !== "All") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-[#B02D30] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results count */}
        {activeTab !== "Curriculum" && (
          <div className="px-6 py-3">
            <p className="text-sm text-[#716B76]">
              Showing{" "}
              <span className="font-semibold text-[#28212D]">
                {currentCount}
              </span>{" "}
              {activeTab.toLowerCase()}
            </p>
          </div>
        )}

        {/* Programs table */}
        {isProgramTab && (
          <ProgramsTable
            programs={filteredPrograms}
            onView={(program) =>
              setSelectedItem({
                ...program,
                type: "Program",
              })
            }
            onEdit={handleEdit}
          />
        )}

        {/* Courses table */}
        {isCourseTab && (
          <CoursesTable
            courses={filteredCourses}
            onView={(course) =>
              setSelectedItem({
                ...course,
                type: "Course",
              })
            }
            onEdit={handleEdit}
          />
        )}

        {/* Curriculum */}
        {activeTab === "Curriculum" && (
          <div className="space-y-5 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#28212D]">
                Program Curriculum
              </h2>

              <p className="mt-1 text-sm text-[#716B76]">
                View courses assigned to each academic program.
              </p>
            </div>

            {programs.map((program) => {
              const assignedCourses = courses.filter((course) =>
                course.programs?.includes(program.name)
              );

              const semesterGroups = assignedCourses.reduce(
                (groups, course) => {
                  const semester = course.semester || "Unassigned";

                  if (!groups[semester]) {
                    groups[semester] = [];
                  }

                  groups[semester].push(course);

                  return groups;
                },
                {}
              );

              return (
                <div
                  key={program.id}
                  className="overflow-hidden rounded-xl border border-[#EAE4D9]"
                >
                  <div className="flex flex-col justify-between gap-3 bg-[#F8F7F4] p-5 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#919B89]">
                        {program.code}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-[#280A47]">
                        {program.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#716B76]">
                        {program.department} · {program.duration} ·{" "}
                        {program.totalCredits} credits
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#716B76]">
                        {assignedCourses.length} courses
                      </span>

                      <StatusBadge status={program.status} />
                    </div>
                  </div>

                  <div className="space-y-5 p-5">
                    {Object.keys(semesterGroups).length > 0 ? (
                      Object.entries(semesterGroups).map(
                        ([semester, semesterCourses]) => (
                          <div key={semester}>
                            <div className="mb-3 flex items-center gap-2">
                              <Layers3
                                size={17}
                                className="text-[#280A47]"
                              />

                              <h4 className="text-sm font-bold text-[#28212D]">
                                {semester}
                              </h4>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {semesterCourses.map((course) => (
                                <div
                                  key={course.id}
                                  className="rounded-lg border border-[#EAE4D9] p-4"
                                >
                                  <p className="text-xs font-semibold text-[#919B89]">
                                    {course.code}
                                  </p>

                                  <p className="mt-1 text-sm font-semibold text-[#28212D]">
                                    {course.name}
                                  </p>

                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-[#716B76]">
                                      {course.department}
                                    </span>

                                    <span className="rounded-md bg-[#F1EAF7] px-2 py-1 text-xs font-semibold text-[#68428A]">
                                      {course.credits} Credits
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="rounded-lg border border-dashed border-[#EAE4D9] px-5 py-10 text-center">
                        <BookOpen
                          size={28}
                          className="mx-auto text-[#C9C1CE]"
                        />

                        <p className="mt-3 text-sm font-semibold text-[#28212D]">
                          No courses assigned
                        </p>

                        <p className="mt-1 text-sm text-[#919B89]">
                          Courses assigned to this program will appear here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      <ProgramFormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingItem={editingItem}
        type={isProgramTab ? "program" : "course"}
        programs={programs}
      />

      {/* Details modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedItem(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#EAE4D9] px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#919B89]">
                  {selectedItem.type} Details
                </p>

                <h2
                  id="details-title"
                  className="mt-1 text-xl font-bold text-[#280A47]"
                >
                  {selectedItem.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-2 text-[#716B76] hover:bg-[#F8F7F4]"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              {Object.entries(selectedItem)
                .filter(
                  ([key]) => key !== "id" && key !== "type"
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg bg-[#F8F7F4] p-4"
                  >
                    <p className="text-xs font-semibold capitalize text-[#919B89]">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold text-[#28212D]">
                      {Array.isArray(value)
                        ? value.join(", ") || "None"
                        : String(value)}
                    </p>
                  </div>
                ))}
            </div>

            <div className="flex justify-end border-t border-[#EAE4D9] p-5">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
