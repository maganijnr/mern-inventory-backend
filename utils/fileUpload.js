import multer from "multer";

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

//File size formatter
const fileSizeFormatter = (bytes, decimal) => {
	if (bytes === 0) {
		return "0 Bytes";
	}

	const dm = decimal || 2;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];

	const index = Math.floor(Math.log(bytes) / Math.log(1000));

	return (
		parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) +
		" " +
		sizes[index]
	);
};

export { upload, fileSizeFormatter };
