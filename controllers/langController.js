const { Lang } = require("../model/langSchema");

const createLang = async (req, res) => {
  try {
    const { name } = req.body;

    const newLang = new Lang({
      name,
    });

    await newLang.save();

    return res.status(201).json({
      success: true,
      message: "Lang muvaffaqiyatli yaratildi",
      innerData: newLang,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Lang yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getLangs = async (req, res) => {
  try {
    const langs = await Lang.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Langlar ro'yxati olindi",
      innerData: langs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Langlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getLangById = async (req, res) => {
  try {
    const { id } = req.params;

    const lang = await Lang.findById(id);

    if (!lang) {
      return res.status(404).json({
        success: false,
        message: "Lang topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lang topildi",
      innerData: lang,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateLang = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedLang = await Lang.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLang) {
      return res.status(404).json({
        success: false,
        message: "Lang topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lang muvaffaqiyatli yangilandi",
      innerData: updatedLang,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteLang = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLang = await Lang.findByIdAndDelete(id);

    if (!deletedLang) {
      return res.status(404).json({
        success: false,
        message: "Lang topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lang muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

module.exports = {
  createLang,
  getLangs,
  getLangById,
  updateLang,
  deleteLang,
};