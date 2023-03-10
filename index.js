const express = require("express");
const { connect } = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

const allowedOrigins = ["http://localhost:5173","https://magic-link-frontend-auth-flow.vercel.app","https://magic-link-frontend-auth-flow-i83n.vercel.app"];
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
app.get('/',(req,res)=>{
  res.status(200).json({
    message:"API Working"
  })
})

connectDB();
app.listen(5000, () => {
  console.log(`server running on ${5000}`);
});
