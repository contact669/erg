'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/init';

interface UserState {
  user: User | null;
  isUserLoading: boolean;
}

export function useUser(): UserState {
  const [userState, setUserState] = useState<UserState>({
    user: null,
    isUserLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserState({ user, isUserLoading: false });
    });

    return () => unsubscribe();
  }, []);

  return userState;
}
