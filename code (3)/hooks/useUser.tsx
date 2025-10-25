
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const FREE_TRIAL_LIMIT = 3;

interface UserContextType {
  isSubscribed: boolean;
  renderCount: number;
  subscribeUser: () => void;
  incrementRenderCount: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    const saved = localStorage.getItem('isSubscribed');
    return saved ? JSON.parse(saved) : false;
  });

  const [renderCount, setRenderCount] = useState<number>(() => {
    const saved = localStorage.getItem('renderCount');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('isSubscribed', JSON.stringify(isSubscribed));
  }, [isSubscribed]);

  useEffect(() => {
    localStorage.setItem('renderCount', JSON.stringify(renderCount));
  }, [renderCount]);

  const subscribeUser = () => {
    setIsSubscribed(true);
  };

  const incrementRenderCount = () => {
    if (!isSubscribed && renderCount < FREE_TRIAL_LIMIT) {
      setRenderCount(prevCount => prevCount + 1);
    }
  };

  return (
    <UserContext.Provider value={{ isSubscribed, renderCount, subscribeUser, incrementRenderCount }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
