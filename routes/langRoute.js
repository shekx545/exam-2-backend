const { Router } = require("express");
const router = Router();

const {
  createLang,
  getLangs,
  getLangById,
  updateLang,
  deleteLang,
} = require("../controllers/langController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createLangValidationSchema,
  updateLangValidationSchema,
} = require("../validation/langValidation");

/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: Lang boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /lang/createlang:
 *   post:
 *     summary: Yangi lang yaratish
 *     tags: [Lang]
 *     description: Yangi langni qo'shish
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
 *         description: Lang muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/createlang",validateSchema(createLangValidationSchema),createLang);

/**
 * @swagger
 * /lang/getlang:
 *   get:
 *     summary: Barcha langlarni olish
 *     tags: [Lang]
 *     description: Barcha tillar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Langlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getlang", getLangs);

/**
 * @swagger
 * /lang/getlang/{id}:
 *   get:
 *     summary: Langni ID bo'yicha olish
 *     tags: [Lang]
 *     description: Berilgan ID bo'yicha til ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Langni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lang topildi
 *       '404':
 *         description: Lang topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getlang/:id", getLangById);

/**
 * @swagger
 * /lang/updatelang/{id}:
 *   put:
 *     summary: Langni yangilash
 *     tags: [Lang]
 *     description: Lang ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Langni yangilash uchun ID
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
 *         description: Lang muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Lang topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updatelang/:id",validateSchema(updateLangValidationSchema),updateLang);

/**
 * @swagger
 * /lang/deletelang/{id}:
 *   delete:
 *     summary: Langni ID bo'yicha o'chirish
 *     tags: [Lang]
 *     description: Berilgan ID bo'yicha langni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Lang IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lang muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Lang topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletelang/:id", deleteLang);

module.exports = router;