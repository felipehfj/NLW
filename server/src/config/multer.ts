import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  imageUpload: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'uploads'),
      filename: (request, file, callback) => {
        const hash = crypto.randomBytes(6).toString('hex');

        const filename = `${hash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
    fileFilter: function (request: Express.Request, file: Express.Multer.File, callback: Function) {
      var ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
    },
    limits: {
      fileSize: 2 * 1024 * 1024
    }
  }
};