# College ERP System - Features & Functions

This document lists all the currently available features and their corresponding backend functions in the College ERP System.

## 1. User Management & Authentication
**Description:** Handles user registration, login, and retrieval of users based on roles (`admin`, `faculty`, `student`, `librarian`, `accountant`, `hostelwarden`).
**Functions (`userController.js`):** `signup`, `signin`, `getUsers`

## 2. Student & Faculty Profiles
**Description:** Manages the detailed profiles of students and faculty members.
**Functions (`studentProfileController.js`, `facultyProfileController.js`):** Full CRUD for profiles.

## 3. Academic & Course Management
**Description:** Manages departments, courses, student enrollments, and academic results.
**Functions (`departmentController.js`, `courseController.js`, `enrollmentController.js`, `resultController.js`):** Full CRUD.

## 4. Subject & Semester Management
**Description:** Reorganizes academic structures into manageable semesters and specific subjects.
**Functions (`semesterController.js`, `subjectController.js`):** `createSemester`, `getSemesters`, `createSubject`, `assignFacultyToSubject`, `assignSubjectToCourse`

## 5. Exam Management
**Description:** Handles exam scheduling, admit card generation, and grading.
**Functions (`examController.js`, `examScheduleController.js`, `admitCardController.js`, `gradeController.js`):** `createExam`, `getExams`, `createSchedule`, `getSchedules`, `generateAdmitCard`, `getAdmitCard`, `enterMarks`, `getGradesByStudent`

## 6. Assignment & LMS Module
**Description:** Full learning management capabilities, allowing assignments, submissions, and grading.
**Functions (`assignmentController.js`):** `createAssignment`, `getAssignments`, `deleteAssignment`, `submitAssignment`, `getMySubmissions`, `gradeSubmission`

## 7. Timetable & Attendance
**Description:** Handles class scheduling and student attendance tracking.
**Functions (`timetableController.js`, `attendanceController.js`):** Full CRUD for Timetable & Attendance records.

## 8. Library Management
**Description:** Manages the library catalog and tracks book issuances and returns.
**Functions (`bookController.js`, `bookIssueController.js`):** Full CRUD for Books, `issueBook`, `returnBook`, `getBookIssues`

## 9. Financial & Fee Management
**Description:** Manages fee structures, invoicing, and payment tracking for students.
**Functions (`feeController.js`):** `createFeeInvoice`, `payFeeInvoice`, `getFeeInvoices`, `getMyFeeInvoices`

## 10. Hostel Management
**Description:** Manages hostel facilities, rooms, room allocations, and room change requests.
**Functions (`hostelController.js`, `hostelAllocationController.js`, `roomChangeController.js`):** `createHostel`, `createRoom`, `deleteRoom`, `allocateRoom`, `vacateRoom`, `createRoomChangeRequest`, `updateRoomChangeStatus`

## 11. Transport Management
**Description:** Manages bus routes, vehicles, and student transport allocations.
**Functions (`transportController.js`):** `createRoute`, `getRoutes`, `createVehicle`, `assignTransport`, `getMyTransport`

## 12. Placement Cell
**Description:** Connects students with job opportunities from companies.
**Functions (`placementController.js`):** `createCompany`, `createJobPost`, `applyForJob`, `getApplications`, `updateApplicationStatus`

## 13. Complaint & Grievance System
**Description:** Allows users to raise issues and track complaint resolution.
**Functions (`complaintController.js`):** `createComplaint`, `getComplaints`, `getMyComplaints`, `updateComplaintStatus`, `deleteComplaint`

## 14. Leave Request Management
**Description:** Allows students/staff to submit leave applications and tracks their status.
**Functions (`leaveRequestController.js`):** `createLeaveRequest`, `getLeaveRequests`, `updateLeaveRequestStatus`

## 15. Admin Dashboard Analytics
**Description:** Centralized analytics for institution overviews.
**Functions (`dashboardController.js`):** `getDashboardStats`, `getStudentCount`, `getFacultyCount`, `getFeeCollectionStats`, `getAttendanceStats`, `getLibraryStats`

## 16. Notice & Announcements
**Description:** Used to publish and manage announcements or notices across the institution.
**Functions (`noticeController.js`):** Full CRUD for Notices

---
### Phase 3 Premium Modules

## 17. Document Management
**Description:** Students/faculty document upload and verification system.
**Functions (`documentController.js`):** `uploadDocument`, `getDocuments`, `getMyDocuments`, `verifyDocument`, `deleteDocument`

## 18. ID Card Module
**Description:** Auto-generate and download student/faculty ID cards.
**Functions (`idCardController.js`):** `generateStudentIdCard`, `generateFacultyIdCard`, `getMyIdCard`, `downloadIdCard`

## 19. Notification System
**Description:** Comprehensive REST API-based notification system for users (individual & broadcast).
**Functions (`notificationController.js`):** `createNotification`, `getMyNotifications`, `markNotificationAsRead`, `deleteNotification`

## 20. Academic Calendar
**Description:** Track the college's yearly calendar of events, holidays, and exams.
**Functions (`academicCalendarController.js`):** `createAcademicEvent`, `getAcademicCalendar`, `updateAcademicEvent`, `deleteAcademicEvent`

## 21. Event Management
**Description:** Manage college fests, workshops, seminars, and track participant registrations.
**Functions (`eventController.js`):** `createEvent`, `getEvents`, `registerForEvent`, `getMyEvents`, `updateEventStatus`

## 22. Certificate Management
**Description:** Generate, store, and publicly verify certificates using a unique hash.
**Functions (`certificateController.js`):** `createCertificate`, `getCertificates`, `getMyCertificates`, `verifyCertificate`, `downloadCertificate`, `deleteCertificate`

## 23. Alumni Management
**Description:** Engage graduated students and track alumni opportunities.
**Functions (`alumniController.js`):** `createAlumniProfile`, `getAlumniProfiles`, `updateAlumniProfile`, `postAlumniOpportunity`

## 24. Audit Log System
**Description:** Internal tracking of critical admin actions.
**Functions (`auditLogController.js`):** `createAuditLog`, `getAuditLogs`, `getUserActivityLogs`, `deleteAuditLog`, `logAction`

## 25. Settings Module
**Description:** System-wide controls with an extensible schema configuration.
**Functions (`settingsController.js`):** `getSettings`, `updateSettings`, `setAcademicYear`, `setCurrentSemester`
