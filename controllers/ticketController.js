const { Ticket } = require("../model/ticketSchema");

const createTicket = async (req, res) => {
  try {
    const {
      event_id,
      seat_id,
      price,
      service_fee,
      status_id,
      ticket_type_id,
    } = req.body;

    const newTicket = new Ticket({
      event_id,
      seat_id,
      price,
      service_fee,
      status_id,
      ticket_type_id,
    });

    await newTicket.save();

    return res.status(201).json({
      success: true,
      message: "Ticket muvaffaqiyatli yaratildi",
      innerData: newTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Ticket yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate("event_id")
      .populate("seat_id")
      .populate("status_id")
      .populate("ticket_type_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Ticketlar ro'yxati olindi",
      innerData: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Ticketlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id)
      .populate("event_id")
      .populate("seat_id")
      .populate("status_id")
      .populate("ticket_type_id");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket topildi",
      innerData: ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      event_id,
      seat_id,
      price,
      service_fee,
      status_id,
      ticket_type_id,
    } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      {
        event_id,
        seat_id,
        price,
        service_fee,
        status_id,
        ticket_type_id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket muvaffaqiyatli yangilandi",
      innerData: updatedTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket muvaffaqiyatli o'chirildi",
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
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};