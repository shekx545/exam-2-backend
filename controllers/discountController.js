const { Discount } = require("../model/discountSchema");

const createDiscount = async (req, res) => {
  try {
    const { discount, finish_date } = req.body;

    const newDiscount = new Discount({
      discount,
      finish_date,
    });

    await newDiscount.save();

    return res.status(201).json({
      success: true,
      message: "Discount muvaffaqiyatli yaratildi",
      innerData: newDiscount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatoliki",
      error: error.message,
    });
  }
};

const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Discountlar ro'yxati olindi",
      innerData: discounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;

    const discount = await Discount.findById(id);

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: "Discount topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount topildi",
      innerData: discount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { discount, finish_date } = req.body;

    const updatedDiscount = await Discount.findByIdAndUpdate(
      id,
      { discount, finish_date },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount muvaffaqiyatli yangilandi",
      innerData: updatedDiscount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDiscount = await Discount.findByIdAndDelete(id);

    if (!deletedDiscount) {
      return res.status(404).json({
        success: false,
        message: "Discount topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchDiscount = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Discount.find({
      $or: [
        { discount: { $regex: query, $options: "i" } },
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
      message: "Server xatoligi: Discount ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  searchDiscount,
};