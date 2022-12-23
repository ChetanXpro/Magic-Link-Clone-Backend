const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const sendMail = require("../config/sendMail");
const schema = require("../config/valicdation");

const sendEmailtoUser = async (req, res) => {
  try {
    const { email } = req.body;

    const check = schema.validate({ email });

    if (check?.error?.details)
      return res
        .status(400)
        .json({ success: false, message: "Please fill valid email" });

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Please fill details" });

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
      await User.create({
        email,
      });
    }

    const token = await jwt.sign(
      {
        email,
      },
      process.env.JWT,
      {
        expiresIn: "10m",
      }
    );
    await sendMail(email, `${process.env.BASE}?token=${token}`);
    res.status(200).json({
      success: true,
      message: "Link sent successfuly to your email",
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmUser = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) return res.json({ success: false, message: "Invalid link" });

    await jwt.verify(token, process.env.JWT, async (err, decoded) => {
      if (err)
        return res.json({
          success: false,
          message: "Link expired",
        });

      const found = await User.findOne({ email: decoded.email });

      if (!found) res.json({ success: false, message: "Someting went wrong" });

      const token = await jwt.sign(
        {
          userId: found._id,
          email: found.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "5h",
        }
      );

      res.cookie("jwt", token, {
       httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 1000,
      });

      res.status(200).redirect(`https://magic-link-frontend-auth-flow.vercel.app/`);
    });
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findOne({
          email: decoded.email,
        }).exec();

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          {
            email: decoded.email,
          },
          process.env.JWT,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmailtoUser,
  confirmUser,
  refreshToken,
};
