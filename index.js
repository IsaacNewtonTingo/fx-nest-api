const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser").json;
const { dbConnection } = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cookieParser());

app.use(cors(corsOptions));
app.use(bodyParser());

require("dotenv").config();

const PORT = process.env.PORT;

dbConnection().then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("FX NEST APIS ARE WORKING PERFECTLY");
});

const UserRouter = require("./routes/user");
const ContactUsRouter = require("./routes/contact-us");
const FileUploadRouter = require("./routes/file-upload");
const TransactionsRouter = require("./routes/transaction");
const PlanRouter = require("./routes/plan");

app.use("/api/user", UserRouter);
app.use("/api/contact-us", ContactUsRouter);
app.use("/api/file-upload", FileUploadRouter);
app.use("/api/transactions", TransactionsRouter);
app.use("/api/plan", PlanRouter);
