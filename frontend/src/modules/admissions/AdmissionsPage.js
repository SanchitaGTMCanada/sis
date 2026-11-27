
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
  Check,
  RotateCcw,
  History,
  Pencil,
  Save,
  FileText,
  FileCheck,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

// --------------------------------------------------
// APPLICATION DATA
// --------------------------------------------------

const initialApplications = [
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

// --------------------------------------------------
// MOCK DOCUMENT DATA
// --------------------------------------------------

const initialDocuments = [
  {
    id: 1,
    applicationId: "APP-2026-001",
    name: "Academic Transcript.pdf",
    type: "Academic Transcript",
    uploadedAt: "20 Nov 2026",
    status: "Pending",
    rejectionReason: "",
  },
  {
    id: 2,
    applicationId: "APP-2026-001",
    name: "Identity Document.pdf",
    type: "Identity Proof",
    uploadedAt: "20 Nov 2026",
    status: "Verified",
    rejectionReason: "",
  },
  {
    id: 3,
    applicationId: "APP-2026-002",
    name: "Academic Certificate.pdf",
    type: "Academic Certificate",
    uploadedAt: "19 Nov 2026",
    status: "Pending",
    rejectionReason: "",
  },
  {
    id: 4,
    applicationId: "APP-2026-002",
    name: "Passport.pdf",
    type: "Identity Proof",
    uploadedAt: "19 Nov 2026",
    status: "Rejected",
    rejectionReason: "The uploaded document is unclear.",
  },
  {
    id: 5,
    applicationId: "APP-2026-003",
    name: "Diploma Certificate.pdf",
    type: "Academic Certificate",
    uploadedAt: "18 Nov 2026",
    status: "Verified",
    rejectionReason: "",
  },
  {
    id: 6,
    applicationId: "APP-2026-004",
    name: "Academic Transcript.pdf",
    type: "Academic Transcript",
    uploadedAt: "17 Nov 2026",
    status: "Pending",
    rejectionReason: "",
  },
];

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const statusStyles = {
  Submitted: "bg-[#F1EAF7] text-[#68428A]",
  "Under Review": "bg-[#FBF2DF] text-[#A87925]",
  Approved: "bg-[#EDF5EF] text-[#527A5B]",
  Rejected: "bg-[#FBECEE] text-[#B02D30]",
};

const documentStatusStyles = {
  Pending: "bg-[#FBF2DF] text-[#A87925]",
  Verified: "bg-[#EDF5EF] text-[#527A5B]",
  Rejected: "bg-[#FBECEE] text-[#B02D30]",
};

const iconStyles = {
  purple: "bg-[#F1EAF7] text-[#280A47]",
  gold: "bg-[#FBF2DF] text-[#A87925]",
  sage: "bg-[#EDF1EA] text-[#687C5F]",
  red: "bg-[#FBECEE] text-[#B02D30]",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#EAE4D9] bg-white px-4 py-3 text-sm text-[#342C38] outline-none transition focus:border-[#280A47] focus:ring-2 focus:ring-[#280A47]/10";

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function AdmissionsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [documents, setDocuments] = useState(initialDocuments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewHistory, setReviewHistory] = useState([]);

  // Applicant editing
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    program: "",
  });
  const [editError, setEditError] = useState("");

  // Document rejection
  const [rejectingDocumentId, setRejectingDocumentId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [documentError, setDocumentError] = useState("");

  // --------------------------------------------------
  // MODAL FUNCTIONS
  // --------------------------------------------------

  const openApplication = (application) => {
    setSelectedApplication(application);
    setIsEditing(false);
    setEditError("");
    setRejectingDocumentId(null);
    setRejectionReason("");
    setDocumentError("");
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsEditing(false);
    setEditError("");
    setRejectingDocumentId(null);
    setRejectionReason("");
    setDocumentError("");
  };

  // --------------------------------------------------
  // APPLICANT EDITING
  // --------------------------------------------------

  const startEditing = () => {
    if (!selectedApplication) return;

    setEditForm({
      name: selectedApplication.name,
      email: selectedApplication.email,
      program: selectedApplication.program,
    });

    setEditError("");
    setIsEditing(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setEditError("");
  };

  const saveApplicantDetails = (event) => {
    event.preventDefault();

    if (!selectedApplication) return;

    const name = editForm.name.trim();
    const email = editForm.email.trim();
    const program = editForm.program.trim();

    if (!name || !email || !program) {
      setEditError("Please fill in all applicant information fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setEditError("Please enter a valid email address.");
      return;
    }

    const updatedApplication = {
      ...selectedApplication,
      name,
      email,
      program,
    };

    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === selectedApplication.id
          ? updatedApplication
          : application
      )
    );

    setSelectedApplication(updatedApplication);
    setIsEditing(false);
    setEditError("");
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditError("");
  };

  // --------------------------------------------------
  // APPLICATION STATUS REVIEW
  // --------------------------------------------------

  const updateApplicationStatus = (applicationId, newStatus) => {
    const currentApplication = applications.find(
      (application) => application.id === applicationId
    );

    if (!currentApplication) return;
    if (currentApplication.status === newStatus) return;

    const historyEntry = {
      id: `${applicationId}-${Date.now()}`,
      applicationId,
      previousStatus: currentApplication.status,
      newStatus,
      changedBy: "Admissions Staff",
      changedAt: new Date().toISOString(),
    };

    const updatedApplication = {
      ...currentApplication,
      status: newStatus,
    };

    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === applicationId
          ? updatedApplication
          : application
      )
    );

    setReviewHistory((previousHistory) => [
      historyEntry,
      ...previousHistory,
    ]);

    setSelectedApplication((previousApplication) =>
      previousApplication?.id === applicationId
        ? { ...previousApplication, status: newStatus }
        : previousApplication
    );
  };

  // --------------------------------------------------
  // DOCUMENT MANAGEMENT
  // --------------------------------------------------

  const selectedApplicationDocuments = useMemo(() => {
    if (!selectedApplication) return [];

    return documents.filter(
      (document) =>
        document.applicationId === selectedApplication.id
    );
  }, [documents, selectedApplication]);

  const verifyDocument = (documentId) => {
    setDocuments((previousDocuments) =>
      previousDocuments.map((document) =>
        document.id === documentId
          ? {
              ...document,
              status: "Verified",
              rejectionReason: "",
            }
          : document
      )
    );

    setRejectingDocumentId(null);
    setRejectionReason("");
    setDocumentError("");
  };

  const startRejectingDocument = (documentId) => {
    setRejectingDocumentId(documentId);
    setRejectionReason("");
    setDocumentError("");
  };

  const cancelRejectingDocument = () => {
    setRejectingDocumentId(null);
    setRejectionReason("");
    setDocumentError("");
  };

  const rejectDocument = (documentId) => {
    const reason = rejectionReason.trim();

    if (!reason) {
      setDocumentError("Please provide a reason for rejecting this document.");
      return;
    }

    setDocuments((previousDocuments) =>
      previousDocuments.map((document) =>
        document.id === documentId
          ? {
              ...document,
              status: "Rejected",
              rejectionReason: reason,
            }
          : document
      )
    );

    setRejectingDocumentId(null);
    setRejectionReason("");
    setDocumentError("");
  };

  // --------------------------------------------------
  // DYNAMIC STATISTICS
  // --------------------------------------------------

  const statistics = useMemo(
    () => [
      {
        title: "Total Applications",
        value: applications.length,
        icon: ClipboardList,
        color: "purple",
      },
      {
        title: "Under Review",
        value: applications.filter(
          (application) => application.status === "Under Review"
        ).length,
        icon: Clock3,
        color: "gold",
      },
      {
        title: "Approved",
        value: applications.filter(
          (application) => application.status === "Approved"
        ).length,
        icon: CheckCircle2,
        color: "sage",
      },
      {
        title: "Rejected",
        value: applications.filter(
          (application) => application.status === "Rejected"
        ).length,
        icon: XCircle,
        color: "red",
      },
    ],
    [applications]
  );

  // --------------------------------------------------
  // SEARCH AND FILTER
  // --------------------------------------------------

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
  }, [applications, search, statusFilter]);

  // --------------------------------------------------
  // REVIEW HISTORY
  // --------------------------------------------------

  const selectedApplicationHistory = useMemo(() => {
    if (!selectedApplication) return [];

    return reviewHistory.filter(
      (entry) => entry.applicationId === selectedApplication.id
    );
  }, [reviewHistory, selectedApplication]);

  // --------------------------------------------------
  // DOCUMENT COUNTS
  // --------------------------------------------------

  const documentCounts = useMemo(
    () => ({
      total: selectedApplicationDocuments.length,
      pending: selectedApplicationDocuments.filter(
        (document) => document.status === "Pending"
      ).length,
      verified: selectedApplicationDocuments.filter(
        (document) => document.status === "Verified"
      ).length,
      rejected: selectedApplicationDocuments.filter(
        (document) => document.status === "Rejected"
      ).length,
    }),
    [selectedApplicationDocuments]
  );

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <DashboardLayout>
      <div className="space-y-7">

        {/* PAGE HEADING */}
        <section>
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
        </section>

        {/* STATISTICS */}
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

        {/* APPLICATIONS TABLE */}
        <section className="overflow-hidden rounded-2xl border border-[#EAE4D9] bg-white shadow-[0_3px_15px_rgba(40,10,71,0.025)]">

          {/* TABLE HEADER */}
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

          {/* TABLE */}
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
                        onClick={() => openApplication(application)}
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

      {/* ==================================================
          APPLICATION DETAILS MODAL
      ================================================== */}

      {selectedApplication && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#F0ECE5] bg-white px-6 py-5">
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

              <div className="flex items-center gap-2">
                {!isEditing && (
                  <button
                    type="button"
                    onClick={startEditing}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E3D8EC] bg-[#F8F5FA] px-4 py-2.5 text-sm font-bold text-[#280A47] transition hover:bg-[#F1EAF7]"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close application details"
                  className="rounded-lg p-2 text-[#89818E] transition hover:bg-[#F1EAF7] hover:text-[#280A47]"
                >
                  <X size={21} />
                </button>
              </div>
            </div>

            <div className="space-y-7 p-6">

              {/* APPLICANT PROFILE */}
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

              {/* APPLICANT INFORMATION */}
              <form onSubmit={saveApplicantDetails} className="space-y-5">
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

                  {/* NAME */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="applicant-name"
                      className="text-xs font-bold uppercase tracking-wider text-[#89818E]"
                    >
                      Applicant Name
                    </label>

                    {isEditing ? (
                      <input
                        id="applicant-name"
                        name="name"
                        type="text"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className={inputClass}
                        placeholder="Enter applicant name"
                        required
                      />
                    ) : (
                      <p className="mt-2 text-sm font-semibold text-[#342C38]">
                        {selectedApplication.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="applicant-email"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89818E]"
                    >
                      <Mail size={14} />
                      Email Address
                    </label>

                    {isEditing ? (
                      <input
                        id="applicant-email"
                        name="email"
                        type="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className={inputClass}
                        placeholder="Enter email address"
                        required
                      />
                    ) : (
                      <a
                        href={`mailto:${selectedApplication.email}`}
                        className="mt-2 block break-all text-sm font-semibold text-[#280A47] hover:underline"
                      >
                        {selectedApplication.email}
                      </a>
                    )}
                  </div>

                  {/* PROGRAM */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="applicant-program"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89818E]"
                    >
                      <GraduationCap size={15} />
                      Applied Program
                    </label>

                    {isEditing ? (
                      <select
                        id="applicant-program"
                        name="program"
                        value={editForm.program}
                        onChange={handleEditChange}
                        className={inputClass}
                        required
                      >
                        <option value="">Select a program</option>
                        <option value="Business Administration">
                          Business Administration
                        </option>
                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Construction Management">
                          Construction Management
                        </option>
                        <option value="Healthcare Administration">
                          Healthcare Administration
                        </option>
                      </select>
                    ) : (
                      <p className="mt-2 text-sm font-semibold text-[#342C38]">
                        {selectedApplication.program}
                      </p>
                    )}
                  </div>

                  {/* STATUS */}
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

                {/* EDIT ACTIONS */}
                {isEditing && (
                  <div className="rounded-xl border border-[#E3D8EC] bg-[#FAF8FC] p-4">
                    {editError && (
                      <p className="mb-3 rounded-lg bg-[#FBECEE] px-3 py-2 text-sm font-medium text-[#B02D30]">
                        {editError}
                      </p>
                    )}

                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#EAE4D9] bg-white px-5 py-3 text-sm font-bold text-[#716B76] transition hover:bg-[#F8F7F4]"
                      >
                        <X size={16} />
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#280A47] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3B1760]"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {/* ==================================================
                  APPLICATION DOCUMENTS
              ================================================== */}

              <section className="space-y-5 border-t border-[#F0ECE5] pt-6">

                {/* DOCUMENT HEADING */}
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#F1EAF7] p-3 text-[#280A47]">
                      <FileText size={21} />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#28212D]">
                        Application Documents
                      </h3>
                      <p className="mt-1 text-xs text-[#89818E]">
                        Review and verify submitted documents.
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-[#716B76]">
                    {documentCounts.total} Documents
                  </span>
                </div>

                {/* DOCUMENT STATISTICS */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#EAE4D9] bg-[#FCFBF9] p-3">
                    <p className="text-xs font-medium text-[#89818E]">
                      Pending
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#A87925]">
                      {documentCounts.pending}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAE4D9] bg-[#FCFBF9] p-3">
                    <p className="text-xs font-medium text-[#89818E]">
                      Verified
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#527A5B]">
                      {documentCounts.verified}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAE4D9] bg-[#FCFBF9] p-3">
                    <p className="text-xs font-medium text-[#89818E]">
                      Rejected
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#B02D30]">
                      {documentCounts.rejected}
                    </p>
                  </div>
                </div>

                {/* DOCUMENT LIST */}
                {selectedApplicationDocuments.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#EAE4D9] px-4 py-9 text-center">
                    <FileText
                      size={30}
                      className="mx-auto mb-3 text-[#A79EAA]"
                    />
                    <p className="text-sm font-semibold text-[#716B76]">
                      No documents uploaded
                    </p>
                    <p className="mt-1 text-xs text-[#A79EAA]">
                      Documents submitted by the applicant will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedApplicationDocuments.map((document) => (
                      <div
                        key={document.id}
                        className="rounded-xl border border-[#EAE4D9] bg-white p-4"
                      >
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                          {/* DOCUMENT INFORMATION */}
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="rounded-xl bg-[#F8F5FA] p-3 text-[#68428A]">
                              <FileText size={21} />
                            </div>

                            <div className="min-w-0">
                              <p className="break-all text-sm font-bold text-[#342C38]">
                                {document.name}
                              </p>

                              <p className="mt-1 text-xs text-[#89818E]">
                                {document.type}
                              </p>

                              <p className="mt-2 flex items-center gap-1 text-xs text-[#A79EAA]">
                                <CalendarDays size={13} />
                                Uploaded: {document.uploadedAt}
                              </p>
                            </div>
                          </div>

                          {/* DOCUMENT STATUS */}
                          <span
                            className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold ${documentStatusStyles[document.status]}`}
                          >
                            {document.status === "Verified" && (
                              <CheckCircle2 size={13} />
                            )}

                            {document.status === "Pending" && (
                              <Clock3 size={13} />
                            )}

                            {document.status === "Rejected" && (
                              <XCircle size={13} />
                            )}

                            {document.status}
                          </span>
                        </div>

                        {/* REJECTION REASON */}
                        {document.status === "Rejected" &&
                          document.rejectionReason && (
                            <div className="mt-4 flex gap-2 rounded-lg bg-[#FBECEE] p-3 text-sm text-[#B02D30]">
                              <AlertCircle
                                size={17}
                                className="mt-0.5 shrink-0"
                              />

                              <div>
                                <p className="font-bold">
                                  Rejection Reason
                                </p>
                                <p className="mt-1 text-xs">
                                  {document.rejectionReason}
                                </p>
                              </div>
                            </div>
                          )}

                        {/* DOCUMENT REJECTION FORM */}
                        {rejectingDocumentId === document.id ? (
                          <div className="mt-4 rounded-xl border border-[#F0D4D7] bg-[#FFFAFA] p-4">
                            <label
                              htmlFor={`rejection-reason-${document.id}`}
                              className="text-sm font-bold text-[#342C38]"
                            >
                              Reason for rejection
                            </label>

                            <textarea
                              id={`rejection-reason-${document.id}`}
                              value={rejectionReason}
                              onChange={(event) => {
                                setRejectionReason(event.target.value);
                                setDocumentError("");
                              }}
                              rows={3}
                              placeholder="Explain why this document is being rejected..."
                              className="mt-2 w-full resize-y rounded-xl border border-[#EAE4D9] bg-white px-4 py-3 text-sm text-[#342C38] outline-none focus:border-[#B02D30] focus:ring-2 focus:ring-[#B02D30]/10"
                            />

                            {documentError && (
                              <p className="mt-2 text-xs font-semibold text-[#B02D30]">
                                {documentError}
                              </p>
                            )}

                            <div className="mt-3 flex flex-col-reverse justify-end gap-2 sm:flex-row">
                              <button
                                type="button"
                                onClick={cancelRejectingDocument}
                                className="rounded-lg border border-[#EAE4D9] bg-white px-4 py-2.5 text-sm font-semibold text-[#716B76] hover:bg-[#F8F7F4]"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                onClick={() => rejectDocument(document.id)}
                                className="rounded-lg bg-[#B02D30] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#942326]"
                              >
                                Confirm Rejection
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* DOCUMENT ACTIONS */
                          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#F0ECE5] pt-4">
                            {document.status !== "Verified" && (
                              <button
                                type="button"
                                onClick={() => verifyDocument(document.id)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#EDF5EF] px-3 py-2 text-xs font-bold text-[#527A5B] transition hover:bg-[#DFEEE2]"
                              >
                                <FileCheck size={15} />
                                Verify Document
                              </button>
                            )}

                            {document.status !== "Rejected" && (
                              <button
                                type="button"
                                onClick={() =>
                                  startRejectingDocument(document.id)
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-[#FBECEE] px-3 py-2 text-xs font-bold text-[#B02D30] transition hover:bg-[#F6DDE0]"
                              >
                                <XCircle size={15} />
                                Reject Document
                              </button>
                            )}

                            {document.status === "Verified" && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#527A5B]">
                                <ShieldCheck size={15} />
                                Document verified
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs leading-relaxed text-[#A79EAA]">
                  Document verification changes are currently stored in
                  frontend state. Actual file viewing and secure document
                  storage will be connected through the backend.
                </p>
              </section>

              {/* ==================================================
                  REVIEW DECISION
              ================================================== */}

              <section className="rounded-xl border border-[#EAE4D9] p-5">
                <h3 className="text-base font-bold text-[#28212D]">
                  Review Decision
                </h3>

                <p className="mt-1 text-sm text-[#89818E]">
                  Select an action to update this application's status.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    disabled={selectedApplication.status === "Under Review"}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Under Review"
                      )
                    }
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E8D8B5] bg-[#FBF2DF] px-3 py-3 text-sm font-bold text-[#A87925] transition hover:bg-[#F6E8C9] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RotateCcw size={17} />
                    Mark Under Review
                  </button>

                  <button
                    type="button"
                    disabled={selectedApplication.status === "Approved"}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Approved"
                      )
                    }
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#D5E5D8] bg-[#EDF5EF] px-3 py-3 text-sm font-bold text-[#527A5B] transition hover:bg-[#DFEEE2] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Check size={17} />
                    Approve
                  </button>

                  <button
                    type="button"
                    disabled={selectedApplication.status === "Rejected"}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Rejected"
                      )
                    }
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#F0D4D7] bg-[#FBECEE] px-3 py-3 text-sm font-bold text-[#B02D30] transition hover:bg-[#F6DDE0] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <XCircle size={17} />
                    Reject
                  </button>
                </div>
              </section>

              {/* ==================================================
                  REVIEW HISTORY
              ================================================== */}

              <section className="border-t border-[#F0ECE5] pt-5">
                <div className="mb-4 flex items-center gap-2">
                  <History size={19} className="text-[#68428A]" />

                  <div>
                    <h3 className="text-base font-bold text-[#28212D]">
                      Review History
                    </h3>

                    <p className="mt-1 text-xs text-[#89818E]">
                      Track all status changes for this application.
                    </p>
                  </div>
                </div>

                {selectedApplicationHistory.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#EAE4D9] px-4 py-7 text-center">
                    <Clock3
                      size={24}
                      className="mx-auto mb-2 text-[#A79EAA]"
                    />

                    <p className="text-sm font-semibold text-[#716B76]">
                      No review history yet
                    </p>

                    <p className="mt-1 text-xs text-[#A79EAA]">
                      Status changes will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedApplicationHistory.map((entry) => (
                      <div
                        key={entry.id}
                        className="relative border-l-2 border-[#E5D9ED] pb-3 pl-5"
                      >
                        <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#68428A]" />

                        <p className="text-sm font-bold text-[#28212D]">
                          {entry.previousStatus} → {entry.newStatus}
                        </p>

                        <p className="mt-1 text-xs text-[#716B76]">
                          Changed by {entry.changedBy}
                        </p>

                        <p className="mt-1 text-xs text-[#A79EAA]">
                          {new Date(entry.changedAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* MODAL FOOTER */}
            <div className="sticky bottom-0 flex justify-end border-t border-[#F0ECE5] bg-[#FCFBF9] px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl bg-[#280A47] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B1760]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
