import path from 'path';

export const uploadConfig = {
  path: process.env.UPLOAD_PATH || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  allowedTypes: (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
  avatarDimensions: {
    width: 400,
    height: 400,
  },
};

export const getUploadPath = (...segments: string[]): string => {
  return path.join(uploadConfig.path, ...segments);
};
