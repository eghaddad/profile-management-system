import { PrismaClient } from '@prisma/client';
import { CreateProfileDTO, UpdateProfileDTO, ProfileDTO, ProfileWithSettings } from '../types/profile.types';

const prisma = new PrismaClient();

export class ProfileService {
  async createProfile(userId: string, data: CreateProfileDTO): Promise<ProfileDTO> {
    const profile = await prisma.profile.create({
      data: {
        userId,
        displayName: data.displayName,
        bio: data.bio,
      },
    });

    return profile;
  }

  async getProfile(userId: string): Promise<ProfileWithSettings | null> {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            settings: true,
          },
        },
      },
    });

    if (!profile) return null;

    return {
      ...profile,
      settings: profile.user.settings || undefined,
    };
  }

  async getPublicProfile(userId: string): Promise<Partial<ProfileDTO> | null> {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            settings: true,
          },
        },
      },
    });

    if (!profile) return null;

    const settings = profile.user.settings;

    // Respect privacy settings
    if (settings?.profileVisibility === 'private') {
      return null;
    }

    return {
      id: profile.id,
      userId: profile.userId,
      displayName: profile.displayName,
      bio: profile.bio || undefined,
      avatarUrl: profile.avatarUrl || undefined,
    };
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<ProfileDTO> {
    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        displayName: data.displayName,
        bio: data.bio,
      },
    });

    return profile;
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<ProfileDTO> {
    const profile = await prisma.profile.update({
      where: { userId },
      data: { avatarUrl },
    });

    return profile;
  }

  async deleteAvatar(userId: string): Promise<ProfileDTO> {
    const profile = await prisma.profile.update({
      where: { userId },
      data: { avatarUrl: null },
    });

    return profile;
  }
}

export const profileService = new ProfileService();
