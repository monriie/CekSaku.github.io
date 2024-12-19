// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const multer = require("multer");
const path = require("path");

// Konfigurasi storage untuk menyimpan file secara lokal
const storage = multer.diskStorage({
  // Tentukan folder tujuan
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"../public/images"));
  },
  // Tentukan nama file
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Middleware multer dengan konfigurasi storage
const upload = multer({ storage: storage });

module.exports = upload;

