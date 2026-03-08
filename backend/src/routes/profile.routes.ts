import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { avatarController } from '../controllers/avatar.controller';
import { settingsController } from '../controllers/settings.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Profile routes
router.get('/profile', authenticate, profileController.getOwnProfile);
router.get('/profile/:id', profileController.getPublicProfile);
router.post('/profile', authenticate, profileController.createProfile);
router.put('/profile', authenticate, profileController.updateProfile);

// Avatar routes
router.post('/profile/avatar', authenticate, upload.single('avatar'), avatarController.uploadAvatar);
router.delete('/profile/avatar', authenticate, avatarController.deleteAvatar);

// Settings routes
router.get('/profile/settings', authenticate, settingsController.getSettings);
router.put('/profile/settings', authenticate, settingsController.updateSettings);

export default router;
