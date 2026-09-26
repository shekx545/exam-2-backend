const { Router } = require("express");
const router = Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createEventValidationSchema,
  updateEventValidationSchema,
} = require("../validation/eventValidation");

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /event/create_event:
 *   post:
 *     summary: Yangi event yaratish
 *     tags: [Event]
 *     description: Yangi event yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '201':
 *         description: Event muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_event",validateSchema(createEventValidationSchema),createEvent);

/**
 * @swagger
 * /event/get_event:
 *   get:
 *     summary: Barcha eventlarni olish
 *     tags: [Event]
 *     description: Barcha eventlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Eventlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_event", getEvents);

/**
 * @swagger
 * /event/get_event/{id}:
 *   get:
 *     summary: Eventni ID bo'yicha olish
 *     tags: [Event]
 *     description: Berilgan ID bo'yicha event ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Eventni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event topildi
 *       '404':
 *         description: Event topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_event/:id", getEventById);

/**
 * @swagger
 * /event/update_event/{id}:
 *   put:
 *     summary: Eventni yangilash
 *     tags: [Event]
 *     description: Event ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Eventni yangilash uchun ID
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
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Event muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Event topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_event/:id",validateSchema(updateEventValidationSchema),updateEvent);

/**
 * @swagger
 * /event/delete_event/{id}:
 *   delete:
 *     summary: Eventni ID bo'yicha o'chirish
 *     tags: [Event]
 *     description: Berilgan ID bo'yicha eventni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Event IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Event topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_event/:id", deleteEvent);

module.exports = router;