const express = require('express');
const Service = require('../models/Service');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// إنشاء طلب خدمة جديد
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      urgency,
      location,
      budget,
      preferredTime
    } = req.body;

    const service = await Service.create({
      customer: req.user._id,
      title,
      description,
      category,
      urgency,
      location,
      budget,
      preferredTime
    });

    await service.populate('customer', 'name phone location');
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// الحصول على جميع الخدمات المتاحة (للحرفيين)
router.get('/available', protect, authorize('craftsman'), async (req, res) => {
  try {
    const { category, city, urgency } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { status: 'pending' };

    // فلترة حسب المهارات
    if (category) {
      query.category = category;
    } else {
      // عرض الخدمات التي تتطابق مع مهارات الحرفي
      query.category = { $in: req.user.skills };
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (urgency) {
      query.urgency = urgency;
    }

    const services = await Service.find(query)
      .populate('customer', 'name phone location rating reviewsCount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(query);

    res.json({
      services,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// الحصول على خدمات المستخدم
router.get('/my-services', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (req.user.userType === 'customer') {
      query.customer = req.user._id;
    } else {
      query.craftsman = req.user._id;
    }

    const services = await Service.find(query)
      .populate('customer', 'name phone location')
      .populate('craftsman', 'name phone skills rating reviewsCount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(query);

    res.json({
      services,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// الحصول على خدمة محددة
router.get('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('customer', 'name phone location rating reviewsCount')
      .populate('craftsman', 'name phone skills rating reviewsCount experience')
      .populate('offers.craftsman', 'name phone skills rating reviewsCount');

    if (!service) {
      return res.status(404).json({ message: 'الخدمة غير موجودة' });
    }

    // التحقق من أن المستخدم له صلاحية لرؤية هذه الخدمة
    const isAuthorized = 
      service.customer._id.toString() === req.user._id.toString() ||
      (service.craftsman && service.craftsman._id.toString() === req.user._id.toString()) ||
      service.offers.some(offer => offer.craftsman._id.toString() === req.user._id.toString());

    if (!isAuthorized && req.user.userType === 'craftsman' && service.status === 'pending') {
      // السماح للحرفيين برؤية الخدمات المتاحة
    } else if (!isAuthorized) {
      return res.status(403).json({ message: 'غير مصرح لك بالوصول لهذه الخدمة' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تقديم عرض على خدمة
router.post('/:id/offer', protect, authorize('craftsman'), async (req, res) => {
  try {
    const { price, message, estimatedDuration } = req.body;
    
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'الخدمة غير موجودة' });
    }

    if (service.status !== 'pending') {
      return res.status(400).json({ message: 'لا يمكن تقديم عرض على هذه الخدمة' });
    }

    // التحقق من عدم وجود عرض سابق من نفس الحرفي
    const existingOffer = service.offers.find(
      offer => offer.craftsman.toString() === req.user._id.toString()
    );

    if (existingOffer) {
      return res.status(400).json({ message: 'لقد قدمت عرضاً على هذه الخدمة من قبل' });
    }

    service.offers.push({
      craftsman: req.user._id,
      price,
      message,
      estimatedDuration
    });

    await service.save();
    await service.populate('offers.craftsman', 'name phone skills rating reviewsCount');

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// قبول عرض
router.post('/:id/accept-offer', protect, authorize('customer'), async (req, res) => {
  try {
    const { craftsmanId } = req.body;
    
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'الخدمة غير موجودة' });
    }

    if (service.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'غير مصرح لك بهذا الإجراء' });
    }

    if (service.status !== 'pending') {
      return res.status(400).json({ message: 'لا يمكن قبول عرض على هذه الخدمة' });
    }

    const selectedOffer = service.offers.find(
      offer => offer.craftsman.toString() === craftsmanId
    );

    if (!selectedOffer) {
      return res.status(404).json({ message: 'العرض غير موجود' });
    }

    service.craftsman = craftsmanId;
    service.status = 'accepted';
    service.agreedPrice = selectedOffer.price;
    service.startTime = new Date();

    await service.save();
    await service.populate('craftsman', 'name phone skills rating reviewsCount');

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تحديث حالة الخدمة
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'الخدمة غير موجودة' });
    }

    // التحقق من الصلاحيات
    const isCustomer = service.customer.toString() === req.user._id.toString();
    const isCraftsman = service.craftsman && service.craftsman.toString() === req.user._id.toString();

    if (!isCustomer && !isCraftsman) {
      return res.status(403).json({ message: 'غير مصرح لك بهذا الإجراء' });
    }

    // قواعد تحديث الحالة
    if (status === 'in_progress' && service.status === 'accepted' && isCraftsman) {
      service.status = 'in_progress';
    } else if (status === 'completed' && service.status === 'in_progress' && isCraftsman) {
      service.status = 'completed';
      service.completionTime = new Date();
      
      // تحديث عدد المهام المكتملة للحرفي
      await User.findByIdAndUpdate(service.craftsman, { 
        $inc: { completedJobs: 1 } 
      });
    } else if (status === 'cancelled' && (isCustomer || isCraftsman)) {
      service.status = 'cancelled';
    } else {
      return res.status(400).json({ message: 'تحديث الحالة غير صالح' });
    }

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// إضافة تقييم
router.post('/:id/review', protect, authorize('customer'), async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'الخدمة غير موجودة' });
    }

    if (service.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'غير مصرح لك بهذا الإجراء' });
    }

    if (service.status !== 'completed') {
      return res.status(400).json({ message: 'يمكن التقييم فقط بعد اكتمال الخدمة' });
    }

    if (service.rating) {
      return res.status(400).json({ message: 'تم تقييم هذه الخدمة من قبل' });
    }

    service.rating = rating;
    service.review = {
      comment,
      createdAt: new Date()
    };

    await service.save();

    // تحديث متوسط التقييم للحرفي
    const craftsman = await User.findById(service.craftsman);
    const services = await Service.find({ 
      craftsman: service.craftsman, 
      rating: { $exists: true } 
    });
    
    const totalRating = services.reduce((sum, s) => sum + s.rating, 0);
    const averageRating = totalRating / services.length;
    
    craftsman.rating = Math.round(averageRating * 10) / 10;
    craftsman.reviewsCount = services.length;
    
    await craftsman.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;