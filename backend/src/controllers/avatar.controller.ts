import { Request, Response } from 'express';
import { avatarService } from '../services/avatar.service';
import { profileService } from '../services/profile.service';

export class AvatarController {
  async uploadAvatar(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'No file provided' });
        return;
      }

      const cropData = req.body.cropData ? JSON.parse(req.body.cropData) : undefined;
      const { url } = await avatarService.uploadAvatar(userId, file, cropData);

      // Update profile with new avatar URL
      await profileService.updateAvatar(userId, url);

      res.json({ avatarUrl: url });
    } catch (error) {
      console.error('Upload avatar error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteAvatar(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const profile = await profileService.getProfile(userId);

      if (!profile || !profile.avatarUrl) {
        res.status(404).json({ error: 'No avatar to delete' });
        return;
      }

      await avatarService.deleteAvatar(userId, profile.avatarUrl);
      await profileService.deleteAvatar(userId);

      res.json({ message: 'Avatar deleted successfully' });
    } catch (error) {
      console.error('Delete avatar error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const avatarController = new AvatarController();
