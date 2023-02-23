import cloudinary from "cloudinary";

// Configuration
cloudinary.v2.config({
  cloud_name: "ducadrcbj",
  api_key: "873725482114457",
  api_secret: "BFFjPJh7qppU-upxvjGP0mje6yA",
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
