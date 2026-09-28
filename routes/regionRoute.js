const { Router } = require("express");
const router = Router();

const {
  createRegion,
  searchRegion,
  getRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
} = require("../controllers/regionController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createRegionValidationSchema,
  updateRegionValidationSchema,
} = require("../validation/regionValidation");

/**
 * @swagger
 * tags:
 *   name: Region
 *   description: Region boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /region/create_region:
 *   post:
 *     summary: Yangi region yaratish
 *     tags: [Region]
 *     description: Yangi region qo'shish
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
 *         description: Region muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post(
  "/create_region",
  validateSchema(createRegionValidationSchema),
  createRegion
);

/**
 * @swagger
 * /region/get_region:
 *   get:
 *     summary: Barcha regionlarni olish
 *     tags: [Region]
 *     description: Barcha regionlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Regionlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_region", getRegions);

/**
 * @swagger
 * /region/search:
 *   get:
 *     summary: Regionlarni qidirish
 *     tags: [Region]
 *     description: Viloyat ma'lumotlarini qidirish
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
router.get("/search", searchRegion);

/**
 * @swagger
 * /region/get_region/{id}:
 *   get:
 *     summary: Regionni ID bo'yicha olish
 *     tags: [Region]
 *     description: Berilgan ID bo'yicha region ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Regionni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Region topildi
 *       '404':
 *         description: Region topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_region/:id", getRegionById);

/**
 * @swagger
 * /region/update_region/{id}:
 *   put:
 *     summary: Regionni yangilash
 *     tags: [Region]
 *     description: Region ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Regionni yangilash uchun ID
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
 *         description: Region muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Region topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_region/:id",validateSchema(updateRegionValidationSchema),updateRegion);

/**
 * @swagger
 * /region/delete_region/{id}:
 *   delete:
 *     summary: Regionni ID bo'yicha o'chirish
 *     tags: [Region]
 *     description: Berilgan ID bo'yicha regionni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Region IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Region muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Region topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_region/:id", deleteRegion);

module.exports = router;