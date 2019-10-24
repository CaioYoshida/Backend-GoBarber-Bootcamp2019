import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // 'multer.diskStorage" stores files on a local directory
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // if cb(err) -> return "null"
        // if cb(res) -> return "res.toString('hex') + extname (file.originalname)"
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
