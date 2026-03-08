import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api';

interface Profile {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
}

interface UpdateProfileData {
  displayName?: string;
  bio?: string;
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get<Profile>('/profile');
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await apiClient.put<Profile>('/profile', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { displayName: string; bio?: string }) => {
      const response = await apiClient.post<Profile>('/profile', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
