import Department from '../models/Department.js';

export const getDepartments = async (req, res) => {
  try {
    const depts = await Department.find().populate('head', 'name email');
    res.status(200).json(depts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id).populate('head', 'name email');
    if (!dept) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(dept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const dept = new Department(req.body);
    const savedDept = await dept.save();
    res.status(201).json(savedDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dept) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
