const { Router } = require("express");
const router = Router();

const {
  createHumanCategory,
  getHumanCategories,
  getHumanCategoryById,
  updateHumanCategory,
  deleteHumanCategory,
} = require("../controllers/human_categoryController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createHumanCategoryValidationSchema,
  updateHumanCategoryValidationSchema,
} = require("../validation/humanCategoryValidation");

/**
 * @swagger
 * tags:
 *   name: HumanCategory
 *   description: HumanCategory boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /human_category/create_human_category:
 *   post:
 *     summary: Yangi human category yaratish
 *     tags: [HumanCategory]
 *     description: Yangi HumanCategoryni yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: HumanCategory muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_human_category",validateSchema(createHumanCategoryValidationSchema),createHumanCategory);

/**
 * @swagger
 * /human_category/get_human_category:
 *   get:
 *     summary: Barcha humanCategorylarni olish
 *     tags: [HumanCategory]
 *     description: Barcha humanCategorylarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: HumanCategorylar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_human_category", getHumanCategories);

/**
 * @swagger
 * /human_category/get_human_category/{id}:
 *   get:
 *     summary: HumanCategoryni ID bo'yicha olish
 *     tags: [HumanCategory]
 *     description: Berilgan ID bo'yicha Categoriya ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: HumanCategoryni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: HumanCategory topildi
 *       '404':
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_human_category/:id", getHumanCategoryById);

/**
 * @swagger
 * /human_category/updat_human_categorye/{id}:
 *   put:
 *     summary: HumanCategoryni yangilash
 *     tags: [HumanCategory]
 *     description: HumanCategory ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: HumanCategoryni yangilash uchun ID
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
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: HumanCategory muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/human_category/:id",validateSchema(updateHumanCategoryValidationSchema),updateHumanCategory);

/**
 * @swagger
 * /human_category/delete_human_category/{id}:
 *   delete:
 *     summary: HumanCategoryni ID bo'yicha o'chirish
 *     tags: [HumanCategory]
 *     description: Berilgan ID bo'yicha human categoryni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun HumanCategory IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: HumanCategory muvaffaqiyatli o'chirildi
 *       '404':
 *         description: HumanCategory topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_human_category/:id", deleteHumanCategory);

module.exports = router;