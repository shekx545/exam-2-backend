const { Flat } = require("../model/flatSchema");

const createFlat = async (req, res) => {
  try {
    const { etaj, condition } = req.body;

    const newFlat = new Flat({
      etaj,
      condition,
    });

    await newFlat.save();

    return res.status(201).json({
      success: true,
      message: "Flat muvaffaqiyatli yaratildi",
      innerData: newFlat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Flat yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getFlats = async (req, res) => {
  try {
    const flats = await Flat.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Flatlar ro'yxati olindi",
      innerData: flats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Flatlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;

    const flat = await Flat.findById(id);

    if (!flat) {
      return res.status(404).json({
        success: false,
        message: "Flat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flat topildi",
      innerData: flat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { etaj, condition } = req.body;

    const updatedFlat = await Flat.findByIdAndUpdate(
      id,
      { etaj, condition },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFlat) {
      return res.status(404).json({
        success: false,
        message: "Flat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flat muvaffaqiyatli yangilandi",
      innerData: updatedFlat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlat = await Flat.findByIdAndDelete(id);

    if (!deletedFlat) {
      return res.status(404).json({
        success: false,
        message: "Flat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flat muvaffaqiyatli o'chirildi",
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
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
};
