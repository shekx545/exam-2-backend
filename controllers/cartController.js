const { Cart } = require("../model/cartSchema");

const createCart = async (req, res) => {
  try {
    const { customer_id, createdAt, fineshedAt, status_id } = req.body;

    const newCart = new Cart({
      customer_id,
      createdAt: createdAt || new Date(),
      fineshedAt: fineshedAt || null,
      status_id,
    });

    await newCart.save();

    return res.status(201).json({
      success: true,
      message: "Savat muvaffaqiyatli yaratildi",
      cart: newCart,
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

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({})
      .populate("customer_id")
      .populate("status_id");

    return res.status(200).json({
      success: true,
      message: "Barcha savatlar ro'yxati olindi",
      innerData: carts,
    });
  } catch (error) {
    console.error("Error fetching carts:", error);
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId)
      .populate("customer_id")
      .populate("status_id");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Savat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Savat topildi!",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { createdAt, fineshedAt } = req.body;

    const updateData = {};
    if (createdAt) updateData.createdAt = createdAt;
    if (fineshedAt !== undefined) updateData.fineshedAt = fineshedAt;

    const updatedCart = await Cart.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Savat topilmadi!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Savat muvaffaqiyatli yangilandi!",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};



const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({
        success: false,
        message: "Savat topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Savat muvaffaqiyatli o'chirildi",
      deletedCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchCart = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Cart.find({
      $or: [
        { customer_id: { $regex: query, $options: "i" } },
        { status_id: { $regex: query, $options: "i" } },
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
      message: "Server xatoligi: Cart ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
  searchCart,
}; 