const { Router } = require("express");
const router = Router();

const {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/districtController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createDistrictValidationSchema,
  updateDistrictValidationSchema,
} = require("../validation/districtValidation");

/**
 * @swagger
 * tags:
 *   name: District
 *   description: District boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /district/createdistrict:
 *   post:
 *     summary: Yangi district yaratish
 *     tags: [District]
 *     description: Yangi district ma'lumotlarini qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: District muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/createdistrict",validateSchema(createDistrictValidationSchema),createDistrict);

/**
 * @swagger
 * /district/getdistrict:
 *   get:
 *     summary: Barcha districts olish
 *     tags: [District]
 *     description: Barcha districts ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Districtlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getdistrict", getDistricts);

/**
 * @swagger
 * /district/getdistrict/{id}:
 *   get:
 *     summary: Districtni ID bo'yicha olish
 *     tags: [District]
 *     description: Berilgan ID bo'yicha district ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Districtni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: District topildi
 *       '404':
 *         description: District topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getdistrict/:id", getDistrictById);

/**
 * @swagger
 * /district/updatedistrict/{id}:
 *   put:
 *     summary: Districtni yangilash
 *     tags: [District]
 *     description: District ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Districtni yangilash uchun ID
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
 *               region_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: District muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: District topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updatedistrict/:id",validateSchema(updateDistrictValidationSchema),updateDistrict);

/**
 * @swagger
 * /district/deletedistrict/{id}:
 *   delete:
 *     summary: District ID bo'yicha o'chirish
 *     tags: [District]
 *     description: Berilgan ID bo'yicha district o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun district IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: District muvaffaqiyatli o'chirildi
 *       '404':
 *         description: District topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletedistrict/:id", deleteDistrict);

module.exports = router;