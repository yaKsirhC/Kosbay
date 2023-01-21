import express from "express";
import _User from "../models/UserSchema";
import cookieVerifier, { cookieToUidVerifier } from "../middleware/cookieVerification";
import bcrypt from "bcrypt";
import fileUpload from "express-fileupload";
import generatePath from "../utils/generatePath";

const router = express.Router();

router.put("/modify/fields/:field", cookieToUidVerifier, async (req, res) => {
  try {
    const field = req.params.field;
    const uid = req.body.uid;
    let newValue = req.body.newVal;
    if (field === "Password") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newValue, salt);
      newValue = hash;
    }

    const put = await _User.findByIdAndUpdate(uid, { [field as string]: newValue });
    if (!put) res.sendStatus(404);
    await put?.save();
    

    res.status(201).cookie("_ver", put?.id).send("ok");
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get("/get/super", cookieVerifier, async (req, res) => {
  try {
    const uid = req.cookies._ver;
    const user = await _User.findById(uid, "IsSuper -id");
    
    if (!user) return res.sendStatus(404);
    const isSuper = user?.IsSuper;

    res.status(200).json(isSuper);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/get/user-info", async (req, res) => {
  try {
    const uid = req.query.uid
    if(!uid) return res.sendStatus(417)
    const user = await _User.findById(uid)
    if(!user) return res.sendStatus(404)
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/place-image-banner', cookieVerifier ,async (req,res) => {
  try {
    const uid = req.cookies._ver
    const files = req.files as fileUpload.FileArray
    
    if(!files) return res.sendStatus(417)
    const image = files.img as fileUpload.UploadedFile
    if(!image) return res.sendStatus(417)
    const serialisedName = generatePath(image.name)
    image.mv(process.env.IMAGE_STORAGE + serialisedName)
    await _User.findByIdAndUpdate(uid, {ImgBanner: serialisedName})

    res.send(serialisedName)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
})

router.post('/follow', cookieVerifier ,async (req,res) => {
  try {
    const follow = req.body.follow
    const uid = req.cookies._ver
    if(!uid || !follow) return res.sendStatus(417)
    const follower = await _User.findById(uid)
    const followed = await _User.findById(follow)
    if(!follower || !followed) return res.sendStatus(404)
    followed.Followers.push(uid)
    follower.Followed.push(follow)
    await followed.save()
    await follower.save()

    return res.send(uid).status(200)

  } catch (error) {
    console.error(error);
    return res.sendStatus(500)
  }
})
router.post('/unfollow', cookieVerifier ,async (req,res) => {
  try {
    const follow = req.body.unfollow
    const uid = req.cookies._ver
    if(!uid || !follow) return res.sendStatus(417)
    const follower = await _User.findById(uid)
    const target = await _User.findById(follow)
    if(!follower || !target) return res.sendStatus(404)
    const followerIndex = follower.Followed.indexOf(follow)
    const targetIndex = target.Followers.indexOf(uid)
    


    if(targetIndex < 0 || followerIndex < 0) return res.sendStatus(400)

    target.Followers.splice(targetIndex,1)
    follower.Followed.splice(followerIndex,1)
    await target.save()
    await follower.save()

    return res.json(targetIndex).status(200)

  } catch (error) {
    console.error(error);
    return res.sendStatus(500)
  }
})

export default router;
