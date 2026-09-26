const { Venue_photo } = require("../model/venue_photoSchema");

const createVenuePhoto = async (req, res) => {
  try {
    const { venueId, url } = req.body;

    const newVenuePhoto = new Venue_photo({
      venueId,
      url,
    });

    await newVenuePhoto.save();

    return res.status(201).json({
      success: true,
      message: "Venue photo muvaffaqiyatli yaratildi",
      innerData: newVenuePhoto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Venue photo yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getVenuePhotos = async (req, res) => {
  try {
    const venuePhotos = await Venue_photo.find({}).populate("venueId");

    return res.status(200).json({
      success: true,
      message: "Barcha Venue photolar ro'yxati olindi",
      innerData: venuePhotos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Venue photolarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getVenuePhotoById = async (req, res) => {
  try {
    const { id } = req.params;

    const venuePhoto = await Venue_photo.findById(id).populate("venueId");

    if (!venuePhoto) {
      return res.status(404).json({
        success: false,
        message: "Venue photo topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue photo topildi",
      innerData: venuePhoto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateVenuePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { venueId, url } = req.body;

    const updatedVenuePhoto = await Venue_photo.findByIdAndUpdate(
      id,
      { venueId, url },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVenuePhoto) {
      return res.status(404).json({
        success: false,
        message: "Venue photo topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue photo muvaffaqiyatli yangilandi",
      innerData: updatedVenuePhoto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteVenuePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVenuePhoto = await Venue_photo.findByIdAndDelete(id);

    if (!deletedVenuePhoto) {
      return res.status(404).json({
        success: false,
        message: "Venue photo topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venue photo muvaffaqiyatli o'chirildi",
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
  createVenuePhoto,
  getVenuePhotos,
  getVenuePhotoById,
  updateVenuePhoto,
  deleteVenuePhoto,
};