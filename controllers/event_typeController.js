const { Event_type } = require("../model/event_typeSchema");

const createEventType = async (req, res) => {
  try {
    const { name, parent_event_type_id } = req.body;

    const newEventType = new Event_type({
      name,
      parent_event_type_id,
    });

    await newEventType.save();

    return res.status(201).json({
      success: true,
      message: "Event type muvaffaqiyatli yaratildi",
      innerData: newEventType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getEventTypes = async (req, res) => {
  try {
    const eventTypes = await Event_type.find({}).populate("parent_event_type_id");

    return res.status(200).json({
      success: true,
      message: "Barcha Event typelar ro'yxati olindi",
      innerData: eventTypes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const getEventTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const eventType = await Event_type.findById(id).populate("parent_event_type_id");

    if (!eventType) {
      return res.status(404).json({
        success: false,
        message: "Event type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event type topildi",
      innerData: eventType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent_event_type_id } = req.body;

    const updatedEventType = await Event_type.findByIdAndUpdate(
      id,
      { name, parent_event_type_id },
      {
        new: true,
        runValidators: true,
      }
    ).populate("parent_event_type_id");

    if (!updatedEventType) {
      return res.status(404).json({
        success: false,
        message: "Event type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event type muvaffaqiyatli yangilandi",
      innerData: updatedEventType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverdagi ichki xatolik",
      error: error.message,
    });
  }
};

const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEventType = await Event_type.findByIdAndDelete(id);

    if (!deletedEventType) {
      return res.status(404).json({
        success: false,
        message: "Event type topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event type muvaffaqiyatli o'chirildi",
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
  createEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
};