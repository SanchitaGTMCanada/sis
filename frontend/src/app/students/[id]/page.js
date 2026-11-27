

"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import {

  ArrowLeft,

  UserRound,

  Mail,

  Phone,

  MapPin,

  GraduationCap,

  CalendarDays,

  BookOpen,

  ShieldCheck,

  FileText,

  Clock,

  Pencil,

  Users,

  BriefcaseBusiness,

  X,

  Save,

  CheckCircle2,

  Upload,

  Download,

  Eye,

  Trash2,

  FileImage,

  File,

  FolderOpen,

  AlertCircle,

} from "lucide-react";


/* --------------------------------------------------

   STUDENT MOCK DATA

-------------------------------------------------- */

const students = [

  {

    id: "PINC-2026-001",

    name: "John Anderson",

    email: "john.anderson@example.com",

    phone: "+1 867 555 0101",

    status: "Active",

    program: "Business Administration",

    year: "Year 1",

    academicYear: "2026–2027",

    dateOfBirth: "2005-03-15",

    gender: "Male",

    nationality: "Canadian",

    address: "Yellowknife, Northwest Territories, Canada",

    enrollmentDate: "05 September 2026",

    studentType: "Full-time",

    campus: "Northern Campus",

    emergencyName: "Robert Anderson",

    emergencyRelation: "Father",

    emergencyPhone: "+1 867 555 0102",

    previousEducation: "Northern High School",

    previousQualification: "High School Diploma",

  },

  {

    id: "PINC-2026-002",

    name: "Sarah Mitchell",

    email: "sarah.mitchell@example.com",

    phone: "+1 867 555 0103",

    status: "Active",

    program: "Information Technology",

    year: "Year 2",

    academicYear: "2026–2027",

    dateOfBirth: "2004-07-22",

    gender: "Female",

    nationality: "Canadian",

    address: "Yellowknife, Northwest Territories, Canada",

    enrollmentDate: "04 September 2025",

    studentType: "Full-time",

    campus: "Northern Campus",

    emergencyName: "James Mitchell",

    emergencyRelation: "Father",

    emergencyPhone: "+1 867 555 0104",

    previousEducation: "Yellowknife Secondary School",

    previousQualification: "High School Diploma",

  },

  {

    id: "PINC-2026-003",

    name: "Michael Brown",

    email: "michael.brown@example.com",

    phone: "+1 867 555 0105",

    status: "Pending",

    program: "Construction Management",

    year: "Year 1",

    academicYear: "2026–2027",

    dateOfBirth: "2005-01-10",

    gender: "Male",

    nationality: "Canadian",

    address: "Inuvik, Northwest Territories, Canada",

    enrollmentDate: "Pending",

    studentType: "Full-time",

    campus: "Northern Campus",

    emergencyName: "Linda Brown",

    emergencyRelation: "Mother",

    emergencyPhone: "+1 867 555 0106",

    previousEducation: "Inuvik Regional School",

    previousQualification: "High School Diploma",

  },

  {

    id: "PINC-2026-004",

    name: "Emily Wilson",

    email: "emily.wilson@example.com",

    phone: "+1 867 555 0107",

    status: "Active",

    program: "Business Administration",

    year: "Year 3",

    academicYear: "2026–2027",

    dateOfBirth: "2003-11-18",

    gender: "Female",

    nationality: "Canadian",

    address: "Hay River, Northwest Territories, Canada",

    enrollmentDate: "06 September 2024",

    studentType: "Full-time",

    campus: "Northern Campus",

    emergencyName: "David Wilson",

    emergencyRelation: "Father",

    emergencyPhone: "+1 867 555 0108",

    previousEducation: "Hay River Secondary School",

    previousQualification: "High School Diploma",

  },

  {

    id: "PINC-2026-005",

    name: "David Thompson",

    email: "david.thompson@example.com",

    phone: "+1 867 555 0109",

    status: "Inactive",

    program: "Information Technology",

    year: "Year 2",

    academicYear: "2026–2027",

    dateOfBirth: "2004-04-08",

    gender: "Male",

    nationality: "Canadian",

    address: "Fort Smith, Northwest Territories, Canada",

    enrollmentDate: "05 September 2025",

    studentType: "Full-time",

    campus: "Northern Campus",

    emergencyName: "Mary Thompson",

    emergencyRelation: "Mother",

    emergencyPhone: "+1 867 555 0110",

    previousEducation: "Fort Smith Secondary School",

    previousQualification: "High School Diploma",

  },

  {

    id: "PINC-2026-006",

    name: "Olivia Martin",

    email: "olivia.martin@example.com",

    phone: "+1 867 555 0111",

    status: "Active",

    program: "Healthcare Administration",

    year: "Year 1",

    academicYear: "2026–2027",

    dateOfBirth: "2005-08-29",

    gender: "Female",

    nationality: "Canadian",

    address: "Yellowknife, Northwest Territories, Canada",

    enrollmentDate: "05 September 2026",

    studentType: "Full-time",

    campus: "Northern Campus",

    emergencyName: "Peter Martin",

    emergencyRelation: "Father",

    emergencyPhone: "+1 867 555 0112",

    previousEducation: "Northern High School",

    previousQualification: "High School Diploma",

  },

];

