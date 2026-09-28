const { Router } = require("express");
const router = Router();

const {
  createGender,
  searchGender,
  getGenders,
  getGenderById,
  updateGender,
  deleteGender,
} = require("../controllers/genderController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createGenderValidationSchema,
  updateGenderValidationSchema,
} = require("../validation/genderValidation");

/**
 * @swagger
 * tags:
 *   name: Gender
 *   description: Gender boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /gender/creategender:
 *   post:
 *     summary: Yangi gender yaratish
 *     tags: [Gender]
 *     description: Yangi genderni qo'shish
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
 *         description: Gender muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/creategender",validateSchema(createGenderValidationSchema),createGender);

/**
 * @swagger
 * /gender/getgender:
 *   get:
 *     summary: Barcha genderlarni olish
 *     tags: [Gender]
 *     description: Barcha jinslar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Genderlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getgender", getGenders);

/**
 * @swagger
 * /gender/search:
 *   get:
 *     summary: Genderlarni qidirish
 *     tags: [Gender]
 *     description: Jins ma'lumotlarini qidirish
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
router.get("/search", searchGender);

/**
 * @swagger
 * /gender/getgender/{id}:
 *   get:
 *     summary: Genderni ID bo'yicha olish
 *     tags: [Gender]
 *     description: Berilgan ID bo'yicha jins ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Genderni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Gender topildi
 *       '404':
 *         description: Gender topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getgender/:id", getGenderById);

/**
 * @swagger
 * /gender/updategender/{id}:
 *   put:
 *     summary: Genderni yangilash
 *     tags: [Gender]
 *     description: Gender ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Genderni yangilash uchun ID
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
 *         description: Gender muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Gender topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updategender/:id",validateSchema(updateGenderValidationSchema),updateGender);

/**
 * @swagger
 * /gender/deletegender/{id}:
 *   delete:
 *     summary: Genderni ID bo'yicha o'chirish
 *     tags: [Gender]
 *     description: Berilgan ID bo'yicha genderatni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Gender IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Gender muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Gender topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletegender/:id", deleteGender);

module.exports = router;