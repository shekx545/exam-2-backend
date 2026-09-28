const { Region } = require("../model/regionSchema");

const createRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const newRegion = new Region({
      name,
    });

    await newRegion.save();

    return res.status(201).json({
      success: true,
      message: "Region muvaffaqiyatli yaratildi",
      innerData: newRegion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Region yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getRegions = async (req, res) => {
  try {
    const regions = await Region.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Regionlar ro'yxati olindi",
      innerData: regions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Regionlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Region.findById(id);

    if (!region) {
      return res.status(404).json({
        success: false,
        message: "Region topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Region topildi",
      innerData: region,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRegion = await Region.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRegion) {
      return res.status(404).json({
        success: false,
        message: "Region topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Region muvaffaqiyatli yangilandi",
      innerData: updatedRegion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRegion = await Region.findByIdAndDelete(id);

    if (!deletedRegion) {
      return res.status(404).json({
        success: false,
        message: "Region topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Region muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchRegion = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Region.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
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
      message: "Server xatoligi: Region ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
  searchRegion,
};