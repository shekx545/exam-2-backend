const { HumanCategory } = require("../model/humanCategorySchema");

const createHumanCategory = async (req, res) => {
  try {
    const { name, start_age, finish_age, gender_id } = req.body;

    const newHumanCategory = new HumanCategory({
      name,
      start_age,
      finish_age,
      gender_id,
    });

    await newHumanCategory.save();

    return res.status(201).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli yaratildi",
      innerData: newHumanCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: HumanCategory yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getHumanCategories = async (req, res) => {
  try {
    const humanCategories = await HumanCategory.find({})
      .populate("gender_id");

    return res.status(200).json({
      success: true,
      message: "Barcha HumanCategorylar ro'yxati olindi",
      innerData: humanCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: HumanCategorylarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getHumanCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const humanCategory = await HumanCategory.findById(id)
      .populate("gender_id");

    if (!humanCategory) {
      return res.status(404).json({
        success: false,
        message: "HumanCategory topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "HumanCategory topildi",
      innerData: humanCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateHumanCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, start_age, finish_age, gender_id } = req.body;

    const updatedHumanCategory = await HumanCategory.findByIdAndUpdate(
      id,
      {
        name,
        start_age,
        finish_age,
        gender_id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHumanCategory) {
      return res.status(404).json({
        success: false,
        message: "HumanCategory topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli yangilandi",
      innerData: updatedHumanCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteHumanCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHumanCategory = await HumanCategory.findByIdAndDelete(id);

    if (!deletedHumanCategory) {
      return res.status(404).json({
        success: false,
        message: "HumanCategory topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli o'chirildi",
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
  createHumanCategory,
  getHumanCategories,
  getHumanCategoryById,
  updateHumanCategory,
  deleteHumanCategory,
};