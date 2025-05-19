import { useAuth } from '../hooks/useAuth';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useAuth();
  return <>{children}</>;
};
