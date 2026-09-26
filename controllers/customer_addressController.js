const { Customer_address } = require("../model/customer_addressSchema");

const createCustomerAddress = async (req, res) => {
  try {
    const {
      customer_id,
      name,
      region_id,
      district_id,
      street,
      house,
      flat_id,
      location,
      post_index,
      info,
    } = req.body;

    const newCustomerAddress = new Customer_address({
      customer_id,
      name,
      region_id,
      district_id,
      street,
      house,
      flat_id,
      location,
      post_index,
      info,
    });

    await newCustomerAddress.save();

    return res.status(201).json({
      success: true,
      message: "Customer address muvaffaqiyatli yaratildi",
      innerData: newCustomerAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Customer address yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCustomerAddresses = async (req, res) => {
  try {
    const customerAddresses = await Customer_address.find({})
      .populate("customer_id")
      .populate("region_id")
      .populate("district_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Customer addresslar ro'yxati olindi",
      innerData: customerAddresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Customer addresslarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCustomerAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const customerAddress = await Customer_address.findById(id)
      .populate("customer_id")
      .populate("region_id")
      .populate("district_id");

    if (!customerAddress) {
      return res.status(404).json({
        success: false,
        message: "Customer address topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer address topildi",
      innerData: customerAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateCustomerAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customer_id,
      name,
      region_id,
      district_id,
      street,
      house,
      flat_id,
      location,
      post_index,
      info,
    } = req.body;

    const updatedCustomerAddress = await Customer_address.findByIdAndUpdate(
      id,
      {
        customer_id,
        name,
        region_id,
        district_id,
        street,
        house,
        flat_id,
        location,
        post_index,
        info,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCustomerAddress) {
      return res.status(404).json({
        success: false,
        message: "Customer address topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer address muvaffaqiyatli yangilandi",
      innerData: updatedCustomerAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteCustomerAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomerAddress = await Customer_address.findByIdAndDelete(id);

    if (!deletedCustomerAddress) {
      return res.status(404).json({
        success: false,
        message: "Customer address topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer address muvaffaqiyatli o'chirildi",
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
  createCustomerAddress,
  getCustomerAddresses,
  getCustomerAddressById,
  updateCustomerAddress,
  deleteCustomerAddress,
};