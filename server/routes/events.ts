import express from "express";
import isSuperVerifier from "../middleware/isSuperVerification";
import _Announcement from "../models/AnnouncementSchema";
import _Event from "../models/EventSchema";

const router = express.Router();

router.post("/post-event", isSuperVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    
    const Description = req.body.description;
    const Title = req.body.title;
    const CompletionDate = req.body.completionDate;
    if (!Title || !Description || !CompletionDate) return res.sendStatus(417);
    const obj = {
      uid,
      Description,
      Title,
      PostedAt: Date.now(),
      CompletionDate,
      DatePosted: Date.now(),
    };

    const event = new _Event(obj);
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/delete", isSuperVerifier, async (req, res) => {
  try {
    const eid = req.body.eid;
    if (!eid) return res.sendStatus(417);

    await _Announcement.findByIdAndDelete(eid);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.put("/modify/:field", isSuperVerifier, async (req, res) => {
  try {
    const eid = req.body.eid;
    const field = req.params.field;
    const newVal = req.body.newVal;

    if (!eid || !field || !newVal) return res.sendStatus(417);

    const ann = await _Announcement.findByIdAndUpdate(eid, { [field]: newVal });
    
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/get/", async (req, res) => {
  try {
    const upThreshold = req.query.upThreshold;
    const bottomThreshold = req.query.bottomThreshold;
    if (!upThreshold || !bottomThreshold) return res.sendStatus(417);
    const events = await _Event.find({
      $or: [
        { $and: [{ DatePosted: { $lt: upThreshold } }, { DatePosted: {$gt: bottomThreshold} }] },
        { $and: [{ CompletionDate: {$lt: upThreshold} }, { CompletionDate: {$gt: bottomThreshold} }] },
      ],
    });
    
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
