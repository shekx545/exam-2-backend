const { Router } = require("express");
const router = Router();

const {
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cart_itemController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createCartItemValidationSchema,
  updateCartItemValidationSchema,
} = require("../validation/cart_itemValidation");

/**
 * @swagger
 * tags:
 *   name: Cart Item
 *   description: Cart item boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /cart_item/createCartItem:
 *   post:
 *     summary: Yangi cart item yaratish
 *     tags: [Cart Item]
 *     description: Yangi cart item qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: string
 *               cart_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Cart item muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/createCartItem", validateSchema(createCartItemValidationSchema), createCartItem);

/**
 * @swagger
 * /cart_item/getCartItem:
 *   get:
 *     summary: Barcha cart itemlarni olish
 *     tags: [Cart Item]
 *     description: Barcha cart itemlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Cart itemlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getCartItem", getCartItems);

/**
 * @swagger
 * /cart_item/getCartItem/{id}:
 *   get:
 *     summary: Cart itemni ID bo'yicha olish
 *     tags: [Cart Item]
 *     description: Cart itemni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Cart item olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart item muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Cart item topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getCartItem/:id", getCartItemById);

/**
 * @swagger
 * /cart_item/updateCartItem/{id}:
 *   put:
 *     summary: Cart itemni yangilash
 *     tags: [Cart Item]
 *     description: Cart item ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Cart itemni yangilash uchun ID
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
 *               ticket_id:
 *                 type: string
 *               cart_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cart item muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Cart item topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.put("/updateCartItem/:id", validateSchema(updateCartItemValidationSchema), updateCartItem);

/**
 * @swagger
 * /cart_item/deleteCartItem/{id}:
 *   delete:
 *     summary: Cart itemni ID bo'yicha o'chirish
 *     tags: [Cart Item]
 *     description: Berilgan ID bo'yicha cart itemni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun cart item IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart item muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Cart item topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.delete("/deleteCartItem/:id", deleteCartItem);

module.exports = router;