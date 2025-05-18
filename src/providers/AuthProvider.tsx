import { useAuth } from '../hooks/useAuth';
// TODO Future for Sprint 3 (for restore User session)
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useAuth();
  return <>{children}</>;
};
