import { NextFunction, Request, Response } from "express";
import _Product from "../models/ProductSchema";
import _Question from "../models/QuestionSchema";
import _Reply from "../models/ReplySchema";

export default function cookieVerifier(req: Request, res: Response, next: NextFunction) {
  const cookie = req.cookies._ver;
  if (!cookie) return res.sendStatus(403);
  next();
}
export async function cookieToUidVerifier(req: Request, res: Response, next: NextFunction) {
  const cookieuid = req.cookies._ver;
  if (!cookieuid) return res.sendStatus(403);
  const uid = req.body.uid;
  if (!uid) return res.sendStatus(417);
  if (uid !== cookieuid) return res.sendStatus(403);

  next();
}

export async function uidToProductVerifier(req: Request, res: Response, next: NextFunction) {
  try {
    const pid = req.query.pid;
    const cookieuid = req.cookies._ver;
    if (!pid || !cookieuid) return res.sendStatus(417);
    const productOwner = await _Product.findById(pid);
    if (!productOwner) return res.sendStatus(404);

    if (cookieuid !== productOwner?.Owner) return res.sendStatus(403);
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

export async function uidToReply(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.cookies._ver;
    if (!uid) return res.sendStatus(403);
    const rid = req.body.rid;
    const from = await _Reply.findById(rid);
    if (!from) return res.sendStatus(404);
    if (from?.From !== uid) res.sendStatus(403);
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
export async function uidToQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.cookies._ver;
    if (!uid) return res.sendStatus(403);
    const qid = req.body.qid;
    const from = await _Question.findById(qid);
    if (!from) return res.sendStatus(404);
    if (from?.From !== uid) res.sendStatus(403);
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
