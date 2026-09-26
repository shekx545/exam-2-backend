const { Event } = require("../model/eventSchema");

const createEvent = async (req, res) => {
  try {
    const {
      name,
      photo,
      start_date,
      start_time,
      finish_date,
      finish_time,
      info,
      event_type_id,
      human_category_id,
      venue_id,
      lang_id,
      release_date,
    } = req.body;

    const newEvent = new Event({
      name,
      photo,
      start_date,
      start_time,
      finish_date,
      finish_time,
      info,
      event_type_id,
      human_category_id,
      venue_id,
      lang_id,
      release_date,
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: "Event muvaffaqiyatli yaratildi",
      innerData: newEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Event yaratishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("event_type_id")
      .populate("human_category_id")
      .populate("venue_id")
      .populate("lang_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Eventlar ro'yxati olindi",
      innerData: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik: Eventlarni olishda xato yuz berdi",
      error: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id)
      .populate("event_type_id")
      .populate("human_category_id")
      .populate("venue_id")
      .populate("lang_id");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event topildi",
      innerData: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      photo,
      start_date,
      start_time,
      finish_date,
      finish_time,
      info,
      event_type_id,
      human_category_id,
      venue_id,
      lang_id,
      release_date,
    } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        name,
        photo,
        start_date,
        start_time,
        finish_date,
        finish_time,
        info,
        event_type_id,
        human_category_id,
        venue_id,
        lang_id,
        release_date,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event muvaffaqiyatli yangilandi",
      innerData: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event muvaffaqiyatli o'chirildi",
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
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};