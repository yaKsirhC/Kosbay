import express from "express";
import _User from "../models/UserSchema";
import cookieVerifier, { uidToReply } from "../middleware/cookieVerification";
import _Reply from "../models/ReplySchema";
import _Question from "../models/QuestionSchema";

const router = express.Router();

router.post("/reply", cookieVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    const qid = req.body.qid;
    const Content = req.body.content;
    if (!qid || !Content) return res.sendStatus(417);

    const replyObj = {
      _qid: qid,
      Content,
      From: uid as string,
      RepliedAt: Date.now(),
    };

    const reply = new _Reply(replyObj);
    await reply.save();
    const question = await _Question.findById(qid);
    question?.Replies.unshift(reply.id);
    await question?.save();
    const user = await _User.findById(uid)
    reply.From = user?.Name as string

    res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.put("/modify", uidToReply, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    const rid = req.body.rid;
    const Content = req.body.content;
    if (!Content || !rid) return res.sendStatus(417);
    const from = await _Reply.findById(rid);
    if (uid !== from?.From) return res.sendStatus(403);
    ((from as any).Content as any) = Content;
    await from?.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/delete", uidToReply, async (req, res) => {
  try {
    const rid = req.body.rid;
    await _Reply.findByIdAndDelete(rid);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post("/get/", async (req, res) => {
  try {
    const qid = req.body.qid;
    if (!qid) return res.sendStatus(417);
    const question = await _Question.findById(qid);
    if (!question) return res.sendStatus(404);
    const originalReplies = await _Reply.find({ _qid: qid });
    
    const replies = await Promise.all(
      originalReplies.map(async (reply) => {
        const user = await _User.findById(reply?.From);
        
        // @ts-ignore
        reply.From = user?.Name as string;
        return reply;
      })
    );

    res.status(200).json({ qid, replies });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
