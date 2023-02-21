import cloudinary from "cloudinary";

const UploadProfileImage = async (avatar) => {
	const url = cloudinary.v2.uploader.upload(avatar.tempFilePath, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		return res.url;
	});
	return url;
};

export default UploadProfileImage;
