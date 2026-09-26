const { Router } = require("express");
const router = Router();

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const { validateSchema } = require("../middleware/validate.middleware");
const {
  createTicketValidationSchema,
  updateTicketValidationSchema,
} = require("../validation/ticketValidation");

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Ticket boshqaruvi uchun API endpointlari
 */

/**
 * @swagger
 * /ticket/create_ticket:
 *   post:
 *     summary: Yangi ticket yaratish
 *     tags: [Ticket]
 *     description: Yangi ticket yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Ticket muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.post("/create_ticket",validateSchema(createTicketValidationSchema),createTicket);

/**
 * @swagger
 * /ticket/get_ticket:
 *   get:
 *     summary: Barcha ticketlarni olish
 *     tags: [Ticket]
 *     description: Barcha ticketlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Ticketlar ro'yxati muvaffaqiyatli olindi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_ticket", getTickets);

/**
 * @swagger
 * /ticket/get_ticket/{id}:
 *   get:
 *     summary: Ticketni ID bo'yicha olish
 *     tags: [Ticket]
 *     description: Berilgan ID bo'yicha ticket ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ticketni olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket topildi
 *       '404':
 *         description: Ticket topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.get("/get_ticket/:id", getTicketById);

/**
 * @swagger
 * /ticket/update_ticket/{id}:
 *   put:
 *     summary: Ticketni yangilash
 *     tags: [Ticket]
 *     description: Ticket ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ticketni yangilash uchun ID
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
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Ticket muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Ticket topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.put("/update_ticket/:id",validateSchema(updateTicketValidationSchema),updateTicket);

/**
 * @swagger
 * /ticket/delete_ticket/{id}:
 *   delete:
 *     summary: Ticketni ID bo'yicha o'chirish
 *     tags: [Ticket]
 *     description: Berilgan ID bo'yicha ticketni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chirish uchun Ticket IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Ticket topilmadi
 *       '500':
 *         description: Serverdagi ichki xatolik
 */
router.delete("/delete_ticket/:id", deleteTicket);

module.exports = router;