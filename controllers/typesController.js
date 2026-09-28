const { Types } = require("../model/typesSchema");

const createType = async (req, res) => {
  try {
    const { name } = req.body;

    const newType = new Types({
      name,
    });

    await newType.save();

    return res.status(201).json({
      success: true,
      message: "Type muvaffaqiyatli yaratildi",
      innerData: newType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Type yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await Types.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Typelar ro'yxati olindi",
      innerData: types,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Typelarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const typeItem = await Types.findById(id);

    if (!typeItem) {
      return res.status(404).json({
        success: false,
        message: "Type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Type topildi",
      innerData: typeItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedType = await Types.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedType) {
      return res.status(404).json({
        success: false,
        message: "Type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Type muvaffaqiyatli yangilandi",
      innerData: updatedType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedType = await Types.findByIdAndDelete(id);

    if (!deletedType) {
      return res.status(404).json({
        success: false,
        message: "Type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Type muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Types.find({
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
      message: "Server xatoligi: Type ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createType,
  getTypes,
  getTypeById,
  updateType,
  deleteType,
  searchType,
};