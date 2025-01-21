import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, login, logout, signup } from '@/lib/appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { success, data } = await getCurrentUser();
      if (success) {
        setUser(data);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    user,
    isLoading,
    login: async (email: string, password: string) => {
      const result = await login(email, password);
      if (result.success) {
        await checkUser();
      }
      return result;
    },
    signup: async (email: string, password: string, name: string) => {
      const result = await signup(email, password, name);
      if (result.success) {
        await checkUser();
      }
      return result;
    },
    logout: async () => {
      const result = await logout();
      if (result.success) {
        setUser(null);
      }
      return result;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}