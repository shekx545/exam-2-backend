const { Router } = require("express");
const router = Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
} = require("../validation/customerValidation");

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /customer/create_customer:
 *   post:
 *     summary: Yangi customer yaratish
 *     tags: [Customer]
 *     description: Yangi customer profilini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Customer muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_customer",validateSchema(createCustomerValidationSchema),createCustomer);

/**
 * @swagger
 * /customer/get_customer:
 *   get:
 *     summary: Barcha customerlarni olish
 *     tags: [Customer]
 *     description: Barcha customerlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Customerlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_customer", getCustomers);

/**
 * @swagger
 * /customer/get_customer/{id}:
 *   get:
 *     summary: Customeri ID bo'yicha olish
 *     tags: [Customer]
 *     description: Berilgan ID bo'yicha customer ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customerni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer topildi
 *       '404':
 *         description: Customer topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_customer/:id", getCustomerById);

/**
 * @swagger
 * /customer/update_customer/{id}:
 *   put:
 *     summary: Customerni yangilash
 *     tags: [Customer]
 *     description: Customer ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customerni yangilash uchun ID
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Customer topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_customer/:id",validateSchema(updateCustomerValidationSchema),updateCustomer);

/**
 * @swagger
 * /customer/delete_customer/{id}:
 *   delete:
 *     summary: Customerni ID bo'yicha o'chirish
 *     tags: [Customer]
 *     description: Berilgan ID bo'yicha customerni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Customer IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Customer topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_customer/:id", deleteCustomer);

module.exports = router;