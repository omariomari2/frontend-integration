import { useApiQuery } from './useApiQuery';
import { getProfile } from '../services/profile/profileService';
import { User } from '../types/auth';

export function useProfile() {
  return useApiQuery<User, Error>(['profile'], getProfile);
} 