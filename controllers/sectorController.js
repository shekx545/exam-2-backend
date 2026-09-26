const { Sector } = require("../model/sectorSchema");

const createSector = async (req, res) => {
  try {
    const { sector_name } = req.body;

    const newSector = new Sector({
      sector_name,
    });

    await newSector.save();

    return res.status(201).json({
      success: true,
      message: "Sector muvaffaqiyatli yaratildi",
      innerData: newSector,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Sector yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getSectors = async (req, res) => {
  try {
    const sectors = await Sector.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Sectorlar ro'yxati olindi",
      innerData: sectors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Sectorlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getSectorById = async (req, res) => {
  try {
    const { id } = req.params;

    const sector = await Sector.findById(id);

    if (!sector) {
      return res.status(404).json({
        success: false,
        message: "Sector topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sector topildi",
      innerData: sector,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const { sector_name } = req.body;

    const updatedSector = await Sector.findByIdAndUpdate(
      id,
      { sector_name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSector) {
      return res.status(404).json({
        success: false,
        message: "Sector topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sector muvaffaqiyatli yangilandi",
      innerData: updatedSector,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSector = await Sector.findByIdAndDelete(id);

    if (!deletedSector) {
      return res.status(404).json({
        success: false,
        message: "Sector topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sector muvaffaqiyatli o'chirildi",
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
  createSector,
  getSectors,
  getSectorById,
  updateSector,
  deleteSector,
};