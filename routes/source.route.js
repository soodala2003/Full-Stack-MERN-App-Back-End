import express from "express";
//import mongoose from "mongoose";
import Source from "../models/Source.js";

const router = express.Router();

// Get all bbc news sources 
router.get("/", async (req, res) => {
  try {
    const sources = await Source.find({});
    res.render("sources", { sources });
    //res.status(200).json({ success: true,  data: source });
  } catch (error) {
    console.log("Error in fetching sources: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get a single source 
router.get("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const source = await Source.findById(id);

    if (!source) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.render("source_id", { source });
    //res.status(200).json({ success: true,  data: user });
  } catch (error) {
    console.log("Error in fetching users: ", error.message);
    //res.status(500).json({ success: false, message: "Server Error" });
    res.status(404).json({ success: false, message: "User not found" });
  }
});

export default router;