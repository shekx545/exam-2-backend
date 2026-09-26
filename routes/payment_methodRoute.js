const { Router } = require("express");
const router = Router();

const {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/payment_methodController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createPaymentMethodValidationSchema,
  updatePaymentMethodValidationSchema,
} = require("../validation/payment_methodValidation");

/**
 * @swagger
 * tags:
 *   name: PaymentMethod
 *   description: Payment Method boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /payment_method/create_payment_method:
 *   post:
 *     summary: Yangi payment method yaratish
 *     tags: [PaymentMethod]
 *     description: Yangi payment methodni qo'shish
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
 *         description: Payment method muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_payment_method",validateSchema(createPaymentMethodValidationSchema),createPaymentMethod);

/**
 * @swagger
 * /payment_method/get_payment_method:
 *   get:
 *     summary: Barcha payment methodlarni olish
 *     tags: [PaymentMethod]
 *     description: Barcha to'lov usullari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Payment methodlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_payment_method", getPaymentMethods);

/**
 * @swagger
 * /payment_method/get_payment_method/{id}:
 *   get:
 *     summary: Payment methodni ID bo'yicha olish
 *     tags: [PaymentMethod]
 *     description: Berilgan ID bo'yicha to'lov usuli ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Payment methodni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment method topildi
 *       '404':
 *         description: Payment method topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_payment_method/:id", getPaymentMethodById);

/**
 * @swagger
 * /payment_method/update_payment_method/{id}:
 *   put:
 *     summary: Payment methodni yangilash
 *     tags: [PaymentMethod]
 *     description: Payment method ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Payment methodni yangilash uchun ID
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
 *         description: Payment method muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Payment method topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_payment_method/:id",validateSchema(updatePaymentMethodValidationSchema),updatePaymentMethod);

/**
 * @swagger
 * /payment_method/delete_payment_method/{id}:
 *   delete:
 *     summary: Payment methodni ID bo'yicha o'chirish
 *     tags: [PaymentMethod]
 *     description: Berilgan ID bo'yicha payment methodni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Payment method IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment method muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Payment method topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_payment_method/:id", deletePaymentMethod);

module.exports = router;