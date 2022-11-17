import multer from "multer";
import express from "express";

const router = express.Router();
//Define file storage
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

//Specify the file format that can be saved
// function fileFilter(req, file, cb) {
// 	if (
// 		file.mimetype === "image/png" ||
// 		file.mimetype === "image/jpeg" ||
// 		file.mimetype === "image/jpg"
// 	) {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// }

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extnam = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);
	if (extnam && mimetype) {
		return cb(null, true);
	} else {
		cb("Images only");
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post("/", upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