const statusStyles = {

  Active: "bg-emerald-50 text-emerald-700",

  Pending: "bg-amber-50 text-amber-700",

  Inactive: "bg-gray-100 text-gray-600",

};

const programs = [

  "Business Administration",

  "Information Technology",

  "Construction Management",

  "Healthcare Administration",

];

const documentCategories = [

  "Identification",

  "Academic",

  "Admission",

  "Financial",

  "Other",

];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];

const inputClass =

  "mt-2 w-full rounded-lg border border-[#E7E1D9] bg-white px-3 py-2.5 text-sm text-[#39313F] outline-none transition placeholder:text-[#B0A9B4] focus:border-[#280A47] focus:ring-2 focus:ring-[#280A47]/10";

const labelClass =

  "text-xs font-semibold uppercase tracking-[0.8px] text-[#89818E]";

/* --------------------------------------------------

   REUSABLE COMPONENTS

-------------------------------------------------- */

function SectionCard({ title, icon: Icon, children }) {

  return (

    <section className="overflow-hidden rounded-2xl border border-[#EAE4D9] bg-white shadow-[0_3px_15px_rgba(40,10,71,0.025)]">

      <div className="flex items-center gap-3 border-b border-[#F0ECE5] px-5 py-4 sm:px-6">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#280A47]/[0.06] text-[#280A47]">

          <Icon size={17} />

        </div>

        <h2 className="text-base font-bold text-[#28212D]">

          {title}

        </h2>

      </div>

      <div className="p-5 sm:p-6">{children}</div>

    </section>

  );

}

function InfoItem({ label, value, icon: Icon }) {

  return (

    <div className="min-w-0">

      <p className="mb-2 text-xs font-semibold uppercase tracking-[1px] text-[#98909C]">

        {label}

      </p>

      <div className="flex items-start gap-2">

        {Icon && (

          <Icon

            size={15}

            className="mt-0.5 shrink-0 text-[#919B89]"

          />

        )}

        <p className="break-words text-sm font-medium leading-5 text-[#39313F]">

          {value || "Not provided"}

        </p>

      </div>

    </div>

  );

}

function FormField({

  label,

  name,

  value,

  onChange,

  type = "text",

  required = false,

  placeholder = "",

  children,

}) {

  return (

    <div>

      <label htmlFor={name} className={labelClass}>

        {label}

        {required && <span className="ml-1 text-[#B02D30]">*</span>}

      </label>

      {children ? (

        <select

          id={name}

          name={name}

          value={value || ""}

          onChange={onChange}

          required={required}

          className={inputClass}

        >

          {children}

        </select>

      ) : (

        <input

          id={name}

          name={name}

          type={type}

          value={value || ""}

          onChange={onChange}

          required={required}

          placeholder={placeholder}

          className={inputClass}

        />

      )}

    </div>

  );

}

