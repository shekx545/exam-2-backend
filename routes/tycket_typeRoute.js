const { Router } = require("express");
const router = Router();

const {
  createTycketType,
  searchTycketType,
  getTycketTypes,
  getTycketTypeById,
  updateTycketType,
  deleteTycketType,
} = require("../controllers/tycket_typeController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createTycketTypeValidationSchema,
  updateTycketTypeValidationSchema,
} = require("../validation/tycket_typeValidation");

/**
 * @swagger
 * tags:
 *   name: TycketType
 *   description: Tycket type boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /tycket_type/create_tycket_type:
 *   post:
 *     summary: Yangi tycket type yaratish
 *     tags: [TycketType]
 *     description: Yangi tycket typeni qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Tycket type muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_tycket_type",validateSchema(createTycketTypeValidationSchema),createTycketType);

/**
 * @swagger
 * /tycket_type/get_tycket_type:
 *   get:
 *     summary: Barcha tycket typelarni olish
 *     tags: [TycketType]
 *     description: Barcha chipta turlari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Tycket typelar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_tycket_type", getTycketTypes);

/**
 * @swagger
 * /tycket_type/search:
 *   get:
 *     summary: Tycket typelarni qidirish
 *     tags: [TycketType]
 *     description: Chipta turlarini qidirish
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
router.get("/search", searchTycketType);

/**
 * @swagger
 * /tycket_type/get_tycket_type/{id}:
 *   get:
 *     summary: Tycket typeni ID bo'yicha olish
 *     tags: [TycketType]
 *     description: Berilgan ID bo'yicha chipta turi ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Tycket typeni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tycket type topildi
 *       '404':
 *         description: Tycket type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_tycket_type/:id", getTycketTypeById);

/**
 * @swagger
 * /tycket_type/update_tycket_type/{id}:
 *   put:
 *     summary: Tycket typeni yangilash
 *     tags: [TycketType]
 *     description: Tycket type ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Tycket typeni yangilash uchun ID
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
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Tycket type muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Tycket type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_tycket_type/:id",validateSchema(updateTycketTypeValidationSchema),updateTycketType);

/**
 * @swagger
 * /tycket_type/delete_tycket_type/{id}:
 *   delete:
 *     summary: Tycket typeni ID bo'yicha o'chirish
 *     tags: [TycketType]
 *     description: Berilgan ID bo'yicha tycket typeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Tycket type IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tycket type muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Tycket type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_tycket_type/:id", deleteTycketType);

module.exports = router;