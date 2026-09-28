const { Router } = require("express");
const router = Router();

const {
  createEventType,
  searchEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
} = require("../controllers/event_typeController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createEventTypeValidationSchema,
  updateEventTypeValidationSchema,
} = require("../validation/event_typeValidation");

/**
 * @swagger
 * tags:
 *   name: EventType
 *   description: Event Type boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /event_type/createevent_type:
 *   post:
 *     summary: Yangi event type yaratish
 *     tags: [EventType]
 *     description: Yangi event typeni qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Event type muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/createevent_type",validateSchema(createEventTypeValidationSchema),createEventType);

/**
 * @swagger
 * /event_type/getevent_type:
 *   get:
 *     summary: Barcha event typelarni olish
 *     tags: [EventType]
 *     description: Barcha event typelari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Event typelar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getevent_type", getEventTypes);

/**
 * @swagger
 * /event_type/search:
 *   get:
 *     summary: Event typelarni qidirish
 *     tags: [EventType]
 *     description: Tadbir turlarini qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       '400':
 *         description: Yaroqsiz qidiruv so'rovi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/search", searchEventType);

/**
 * @swagger
 * /event_type/getevent_type/{id}:
 *   get:
 *     summary: Event typeni ID bo'yicha olish
 *     tags: [EventType]
 *     description: Berilgan ID bo'yicha event typeni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Event typeni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event type topildi
 *       '404':
 *         description: Event type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getevent_type/:id", getEventTypeById);

/**
 * @swagger
 * /event_type/updateevent_type/{id}:
 *   put:
 *     summary: Event typeni yangilash
 *     tags: [EventType]
 *     description: Event type ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Event typeni yangilash uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Event type muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Event type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updateevent_type/:id",validateSchema(updateEventTypeValidationSchema),updateEventType);

/**
 * @swagger
 * /event_type/deleteevent_type/{id}:
 *   delete:
 *     summary: Event typeni ID bo'yicha o'chirish
 *     tags: [EventType]
 *     description: Berilgan ID bo'yicha event typeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Event type IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event type muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Event type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deleteevent_type/:id", deleteEventType);

module.exports = router;