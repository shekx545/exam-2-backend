const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());
app.use(cors());

const adminRoute = require("./routes/adminRoute");
const bookingRoute = require("./routes/bookingRoute");
const cart_itemRoute = require("./routes/cart_itemRoute");
const cartRoute = require("./routes/cartRoute");
const countryRoute = require("./routes/countryRoute");
const customer_addressRoute = require("./routes/customer_addressRoute");
const customer_cardRoute = require("./routes/customer_cardRoute");
const customerRoute = require("./routes/customerRoute");
const deliveryMethodRouter = require("./routes/delivery_methodRoute");
const discountRoute = require("./routes/discountRoute");
const districtRoute = require("./routes/districtRoute");
const event_typeRoute = require("./routes/event_typeRoute");
const eventRoute = require("./routes/eventRoute");
const flatRoute = require("./routes/flatRoute");
const genderRoute = require("./routes/genderRoute");
const humanCategoryRoute = require("./routes/humanCategoryRoute");
const langRoute = require("./routes/langRoute");
const payment_methodRoute = require("./routes/payment_methodRoute");
const regionRoute = require("./routes/regionRoute");
const seat_typeRoute = require("./routes/seat_typeRoute");
const seatRoute = require("./routes/seatRoute");
const sectorRoute = require("./routes/sectorRoute");
const ticket_statusRoute = require("./routes/ticket_statusRoute");
const ticketRoute = require("./routes/ticketRoute");
const tycket_typeRoute = require("./routes/tycket_typeRoute");
const typesRoute = require("./routes/typesRoute");
const venue_photoRoute = require("./routes/venue_photoRoute");
const venue_typesRoute = require("./routes/venue_typesRoute");
const venueRoute = require("./routes/venueRoute");

app.use("/admin", adminRoute);
app.use("/booking", bookingRoute);
app.use("/cart_item", cart_itemRoute);
app.use("/cart", cartRoute);
app.use("/country", countryRoute);
app.use("/customer_address", customer_addressRoute);
app.use("/customer_card", customer_cardRoute);
app.use("/customer", customerRoute);
app.use("/delivery_method", deliveryMethodRouter);
app.use("/discount", discountRoute);
app.use("/district", districtRoute);
app.use("/event_type", event_typeRoute);
app.use("/event", eventRoute);
app.use("/flat", flatRoute);
app.use("/gender", genderRoute);
app.use("/human_category", humanCategoryRoute);
app.use("/lang", langRoute);
app.use("/payment_method", payment_methodRoute);
app.use("/region", regionRoute);
app.use("/seat_type", seat_typeRoute);
app.use("/seat", seatRoute);
app.use("/sector", sectorRoute);
app.use("/ticket_status", ticket_statusRoute);
app.use("/ticket", ticketRoute);
app.use("/tycket_type", tycket_typeRoute);
app.use("/types", typesRoute);
app.use("/venue_photo", venue_photoRoute);
app.use("/venue_types", venue_typesRoute);
app.use("/venue", venueRoute);


const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error(".env faylida MONGO_URL aniqlanmagan!");
    }

    await connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB is connected!");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("os");
const { Server } = require("https");

const swaggerOptions =  {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));