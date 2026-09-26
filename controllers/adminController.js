const { Admin } = require("../model/adminSchema");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { name, login, password, is_active, is_creator } = req.body;

    const existingAdmin = await Admin.findOne({ login });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Bu login allaqachon mavjud",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      login,
      password: hashedPassword, 
      is_active,
      is_creator,
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin muvaffaqiyatli yaratildi",
      innerData: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};


const searchAdmin = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Yaroqsiz qidiruv so'rovi.",
      });
    }

    const result = await Admin.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } },
      ],
    }).select("-hashed_password -hashed_refresh_token");

    return res.status(200).json({
      success: true,
      message: "Qidiruv natijalari:",
      innerData: result,
    });
  } catch (error) {
    console.error("Search error:", error);

    return res.status(500).json({
      success: false,
      message: "Server xatoligi: Admin ma'lumotlarini yuklab bo'lmadi.",
      error: error.message,
    });
  }
};


const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({})
      .select("-hashed_password -hashed_refresh_token");

    return res.status(200).json({
      success: true,
      message: "Barcha Admin ro'yxati olingan.",
      innerData: admin,
    });
  } catch (error) {
    console.error("Error fetching admin:", error);

    return res.status(500).json({
      success: false,
      message: "Server xatosi: Admin olishda xato yuz berdi.",
      error: error.message,
    });
  }
};


const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await Admin.findById(adminId)
      .select("-hashed_password -hashed_refresh_token");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin topildi.",
      admin,
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server xatosi.",
      error: error.message,
    });
  }
};


const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server xatosi.",
      error: error.message,
    });
  }
};


const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      login,
      password,
    } = req.body;

    const updateData = {
      name,
      login,
      password,
    };

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }
    ).select("-hashed_password -hashed_refresh_token");

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin muvaffaqiyatli yangilandi.",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error("Update error:", error);

    return res.status(500).json({
      success: false,
      message: "Server xatosi.",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  searchAdmin,
  getAdmin,
  getAdminById,
  deleteAdmin,
  updateAdmin,
};