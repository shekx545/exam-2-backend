const { Router } = require("express");
const router = Router();

const {
  createVenueType,
  searchVenueType,
  getVenueTypes,
  getVenueTypeById,
  updateVenueType,
  deleteVenueType,
} = require("../controllers/venue_typesController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createVenueTypeValidationSchema,
  updateVenueTypeValidationSchema,
} = require("../validation/venue_typesValidation");

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: Venue Types boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /venue_types/create_venue_types:
 *   post:
 *     summary: Yangi venue type yaratish
 *     tags: [VenueTypes]
 *     description: Venue va Types o'rtasida yangi bog'liqlik yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue type muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_venue_types",validateSchema(createVenueTypeValidationSchema),createVenueType);

/**
 * @swagger
 * /venue_types/get_venue_types:
 *   get:
 *     summary: Barcha venue_typesni olish
 *     tags: [VenueTypes]
 *     description: Barcha venue_types bog'liqliklari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Venue typelar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_venue_types", getVenueTypes);

/**
 * @swagger
 * /venue_types/search:
 *   get:
 *     summary: Venue typeslarni qidirish
 *     tags: [VenueTypes]
 *     description: Joy turlarini qidirish
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
router.get("/search", searchVenueType);

/**
 * @swagger
 * /venue_types/get_venue_types/{id}:
 *   get:
 *     summary: Venue typeni ID bo'yicha olish
 *     tags: [VenueTypes]
 *     description: Berilgan ID bo'yicha joy turi bog'liqligi ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venue typeni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue type topildi
 *       '404':
 *         description: Venue type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_venue_types/:id", getVenueTypeById);

/**
 * @swagger
 * /venue_types/update_venue_types/{id}:
 *   put:
 *     summary: Venue typeni yangilash
 *     tags: [VenueTypes]
 *     description: Venue type ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venue typeni yangilash uchun ID
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
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue type muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Venue type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_venue_types/:id",validateSchema(updateVenueTypeValidationSchema),updateVenueType);

/**
 * @swagger
 * /venue_types/delete_venue_types/{id}:
 *   delete:
 *     summary: Venue typeni ID bo'yicha o'chirish
 *     tags: [VenueTypes]
 *     description: Berilgan ID bo'yicha venue typeni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Venue type IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue type muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Venue type topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_venue_types/:id", deleteVenueType);

module.exports = router;