const { Customer_card } = require("../model/customer_cardSchema");

const createCustomerCard = async (req, res) => {
  try {
    const {
      customer_id,
      name,
      phone,
      number,
      year,
      month,
      is_active,
      is_main,
    } = req.body;

    const newCustomerCard = new Customer_card({
      customer_id,
      name,
      phone,
      number,
      year,
      month,
      is_active,
      is_main,
    });

    await newCustomerCard.save();

    return res.status(201).json({
      success: true,
      message: "Customer card muvaffaqiyatli yaratildi",
      innerData: newCustomerCard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Customer card yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCustomerCards = async (req, res) => {
  try {
    const customerCards = await Customer_card.find({}).populate("customer_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Customer cardlar ro'yxati olindi",
      innerData: customerCards,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Customer cardlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCustomerCardById = async (req, res) => {
  try {
    const { id } = req.params;

    const customerCard = await Customer_card.findById(id)
    .populate("customer_id");

    if (!customerCard) {
      return res.status(404).json({
        success: false,
        message: "Customer card topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer card topildi",
      innerData: customerCard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateCustomerCard = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customer_id,
      name,
      phone,
      number,
      year,
      month,
      is_active,
      is_main,
    } = req.body;

    const updatedCustomerCard = await Customer_card.findByIdAndUpdate(
      id,
      {
        customer_id,
        name,
        phone,
        number,
        year,
        month,
        is_active,
        is_main,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCustomerCard) {
      return res.status(404).json({
        success: false,
        message: "Customer card topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer card muvaffaqiyatli yangilandi",
      innerData: updatedCustomerCard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteCustomerCard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomerCard = await Customer_card.findByIdAndDelete(id);

    if (!deletedCustomerCard) {
      return res.status(404).json({
        success: false,
        message: "Customer card topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer card muvaffaqiyatli o'chirildi",
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
  createCustomerCard,
  getCustomerCards,
  getCustomerCardById,
  updateCustomerCard,
  deleteCustomerCard,
};