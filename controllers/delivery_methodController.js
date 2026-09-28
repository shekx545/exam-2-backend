const { Delivery_method } = require("../model/delivery_methodSchema");

const createDeliveryMethod = async (req, res) => {
  try {
    const { name } = req.body;

    const newDeliveryMethod = new Delivery_method({
      name,
    });

    await newDeliveryMethod.save();

    return res.status(201).json({
      success: true,
      message: "Delivery method muvaffaqiyatli yaratildi",
      innerData: newDeliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Delivery method yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getDeliveryMethods = async (req, res) => {
  try {
    const deliveryMethods = await Delivery_method.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Delivery methodlar ro'yxati olindi",
      innerData: deliveryMethods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Delivery methodlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getDeliveryMethodById = async (req, res) => {
  try {
    const { id } = req.params;

    const deliveryMethod = await Delivery_method.findById(id);

    if (!deliveryMethod) {
      return res.status(404).json({
        success: false,
        message: "Delivery method topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery method topildi",
      innerData: deliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateDeliveryMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedDeliveryMethod = await Delivery_method.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDeliveryMethod) {
      return res.status(404).json({
        success: false,
        message: "Delivery method topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery method muvaffaqiyatli yangilandi",
      innerData: updatedDeliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteDeliveryMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDeliveryMethod = await Delivery_method.findByIdAndDelete(id);

    if (!deletedDeliveryMethod) {
      return res.status(404).json({
        success: false,
        message: "Delivery method topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery method muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const searchDeliveryMethod = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Delivery_method.find({
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
      message: "Server xatoligi: Delivery method ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};

module.exports = {
  createDeliveryMethod,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  deleteDeliveryMethod,
  searchDeliveryMethod,
};