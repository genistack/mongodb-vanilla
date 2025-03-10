const express = require("express");
const { ObjectId } = require("mongodb");
const connectDB = require("./db");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const memos = await db.collection("memos").find().toArray();
    res.json(memos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memos" });
  }
});


router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("memos").insertOne(req.body);
    res.json({ insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create memo" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("memos").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to update memo" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("memos").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete memo" });
  }
});

module.exports = router;
