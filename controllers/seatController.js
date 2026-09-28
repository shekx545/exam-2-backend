const { Seat } = require("../model/seatSchema");

const createSeat = async (req, res) => {
  try {
    const {
      sector_id,
      row_number,
      number,
      venue_id,
      seat_type_id,
      location_in_schema,
    } = req.body;

    const newSeat = new Seat({
      sector_id,
      row_number,
      number,
      venue_id,
      seat_type_id,
      location_in_schema,
    });

    await newSeat.save();

    return res.status(201).json({
      success: true,
      message: "Seat muvaffaqiyatli yaratildi",
      innerData: newSeat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Seat yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find({})
      .populate("sector_id")
      .populate("venue_id")
      .populate("seat_type_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Seatlar ro'yxati olindi",
      innerData: seats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Seatlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getSeatById = async (req, res) => {
  try {
    const { id } = req.params;

    const seat = await Seat.findById(id)
      .populate("sector_id")
      .populate("venue_id")
      .populate("seat_type_id");

    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "Seat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat topildi",
      innerData: seat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sector_id,
      row_number,
      number,
      venue_id,
      seat_type_id,
      location_in_schema,
    } = req.body;

    const updatedSeat = await Seat.findByIdAndUpdate(
      id,
      {
        sector_id,
        row_number,
        number,
        venue_id,
        seat_type_id,
        location_in_schema,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSeat) {
      return res.status(404).json({
        success: false,
        message: "Seat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat muvaffaqiyatli yangilandi",
      innerData: updatedSeat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSeat = await Seat.findByIdAndDelete(id);

    if (!deletedSeat) {
      return res.status(404).json({
        success: false,
        message: "Seat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seat muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchSeat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Seat.find({
      $or: [
        { location_in_schema: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Qidiruv natijalari:",
      innerData: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatoligi: Seat ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createSeat,
  getSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
  searchSeat,
};