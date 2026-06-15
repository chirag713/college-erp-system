import Company from '../models/Company.js';
import JobPost from '../models/JobPost.js';
import JobApplication from '../models/JobApplication.js';

export const createCompany = async (req, res) => {
  try {
    const { companyName, industry, website, contactEmail } = req.body;
    const company = new Company({ companyName, industry, website, contactEmail });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJobPost = async (req, res) => {
  try {
    const { company, title, description, eligibilityCriteria, salary, deadline } = req.body;
    const jobPost = new JobPost({ company, title, description, eligibilityCriteria, salary, deadline });
    await jobPost.save();
    res.status(201).json(jobPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const { job, student, resumeUrl } = req.body;
    const application = new JobApplication({ job, student, resumeUrl });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await JobApplication.find({ job: jobId }).populate('student', 'name email');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
