import { NextFunction, Request, Response } from "express";
import _PendingUser from "../models/PendingUser";
import nodemailer from "nodemailer";

export default async function sendEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    if (!email) return res.sendStatus(417);
    const OTP = Math.ceil(Math.random() * 10000);
    req.body.OTP = OTP;
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      host: "localhost",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL as string, // generated ethereal user
        pass: process.env.PASSWORD as string, // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: `"KosBay" <${process.env.EMAIL}>`, // sender address
      to: req.body.email, // list of receivers
      subject: "KosBay OTP Verification email", // Subject line
      text: `Your OTP: ${OTP} `, // plain text body
      html: `<div><h1 style='color: blueviolet;'>K&euro;sBay</h1></div><h3><b>Your OTP code: ${OTP}.</b> Go to the sign-in page and paste the OTP. if you don't know what this message is about, delete it.</h3>`, // html body
    });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
