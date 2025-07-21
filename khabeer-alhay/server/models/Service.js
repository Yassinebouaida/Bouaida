const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  craftsman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  title: {
    type: String,
    required: [true, 'عنوان الخدمة مطلوب']
  },
  description: {
    type: String,
    required: [true, 'وصف المشكلة مطلوب']
  },
  category: {
    type: String,
    required: true,
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
  },
  urgency: {
    type: String,
    enum: ['عادي', 'مستعجل', 'طارئ'],
    default: 'عادي'
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [{
    type: String
  }],
  budget: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'MAD'
    }
  },
  preferredTime: {
    date: Date,
    timeSlot: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  offers: [{
    craftsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    price: Number,
    message: String,
    estimatedDuration: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  agreedPrice: Number,
  startTime: Date,
  completionTime: Date,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    comment: String,
    createdAt: Date
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['text', 'image'],
      default: 'text'
    }
  }]
}, {
  timestamps: true
});

// فهرسة للبحث السريع
serviceSchema.index({ category: 1, status: 1 });
serviceSchema.index({ 'location.coordinates': '2dsphere' });
serviceSchema.index({ customer: 1, createdAt: -1 });
serviceSchema.index({ craftsman: 1, createdAt: -1 });

module.exports = mongoose.model('Service', serviceSchema);