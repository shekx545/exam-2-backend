const { Venue_types } = require("../model/venue_typesSchema");

const createVenueType = async (req, res) => {
  try {
    const { venueId, typeId } = req.body;

    const newVenueType = new Venue_types({
      venueId,
      typeId,
    });

    await newVenueType.save();

    return res.status(201).json({
      success: true,
      message: "Venue type muvaffaqiyatli yaratildi",
      innerData: newVenueType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Venue type yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getVenueTypes = async (req, res) => {
  try {
    const venueTypes = await Venue_types.find({})
      .populate("venueId")
      .populate("typeId");

    return res.status(200).json({
      success: true,
      message: "Barcha Venue typelar ro'yxati olindi",
      innerData: venueTypes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Venue typelarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getVenueTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const venueType = await Venue_types.findById(id)
      .populate("venueId")
      .populate("typeId");

    if (!venueType) {
      return res.status(404).json({
        success: false,
        message: "Venue type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue type topildi",
      innerData: venueType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateVenueType = async (req, res) => {
  try {
    const { id } = req.params;
    const { venueId, typeId } = req.body;

    const updatedVenueType = await Venue_types.findByIdAndUpdate(
      id,
      { venueId, typeId },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVenueType) {
      return res.status(404).json({
        success: false,
        message: "Venue type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue type muvaffaqiyatli yangilandi",
      innerData: updatedVenueType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteVenueType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVenueType = await Venue_types.findByIdAndDelete(id);

    if (!deletedVenueType) {
      return res.status(404).json({
        success: false,
        message: "Venue type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue type muvaffaqiyatli o'chirildi",
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
  createVenueType,
  getVenueTypes,
  getVenueTypeById,
  updateVenueType,
  deleteVenueType,
};