const { Router } = require("express");
const router = Router();

const {
  createTicketStatus,
  searchTicketStatus,
  getTicketStatuses,
  getTicketStatusById,
  updateTicketStatus,
  deleteTicketStatus,
} = require("../controllers/ticket_statusController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createTicketStatusValidationSchema,
  updateTicketStatusValidationSchema,
} = require("../validation/ticket_statusValidation");

/**
 * @swagger
 * tags:
 *   name: TicketStatus
 *   description: Ticket status boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /ticket_status/create_ticket_status:
 *   post:
 *     summary: Yangi ticket status yaratish
 *     tags: [TicketStatus]
 *     description: Yangi ticket statusni qo'shish
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
 *         description: Ticket status muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_ticket_status",validateSchema(createTicketStatusValidationSchema),createTicketStatus);

/**
 * @swagger
 * /ticket_status/get_ticket_status:
 *   get:
 *     summary: Barcha ticket statuslarni olish
 *     tags: [TicketStatus]
 *     description: Barcha chipta holatlari ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Ticket statuslar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_ticket_status", getTicketStatuses);

/**
 * @swagger
 * /ticket_status/search:
 *   get:
 *     summary: Ticket statuslarni qidirish
 *     tags: [TicketStatus]
 *     description: Chipta holatlarini qidirish
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
router.get("/search", searchTicketStatus);

/**
 * @swagger
 * /ticket_status/get_ticket_status/{id}:
 *   get:
 *     summary: Ticket statusni ID bo'yicha olish
 *     tags: [TicketStatus]
 *     description: Berilgan ID bo'yicha chipta holati ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ticket statusni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket status topildi
 *       '404':
 *         description: Ticket status topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_ticket_status/:id", getTicketStatusById);

/**
 * @swagger
 * /ticket_status/update_ticket_status/{id}:
 *   put:
 *     summary: Ticket statusni yangilash
 *     tags: [TicketStatus]
 *     description: Ticket status ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ticket statusni yangilash uchun ID
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
 *         description: Ticket status muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Ticket status topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_ticket_status/:id",validateSchema(updateTicketStatusValidationSchema),updateTicketStatus);

/**
 * @swagger
 * /ticket_status/delete_ticket_status/{id}:
 *   delete:
 *     summary: Ticket statusni ID bo'yicha o'chirish
 *     tags: [TicketStatus]
 *     description: Berilgan ID bo'yicha ticket statusni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Ticket status IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket status muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Ticket status topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_ticket_status/:id", deleteTicketStatus);

module.exports = router;