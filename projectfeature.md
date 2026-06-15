# EduPulse College ERP - Detailed Architecture & Features

EduPulse is a monolithic, enterprise-grade College ERP system designed to centralize and automate institutional management. It features a robust Node.js/Express REST API on the backend and a highly responsive, role-based React UI on the frontend.

---

## 1. System Architecture

### 1.1 Backend Stack (Server)
- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB (via Mongoose ORM)
- **Routing Pattern:** Modular controller-route architecture with individual route files mounted to the root `apiRouter`.
- **Security & Middleware:**
  - Role-Based Access Control (RBAC) middleware ensuring routes are protected based on user roles (`admin`, `faculty`, `student`).
  - Standard RESTful paradigms with structured JSON responses.

### 1.2 Frontend Stack (Client)
- **Framework:** React 18+ (bootstrapped with Vite for instant HMR and optimized builds)
- **Routing:** `react-router-dom` for client-side navigation.
- **Styling:** Tailwind CSS (utility-first CSS) combined with custom CSS for animations (`fade-in`, `slide-in`).
- **Icons:** `lucide-react` for a cohesive and modern iconography.
- **Component Architecture:**
  - Layout Wrappers (e.g., `Sidebar`, `Topbar`)
  - Role-Specific Dashboards (`AdminDashboard.jsx`, `FacultyDashboard.jsx`, `StudentDashboard.jsx`)
  - Plug-and-Play Feature Modules (`*Module.jsx`)

---

## 2. Comprehensive Module Breakdown

The system is organized into 25 deeply integrated modules, seamlessly connecting the database to the user interface.

### 2.1 Core Administration & Settings
**Backend:**
- **User Module** (`userController.js`, `userRoutes.js`): Handles CRUD operations for Students, Faculty, and Admins.
- **Department Module**: Organizes the institution into faculties (e.g., Computer Science, Mechanical).
- **Settings Module** (`settingsController.js`, `settingsRoutes.js`): Manages a key-value `configMap` for global parameters (site name, academic year, maintenance mode).
- **Audit Log Module** (`auditLogController.js`, `auditLogRoutes.js`): Manual logging inside critical controllers tracking action, module, user, and IP address.

**Frontend:**
- `SettingsModule.jsx`: Admin interface to toggle maintenance mode, set max upload sizes, and manage platform branding.
- `AuditLogModule.jsx`: Read-only, secure ledger displaying system activities with color-coded tags (`CREATE`, `UPDATE`, `DELETE`).

### 2.2 Academic Organization
**Backend:**
- **Semester Module** (`semesterController.js`, `semesterRoutes.js`): Manages academic terms and date boundaries.
- **Subject Module** (`subjectController.js`, `subjectRoutes.js`): Defines curriculum structures, credits, and links them to specific courses and semesters.
- **Timetable Module**: Schedules lectures mapped to rooms, faculty, and subject.
- **Attendance Module**: Tracks daily student presence and calculates aggregates.

**Frontend:**
- `SubjectSemesterModule.jsx`: Allows admins to define terms and map subjects. Faculty can view their assigned subjects, and students can view their current curriculum.
- *Existing legacy modules*: Timetable and Attendance tables natively integrated into the dashboards.

### 2.3 Assessment & Learning Management (LMS)
**Backend:**
- **Exam Management** (`examController.js`, `examRoutes.js`): Configures examination schedules, tracks admit card eligibility, and stores marks.
- **Assignment Module** (`assignmentController.js`, `assignmentRoutes.js`): Handles assignment creation, student submissions, and faculty grading.

**Frontend:**
- `ExamModule.jsx`: Dashboards for students to view upcoming schedules and download admit cards; tools for faculty to enter marks.
- `AssignmentModule.jsx`: Full LMS interface. Faculty post assignments; students drag-and-drop submissions before the dynamic deadline tracker expires.

### 2.4 Student Services & Operations
**Backend:**
- **Hostel Module**: Room allocation and inventory management.
- **Library Module**: Book tracking, issue logs, and penalty calculations.
- **Transport Module** (`transportController.js`, `transportRoutes.js`): Maps physical bus routes, driver assignments, and student stops.
- **Complaint Module** (`complaintController.js`, `complaintRoutes.js`): Helpdesk ticket system with category and status tracking.
- **Leave Request Module** (`leaveRequestController.js`, `leaveRequestRoutes.js`): Application workflow for leaves of absence.

