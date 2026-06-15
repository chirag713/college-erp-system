import Grade from '../models/Grade.js';

export const enterMarks = async (req, res) => {
  try {
    const { student, exam, subject, marksObtained, totalMarks } = req.body;
    let grade = 'F';
    const percentage = (marksObtained / totalMarks) * 100;
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    const newGrade = new Grade({ student, exam, subject, marksObtained, totalMarks, grade });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.find({ student: studentId }).populate('exam').populate('subject');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
