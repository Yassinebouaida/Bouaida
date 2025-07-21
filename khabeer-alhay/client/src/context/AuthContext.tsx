import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '../types';
import { authAPI } from '../services/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await authAPI.login(email, password);
      
      if (user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error: any) {
      const message = error.response?.data?.message || 'خطأ في تسجيل الدخول';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await authAPI.register(userData);
      
      if (user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error: any) {
      const message = error.response?.data?.message || 'خطأ في إنشاء الحساب';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const updatedUser = await authAPI.updateProfile(userData);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error: any) {
      const message = error.response?.data?.message || 'خطأ في تحديث البيانات';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  const value: AuthContextType = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};