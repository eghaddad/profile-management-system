export interface ProfileDTO {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfileDTO {
  displayName: string;
  bio?: string;
}

export interface UpdateProfileDTO {
  displayName?: string;
  bio?: string;
}

export interface ProfileWithSettings extends ProfileDTO {
  settings?: ProfileSettingsDTO;
}

export interface ProfileSettingsDTO {
  id: string;
  userId: string;
  profileVisibility: 'public' | 'private' | 'friends_only';
  showEmail: boolean;
  emailNotifications: boolean;
}

export interface UpdateSettingsDTO {
  profileVisibility?: 'public' | 'private' | 'friends_only';
  showEmail?: boolean;
  emailNotifications?: boolean;
}

export interface AvatarUploadDTO {
  id: string;
  userId: string;
  originalFilename: string;
  storedFilename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  cropData?: any;
  createdAt: Date;
}
