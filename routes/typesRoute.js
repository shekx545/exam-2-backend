const { Router } = require("express");
const router = Router();

const {
  createType,
  getTypes,
  getTypeById,
  updateType,
  deleteType,
} = require("../controllers/typesController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createTypeValidationSchema,
  updateTypeValidationSchema,
} = require("../validation/typesValidation");

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Types boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /types/createtypes:
 *   post:
 *     summary: Yangi type yaratish
 *     tags: [Types]
 *     description: Yangi turni qo'shish
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
 *         description: Type muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/createtypes",validateSchema(createTypeValidationSchema),createType);

/**
 * @swagger
 * /types/gettypes:
 *   get:
 *     summary: Barcha typelarni olish
 *     tags: [Types]
 *     description: Barcha turlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Typelar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/gettypes", getTypes);

/**
 * @swagger
 * /types/gettypes/{id}:
 *   get:
 *     summary: Typeni ID bo'yicha olish
 *     tags: [Types]
 *     description: Berilgan ID bo'yicha tur ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Typeni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Type topildi
 *       '404':
 *         description: Type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/gettypes/:id", getTypeById);

/**
 * @swagger
 * /types/updatetypes/{id}:
 *   put:
 *     summary: Typeni yangilash
 *     tags: [Types]
 *     description: Type ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Typeni yangilash uchun ID
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
 *         description: Type muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updatetypes/:id",validateSchema(updateTypeValidationSchema),updateType);

/**
 * @swagger
 * /types/deletetypes/{id}:
 *   delete:
 *     summary: Typeni ID bo'yicha o'chirish
 *     tags: [Types]
 *     description: Berilgan ID bo'yicha typeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Type IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Type muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletetypes/:id", deleteType);

module.exports = router;