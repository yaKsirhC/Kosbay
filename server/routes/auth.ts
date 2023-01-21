import express from "express";
import emailVerifier from "../middleware/emailverification";
import _User from "../models/UserSchema";
import bcrypt from "bcrypt";
import _PendingUser from "../models/PendingUser";
import sendEmail from "../middleware/sendEmail";

const router = express.Router();

router.post("/sign-in/verification", emailVerifier, async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) res.sendStatus(417);
    const pendUser = await _PendingUser.findOneAndDelete({ Email: email });
    if (!pendUser) res.sendStatus(404);
    const name = pendUser?.Name;
    const hash = pendUser?.Password;
    const newUser = new _User({
      Announcements: [],
      Conversations: [],
      Events: [],
      Followed: [],
      Followers: [],
      Products: [],
      Email: email,
      ImgBanner: "",
      IsSuper: false,
      JoinedAt: Date.now(),
      Name: name,
      Password: hash,
    });
    await newUser.save();
    res.status(200).cookie("_ver", newUser.id).send();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post("/sign-in/initialization", emailVerifier, sendEmail, async (req, res) => {
  try {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    const PendCode = req.body.OTP;
    
    const Name = req.body.name;
    if (!email || !plainTextPassword || !Name) return res.sendStatus(417);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainTextPassword, salt);

    const newPend = new _PendingUser({
      Email: email,
      Password: hash,
      PendCode,
      Name,
    });

    await newPend.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await _User.findOne({ Email: email });
    if (!user) return res.sendStatus(404);

    const bcryptRes = await bcrypt.compare(password, user.Password as string);
    if (!bcryptRes) return res.sendStatus(400);
    const isSuper = user.IsSuper ? 1 : 0

    res.cookie("_ver", user.id).status(200).cookie('_is', isSuper ).send();
  } catch (error) {
    console.error(error);

    res.sendStatus(400);
  }
});

export default router;
