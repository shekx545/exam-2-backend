const { Tycket_type } = require("../model/tycket_typeSchema");

const createTycketType = async (req, res) => {
  try {
    const { ticket_type } = req.body;

    const newTycketType = new Tycket_type({
      ticket_type,
    });

    await newTycketType.save();

    return res.status(201).json({
      success: true,
      message: "Tycket type muvaffaqiyatli yaratildi",
      innerData: newTycketType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Tycket type yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTycketTypes = async (req, res) => {
  try {
    const tycketTypes = await Tycket_type.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Tycket typelar ro'yxati olindi",
      innerData: tycketTypes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Tycket typelarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTycketTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const tycketType = await Tycket_type.findById(id);

    if (!tycketType) {
      return res.status(404).json({
        success: false,
        message: "Tycket type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tycket type topildi",
      innerData: tycketType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateTycketType = async (req, res) => {
  try {
    const { id } = req.params;
    const { ticket_type } = req.body;

    const updatedTycketType = await Tycket_type.findByIdAndUpdate(
      id,
      { ticket_type },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTycketType) {
      return res.status(404).json({
        success: false,
        message: "Tycket type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tycket type muvaffaqiyatli yangilandi",
      innerData: updatedTycketType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteTycketType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTycketType = await Tycket_type.findByIdAndDelete(id);

    if (!deletedTycketType) {
      return res.status(404).json({
        success: false,
        message: "Tycket type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tycket type muvaffaqiyatli o'chirildi",
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
  createTycketType,
  getTycketTypes,
  getTycketTypeById,
  updateTycketType,
  deleteTycketType,
};