import { useGetAnonymousSessionQuery } from '../api/authApi';
import { useGetMyActiveCartQuery } from '../api/cartApi';
import { saveAuthTokenToLS } from '../hooks/useAuth';

export const CartProvider = () => {
  const anonymousSession = useGetAnonymousSessionQuery();
  if (anonymousSession.isSuccess) {
    saveAuthTokenToLS(anonymousSession.data.access_token, anonymousSession.data.refresh_token);
  }
  useGetMyActiveCartQuery();
  return null;
};
