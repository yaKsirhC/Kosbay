import express from "express";
import cookieVerifier, { uidToQuestion } from "../middleware/cookieVerification";
import _Question from "../models/QuestionSchema";
import _Reply from "../models/ReplySchema";
import isSuperVerifier from "../middleware/isSuperVerification";
import _User from "../models/UserSchema";

const router = express.Router();

router.post("/publish-question", cookieVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    const Title = req.body.title;
    const Description = req.body.description;
    const Categories = req.body.categories;
    if (!Title || !Description || !Categories) return res.sendStatus(417);

    const questionObj = {
      Replies: [],
      Categories,
      Description,
      From: uid,
      QuestionedAt: Date.now(),
      Title,
    };
    const question = new _Question(questionObj);
    await question.save();
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put("/mark-resolved", isSuperVerifier, async (req, res) => {
  try {
    const qid = req.body.qid;
    await _Question.findByIdAndUpdate(qid, { Resolved: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.delete("/delete", uidToQuestion, async (req, res) => {
  try {
    const qid = req.body.qid;
    await _Question.findByIdAndDelete(qid);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/get", async (req, res) => {
  try {
    let depth: any = req.query.depth;
    let DpVP: any = req.query.DpVP;
    if (!depth || !DpVP) return res.sendStatus(417);
    depth = parseInt(depth);
    DpVP = parseInt(DpVP);

    const questions = await _Question
      .find()
      .skip(depth * DpVP)
      .limit(DpVP);

    const injected = await Promise.all(questions.map(async (question) => {
      
      const unFilteredFrom = await _User.findById(question.From)
      console.log(question.From);
      const from = unFilteredFrom ? unFilteredFrom.Name : 'unknown'
      question.From = from
      return question
    }))
    
    return res.status(200).json(injected);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;
