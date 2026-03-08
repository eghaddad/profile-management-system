import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { uploadConfig, getUploadPath } from '../config/upload.config';
import { AvatarUploadDTO } from '../types/profile.types';

const prisma = new PrismaClient();

export class AvatarService {
  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
    cropData?: any
  ): Promise<{ url: string; upload: AvatarUploadDTO }> {
    // Generate unique filename
    const ext = path.extname(file.originalname);
    const storedFilename = `${uuidv4()}${ext}`;
    const filePath = getUploadPath('avatars', storedFilename);

    // Ensure upload directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Process image (resize and crop)
    let imageBuffer = file.buffer;
    
    if (cropData) {
      imageBuffer = await sharp(file.buffer)
        .extract({
          left: Math.round(cropData.x),
          top: Math.round(cropData.y),
          width: Math.round(cropData.width),
          height: Math.round(cropData.height),
        })
        .resize(uploadConfig.avatarDimensions.width, uploadConfig.avatarDimensions.height)
        .jpeg({ quality: 90 })
        .toBuffer();
    } else {
      imageBuffer = await sharp(file.buffer)
        .resize(uploadConfig.avatarDimensions.width, uploadConfig.avatarDimensions.height, {
          fit: 'cover',
        })
        .jpeg({ quality: 90 })
        .toBuffer();
    }

    // Save processed image
    await fs.writeFile(filePath, imageBuffer);

    // Save upload record
    const upload = await prisma.avatarUpload.create({
      data: {
        userId,
        originalFilename: file.originalname,
        storedFilename,
        filePath: path.relative(uploadConfig.path, filePath),
        fileSize: imageBuffer.length,
        mimeType: 'image/jpeg',
        cropData,
      },
    });

    const url = `/uploads/avatars/${storedFilename}`;
    return { url, upload };
  }

  async deleteAvatar(userId: string, avatarUrl: string): Promise<void> {
    // Extract filename from URL
    const filename = path.basename(avatarUrl);
    const filePath = getUploadPath('avatars', filename);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      // File might not exist, ignore error
      console.warn(`Failed to delete avatar file: ${filePath}`, error);
    }

    // Delete upload records for this user's avatars
    await prisma.avatarUpload.deleteMany({
      where: { userId },
    });
  }

  async getAvatarHistory(userId: string): Promise<AvatarUploadDTO[]> {
    const uploads = await prisma.avatarUpload.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return uploads;
  }
}

export const avatarService = new AvatarService();
