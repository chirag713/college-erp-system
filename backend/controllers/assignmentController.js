import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';

export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, faculty, dueDate } = req.body;
    const assignment = new Assignment({ title, description, subject, faculty, dueDate });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const { subjectId } = req.query;
    const query = subjectId ? { subject: subjectId } : {};
    const assignments = await Assignment.find(query).populate('subject').populate('faculty', 'name');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    await Assignment.findByIdAndDelete(assignmentId);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const { assignment, student, fileUrl } = req.body;
    const submission = new AssignmentSubmission({ assignment, student, fileUrl });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubmissions = async (req, res) => {
  try {
    const { studentId } = req.params;
    const submissions = await AssignmentSubmission.find({ student: studentId }).populate('assignment');
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gradeSubmission = async (req, res) => {
  try {
    const { submissionId, grade, feedback } = req.body;
    const submission = await AssignmentSubmission.findByIdAndUpdate(
      submissionId,
      { grade, feedback },
      { new: true }
    );
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
