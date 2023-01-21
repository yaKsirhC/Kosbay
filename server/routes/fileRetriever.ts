import express from "express";

const router = express.Router()

router.get('/get/preview', async (req,res) => {
    try {
        const iid = req.query.iid
        if(!iid) return res.sendStatus(417)
        res.sendFile(process.env.IMAGE_STORAGE as string + iid)

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
})
router.get('/get/install', async (req,res) => {
    try {
        const fid = req.query.fid
        if(!fid) return res.sendStatus(417)
        console.log(fid);
        res.download(process.env.IMAGE_STORAGE as string + fid)

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
})

export default router