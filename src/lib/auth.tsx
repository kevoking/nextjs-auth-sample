'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profileData = userDoc.data();
            setUserProfile({
              uid: user.uid,
              email: user.email!,
              displayName: profileData.displayName,
              createdAt: profileData.createdAt instanceof Timestamp 
                ? profileData.createdAt.toDate() 
                : profileData.createdAt || new Date(),
              lastLoginAt: profileData.lastLoginAt instanceof Timestamp 
                ? profileData.lastLoginAt.toDate() 
                : profileData.lastLoginAt || new Date(),
            });
            
            // Update last login time
            await setDoc(doc(db, 'users', user.uid), {
              lastLoginAt: serverTimestamp(),
            }, { merge: true });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(user, { displayName });
      
      // Create user document in Firestore
      const userProfile: Omit<UserProfile, 'lastLoginAt'> = {
        uid: user.uid,
        email: user.email!,
        displayName,
        createdAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        lastLoginAt: serverTimestamp(),
      });
      
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create account');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to sign in');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const { user } = await signInWithPopup(auth, provider);
      
      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const userProfile: Omit<UserProfile, 'lastLoginAt'> = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || '',
          createdAt: new Date(),
        };
        
        await setDoc(doc(db, 'users', user.uid), {
          ...userProfile,
          lastLoginAt: serverTimestamp(),
        });
      }
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to sign in with Google');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to sign out');
    }
  };

  const updateUserProfile = async (displayName: string) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      // Update Firebase Auth profile
      await updateProfile(user, { displayName });
      
      // Update Firestore user document
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        displayName,
        lastLoginAt: serverTimestamp(),
      }, { merge: true });

      // Update local user profile state
      setUserProfile(prev => prev ? { ...prev, displayName } : null);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
