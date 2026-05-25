import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import studentProfileRoutes from './routes/studentProfileRoutes.js';
import facultyProfileRoutes from './routes/facultyProfileRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import bookIssueRoutes from './routes/bookIssueRoutes.js';
import hostelRoutes from './routes/hostelRoutes.js';
import hostelAllocationRoutes from './routes/hostelAllocationRoutes.js';
import leaveRequestRoutes from './routes/leaveRequestRoutes.js';
import roomChangeRoutes from './routes/roomChangeRoutes.js';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/student-profiles', studentProfileRoutes);
app.use('/api/faculty-profiles', facultyProfileRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/book-issues', bookIssueRoutes);
app.use('/api/hostels', hostelRoutes);
app.use('/api/hostel-allocations', hostelAllocationRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);
app.use('/api/room-changes', roomChangeRoutes);

app.get('/', (req, res) => {
    res.send('College ERP Backend is running with Database Connected! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});