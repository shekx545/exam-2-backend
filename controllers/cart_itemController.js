const { Cart_item } = require("../model/cart_itemSchema");

const createCartItem = async (req, res) => {
  try {
    const { ticket_id, cart_id } = req.body;

    const newCartItem = new Cart_item({
      ticket_id,
      cart_id,
    });

    await newCartItem.save();

    return res.status(201).json({
      success: true,
      message: "Cart item muvaffaqiyatli yaratildi.",
      innerData: newCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Cart item yaratishda xato yuz berdi.",
      error: error.message,
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart_item.find({})
      .populate("ticket_id")
      .populate("cart_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Cart itemlar ro'yxati olindi.",
      innerData: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart_item.findById(id)
      .populate("ticket_id")
      .populate("cart_id");

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item topildi.",
      innerData: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi.",
      error: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { ticket_id, cart_id } = req.body;

    const updateData = {
      ticket_id,
      cart_id,
    };

    const updatedCartItem = await Cart_item.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("ticket_id")
      .populate("cart_id");

    if (!updatedCartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item muvaffaqiyatli yangilandi",
      innerData: updatedCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCartItem = await Cart_item.findByIdAndDelete(id);

    if (!deletedCartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item muvaffaqiyatli o'chirildi",
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
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};