function formatFileSize(bytes) {

  if (bytes < 1024) {

    return `${bytes} B`;

  }

  if (bytes < 1024 * 1024) {

    return `${(bytes / 1024).toFixed(1)} KB`;

  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

}

function getFileExtension(fileName) {

  return fileName.split(".").pop()?.toLowerCase() || "";

}

function getFileIcon(file) {

  return getFileExtension(file.name) === "pdf"

    ? FileText

    : FileImage;

}

/* --------------------------------------------------

   EDIT PROFILE MODAL

-------------------------------------------------- */

function EditProfileModal({ student, onClose, onSave }) {

  const [formData, setFormData] = useState({ ...student });

  const [error, setError] = useState("");

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

    setError("");

  };

  const handleSubmit = (event) => {

    event.preventDefault();

    if (

      !formData.name.trim() ||

      !formData.email.trim() ||

      !formData.phone.trim()

    ) {

      setError("Please complete all required fields.");

      return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {

      setError("Please enter a valid email address.");

      return;

    }

    onSave(formData);

  };

  return (

    <div

      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"

      onMouseDown={(event) => {

        if (event.target === event.currentTarget) {

          onClose();

        }

      }}

    >

      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex shrink-0 items-center justify-between border-b border-[#F0ECE5] px-5 py-4 sm:px-6">

          <div>

            <h2 className="text-base font-bold text-[#28212D]">

              Edit Student Profile

            </h2>

            <p className="mt-1 text-sm text-[#89818E]">

              Update student information and academic details.

            </p>

          </div>

          <button

            type="button"

            onClick={onClose}

            className="rounded-lg p-2 text-[#89818E] transition hover:bg-[#F5F2ED] hover:text-[#280A47]"

            aria-label="Close edit form"

          >

            <X size={19} />

          </button>

        </div>

        <form

          onSubmit={handleSubmit}

          className="min-h-0 flex-1 overflow-y-auto"

        >

          <div className="space-y-7 p-5 sm:p-6">

            {/* Personal Information */}

            <div>

              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#280A47]">

                <UserRound size={16} />

                Personal Information

              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <FormField

                  label="Full Name"

                  name="name"

                  value={formData.name}

                  onChange={handleChange}

                  required

                  placeholder="Enter full name"

                />

                <FormField

                  label="Date of Birth"

                  name="dateOfBirth"

                  type="date"

                  value={formData.dateOfBirth}

                  onChange={handleChange}

                />

                <FormField

                  label="Gender"

                  name="gender"

                  value={formData.gender}

                  onChange={handleChange}

                >

                  <option value="">Select gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>

                  <option value="Prefer not to say">

                    Prefer not to say

                  </option>

                </FormField>

                <FormField

                  label="Nationality"

                  name="nationality"

                  value={formData.nationality}

                  onChange={handleChange}

                  placeholder="Enter nationality"

                />

              </div>

            </div>

            {/* Contact Information */}

            <div>

              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#280A47]">

                <Mail size={16} />

                Contact Information

              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <FormField

                  label="Email Address"

                  name="email"

                  type="email"

                  value={formData.email}

                  onChange={handleChange}

                  required

                  placeholder="Enter email address"

                />

                <FormField

                  label="Phone Number"

                  name="phone"

                  type="tel"

                  value={formData.phone}

                  onChange={handleChange}

                  required

                  placeholder="Enter phone number"

                />

                <div className="sm:col-span-2">

                  <FormField

                    label="Residential Address"

                    name="address"

                    value={formData.address}

                    onChange={handleChange}

                    placeholder="Enter residential address"

                  />

                </div>

              </div>

            </div>

            {/* Academic Information */}

            <div>

              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#280A47]">

                <GraduationCap size={16} />

                Academic Information

              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <FormField

                  label="Program"

                  name="program"

                  value={formData.program}

                  onChange={handleChange}

                >

                  <option value="">Select program</option>

                  {programs.map((program) => (

                    <option key={program} value={program}>

                      {program}

                    </option>

                  ))}

                </FormField>

                <FormField

                  label="Study Level"

                  name="year"

                  value={formData.year}

                  onChange={handleChange}

                >

                  <option value="">Select study level</option>

                  <option value="Year 1">Year 1</option>

                  <option value="Year 2">Year 2</option>

                  <option value="Year 3">Year 3</option>

                  <option value="Year 4">Year 4</option>

                </FormField>

                <FormField

                  label="Academic Year"

                  name="academicYear"

                  value={formData.academicYear}

                  onChange={handleChange}

                  placeholder="2026–2027"

                />

                <FormField

                  label="Student Type"

                  name="studentType"

                  value={formData.studentType}

                  onChange={handleChange}

                >

                  <option value="">Select student type</option>

                  <option value="Full-time">Full-time</option>

                  <option value="Part-time">Part-time</option>

                </FormField>

                <FormField

                  label="Campus"

                  name="campus"

                  value={formData.campus}

                  onChange={handleChange}

                  placeholder="Enter campus"

                />

                <FormField

                  label="Student Status"

                  name="status"

                  value={formData.status}

                  onChange={handleChange}

                >

                  <option value="Active">Active</option>

                  <option value="Pending">Pending</option>

                  <option value="Inactive">Inactive</option>

                </FormField>

              </div>

            </div>

            {/* Emergency Contact */}

            <div>

              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#280A47]">

                <ShieldCheck size={16} />

                Emergency Contact

              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <FormField

                  label="Contact Person"

                  name="emergencyName"

                  value={formData.emergencyName}

                  onChange={handleChange}

                  placeholder="Enter contact person"

                />

                <FormField

                  label="Relationship"

                  name="emergencyRelation"

                  value={formData.emergencyRelation}

                  onChange={handleChange}

                  placeholder="e.g. Father, Mother"

                />

                <FormField

                  label="Emergency Phone"

                  name="emergencyPhone"

                  type="tel"

                  value={formData.emergencyPhone}

                  onChange={handleChange}

                  placeholder="Enter emergency phone"

                />

              </div>

            </div>

            {/* Previous Education */}

            <div>

              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#280A47]">

                <BookOpen size={16} />

                Previous Education

              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <FormField

                  label="Previous Institution"

                  name="previousEducation"

                  value={formData.previousEducation}

                  onChange={handleChange}

                  placeholder="Enter institution"

                />

                <FormField

                  label="Previous Qualification"

                  name="previousQualification"

                  value={formData.previousQualification}

                  onChange={handleChange}

                  placeholder="Enter qualification"

                />

              </div>

            </div>

            {error && (

              <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">

                <X size={15} />

                {error}

              </div>

            )}

          </div>

          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-[#F0ECE5] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

            <button

              type="button"

              onClick={onClose}

              className="rounded-lg border border-[#E7E1D9] px-5 py-2.5 text-sm font-semibold text-[#6F6476] transition hover:bg-[#F8F7F4]"

            >

              Cancel

            </button>

            <button

              type="submit"

              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"

            >

              <Save size={15} />

              Save Changes

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

/* --------------------------------------------------

   DOCUMENT PREVIEW MODAL

-------------------------------------------------- */

function DocumentPreviewModal({ document, onClose }) {

  const isPdf = getFileExtension(document.name) === "pdf";

  return (

    <div

      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"

      onMouseDown={(event) => {

        if (event.target === event.currentTarget) {

          onClose();

        }

      }}

    >

      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between gap-3 border-b border-[#F0ECE5] px-5 py-4">

          <div className="min-w-0">

            <h3 className="truncate text-base font-bold text-[#28212D]">

              {document.name}

            </h3>

            <p className="mt-1 text-xs text-[#89818E]">

              {document.category} · {formatFileSize(document.size)}

            </p>

          </div>

          <div className="flex shrink-0 items-center gap-2">

            <a

              href={document.url}

              download={document.name}

              className="rounded-lg bg-[#280A47] p-2 text-white transition hover:bg-[#3B1760]"

              title="Download document"

            >

              <Download size={16} />

            </a>

            <button

              type="button"

              onClick={onClose}

              className="rounded-lg p-2 text-[#89818E] transition hover:bg-[#F5F2ED]"

              aria-label="Close preview"

            >

              <X size={19} />

            </button>

          </div>

        </div>

        <div className="min-h-[300px] flex-1 overflow-auto bg-[#F5F3F0] p-3 sm:p-5">

          {isPdf ? (

            <iframe

              src={document.url}

              title={document.name}

              className="h-[70vh] w-full rounded-lg border border-[#E7E1D9] bg-white"

            />

          ) : (

            <div className="flex min-h-[60vh] items-center justify-center">

              <img

                src={document.url}

                alt={document.name}

                className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-md"

              />

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

/* --------------------------------------------------

   STUDENT DOCUMENT MANAGER

-------------------------------------------------- */

function StudentDocuments({ studentId }) {

  const [documents, setDocuments] = useState([]);

  const [category, setCategory] = useState("Academic");

  const [selectedFile, setSelectedFile] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [previewDocument, setPreviewDocument] = useState(null);

  const fileInputRef = useRef(null);

  const documentsRef = useRef([]);

  // Keep the latest documents available for cleanup.

  documentsRef.current = documents;

  // Release temporary browser URLs when this component unmounts.

  useEffect(() => {

    return () => {

      documentsRef.current.forEach((document) => {

        URL.revokeObjectURL(document.url);

      });

    };

  }, []);

  const handleFileSelect = (event) => {

    const file = event.target.files?.[0];

    setError("");

    setSuccess("");

    setSelectedFile(null);

    if (!file) return;

    const extension = getFileExtension(file.name);

    if (!allowedExtensions.includes(extension)) {

      setError("Invalid file type. Upload PDF, JPG, JPEG or PNG only.");

      event.target.value = "";

      return;

    }

    if (file.size > MAX_FILE_SIZE) {

      setError("File size must not exceed 10 MB.");

      event.target.value = "";

      return;

    }

    if (file.size === 0) {

      setError("This file is empty. Please select another file.");

      event.target.value = "";

      return;

    }

    setSelectedFile(file);

  };

  const handleUpload = () => {

    setError("");

    setSuccess("");

    if (!selectedFile) {

      setError("Please select a document before uploading.");

      return;

    }

    const duplicate = documents.some(

      (document) =>

        document.name.toLowerCase() === selectedFile.name.toLowerCase()

    );

    if (duplicate) {

      setError("A document with this filename already exists.");

      return;

    }

    const newDocument = {

      id: `${studentId}-${Date.now()}`,

      name: selectedFile.name,

      category,

      size: selectedFile.size,

      type: selectedFile.type,

      uploadedAt: new Date().toISOString(),

      url: URL.createObjectURL(selectedFile),

    };

    setDocuments((previous) => [newDocument, ...previous]);

    setSelectedFile(null);

    setCategory("Academic");

    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

    setSuccess("Document uploaded successfully.");

  };

  const handleDelete = (document) => {

    const confirmed = window.confirm(

      `Are you sure you want to delete "${document.name}"?`

    );

    if (!confirmed) return;

    URL.revokeObjectURL(document.url);

    setDocuments((previous) =>

      previous.filter((item) => item.id !== document.id)

    );

    if (previewDocument?.id === document.id) {

      setPreviewDocument(null);

    }

    setSuccess("Document deleted successfully.");

    setError("");

  };

  const handleDownload = (document) => {

    const anchor = window.document.createElement("a");

    anchor.href = document.url;

    anchor.download = document.name;

    window.document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

  };

  const formatUploadDate = (date) => {

    return new Date(date).toLocaleDateString("en-GB", {

      day: "2-digit",

      month: "short",

      year: "numeric",

    });

  };

  return (

    <>

      <SectionCard title="Student Documents" icon={FileText}>

        <div className="space-y-5">

          {/* Upload Area */}

          <div className="rounded-xl border border-dashed border-[#CFC3D9] bg-[#FEFBF7] p-5 sm:p-6">

            <div className="flex flex-col items-center text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#280A47]/[0.07] text-[#280A47]">

                <Upload size={22} />

              </div>

              <h3 className="text-base font-bold text-[#39313F]">

                Upload Student Document

              </h3>

              <p className="mt-1 text-xs text-[#98909C]">

                PDF, JPG, JPEG and PNG · Maximum 10 MB

              </p>

              <input

                ref={fileInputRef}

                type="file"

                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"

                onChange={handleFileSelect}

                className="hidden"

                id="student-document-upload"

              />

              <label

                htmlFor="student-document-upload"

                className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#280A47] px-4 py-2.5 text-sm font-semibold text-[#280A47] transition hover:bg-[#280A47]/5"

              >

                <FolderOpen size={15} />

                Choose Document

              </label>

            </div>

            {selectedFile && (

              <div className="mt-5 rounded-lg border border-[#EAE4D9] bg-white p-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0EAF6] text-[#280A47]">

                    {getFileExtension(selectedFile.name) === "pdf" ? (

                      <FileText size={17} />

                    ) : (

                      <FileImage size={17} />

                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-[#39313F]">

                      {selectedFile.name}

                    </p>

                    <p className="mt-1 text-xs text-[#98909C]">

                      {formatFileSize(selectedFile.size)}

                    </p>

                  </div>

                  <button

                    type="button"

                    onClick={() => {

                      setSelectedFile(null);

                      setError("");

                      if (fileInputRef.current) {

                        fileInputRef.current.value = "";

                      }

                    }}

                    className="rounded-md p-1.5 text-[#98909C] hover:bg-red-50 hover:text-red-600"

                    aria-label="Remove selected file"

                  >

                    <X size={16} />

                  </button>

                </div>

              </div>

            )}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">

              <div>

                <label htmlFor="document-category" className={labelClass}>

                  Document Category

                </label>

                <select

                  id="document-category"

                  value={category}

                  onChange={(event) => setCategory(event.target.value)}

                  className={inputClass}

                >

                  {documentCategories.map((item) => (

                    <option key={item} value={item}>

                      {item}

                    </option>

                  ))}

                </select>

              </div>

              <div className="flex items-end">

                <button

                  type="button"

                  onClick={handleUpload}

                  disabled={!selectedFile}

                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"

                >

                  <Upload size={15} />

                  Upload Document

                </button>

              </div>

            </div>

          </div>

          {/* Feedback */}

          {error && (

            <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">

              <AlertCircle size={16} className="mt-0.5 shrink-0" />

              {error}

            </div>

          )}

          {success && (

            <div className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />

              {success}

            </div>

          )}

          {/* Document List Header */}

          <div className="flex flex-wrap items-center justify-between gap-2">

            <div>

              <h3 className="text-sm font-bold text-[#39313F]">

                Uploaded Documents

              </h3>

              <p className="mt-1 text-xs text-[#98909C]">

                {documents.length} document

                {documents.length !== 1 ? "s" : ""} uploaded

              </p>

            </div>

          </div>

          {/* Document List */}

          {documents.length === 0 ? (

            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#DDD5E3] bg-[#FEFBF7] px-5 py-9 text-center">

              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#280A47]/[0.07] text-[#280A47]">

                <File size={21} />

              </div>

              <p className="text-sm font-semibold text-[#39313F]">

                No documents uploaded

              </p>

              <p className="mt-1 text-xs text-[#98909C]">

                Select a file above to add the first student document.

              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {documents.map((document) => {

                const DocumentIcon = getFileIcon(document);

                return (

                  <div

                    key={document.id}

                    className="flex flex-col gap-3 rounded-xl border border-[#EAE4D9] bg-white p-3 transition hover:border-[#D4C7DF] sm:flex-row sm:items-center sm:p-4"

                  >

                    <div className="flex min-w-0 flex-1 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0EAF6] text-[#280A47]">

                        <DocumentIcon size={19} />

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-semibold text-[#39313F]">

                          {document.name}

                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#98909C]">

                          <span>{document.category}</span>

                          <span>·</span>

                          <span>{formatFileSize(document.size)}</span>

                          <span>·</span>

                          <span>

                            {formatUploadDate(document.uploadedAt)}

                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-1 border-t border-[#F0ECE5] pt-2 sm:border-0 sm:pt-0">

                      <button

                        type="button"

                        onClick={() => setPreviewDocument(document)}

                        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#280A47] transition hover:bg-[#280A47]/5"

                        title="Preview document"

                      >

                        <Eye size={15} />

                        Preview

                      </button>

                      <button

                        type="button"

                        onClick={() => handleDownload(document)}

                        className="rounded-lg p-2 text-[#607A51] transition hover:bg-[#EAF1E7]"

                        title="Download document"

                      >

                        <Download size={16} />

                      </button>

                      <button

                        type="button"

                        onClick={() => handleDelete(document)}

                        className="rounded-lg p-2 text-[#B02D30] transition hover:bg-red-50"

                        title="Delete document"

                      >

                        <Trash2 size={16} />

                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

          <p className="text-xs leading-5 text-[#98909C]">

            Files are currently held temporarily in your browser session.

            They are not yet stored on the server.

          </p>

        </div>

      </SectionCard>

      {/* Preview Modal */}

      {previewDocument && (

        <DocumentPreviewModal

          document={previewDocument}

          onClose={() => setPreviewDocument(null)}

        />

      )}

    </>

  );

}

/* --------------------------------------------------

   STUDENT PROFILE PAGE

-------------------------------------------------- */

export default function StudentProfilePage() {

  const params = useParams();

  const studentId = params.id;

  const initialStudent = students.find(

    (item) => item.id === studentId

  );

  const [student, setStudent] = useState(initialStudent);

  const [editOpen, setEditOpen] = useState(false);

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (updatedStudent) => {

    setStudent(updatedStudent);

    setEditOpen(false);

    setSavedMessage(true);

    window.setTimeout(() => {

      setSavedMessage(false);

    }, 3500);

  };

  if (!student) {

    return (

     <>

        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#280A47]/5 text-[#280A47]">

            <Users size={28} />

          </div>

          <h2 className="text-xl font-bold text-[#28212D]">

            Student not found

          </h2>

          <p className="mt-2 text-base text-[#89818E]">

            The student record you're looking for doesn't exist.

          </p>

          <Link

            href="/students"

            className="mt-6 rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3B1760]"

          >

            Back to Students

          </Link>

        </div>
      </>
    );

  }

  const initials = student.name

    .split(" ")

    .map((part) => part[0])

    .join("");

  return (

   

          <>
      <div className="space-y-6">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-[#89818E]">

          <Link

            href="/students"

            className="transition hover:text-[#280A47]"

          >

            Students

          </Link>

          <span>/</span>

          <span className="font-semibold text-[#28212D]">

            Student Profile

          </span>

        </div>

        {/* Back Button */}

        <Link

          href="/students"

          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F6476] transition hover:text-[#280A47]"

        >

          <ArrowLeft size={15} />

          Back to Student List

        </Link>

        {/* Success Message */}

        {savedMessage && (

          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">

            <CheckCircle2 size={17} />

            Student profile updated successfully.

          </div>

        )}

        {/* Profile Header */}

        <div className="overflow-hidden rounded-2xl border border-[#EAE4D9] bg-white">

          <div className="h-2 bg-gradient-to-r from-[#280A47] via-[#53266F] to-[#B02D30]" />

          <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-7">

            <div className="flex items-center gap-4">

              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl bg-[#280A47] text-xl font-bold text-[#F0B556]">

                {initials}

              </div>

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h1 className="text-xl font-bold text-[#28212D] sm:text-2xl">

                    {student.name}

                  </h1>

                  <span

                    className={`rounded-full px-3 py-1 text-xs font-bold ${

                      statusStyles[student.status] ||

                      statusStyles.Inactive

                    }`}

                  >

                    {student.status}

                  </span>

                </div>

                <p className="mt-2 text-sm text-[#89818E]">

                  Student ID: {student.id}

                </p>

                <p className="mt-1 text-sm text-[#89818E]">

                  {student.program}

                </p>

              </div>

            </div>

            <button

              type="button"

              onClick={() => setEditOpen(true)}

              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#280A47] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B1760]"

            >

              <Pencil size={14} />

              Edit Profile

            </button>

          </div>

          {/* Quick Information */}

          <div className="grid grid-cols-2 gap-4 border-t border-[#F0ECE5] bg-[#FEFBF7] px-5 py-4 sm:grid-cols-4 sm:px-7">

            <div>

              <p className="text-xs text-[#98909C]">

                Student ID

              </p>

              <p className="mt-1 text-sm font-bold text-[#39313F]">

                {student.id}

              </p>

            </div>

            <div>

              <p className="text-xs text-[#98909C]">

                Academic Year

              </p>

              <p className="mt-1 text-sm font-bold text-[#39313F]">

                {student.academicYear}

              </p>

            </div>

            <div>

              <p className="text-xs text-[#98909C]">

                Study Level

              </p>

              <p className="mt-1 text-sm font-bold text-[#39313F]">

                {student.year}

              </p>

            </div>

            <div>

              <p className="text-xs text-[#98909C]">

                Student Type

              </p>

              <p className="mt-1 text-sm font-bold text-[#39313F]">

                {student.studentType}

              </p>

            </div>

          </div>

        </div>

        {/* Profile Sections */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* Personal Information */}

          <SectionCard

            title="Personal Information"

            icon={UserRound}

          >

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <InfoItem

                label="Full Name"

                value={student.name}

              />

              <InfoItem

                label="Date of Birth"

                value={

                  student.dateOfBirth

                    ? new Date(

                        `${student.dateOfBirth}T00:00:00`

                      ).toLocaleDateString("en-GB", {

                        day: "2-digit",

                        month: "long",

                        year: "numeric",

                      })

                    : "Not provided"

                }

              />

              <InfoItem

                label="Gender"

                value={student.gender}

              />

              <InfoItem

                label="Nationality"

                value={student.nationality}

              />

              <InfoItem

                label="Email Address"

                value={student.email}

                icon={Mail}

              />

              <InfoItem

                label="Phone Number"

                value={student.phone}

                icon={Phone}

              />

              <div className="sm:col-span-2">

                <InfoItem

                  label="Residential Address"

                  value={student.address}

                  icon={MapPin}

                />

              </div>

            </div>

          </SectionCard>

          {/* Academic Information */}

          <SectionCard

            title="Academic Information"

            icon={GraduationCap}

          >

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <InfoItem

                label="Program"

                value={student.program}

                icon={BookOpen}

              />

              <InfoItem

                label="Study Level"

                value={student.year}

              />

              <InfoItem

                label="Academic Year"

                value={student.academicYear}

                icon={CalendarDays}

              />

              <InfoItem

                label="Enrollment Date"

                value={student.enrollmentDate}

              />

              <InfoItem

                label="Student Type"

                value={student.studentType}

              />

              <InfoItem

                label="Campus"

                value={student.campus}

              />

            </div>

          </SectionCard>

          {/* Emergency Contact */}

          <SectionCard

            title="Emergency Contact"

            icon={ShieldCheck}

          >

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <InfoItem

                label="Contact Person"

                value={student.emergencyName}

              />

              <InfoItem

                label="Relationship"

                value={student.emergencyRelation}

              />

              <InfoItem

                label="Contact Number"

                value={student.emergencyPhone}

                icon={Phone}

              />

            </div>

          </SectionCard>

          {/* Previous Education */}

          <SectionCard

            title="Previous Education"

            icon={BookOpen}

          >

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <InfoItem

                label="Institution"

                value={student.previousEducation}

              />

              <InfoItem

                label="Qualification"

                value={student.previousQualification}

              />

            </div>

          </SectionCard>

          {/* Student Documents */}

          <div className="xl:col-span-2">

            <StudentDocuments studentId={student.id} />

          </div>

          {/* Enrollment History */}

          <SectionCard

            title="Enrollment History"

            icon={Clock}

          >

            <div className="flex items-start gap-3">

              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">

                <GraduationCap size={16} />

              </div>

              <div>

                <p className="text-sm font-bold text-[#39313F]">

                  {student.program}

                </p>

                <p className="mt-1 text-sm text-[#89818E]">

                  {student.year} · {student.academicYear}

                </p>

                <p className="mt-2 text-xs text-[#98909C]">

                  Enrollment: {student.enrollmentDate}

                </p>

              </div>

            </div>

          </SectionCard>

        </div>

        {/* Information Note */}

        <div className="flex items-start gap-3 rounded-xl border border-[#EAE4D9] bg-white p-4">

          <BriefcaseBusiness

            size={17}

            className="mt-0.5 shrink-0 text-[#919B89]"

          />

          <p className="text-sm leading-5 text-[#89818E]">

            Student profile changes and document uploads are

            currently handled in frontend state. Backend

            integration and permanent file storage will be

            implemented separately.

          </p>

        </div>

      </div>

      {/* Edit Profile Modal */}

      {editOpen && (

        <EditProfileModal

          student={student}

          onClose={() => setEditOpen(false)}

          onSave={handleSave}

        />

      )}

   
 </>
  );
 

}
