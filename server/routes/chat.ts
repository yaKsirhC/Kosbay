import express from "express";
import _User from "../models/UserSchema";
import cookieVerifier from "../middleware/cookieVerification";
import _Message from "../models/MessageSchema";
import {user} from '../.d'

const router = express.Router();

router.get("/contacts", cookieVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    const messages = await _Message.find(
      {
        $or: [{ Transmitter: uid }, { Recipient: uid }],
      },
      "Transmitter Recipient -_id"
    );
    const originalContacts = messages.reduce((ac: any, cu) => {
      if (
        ac.find((con: any) => {
          return (con as any).Transmitter === cu.Transmitter || (con as any).Recipient === cu.Recipient;
        })
      ) {
        return ac;
      }
      return [...ac, cu];
    }, []);
    const contacts = await Promise.all(
      originalContacts.map(async (message: any) => {
        const other = message.Recipient === uid ? message.Transmitter : message.Recipient;
        const otherUser = await _User.findById(other);
        return otherUser;
      })
    );

    const final = contacts.reduce((ac: any[], cu: any) => {
      if(!(ac.find(contact => contact.id === cu.id))) return [...ac, cu]
      return ac
    }, [])

    

    res.status(200).json(final);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.get("/get/messages/", cookieVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    const complimentUID = req.query.complimentUID;

    if (!uid || !complimentUID) return res.sendStatus(417);
    const messages = await _Message.find({
      $or: [{ $and: [{ Transmitter: uid }, { Recipient: complimentUID }] }, { $and: [{ Recipient: uid }, { Transmitter: complimentUID }] }],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;
