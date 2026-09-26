const { Seat_type } = require("../model/seat_typeSchema");

const createSeatType = async (req, res) => {
  try {
    const { name } = req.body;

    const newSeatType = new Seat_type({
      name,
    });

    await newSeatType.save();

    return res.status(201).json({
      success: true,
      message: "Seat type muvaffaqiyatli yaratildi",
      innerData: newSeatType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Seat type yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getSeatTypes = async (req, res) => {
  try {
    const seatTypes = await Seat_type.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Seat typelar ro'yxati olindi",
      innerData: seatTypes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Seat typelarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getSeatTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const seatType = await Seat_type.findById(id);

    if (!seatType) {
      return res.status(404).json({
        success: false,
        message: "Seat type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat type topildi",
      innerData: seatType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateSeatType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedSeatType = await Seat_type.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSeatType) {
      return res.status(404).json({
        success: false,
        message: "Seat type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat type muvaffaqiyatli yangilandi",
      innerData: updatedSeatType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteSeatType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSeatType = await Seat_type.findByIdAndDelete(id);

    if (!deletedSeatType) {
      return res.status(404).json({
        success: false,
        message: "Seat type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat type muvaffaqiyatli o'chirildi",
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
  createSeatType,
  getSeatTypes,
  getSeatTypeById,
  updateSeatType,
  deleteSeatType,
};