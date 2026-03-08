import { PrismaClient } from '@prisma/client';
import { ProfileSettingsDTO, UpdateSettingsDTO } from '../types/profile.types';

const prisma = new PrismaClient();

export class ProfileSettingsService {
  async createDefaultSettings(userId: string): Promise<ProfileSettingsDTO> {
    const settings = await prisma.profileSettings.create({
      data: {
        userId,
        profileVisibility: 'public',
        showEmail: false,
        emailNotifications: true,
      },
    });

    return settings;
  }

  async getSettings(userId: string): Promise<ProfileSettingsDTO | null> {
    const settings = await prisma.profileSettings.findUnique({
      where: { userId },
    });

    return settings;
  }

  async updateSettings(userId: string, data: UpdateSettingsDTO): Promise<ProfileSettingsDTO> {
    const settings = await prisma.profileSettings.update({
      where: { userId },
      data,
    });

    return settings;
  }
}

export const profileSettingsService = new ProfileSettingsService();
