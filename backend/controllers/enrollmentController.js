import Enrollment from '../models/Enrollment.js';

export const getEnrollments = async (req, res) => {
  try {
    // If student, only get their own enrollments
    let query = {};
    if (req.user.role === 'student') {
      query.student = req.user._id;
    }
    
    const enrollments = await Enrollment.find(query).populate('student', 'name email').populate('course', 'courseName courseCode');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course');
    if (!enrollment) return res.status(404).json({ message: 'Not found' });
    
    if (req.user.role === 'student' && enrollment.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEnrollment = async (req, res) => {
  try {
    // If student, force the student ID to be theirs
    if (req.user.role === 'student') {
      req.body.student = req.user._id;
    }
    const enrollment = new Enrollment(req.body);
    const savedEnrollment = await enrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!enrollment) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
