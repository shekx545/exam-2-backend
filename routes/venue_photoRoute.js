const { Router } = require("express");
const router = Router();

const {
  createVenuePhoto,
  getVenuePhotos,
  getVenuePhotoById,
  updateVenuePhoto,
  deleteVenuePhoto,
} = require("../controllers/venue_photoController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createVenuePhotoValidationSchema,
  updateVenuePhotoValidationSchema,
} = require("../validation/venue_photoValidation");

/**
 * @swagger
 * tags:
 *   name: VenuePhoto
 *   description: Venue photo boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /venue_photo/create_venue_photo:
 *   post:
 *     summary: Yangi venue photo yaratish
 *     tags: [VenuePhoto]
 *     description: Venue uchun yangi photo qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue photo muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_venue_photo",validateSchema(createVenuePhotoValidationSchema),createVenuePhoto);

/**
 * @swagger
 * /venue_photo/get_venue_photo:
 *   get:
 *     summary: Barcha venue photolarni olish
 *     tags: [VenuePhoto]
 *     description: Barcha venue photolar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Venue photolar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_venue_photo", getVenuePhotos);

/**
 * @swagger
 * /venue_photo/get_venue_photo/{id}:
 *   get:
 *     summary: Venue photoni ID bo'yicha olish
 *     tags: [VenuePhoto]
 *     description: Berilgan ID bo'yicha Venue photo ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venue photoni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue photo topildi
 *       '404':
 *         description: Venue photo topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_venue_photo/:id", getVenuePhotoById);

/**
 * @swagger
 * /venue_photo/update_venue_photo/{id}:
 *   put:
 *     summary: Venue photoni yangilash
 *     tags: [VenuePhoto]
 *     description: Venue photo ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venue photoni yangilash uchun ID
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
 *               url:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue photo muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Venue photo topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_venue_photo/:id",validateSchema(updateVenuePhotoValidationSchema),updateVenuePhoto);

/**
 * @swagger
 * /venue_photo/delete_venue_photo/{id}:
 *   delete:
 *     summary: Venue photoni ID bo'yicha o'chirish
 *     tags: [VenuePhoto]
 *     description: Berilgan ID bo'yicha venue photoni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Venue photo IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue photo muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Venue photo topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_venue_photo/:id", deleteVenuePhoto);

module.exports = router;