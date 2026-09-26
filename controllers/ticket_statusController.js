const { Ticket_status } = require("../model/ticket_statusSchema");

const createTicketStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const newTicketStatus = new Ticket_status({
      name,
    });

    await newTicketStatus.save();

    return res.status(201).json({
      success: true,
      message: "Ticket status muvaffaqiyatli yaratildi",
      innerData: newTicketStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Ticket status yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTicketStatuses = async (req, res) => {
  try {
    const ticketStatuses = await Ticket_status.find({});

    return res.status(200).json({
      success: true,
      message: "Barcha Ticket statuslar ro'yxati olindi",
      innerData: ticketStatuses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Ticket statuslarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTicketStatusById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticketStatus = await Ticket_status.findById(id);

    if (!ticketStatus) {
      return res.status(404).json({
        success: false,
        message: "Ticket status topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket status topildi",
      innerData: ticketStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTicketStatus = await Ticket_status.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTicketStatus) {
      return res.status(404).json({
        success: false,
        message: "Ticket status topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket status muvaffaqiyatli yangilandi",
      innerData: updatedTicketStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTicketStatus = await Ticket_status.findByIdAndDelete(id);

    if (!deletedTicketStatus) {
      return res.status(404).json({
        success: false,
        message: "Ticket status topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket status muvaffaqiyatli o'chirildi",
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
  createTicketStatus,
  getTicketStatuses,
  getTicketStatusById,
  updateTicketStatus,
  deleteTicketStatus,
};