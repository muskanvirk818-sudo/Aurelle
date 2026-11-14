import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aurelle_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('aurelle_token') || null;
  });

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('aurelle_user', JSON.stringify(res.user));
      localStorage.setItem('aurelle_token', res.token);
      return { success: true };
    } else {
      return { success: false, message: res.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    const res = await api.register(name, email, password);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('aurelle_user', JSON.stringify(res.user));
      localStorage.setItem('aurelle_token', res.token);
      return { success: true };
    } else {
      return { success: false, message: res.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aurelle_user');
    localStorage.removeItem('aurelle_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
