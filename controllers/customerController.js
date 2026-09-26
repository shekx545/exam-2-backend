const { Customer } = require("../model/customerSchema");

const createCustomer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      hashed_password,
      email,
      birth_date,
      gender_id,
      lang_id,
      hashed_refresh_token,
    } = req.body;

    const newCustomer = new Customer({
      first_name,
      last_name,
      phone,
      hashed_password,
      email,
      birth_date,
      gender_id,
      lang_id,
      hashed_refresh_token,
    });

    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: "Customer muvaffaqiyatli yaratildi",
      innerData: newCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Customer yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({})
      .populate("gender_id")
      .populate("lang_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Customerlar ro'yxati olindi",
      innerData: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Customerlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id)
      .populate("gender_id")
      .populate("lang_id");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer topildi",
      innerData: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone,
      hashed_password,
      email,
      birth_date,
      gender_id,
      lang_id,
      hashed_refresh_token,
    } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone,
        hashed_password,
        email,
        birth_date,
        gender_id,
        lang_id,
        hashed_refresh_token,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer muvaffaqiyatli yangilandi",
      innerData: updatedCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer muvaffaqiyatli o'chirildi",
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
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};