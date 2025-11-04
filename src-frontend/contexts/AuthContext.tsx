import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;      // bireysel, kurumsal, admin
  avatar?: string;    // profil resmi URL
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user as User);
        localStorage.setItem("authToken", data.session.access_token);
        localStorage.setItem("currentUser", JSON.stringify(data.session.user));
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
      }
      setIsLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user as User);
        localStorage.setItem("authToken", session.access_token);
        localStorage.setItem("currentUser", JSON.stringify(session.user));
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Giriş başarısız: " + error.message);
      setIsLoading(false);
      return;
    }
    if (data?.session) {
      setUser(data.session.user as User);
      localStorage.setItem("authToken", data.session.access_token);
      localStorage.setItem("currentUser", JSON.stringify(data.session.user));
      toast.success("Giriş başarılı!");
    }
    setIsLoading(false);
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error("Kayıt başarısız: " + error.message);
      setIsLoading(false);
      return;
    }
    toast.success("Kayıt başarılı! Lütfen e-postanızı doğrulayın.");
    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    toast.success("Çıkış yapıldı");
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
