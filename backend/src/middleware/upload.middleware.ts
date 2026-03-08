import multer from 'multer';
import { Request } from 'express';
import { uploadConfig } from '../config/upload.config';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (uploadConfig.allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${uploadConfig.allowedTypes.join(', ')}`));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: uploadConfig.maxFileSize,
  },
  fileFilter,
});