**Frontend:**
- `TransportModule.jsx`: Admins manage fleets; students view their allocated bus and route map.
- `ComplaintModule.jsx`: Unified grievance tracking board (Academics, Hostel, Admin issues) with resolution workflows.
- `LeaveRequestModule.jsx`: Date-range pickers for applications and an inbox for Admins to Approve/Reject.

### 2.5 Campus Engagement & Events
**Backend:**
- **Notification System** (`notificationController.js`, `notificationRoutes.js`): REST-based alerts targeting specific user groups.
- **Event Module** (`eventController.js`, `eventRoutes.js`): Manages college fests, seminars, and attendee registration limits.
- **Academic Calendar** (`academicCalendarController.js`, `academicCalendarRoutes.js`): Global institutional calendar for holidays and important dates.

**Frontend:**
- `NotificationModule.jsx`: A personalized inbox for alerts (Fee Reminders, Academic notices) with "Mark as Read" functionality.
- `EventModule.jsx`: Discovery feed for upcoming fests with one-click "Register" buttons.
- `AcademicCalendarModule.jsx`: Visual timeline of the academic year.

### 2.6 Premium Networking & Digital Credentials
**Backend:**
- **Placement Cell** (`placementController.js`, `placementRoutes.js`): Schema for Companies, Job Postings, and Student Applications.
- **Alumni Management** (`alumniController.js`, `alumniRoutes.js`): Directory of graduates and their professional trajectories.
- **Certificate Manager** (`certificateController.js`, `certificateRoutes.js`): Generates verifiable digital certificates with cryptographic hash tracking.
- **ID Card System** (`idCardController.js`, `idCardRoutes.js`): Centralized generation of digital identity cards linked to user profiles.
- **Document Vault** (`documentController.js`, `documentRoutes.js`): Secure storage references for student marksheets and KYC data.

**Frontend:**
- `PlacementModule.jsx`: Job board interface showing CTC, locations, and deadlines. Admin view to track applicant pipelines.
- `AlumniModule.jsx`: Visual grid directory to search graduates by company or class year.
- `CertificateModule.jsx`: Digital repository to download PDFs and a public "Hash Verification" search tool.
- `IdCardModule.jsx`: Visually stunning, glassmorphism-styled digital ID cards ready for download.
- `DocumentModule.jsx`: Central vault for users to upload files and admins to mark them as 'Verified'.

---

## 3. UI/UX Design System

The frontend is built with an extreme focus on aesthetics, ensuring a premium user experience:
- **Responsive Navigation:** A dynamic `Sidebar.jsx` that automatically filters its tabs based on whether the logged-in user is an `admin`, `faculty`, or `student`.
- **Micro-Animations:** Heavy use of Tailwind's `animate-in`, `fade-in`, and `slide-in-from-bottom` utilities to ensure components render smoothly without jarring layouts.
- **Empty States:** Beautiful fallback UI states using `lucide-react` icons when data arrays are empty, preventing broken or confusing layouts.
- **State Management:** Localized component state handling simulated network latency (`isLoading`) to demonstrate skeleton loading and spinner states.

## 4. API Endpoints Overview

While the exact CRUD endpoints follow a standard REST pattern, the routing is structured cleanly under `/api/v1/`:

- `/api/v1/users`
- `/api/v1/semesters`
- `/api/v1/subjects`
- `/api/v1/exams`
- `/api/v1/assignments`
- `/api/v1/transport`
- `/api/v1/complaints`
- `/api/v1/leaves`
- `/api/v1/notifications`
- `/api/v1/events`
- `/api/v1/placements`
- `/api/v1/alumni`
- `/api/v1/certificates`
- `/api/v1/idcards`
- `/api/v1/documents`
- `/api/v1/auditlogs`
- `/api/v1/settings`
- `/api/v1/academic-calendar`

*(Each route module exports standard endpoints like `GET /`, `POST /`, `GET /:id`, `PUT /:id`, `DELETE /:id` tied to their respective controllers).*
