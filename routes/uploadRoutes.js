const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/uploadController");

// POST - Upload an image to Cloudinary
router.post("/", uploadImage);

module.exports = router;
