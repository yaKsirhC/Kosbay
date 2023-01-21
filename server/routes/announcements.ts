import express from "express";
import fileUpload from "express-fileupload";
import isSuperVerifier from "../middleware/isSuperVerification";
import _Announcement from "../models/AnnouncementSchema";
import generatePath from "../utils/generatePath";

const router = express.Router();

router.post("/create-announcement", isSuperVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;

    const Description = req.body.description;
    const Title = req.body.title;
    const files = req.files as fileUpload.FileArray;
    const img = files.img as fileUpload.UploadedFile;
    if (!Title || !Description || !img) return res.sendStatus(417);
    const serialisedName = generatePath(img.name);
    
    img.mv(process.env.IMAGE_STORAGE + serialisedName);
    const obj = {
      uid,
      Description,
      Title,
      AnnouncedAt: Date.now(),
      Img: serialisedName,
    };

    const announcement = new _Announcement(obj);
    await announcement.save();

    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/delete", isSuperVerifier, async (req, res) => {
  try {
    const aid = req.body.aid;
    if (!aid) return res.sendStatus(417);

    await _Announcement.findByIdAndDelete(aid);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.put("/modify/fields/:field", isSuperVerifier, async (req, res) => {
  try {
    const aid = req.body.aid;
    const field = req.params.field;
    const newVal = req.body.newVal;

    if (!aid || !field || !newVal) return res.sendStatus(417);

    const ann = await _Announcement.findByIdAndUpdate(aid, { [field]: newVal });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/get", async (req, res) => {
  try {
    const announcements = await _Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
