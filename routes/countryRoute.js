const { Router } = require("express");
const router = Router();

const {
  createCountry,
  searchCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} = require("../controllers/countryController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createCountryValidationSchema,
  updateCountryValidationSchema,
} = require("../validation/countryValidation");

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Country boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /country/create_country:
 *   post:
 *     summary: Yangi country yaratish
 *     tags: [Country]
 *     description: Yangi country nomini qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Country muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_country",validateSchema(createCountryValidationSchema),createCountry);

/**
 * @swagger
 * /country/get_country:
 *   get:
 *     summary: Barcha countrylarni olish
 *     tags: [Country]
 *     description: Barcha countrylar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Countrylar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_country", getCountries);

/**
 * @swagger
 * /country/search:
 *   get:
 *     summary: Countrylarni qidirish
 *     tags: [Country]
 *     description: Mamlakat ma'lumotlarini qidirish
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
router.get("/search", searchCountry);

/**
 * @swagger
 * /country/get_country/{id}:
 *   get:
 *     summary: Countryni ID bo'yicha olish
 *     tags: [Country]
 *     description: Berilgan ID bo'yicha country ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Countryni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Country topildi
 *       '404':
 *         description: Country topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_country/:id", getCountryById);

/**
 * @swagger
 * /country/update_country/{id}:
 *   put:
 *     summary: Countryni yangilash
 *     tags: [Country]
 *     description: Country ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Countryni yangilash uchun ID
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
 *               country_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Country muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Country topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_country/:id",validateSchema(updateCountryValidationSchema),updateCountry);

/**
 * @swagger
 * /country/delete_country/{id}:
 *   delete:
 *     summary: Countryni ID bo'yicha o'chirish
 *     tags: [Country]
 *     description: Berilgan ID bo'yicha countryni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Country IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Country muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Country topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_country/:id", deleteCountry);

module.exports = router;