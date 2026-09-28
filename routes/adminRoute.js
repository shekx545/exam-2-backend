const { Router } = require("express");
const router = Router();

const {
  createAdmin,
  searchAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createAdminValidationSchema,
  updateAdminValidationSchema,
} = require("../validation/adminValidation");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin kirishi uchun API endpointlari
 */

/**
 * @swagger
 * /admin/createadmin:
 *   post:
 *     summary: Yangi admin ro'yxatdan o'tkazish
 *     tags: [Admin]
 *     description: Yangi admin qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Admin muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/createadmin", validateSchema(createAdminValidationSchema), createAdmin);

/**
 * @swagger
 * /admin/getadmin:
 *   get:
 *     summary: Barcha adminlarni olish
 *     tags: [Admin]
 *     description: Barcha adminlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Adminlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getadmin", getAdmin);

/**
 * @swagger
 * /admin/search:
 *   get:
 *     summary: Adminlarni qidirish
 *     tags: [Admin]
 *     description: Admin ma'lumotlarini qidirish
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
router.get("/search", searchAdmin);

/**
 * @swagger
 * /admin/getadmin/{id}:
 *   get:
 *     summary: Adminni ID bo'yicha olish
 *     tags: [Admin]
 *     description: Adminni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Admin olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getadmin/:id", getAdminById);

/**
 * @swagger
 * /admin/updateadmin/{id}:
 *   put:
 *     summary: Adminni yangilash
 *     tags: [Admin]
 *     description: Admin ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Adminni yangilash uchun ID
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
 *                 description: Yangi ism
 *               login:
 *                 type: string
 *                 description: Yangi login
 *               password:
 *                 type: string
 *                 description: Yangi parol
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.put("/updateadmin/:id", validateSchema(updateAdminValidationSchema), updateAdmin);


/**
 * @swagger
 * /admin/deleteadmin/{id}:
 *   delete:
 *     summary: Adminni ID bo'yicha o'chirish
 *     tags: [Admin]
 *     description: Berilgan ID bo'yicha adminni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun admin IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.delete("/deleteadmin/:id", deleteAdmin);

module.exports = router;