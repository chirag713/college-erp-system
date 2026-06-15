import SystemSetting from '../models/SystemSetting.js';

// Helper to get or create the singleton settings document
const getSettingsDocument = async () => {
  let settings = await SystemSetting.findOne();
  if (!settings) {
    settings = new SystemSetting();
    await settings.save();
  }
  return settings;
};

export const getSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { academicYear, currentSemester, configMap } = req.body;
    const settings = await getSettingsDocument();
    
    if (academicYear) settings.academicYear = academicYear;
    if (currentSemester) settings.currentSemester = currentSemester;
    
    if (configMap && typeof configMap === 'object') {
      for (const [key, value] of Object.entries(configMap)) {
        settings.configMap.set(key, value);
      }
    }

    await settings.save();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setAcademicYear = async (req, res) => {
  try {
    const { year } = req.body;
    const settings = await getSettingsDocument();
    settings.academicYear = year;
    await settings.save();
    res.status(200).json({ message: 'Academic year updated', settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setCurrentSemester = async (req, res) => {
  try {
    const { semester } = req.body;
    const settings = await getSettingsDocument();
    settings.currentSemester = semester;
    await settings.save();
    res.status(200).json({ message: 'Current semester updated', settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
