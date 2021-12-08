const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinaryConfig = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: async (req, file) => {
    return {
      folder: "ptudw_ck",
      format: "jpg",
      public_id: file.fieldname + "-" + Date.now(),
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
