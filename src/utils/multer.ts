import multer, { diskStorage } from "fastify-multer";
import path from "path";
import fs from "fs";

export default (folderName: string) => {
  return multer({
    storage: diskStorage({
      destination: function (req, file, cb) {
        const path = `public/images/${folderName}/`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },

      // By default, multer removes file extensions so let's add them back
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/
        )
      ) {
        return cb(new Error("Only image files are allowed!"), false);
      }
      cb(null, true);
    },
  }).single("file");
};
