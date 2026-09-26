const { Booking } = require("../model/bookingSchema");
const { createBookingValidationSchema } = require("../validation/bookingValidation");

const createBooking = async (req, res) => {
  try {
    const {
      cart_id,
      createdAt,
      fineshed,
      payment_method_id,
      delivery_method_id,
      discount_id,
      status_id,
    } = req.body;

    const newBooking = new Booking({
      cart_id,
      createdAt: createdAt || new Date(),
      fineshed: fineshed || null,
      payment_method_id,
      delivery_method_id,
      discount_id,
      status_id,
    });

    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Xato:", error);
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("cart_id")
      .populate("payment_method_id")
      .populate("delivery_method_id")
      .populate("discount_id")
      .populate("status_id");

    return res.status(200).json({
      success: true,
      message: "Barcha band qilishlar ro'yxati olingan.",
      innerData: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId)
      .populate("cart_id")
      .populate("payment_method_id")
      .populate("delivery_method_id")
      .populate("discount_id")
      .populate("status_id");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking found!",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cart_id,
      createdAt,
      fineshed,
      payment_method_id,
      delivery_method_id,
      discount_id,
      status_id,
    } = req.body;

    const updateData = {
      cart_id,
      createdAt,
      fineshed,
      payment_method_id,
      delivery_method_id,
      discount_id,
      status_id,
    };

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking Updated Successfully!",
      booking: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      deletedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};