const { District } = require("../model/districtSchema");

const createDistrict = async (req, res) => {
  try {
    const { name, region_id } = req.body;

    const newDistrict = new District({
      name,
      region_id,
    });

    await newDistrict.save();

    return res.status(201).json({
      success: true,
      message: "District muvaffaqiyatli yaratildi",
      innerData: newDistrict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getDistricts = async (req, res) => {
  try {
    const districts = await District.find({}).populate("region_id");

    return res.status(200).json({
      success: true,
      message: "Barcha districtlar ro'yxati olindi",
      innerData: districts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;

    const district = await District.findById(id).populate("region_id");

    if (!district) {
      return res.status(404).json({
        success: false,
        message: "District topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "District topildi",
      innerData: district,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, region_id } = req.body;

    const updatedDistrict = await District.findByIdAndUpdate(
      id,
      { name, region_id },
      {
        new: true,
        runValidators: true,
      }
    ).populate("region_id");

    if (!updatedDistrict) {
      return res.status(404).json({
        success: false,
        message: "District topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "District muvaffaqiyatli yangilandi",
      innerData: updatedDistrict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDistrict = await District.findByIdAndDelete(id);

    if (!deletedDistrict) {
      return res.status(404).json({
        success: false,
        message: "District topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "District muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchDistrict = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await District.find({
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
      message: "Server xatoligi: District ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
  searchDistrict,
};