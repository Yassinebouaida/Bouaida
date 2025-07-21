export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'customer' | 'craftsman';
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  avatar?: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  skills?: string[];
  experience?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: boolean;
  workingHours?: {
    start: string;
    end: string;
  };
  description?: string;
  portfolio?: Array<{
    image: string;
    description: string;
  }>;
  completedJobs?: number;
  token?: string;
}

export interface Service {
  _id: string;
  customer: User;
  craftsman?: User;
  title: string;
  description: string;
  category: string;
  urgency: 'عادي' | 'مستعجل' | 'طارئ';
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images?: string[];
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  preferredTime?: {
    date: Date;
    timeSlot: string;
  };
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  offers: Offer[];
  agreedPrice?: number;
  startTime?: Date;
  completionTime?: Date;
  rating?: number;
  review?: {
    comment: string;
    createdAt: Date;
  };
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Offer {
  _id?: string;
  craftsman: User;
  price: number;
  message: string;
  estimatedDuration: string;
  createdAt: Date;
}

export interface Message {
  _id?: string;
  sender: User;
  message: string;
  timestamp: Date;
  type: 'text' | 'image';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'customer' | 'craftsman';
  location: {
    address: string;
    city: string;
  };
  skills?: string[];
}

export interface ServiceFormData {
  title: string;
  description: string;
  category: string;
  urgency: 'عادي' | 'مستعجل' | 'طارئ';
  location: {
    address: string;
    city: string;
  };
  budget?: {
    min: number;
    max: number;
  };
  preferredTime?: {
    date: string;
    timeSlot: string;
  };
}

export interface ServiceFilters {
  category?: string;
  city?: string;
  urgency?: string;
  page?: number;
  limit?: number;
}