const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'رقم الهاتف مطلوب'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: 6
  },
  userType: {
    type: String,
    enum: ['customer', 'craftsman'],
    default: 'customer'
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  avatar: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  // خاص بالحرفيين
  skills: [{
    type: String,
    enum: [
      'كهربائي',
      'سباك',
      'نجار',
      'دهان',
      'ميكانيكي',
      'فني تكييف',
      'فني أجهزة منزلية',
      'بناء وترميم',
      'أخرى'
    ]
  }],
  experience: {
    type: Number,
    default: 0
  },
  priceRange: {
    min: Number,
    max: Number
  },
  availability: {
    type: Boolean,
    default: true
  },
  workingHours: {
    start: String,
    end: String
  },
  description: String,
  portfolio: [{
    image: String,
    description: String
  }],
  completedJobs: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// تشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// مقارنة كلمة المرور
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);