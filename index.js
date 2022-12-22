const express = require("express");
const { connect } = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

const allowedOrigins = ["http://localhost:5173"];
const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not alowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cookieParser());
app.use(cors(corsOption));

app.use(express.json());

app.use("/link", require("./Routes/authRoute"));
app.use("/user", require("./Routes/userRoute"));

connectDB();
app.listen(5000, () => {
  console.log(`server running on ${5000}`);
});
