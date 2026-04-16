import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiPost } from '../api/client';

type User = { id: number; mail: string; nom?: string; prenom?: string };

type AuthState = {
  token: string | null;
  user: User | null;
  login: (mail: string, motDePasse: string) => Promise<void>;
  register: (body: {
    nom: string;
    prenom: string;
    mail: string;
    sexe: 'homme' | 'femme';
    dateNaissance: string;
    motDePasse: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = 'recepies_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw) as { token: string; user: User };
      return p.token;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return (JSON.parse(raw) as { user: User }).user;
    } catch {
      return null;
    }
  });

  const persist = useCallback((t: string | null, u: User | null) => {
    if (t && u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: t, user: u }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setToken(t);
    setUser(u);
  }, []);

  const login = useCallback(
    async (mail: string, motDePasse: string) => {
      const res = await apiPost<{ access_token: string; user: User }>(
        '/api/auth/login',
        { mail, motDePasse },
      );
      persist(res.access_token, res.user);
    },
    [persist],
  );

  const register = useCallback(
    async (body: {
      nom: string;
      prenom: string;
      mail: string;
      sexe: 'homme' | 'femme';
      dateNaissance: string;
      motDePasse: string;
    }) => {
      await apiPost('/api/auth/register', body);
    },
    [],
  );

  const logout = useCallback(() => {
    persist(null, null);
  }, [persist]);

  const value = useMemo(
    () => ({ token, user, login, register, logout }),
    [token, user, login, register, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
