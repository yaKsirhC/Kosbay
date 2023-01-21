import express from "express";
import cookieVerifier, { uidToProductVerifier } from "../middleware/cookieVerification";
import _Product from "../models/ProductSchema";
import fileUpload from "express-fileupload";
import generatePath from "../utils/generatePath";
import _User from "../models/UserSchema";
const router = express.Router();

router.post("/add-product", cookieVerifier, async (req, res) => {
  try {
    const Description = req.body.description;
    const Title = req.body.title;
    // const Categories = req.body.categories;
    const Price = req.body.price;
    const files = req.files as fileUpload.FileArray;
    const image = files.img as fileUpload.UploadedFile;
    if (!Title || !Description || !Price || !image) return res.status(400).send("missing field");

    const uid = req.cookies._ver;
    const serialisedName = generatePath(image.name);

    const productObj = {
      Categories: [],
      Imgs: [serialisedName],
      Price,
      CreatedAt: Date.now(),
      Description,
      Title,
      Owner: uid,
    };

    const newProduct = new _Product(productObj);

    await newProduct.save();
    image.mv(process.env.IMAGE_STORAGE + serialisedName);
    res.status(200).json(newProduct);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put("/modify/fields/:field", uidToProductVerifier, async (req, res) => {
  try {
    const field = req.params.field;
    const pid = req.body.pid;
    const newVal = req.body.newVal;
    if (!pid || !field || !newVal) return res.sendStatus(417);
    const put = await _Product.findByIdAndUpdate(pid, { [field]: newVal });
    await put?.save();

    res.sendStatus(200);
  } catch (error) {}
});
router.delete("/delete", uidToProductVerifier, async (req, res) => {
  try {
    const pid = req.query.pid;
    if (!pid) return res.sendStatus(417);
    await _Product.findByIdAndDelete(pid);
    console.log("first");
    res.status(200).send(pid);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});
router.put("/mark-as-sold", uidToProductVerifier, async (req, res) => {
  try {
    const pid = req.body.pid;
    await _Product.findByIdAndUpdate(pid, { Sold: true });
    res.sendStatus(202);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});
router.put("/mark-as-available", uidToProductVerifier, async (req, res) => {
  try {
    const pid = req.body.pid;
    res.sendStatus(202);
    await _Product.findByIdAndUpdate(pid, { Sold: false });
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});
router.get("/get", async (req, res) => {
  try {
    const price_b = req.query.price_b;
    const price_t = req.query.price_t
    const order = req.query.order as any;
    console.log(price_b, price_t, order);
    if (!order || !price_b || !price_t) return res.sendStatus(417);

    const products = await _Product
      .find({$and: [{Price: {$gte: price_b }}, {Price: {$lte: price_t}}]})
      .sort({CreatedAt: order})

    for (let index = 0; index < products.length; index++) {
      const userID = products[index].Owner;
      const user = await _User.findById(userID);
      products[index].Owner = user;
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/get/product", async (req, res) => {
  try {
    const pid = req.query.pid;
    if (!pid) return res.sendStatus(417);
    const product = await _Product.findById(pid);
    if (!product) return res.sendStatus(404);
    const user = await _User.findById(product.Owner);
    product.Owner = user as any;
    console.log(product.Owner);

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/get/owner", cookieVerifier, async (req, res) => {
  try {
    const depth = parseInt(req.query.depth as string) || 0;
    const productsPerDepth = parseInt(req.query.products as string);
    const uid = req.query.uid;
    if (!productsPerDepth || !uid) return res.sendStatus(417);
    const products = await _Product
      .find({ Owner: uid })
      .skip((depth as number) * (productsPerDepth as number))
      .limit(productsPerDepth);

    for (let index = 0; index < products.length; index++) {
      const user = await _User.findById(uid);
      console.log(user);
      products[index].Owner = user;
    }

    res.status(200).json(products);
  } catch (error) {}
});

export default router;
