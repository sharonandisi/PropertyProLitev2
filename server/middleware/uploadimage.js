import { uploader } from "./cloudinary";
import { dataUri } from "./multer";

const uploadImage = (req, res, next) => {
    if (req.file) {
        const file = dataUri(req).content;
        uploader.upload(file)
            .then((result) => {
                req.imageUrl = result.url;
                next();
            })
            .catch(err => res.status(400).json({
                status: "error",
                message: "Something went wrong while processing your request.",
                error: err,
            }));
    }
    if (!req.file) {
        return res.status(400).json({
            status: "error",
            msg: "Please upload an image of your property to continue.",
        });
    }
};

export default uploadImage;