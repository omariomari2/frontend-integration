import { ENDPOINTS } from '../../config/api';
import { apiClient } from '../api/apiClient';
import { User, UpdateProfileData } from '../../types/auth';

export const getProfile = async (): Promise<User> => {
  try {
    return await apiClient.get<User>(ENDPOINTS.PROFILE.GET);
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  try {
    return await apiClient.put<User>(ENDPOINTS.PROFILE.UPDATE, data);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const updateAvatar = async (uri: string): Promise<{ avatar: string }> => {
  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('avatar', {
      uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any);

    return await apiClient.patch<{ avatar: string }>(
      ENDPOINTS.PROFILE.AVATAR,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ message: string }> => {
  try {
    return await apiClient.patch<{ message: string }>(
      `${ENDPOINTS.PROFILE.UPDATE}/password`,
      data
    );
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
