const { Router } = require("express");
const router = Router();

const {
  createCustomerCard,
  getCustomerCards,
  getCustomerCardById,
  updateCustomerCard,
  deleteCustomerCard,
} = require("../controllers/customer_cardController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createCustomerCardValidationSchema,
  updateCustomerCardValidationSchema,
} = require("../validation/customer_cardValidation");

/**
 * @swagger
 * tags:
 *   name: CustomerCard
 *   description: Customer Card boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /customer_card/create_customer_card:
 *   post:
 *     summary: Yangi customer card yaratish
 *     tags: [CustomerCard]
 *     description: Customer uchun yangi card qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Customer card muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_customer_card",validateSchema(createCustomerCardValidationSchema),createCustomerCard);

/**
 * @swagger
 * /customer_card/get_customer_card:
 *   get:
 *     summary: Barcha customer cardlarni olish
 *     tags: [CustomerCard]
 *     description: Barcha customer cardlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Customer cardlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_customer_card", getCustomerCards);

/**
 * @swagger
 * /customer_card/get_customer_card/{id}:
 *   get:
 *     summary: Customer cardni ID bo'yicha olish
 *     tags: [CustomerCard]
 *     description: Berilgan ID bo'yicha customer card ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer cardni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer card topildi
 *       '404':
 *         description: Customer card topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_customer_card/:id", getCustomerCardById);

/**
 * @swagger
 * /customer_card/update_customer_card/{id}:
 *   put:
 *     summary: Customer cardni yangilash
 *     tags: [CustomerCard]
 *     description: Customer card ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer cardni yangilash uchun ID
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
 *               customer_id:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Customer card muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Customer card topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_customer_card/:id",validateSchema(updateCustomerCardValidationSchema),updateCustomerCard);

/**
 * @swagger
 * /customer_card/delete_customer_card/{id}:
 *   delete:
 *     summary: Customer cardni ID bo'yicha o'chirish
 *     tags: [CustomerCard]
 *     description: Berilgan ID bo'yicha customer cardni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Customer card IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer card muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Customer card topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_customer_card/:id", deleteCustomerCard);

module.exports = router;