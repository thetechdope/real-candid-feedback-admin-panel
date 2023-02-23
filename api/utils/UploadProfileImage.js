import cloudinary from "cloudinary";

// Configuration
cloudinary.v2.config({
  cloud_name: "dvfd2zlfr",
  api_key: "133415523978737",
  api_secret: "xoPaL-MXC9VqEy2idbe8qRTCE1U",
});

const UploadProfileImage = async (image) => {
  const response = cloudinary.v2.uploader.upload(
    image.tempFilePath,
    (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  return response;
};

export default UploadProfileImage;
