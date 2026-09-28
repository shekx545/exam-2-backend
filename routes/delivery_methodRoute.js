const { Router } = require("express");
const router = Router();

const {
  createDeliveryMethod,
  searchDeliveryMethod,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  deleteDeliveryMethod,
} = require("../controllers/delivery_methodController")

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createDeliveryMethodValidationSchema,
  updateDeliveryMethodValidationSchema,
} = require("../validation/delivery_methodValidation");

/**
 * @swagger
 * tags:
 *   name: DeliveryMethod
 *   description: Delivery method xizmati uchun API endpointlari
 */

/**
 * @swagger
 * /delivery_method/create_delivery_method:
 *   post:
 *     summary: Yangi delivery method yaratish
 *     tags: [DeliveryMethod]
 *     description: Yangi delivery method yaratish
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
 *         description: Delivery method muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_delivery_method",validateSchema(createDeliveryMethodValidationSchema),createDeliveryMethod);

/**
 * @swagger
 * /delivery_method/getdelivery:
 *   get:
 *     summary: Barcha delivery methodlarni olish
 *     tags: [DeliveryMethod]
 *     description: Barcha yetkazib berish usullari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Delivery methodlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getdelivery", getDeliveryMethods);

/**
 * @swagger
 * /delivery_method/search:
 *   get:
 *     summary: Delivery methodlarni qidirish
 *     tags: [DeliveryMethod]
 *     description: Yetkazib berish usullarini qidirish
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
router.get("/search", searchDeliveryMethod);

/**
 * @swagger
 * /delivery_method/getdelivery/{id}:
 *   get:
 *     summary: Delivery methodni ID bo'yicha olish
 *     tags: [DeliveryMethod]
 *     description: Delivery methodni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Delivery method olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Delivery method muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Delivery method topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/getdelivery/:id", getDeliveryMethodById);

/**
 * @swagger
 * /delivery_method/updatedelivery/{id}:
 *   put:
 *     summary: Delivery methodni yangilash
 *     tags: [DeliveryMethod]
 *     description: Delivery method ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Delivery methodni yangilash uchun ID
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
 *         description: Delivery method muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Delivery method topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/updatedelivery/:id",validateSchema(updateDeliveryMethodValidationSchema),updateDeliveryMethod);

/**
 * @swagger
 * /delivery_method/deletedelivery/{id}:
 *   delete:
 *     summary: Delivery methodni ID bo'yicha o'chirish
 *     tags: [DeliveryMethod]
 *     description: Berilgan ID bo'yicha delivery methodni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Delivery method IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Delivery method muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Delivery method topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/deletedelivery/:id", deleteDeliveryMethod);

module.exports = router;