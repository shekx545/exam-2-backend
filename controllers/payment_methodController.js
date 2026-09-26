const { Payment_method } = require("../model/payment_methodSchema");

const createPaymentMethod = async (req, res) => {
  try {
    const { name } = req.body;

    const newPaymentMethod = new Payment_method({
      name,
    });

    await newPaymentMethod.save();

    return res.status(201).json({
      success: true,
      message: "Payment method muvaffaqiyatli yaratildi",
      innerData: newPaymentMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Payment method yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await Payment_method.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Payment methodlar ro'yxati olindi",
      innerData: paymentMethods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Payment methodlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getPaymentMethodById = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentMethod = await Payment_method.findById(id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment method topildi",
      innerData: paymentMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedPaymentMethod = await Payment_method.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPaymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment method muvaffaqiyatli yangilandi",
      innerData: updatedPaymentMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPaymentMethod = await Payment_method.findByIdAndDelete(id);

    if (!deletedPaymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment method muvaffaqiyatli o'chirildi",
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
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
};