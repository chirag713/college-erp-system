import Subject from '../models/Subject.js';

export const createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, credits, semester, course, facultyAssigned } = req.body;
    const newSubject = new Subject({ subjectName, subjectCode, credits, semester, course, facultyAssigned });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignFacultyToSubject = async (req, res) => {
  try {
    const { subjectId, facultyId } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { facultyAssigned: facultyId },
      { new: true }
    );
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignSubjectToCourse = async (req, res) => {
  try {
    const { subjectId, courseId } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { course: courseId },
      { new: true }
    );
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('semester').populate('course').populate('facultyAssigned', 'name email');
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
