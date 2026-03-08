import { Request, Response } from 'express';
import { profileService } from '../services/profile.service';
import { createProfileSchema, updateProfileSchema } from '../validators/profile.validator';
import { ZodError } from 'zod';

export class ProfileController {
  async getOwnProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const profile = await profileService.getProfile(userId);

      if (!profile) {
        res.status(404).json({ error: 'Profile not found' });
        return;
      }

      res.json(profile);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPublicProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const profile = await profileService.getPublicProfile(userId);

      if (!profile) {
        res.status(404).json({ error: 'Profile not found or private' });
        return;
      }

      res.json(profile);
    } catch (error) {
      console.error('Get public profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = createProfileSchema.parse(req.body);

      const profile = await profileService.createProfile(userId, data);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      console.error('Create profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = updateProfileSchema.parse(req.body);

      const profile = await profileService.updateProfile(userId, data);
      res.json(profile);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const profileController = new ProfileController();
