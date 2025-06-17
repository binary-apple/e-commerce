import { useEffect } from 'react';
import { useGetAnonymousTokenMutation } from '../api/authApi';
import { getCurrentToken, isUserLoggedIn } from '../utils/tokenManager';

export function useTokenManager() {
  const [getAnonymousToken] = useGetAnonymousTokenMutation();

  useEffect(() => {
    const initializeTokens = async () => {
      const currentToken = getCurrentToken();

      if (!currentToken) {
        try {
          await getAnonymousToken().unwrap();
        } catch {
          throw new Error('Failed to initialize anonymous token');
        }
      }
    };

    initializeTokens();
  }, [getAnonymousToken]);

  return {
    isLoggedIn: isUserLoggedIn(),
    currentToken: getCurrentToken(),
  };
}
