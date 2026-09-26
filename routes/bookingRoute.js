const { Router } = require("express");
const router = Router();

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createBookingValidationSchema,
  updateBookingValidationSchema,
} = require("../validation/bookingValidation");

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking xizmati uchun API endpointlari
 */

/**
 * @swagger
 * /booking/createbooking:
 *   post:
 *     summary: Yangi booking yaratish
 *     tags: [Booking]
 *     description: Yangi band qilish yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *               payment_method_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               discount_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               fineshed:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Booking muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post( "/createbooking", validateSchema(createBookingValidationSchema), createBooking );

/**
 * @swagger
 * /booking/getbooking:
 *   get:
 *     summary: Barcha bookinglarni olish
 *     tags: [Booking]
 *     description: Barcha band qilishlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Bookinglar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getbooking", getBookings);

/**
 * @swagger
 * /booking/getbooking/{id}:
 *   get:
 *     summary: Bookingni ID bo'yicha olish
 *     tags: [Booking]
 *     description: Bookingni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Booking olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Booking muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getbooking/:id", getBookingById);

/**
 * @swagger
 * /booking/updatebooking/{id}:
 *   put:
 *     summary: Bookingni yangilash
 *     tags: [Booking]
 *     description: Booking ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Bookingni yangilash uchun ID
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
 *               cart_id:
 *                 type: string
 *               payment_method_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               discount_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               fineshed:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Booking muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.put( "/updatebooking/:id", validateSchema(updateBookingValidationSchema), updateBooking );

/**
 * @swagger
 * /booking/deletebooking/{id}:
 *   delete:
 *     summary: Bookingni ID bo'yicha o'chirish
 *     tags: [Booking]
 *     description: Berilgan ID bo'yicha bookingni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Booking IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Booking muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Booking topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.delete("/deletebooking/:id", deleteBooking);

module.exports = router;