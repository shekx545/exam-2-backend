const { Router } = require("express");
const router = Router();

const {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
} = require("../controllers/flatController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createFlatValidationSchema,
  updateFlatValidationSchema,
} = require("../validation/flatValidation");

/**
 * @swagger
 * tags:
 *   name: Flat
 *   description: Flat boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /flat/createflat:
 *   post:
 *     summary: Yangi flat yaratish
 *     tags: [Flat]
 *     description: Yangi flat ma'lumotlarini qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: number
 *               condition:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Flat muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/createflat",validateSchema(createFlatValidationSchema),createFlat);

/**
 * @swagger
 * /flat/getflat:
 *   get:
 *     summary: Barcha flatlarni olish
 *     tags: [Flat]
 *     description: Barcha flatlarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Flatlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getflat", getFlats);

/**
 * @swagger
 * /flat/getflat/{id}:
 *   get:
 *     summary: Flatni ID bo'yicha olish
 *     tags: [Flat]
 *     description: Berilgan ID bo'yicha flat ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Flatni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Flat topildi
 *       '404':
 *         description: Flat topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getflat/:id", getFlatById);

/**
 * @swagger
 * /flat/updateflat/{id}:
 *   put:
 *     summary: Flatni yangilash
 *     tags: [Flat]
 *     description: Flat ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Flatni yangilash uchun ID
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
 *               etaj:
 *                 type: number
 *               condition:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Flat muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Flat topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updateflat/:id",validateSchema(updateFlatValidationSchema),updateFlat);

/**
 * @swagger
 * /flat/deleteflat/{id}:
 *   delete:
 *     summary: Flatni ID bo'yicha o'chirish
 *     tags: [Flat]
 *     description: Berilgan ID bo'yicha flatni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Flat IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Flat muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Flat topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deleteflat/:id", deleteFlat);

module.exports = router;