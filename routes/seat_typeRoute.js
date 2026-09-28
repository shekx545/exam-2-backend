const { Router } = require("express");
const router = Router();

const {
  createSeatType,
  searchSeatType,
  getSeatTypes,
  getSeatTypeById,
  updateSeatType,
  deleteSeatType,
} = require("../controllers/seat_typeController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createSeatTypeValidationSchema,
  updateSeatTypeValidationSchema,
} = require("../validation/seat_typeValidation");

/**
 * @swagger
 * tags:
 *   name: SeatType
 *   description: Seat Type boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /seat_type/create_seat_type:
 *   post:
 *     summary: Yangi seat type yaratish
 *     tags: [SeatType]
 *     description: Yangi seat type qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Seat type muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_seat_type",validateSchema(createSeatTypeValidationSchema),createSeatType);

/**
 * @swagger
 * /seat_type/get_seat_type:
 *   get:
 *     summary: Barcha seat typelarni olish
 *     tags: [SeatType]
 *     description: Barcha mesta turlari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Seat typelar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_seat_type", getSeatTypes);

/**
 * @swagger
 * /seat_type/search:
 *   get:
 *     summary: Seat typelarni qidirish
 *     tags: [SeatType]
 *     description: O'rindiq turlarini qidirish
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
router.get("/search", searchSeatType);

/**
 * @swagger
 * /seat_type/get_seat_type/{id}:
 *   get:
 *     summary: Seat typeni ID bo'yicha olish
 *     tags: [SeatType]
 *     description: Berilgan ID bo'yicha mesta turi ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seat typeni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seat type topildi
 *       '404':
 *         description: Seat type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_seat_type/:id", getSeatTypeById);

/**
 * @swagger
 * /seat_type/update_seat_type/{id}:
 *   put:
 *     summary: Seat typeni yangilash
 *     tags: [SeatType]
 *     description: Seat type ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Seat typeni yangilash uchun ID
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
 *     responses:
 *       '200':
 *         description: Seat type muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Seat type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_seat_type/:id",validateSchema(updateSeatTypeValidationSchema),updateSeatType);

/**
 * @swagger
 * /seat_type/delete_seat_type/{id}:
 *   delete:
 *     summary: Seat typeni ID bo'yicha o'chirish
 *     tags: [SeatType]
 *     description: Berilgan ID bo'yicha seat typeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Seat type IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seat type muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Seat type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_seat_type/:id", deleteSeatType);

module.exports = router;