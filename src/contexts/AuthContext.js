import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Placeholder for auth state change simulation
  useEffect(() => {
    // Simulate a logged-in user after 1 second
    const timer = setTimeout(() => {
      setCurrentUser({ uid: '123', email: 'user@example.com', displayName: 'John Doe' });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
