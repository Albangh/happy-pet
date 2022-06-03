const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const animalRoutes = require("./routes/animal.routes.js");
const cliniqueRoutes = require("./routes/clinique.routes.js");
const noteRoutes = require("./routes/note.routes.js");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/animal", animalRoutes);
app.use("/api/clinique", cliniqueRoutes);
app.use("/api/note", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listen on port ", process.env.PORT);
});
