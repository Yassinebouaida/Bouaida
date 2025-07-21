const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const connectDB = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

// إنشاء التطبيق
const app = express();
const server = http.createServer(app);

// إعداد Socket.IO للدردشة المباشرة
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// الاتصال بقاعدة البيانات
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// مجلد الملفات المرفوعة
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// معالجة Socket.IO للدردشة
io.on('connection', (socket) => {
  console.log('مستخدم متصل:', socket.id);

  // الانضمام لغرفة خدمة محددة
  socket.on('join_service', (serviceId) => {
    socket.join(serviceId);
    console.log(`المستخدم ${socket.id} انضم لغرفة الخدمة ${serviceId}`);
  });

  // إرسال رسالة
  socket.on('send_message', (data) => {
    const { serviceId, message, sender } = data;
    
    // إرسال الرسالة لجميع المستخدمين في نفس غرفة الخدمة
    io.to(serviceId).emit('receive_message', {
      message,
      sender,
      timestamp: new Date()
    });
  });

  // مغادرة غرفة الخدمة
  socket.on('leave_service', (serviceId) => {
    socket.leave(serviceId);
    console.log(`المستخدم ${socket.id} غادر غرفة الخدمة ${serviceId}`);
  });

  // قطع الاتصال
  socket.on('disconnect', () => {
    console.log('مستخدم منقطع:', socket.id);
  });
});

// إذا كان في بيئة الإنتاج، تقديم ملفات React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// معالجة الأخطاء العامة
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'خطأ في الخادم' });
});

// معالجة الروابط غير الموجودة
app.use('*', (req, res) => {
  res.status(404).json({ message: 'الصفحة غير موجودة' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});