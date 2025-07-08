import { useQuery } from '@tanstack/react-query';

export const useAuthFallback = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        return response.json();
      } catch (error) {
        return { user: null };
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
