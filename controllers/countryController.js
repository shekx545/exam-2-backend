const { Country } = require("../model/countrySchema");

const createCountry = async (req, res) => {
  try {
    const { country_name } = req.body;

    const newCountry = new Country({
      country_name,
    });

    await newCountry.save();

    return res.status(201).json({
      success: true,
      message: "Country muvaffaqiyatli yaratildi",
      innerData: newCountry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Country yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Countrylar ro'yxati olindi",
      innerData: countries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await Country.findById(id);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Country topildi",
      innerData: country,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { country_name } = req.body;

    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      { country_name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCountry) {
      return res.status(404).json({
        success: false,
        message: "Country topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Country muvaffaqiyatli yangilandi",
      innerData: updatedCountry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCountry = await Country.findByIdAndDelete(id);

    if (!deletedCountry) {
      return res.status(404).json({
        success: false,
        message: "Country topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Country muvaffaqiyatli o'chirildi",
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
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};