import { Request, Response } from 'express';
import { profileSettingsService } from '../services/profile-settings.service';
import { updateSettingsSchema } from '../validators/profile.validator';
import { ZodError } from 'zod';

export class SettingsController {
  async getSettings(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      let settings = await profileSettingsService.getSettings(userId);

      if (!settings) {
        // Create default settings if they don't exist
        settings = await profileSettingsService.createDefaultSettings(userId);
      }

      res.json(settings);
    } catch (error) {
      console.error('Get settings error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateSettings(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const data = updateSettingsSchema.parse(req.body);

      const settings = await profileSettingsService.updateSettings(userId, data);
      res.json(settings);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
        return;
      }
      console.error('Update settings error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const settingsController = new SettingsController();
