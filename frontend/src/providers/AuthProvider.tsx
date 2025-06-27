import { useEffect, useState, ReactNode } from 'react'
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  User,
  updateProfile 
} from 'firebase/auth'
import { auth } from '../config/firebase.config'
import AuthContext from '../contexts/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const googleProvider = new GoogleAuthProvider()

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add request interceptor to add token
api.interceptors.request.use(async (config) => {
  try {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true);
      console.log('Adding token to request:', { tokenExists: !!token });
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('No current user found for token request');
    }
    return config;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText
    });
    return response;
  },
  (error) => {
    console.error('API Error Response:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.config?.headers
    });
    return Promise.reject(error);
  }
);

interface AuthInfo {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string, photoURL?: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  googleSignIn: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const navigate = useNavigate()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const createOrUpdateUser = async (firebaseUser: User) => {
    try {
      const { data } = await api.post('/api/users/create-or-update', {
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || 'https://i.ibb.co/K7Vkt4m/default-avatar.png',
        uid: firebaseUser.uid
      });
      return data;
    } catch (error: any) {
      console.error('Error creating/updating user:', error.response?.data || error.message);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, photoURL?: string) => {
    try {
      setIsAuthenticating(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { 
        displayName: name, 
        photoURL: photoURL || 'https://i.ibb.co/K7Vkt4m/default-avatar.png' 
      });
      await createOrUpdateUser(result.user);
      toast.success('Successfully signed up!');
      navigate('/');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsAuthenticating(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createOrUpdateUser(result.user);
      if (!isAuthenticating) {
        toast.success('Logged in successfully!');
      }
      navigate('/');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in');
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const googleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      console.log('Starting Google Sign-In process...');
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful:', result.user.email);
      
      await createOrUpdateUser(result.user);
      toast.success('Logged in successfully!');
      navigate('/');
      return result;
    } catch (error: any) {
      console.error('Google Sign-In Error Details:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/configuration-not-found') {
        toast.error('Firebase configuration error. Please check your environment variables.');
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error(`This domain (${window.location.origin}) is not authorized for authentication.`);
      } else if (error.code === 'auth/internal-error') {
        toast.error('Internal authentication error. Please try again or contact support.');
      } else {
        toast.error(`Failed to sign in with Google: ${error.message}`);
      }
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Successfully logged out!');
      navigate('/login');
    } catch (error: any) {
      toast.error('Failed to log out');
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          try {
            const { data } = await api.get('/api/users/profile');
            Object.assign(firebaseUser, data);
            setUser(firebaseUser);
          } catch (profileError) {
            console.error('Error fetching user profile:', profileError);
            // Still set the user even if profile fetch fails
            setUser(firebaseUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo: AuthInfo = {
    user,
    loading,
    signup,
    login,
    googleSignIn,
    logout
  };

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 