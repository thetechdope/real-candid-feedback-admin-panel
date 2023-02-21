import cloudinary from "cloudinary";

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
