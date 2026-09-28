const { Router } = require("express");
const router = Router();

const {
  createDiscount,
  searchDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discountController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createDiscountValidationSchema,
  updateDiscountValidationSchema,
} = require("../validation/discountValidation");

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Chegirma (Discount) xizmati uchun API endpointlari
 */

/**
 * @swagger
 * /discount/creatediscount:
 *   post:
 *     summary: Yangi chegirma yaratish
 *     tags: [Discount]
 *     description: Yangi chegirma ma'lumotlarini qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Discount muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/creatediscount",validateSchema(createDiscountValidationSchema),createDiscount);

/**
 * @swagger
 * /discount/getdiscount:
 *   get:
 *     summary: Barcha chegirmalarni olish
 *     tags: [Discount]
 *     description: Barcha chegirmalar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Discountlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getdiscount", getDiscounts);

/**
 * @swagger
 * /discount/search:
 *   get:
 *     summary: Discountlarni qidirish
 *     tags: [Discount]
 *     description: Chegirma ma'lumotlarini qidirish
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
router.get("/search", searchDiscount);

/**
 * @swagger
 * /discount/getdiscount/{id}:
 *   get:
 *     summary: Chegirmani ID bo'yicha olish
 *     tags: [Discount]
 *     description: Berilgan ID bo'yicha chegirma ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Chegirmani olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Discount topildi
 *       '404':
 *         description: Discount topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getdiscount/:id", getDiscountById);

/**
 * @swagger
 * /discount/updatediscount/{id}:
 *   put:
 *     summary: Chegirmani yangilash
 *     tags: [Discount]
 *     description: Chegirma ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Chegirmani yangilash uchun ID
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
 *               discount:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Discount muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Discount topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updatediscount/:id",validateSchema(updateDiscountValidationSchema),updateDiscount);

/**
 * @swagger
 * /discount/deletediscount/{id}:
 *   delete:
 *     summary: Chegirmani ID bo'yicha o'chirish
 *     tags: [Discount]
 *     description: Berilgan ID bo'yicha chegirmani o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Discount IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Discount muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Discount topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletediscount/:id", deleteDiscount);

module.exports = router;