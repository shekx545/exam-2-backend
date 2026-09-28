const { Venue } = require("../model/venueSchema");

const createVenue = async (req, res) => {
  try {
    const {
      name,
      address,
      location,
      site,
      phone,
      schema,
      region_id,
      district_id,
    } = req.body;

    const newVenue = new Venue({
      name,
      address,
      location,
      site,
      phone,
      schema,
      region_id,
      district_id,
    });

    await newVenue.save();

    return res.status(201).json({
      success: true,
      message: "Venue muvaffaqiyatli yaratildi",
      innerData: newVenue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Venue yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({})
      .populate("region_id")
      .populate("district_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Venuelar ro'yxati olindi",
      innerData: venues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Venuelarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;

    const venue = await Venue.findById(id)
      .populate("region_id")
      .populate("district_id");

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue topildi",
      innerData: venue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      location,
      site,
      phone,
      schema,
      region_id,
      district_id,
    } = req.body;

    const updatedVenue = await Venue.findByIdAndUpdate(
      id,
      {
        name,
        address,
        location,
        site,
        phone,
        schema,
        region_id,
        district_id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue muvaffaqiyatli yangilandi",
      innerData: updatedVenue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVenue = await Venue.findByIdAndDelete(id);

    if (!deletedVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchVenue = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Venue.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { site: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
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
      message: "Server xatoligi: Venue ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  searchVenue,
};