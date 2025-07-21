const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// توليد JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'khabeer-alhay-secret', {
    expiresIn: '30d'
  });
};

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, userType, location, skills } = req.body;

    // التحقق من وجود المستخدم
    const userExists = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: 'المستخدم موجود بالفعل بهذا البريد الإلكتروني أو رقم الهاتف' 
      });
    }

    // إنشاء مستخدم جديد
    const userData = {
      name,
      email,
      phone,
      password,
      userType,
      location
    };

    // إضافة المهارات للحرفيين
    if (userType === 'craftsman' && skills) {
      userData.skills = skills;
    }

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        location: user.location,
        skills: user.skills,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'بيانات المستخدم غير صحيحة' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن المستخدم
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        location: user.location,
        skills: user.skills,
        rating: user.rating,
        reviewsCount: user.reviewsCount,
        avatar: user.avatar,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// الحصول على بيانات المستخدم الحالي
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تحديث بيانات المستخدم
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.location = req.body.location || user.location;
      
      if (user.userType === 'craftsman') {
        user.skills = req.body.skills || user.skills;
        user.experience = req.body.experience || user.experience;
        user.priceRange = req.body.priceRange || user.priceRange;
        user.workingHours = req.body.workingHours || user.workingHours;
        user.description = req.body.description || user.description;
        user.availability = req.body.availability !== undefined ? req.body.availability : user.availability;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        userType: updatedUser.userType,
        location: updatedUser.location,
        skills: updatedUser.skills,
        experience: updatedUser.experience,
        priceRange: updatedUser.priceRange,
        workingHours: updatedUser.workingHours,
        description: updatedUser.description,
        availability: updatedUser.availability,
        rating: updatedUser.rating,
        reviewsCount: updatedUser.reviewsCount,
        completedJobs: updatedUser.completedJobs,
        avatar: updatedUser.avatar
      });
    } else {
      res.status(404).json({ message: 'المستخدم غير موجود' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;