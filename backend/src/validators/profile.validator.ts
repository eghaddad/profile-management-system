import { z } from 'zod';

export const createProfileSchema = z.object({
  displayName: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
});

export const updateSettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends_only']).optional(),
  showEmail: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
