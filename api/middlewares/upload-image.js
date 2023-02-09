import multer from "multer";
import path from "path";

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/; // Allowed Extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Checking Extension
  const mimetype = filetypes.test(file.mimetype); // Checking Mime Type

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const UploadImageMiddleware = multer({
  storage: multer.diskStorage({
    destination: "./public/uploaded-images",
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("avatar");

export default UploadImageMiddleware;
