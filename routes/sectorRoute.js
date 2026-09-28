const { Router } = require("express");
const router = Router();

const {
  createSector,
  searchSector,
  getSectors,
  getSectorById,
  updateSector,
  deleteSector,
} = require("../controllers/sectorController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createSectorValidationSchema,
  updateSectorValidationSchema,
} = require("../validation/sectorValidation");

/**
 * @swagger
 * tags:
 *   name: Sector
 *   description: Sector boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /sector/createsector:
 *   post:
 *     summary: Yangi sector yaratish
 *     tags: [Sector]
 *     description: Yangi sector qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Sector muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/createsector",validateSchema(createSectorValidationSchema),createSector);

/**
 * @swagger
 * /sector/getsector:
 *   get:
 *     summary: Barcha sectorlarni olish
 *     tags: [Sector]
 *     description: Barcha sektorlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Sectorlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getsector", getSectors);

/**
 * @swagger
 * /sector/search:
 *   get:
 *     summary: Sectorlarni qidirish
 *     tags: [Sector]
 *     description: Sektor ma'lumotlarini qidirish
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
router.get("/search", searchSector);

/**
 * @swagger
 * /sector/getsector/{id}:
 *   get:
 *     summary: Sectorni ID bo'yicha olish
 *     tags: [Sector]
 *     description: Berilgan ID bo'yicha sektor ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Sectorni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sector topildi
 *       '404':
 *         description: Sector topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getsector/:id", getSectorById);

/**
 * @swagger
 * /sector/updatesector/{id}:
 *   put:
 *     summary: Sectorni yangilash
 *     tags: [Sector]
 *     description: Sector ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Sectorni yangilash uchun ID
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
 *               sector_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sector muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Sector topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updatesector/:id",validateSchema(updateSectorValidationSchema),updateSector);

/**
 * @swagger
 * /sector/deletesector/{id}:
 *   delete:
 *     summary: Sectorni ID bo'yicha o'chirish
 *     tags: [Sector]
 *     description: Berilgan ID bo'yicha sectorni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Sector IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sector muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Sector topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletesector/:id", deleteSector);

module.exports = router;