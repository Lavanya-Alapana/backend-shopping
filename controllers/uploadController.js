const cloudinary = require("../config/cloudinary");
const multer = require("multer");

// Configure Multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// Upload Image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: "Multer error: " + err.message });
      console.log("Received file:", req.file);  
      if (!req.file) return res.status(400).json({ error: "No image provided" });

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "mobile-shop" }, // Upload to "mobile-shop" folder
        (error, uploadedFile) => {
          if (error) return res.status(500).json({ error: "Upload failed" });

          return res.json({ imageUrl: uploadedFile.secure_url });
        }
      ).end(req.file.buffer);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadImage };
