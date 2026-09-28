const { Router } = require("express");
const router = Router();

const {
  createCart,
  searchCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createCartValidationSchema,
  updateCartValidationSchema,
} = require("../validation/cartValidation");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Savat xizmati uchun API endpointlari
 */

/**
 * @swagger
 * /cart/createcart:
 *   post:
 *     summary: Yangi cart yaratish
 *     tags: [Cart]
 *     description: Yangi cart ma'lumotlarini qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               fineshedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Cart muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post( "/createcart", validateSchema(createCartValidationSchema), createCart );

/**
 * @swagger
 * /cart/getcart:
 *   get:
 *     summary: Barcha cartlarni olish
 *     tags: [Cart]
 *     description: Barcha cartlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: cartlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getcart", getCarts);

/**
 * @swagger
 * /cart/search:
 *   get:
 *     summary: Cartlarni qidirish
 *     tags: [Cart]
 *     description: Savat ma'lumotlarini qidirish
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
router.get("/search", searchCart);

/**
 * @swagger
 * /cart/getcart/{id}:
 *   get:
 *     summary: cartni ID bo'yicha olish
 *     tags: [Cart]
 *     description: Berilgan ID bo'yicha cart ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: cartni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: cart muvaffaqiyatli qaytarildi
 *       '404':
 *         description: cart topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getcart/:id", getCartById);

/**
 * @swagger
 * /cart/updatecart/{id}:
 *   put:
 *     summary: cartni yangilash
 *     tags: [Cart]
 *     description: cart ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: cartni yangilash uchun ID
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
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               fineshedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: cart muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: cart topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.put("/updatecart/:id",validateSchema(updateCartValidationSchema),updateCart);

/**
 * @swagger
 * /cart/deletecart/{id}:
 *   delete:
 *     summary: cartni ID bo'yicha o'chirish
 *     tags: [Cart]
 *     description: Berilgan ID bo'yicha cartni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun cart IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: cart muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Sacartvat topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.delete("/deletecart/:id", deleteCart);

module.exports = router;