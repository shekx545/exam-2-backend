const { Router } = require("express");
const router = Router();

const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} = require("../controllers/venueController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createVenueValidationSchema,
  updateVenueValidationSchema,
} = require("../validation/venueValidation");

/**
 * @swagger
 * tags:
 *   name: Venue
 *   description: Venue boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /venue/create_venue:
 *   post:
 *     summary: Yangi venue yaratish
 *     tags: [Venue]
 *     description: Yangi venue qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_venue",validateSchema(createVenueValidationSchema),createVenue);

/**
 * @swagger
 * /venue/get_venue:
 *   get:
 *     summary: Barcha venuelarni olish
 *     tags: [Venue]
 *     description: Barcha venuelar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Venuelar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_venue", getVenues);

/**
 * @swagger
 * /venue/get_venue/{id}:
 *   get:
 *     summary: Venueni ID bo'yicha olish
 *     tags: [Venue]
 *     description: Berilgan ID bo'yicha venue ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venueni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue topildi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_venue/:id", getVenueById);

/**
 * @swagger
 * /venue/update_venue/{id}:
 *   put:
 *     summary: Venueni yangilash
 *     tags: [Venue]
 *     description: Venue ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venueni yangilash uchun ID
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
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_venue/:id",validateSchema(updateVenueValidationSchema),updateVenue);

/**
 * @swagger
 * /venue/delete_venue/{id}:
 *   delete:
 *     summary: Venueni ID bo'yicha o'chirish
 *     tags: [Venue]
 *     description: Berilgan ID bo'yicha venueni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Venue IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_venue/:id", deleteVenue);

module.exports = router;