const { Gender } = require("../model/genderSchema");

const createGender = async (req, res) => {
  try {
    const { name } = req.body;

    const newGender = new Gender({
      name,
    });

    await newGender.save();

    return res.status(201).json({
      success: true,
      message: "Gender muvaffaqiyatli yaratildi",
      innerData: newGender,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Gender yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getGenders = async (req, res) => {
  try {
    const genders = await Gender.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Genderlar ro'yxati olindi",
      innerData: genders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Genderlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getGenderById = async (req, res) => {
  try {
    const { id } = req.params;

    const gender = await Gender.findById(id);

    if (!gender) {
      return res.status(404).json({
        success: false,
        message: "Gender topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gender topildi",
      innerData: gender,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateGender = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedGender = await Gender.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGender) {
      return res.status(404).json({
        success: false,
        message: "Gender topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gender muvaffaqiyatli yangilandi",
      innerData: updatedGender,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteGender = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGender = await Gender.findByIdAndDelete(id);

    if (!deletedGender) {
      return res.status(404).json({
        success: false,
        message: "Gender topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gender muvaffaqiyatli o'chirildi",
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
  createGender,
  getGenders,
  getGenderById,
  updateGender,
  deleteGender,
};