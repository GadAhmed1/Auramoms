// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // تحديد مجلد التخزين للصور المرفوعة
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// // فلتر لتحديد الملفات المسموح برفعها (صور فقط)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images (jpeg, jpg, png, gif) are allowed'));
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter
// });

// export default upload;
