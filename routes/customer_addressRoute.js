const { Router } = require("express");
const router = Router();

const {
  createCustomerAddress,
  getCustomerAddresses,
  getCustomerAddressById,
  updateCustomerAddress,
  deleteCustomerAddress,
} = require("../controllers/customer_addressController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createCustomerAddressValidationSchema,
  updateCustomerAddressValidationSchema,
} = require("../validation/customer_addressValidation");

/**
 * @swagger
 * tags:
 *   name: CustomerAddress
 *   description: Customer Address boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /customer_address/create_customer_address:
 *   post:
 *     summary: Yangi customer address yaratish
 *     tags: [CustomerAddress]
 *     description: Customer uchun yangi address qo'shish
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
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: number
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Customer address muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_customer_address",validateSchema(createCustomerAddressValidationSchema),createCustomerAddress);

/**
 * @swagger
 * /customer_address/get_customer_address:
 *   get:
 *     summary: Barcha customer addresslarni olish
 *     tags: [CustomerAddress]
 *     description: Barcha ustomer addresslari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Customer addresslar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_customer_address", getCustomerAddresses);

/**
 * @swagger
 * /customer_address/get_customer_address/{id}:
 *   get:
 *     summary: Customer addressni ID bo'yicha olish
 *     tags: [CustomerAddress]
 *     description: Berilgan ID bo'yicha address ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer addressni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer address topildi
 *       '404':
 *         description: Customer address topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_customer_address/:id", getCustomerAddressById);

/**
 * @swagger
 * /customer_address/update/{id}:
 *   put:
 *     summary: Customer addressni yangilash
 *     tags: [CustomerAddress]
 *     description: Customer address ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Customer addressni yangilash uchun ID
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
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: number
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer address muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Customer address topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_customer_address/:id",validateSchema(updateCustomerAddressValidationSchema),updateCustomerAddress);

/**
 * @swagger
 * /customer_address/delete_customer_address/{id}:
 *   delete:
 *     summary: Customer addressni ID bo'yicha o'chirish
 *     tags: [CustomerAddress]
 *     description: Berilgan ID bo'yicha customer addressni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Customer address IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer address muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Customer address topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_customer_address/:id", deleteCustomerAddress);

module.exports = router;