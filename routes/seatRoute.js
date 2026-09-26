const { Router } = require("express");
const router = Router();

const {
  createSeat,
  getSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
} = require("../controllers/seatController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createSeatValidationSchema,
  updateSeatValidationSchema,
} = require("../validation/seatValidation");

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: Seat boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /seat/create_seat:
 *   post:
 *     summary: Yangi seat yaratish
 *     tags: [Seat]
 *     description: Obyektdagi seatni yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: string
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Seat muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_seat",validateSchema(createSeatValidationSchema),createSeat);

/**
 * @swagger
 * /seat/get_seat:
 *   get:
 *     summary: Barcha seatlarni olish
 *     tags: [Seat]
 *     description: Barcha seatlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Seatlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_seat", getSeats);

/**
 * @swagger
 * /seat/get_seat/{id}:
 *   get:
 *     summary: Seatni ID bo'yicha olish
 *     tags: [Seat]
 *     description: Berilgan ID bo'yicha seat ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seatni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seat topildi
 *       '404':
 *         description: Seat topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_seat/:id", getSeatById);

/**
 * @swagger
 * /seat/update_seat/{id}:
 *   put:
 *     summary: Seatni yangilash
 *     tags: [Seat]
 *     description: Seat ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seatni yangilash uchun ID
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
 *               sector_id:
 *                 type: string
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Seat muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Seat topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_seat/:id",validateSchema(updateSeatValidationSchema),updateSeat);

/**
 * @swagger
 * /seat/delete_seat/{id}:
 *   delete:
 *     summary: Seatni ID bo'yicha o'chirish
 *     tags: [Seat]
 *     description: Berilgan ID bo'yicha seatni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Seat IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seat muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Seat topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_seat/:id", deleteSeat);

module.exports = router;