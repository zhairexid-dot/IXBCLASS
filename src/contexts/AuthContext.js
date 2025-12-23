import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sementara dummy auth biar jalan dulu (nanti ganti Firebase lengkap)
  useEffect(() => {
    // Dummy: anggap sudah login sebagai admin pertama
    setCurrentUser({ email: 'admin@kelas.com', uid: '1' });
    setIsAdmin(true);
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    isAdmin,
    login: () => {}, // Dummy
    signup: () => {},
    logout: () => setCurrentUser(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
  }
