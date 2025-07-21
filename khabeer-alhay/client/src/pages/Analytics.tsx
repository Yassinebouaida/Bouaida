import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { servicesAPI } from '../services/api';
import { Service } from '../types';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getMyServices(1, 100); // جلب جميع الخدمات
      setServices(response.services);
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredServices = () => {
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeRange) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return services.filter(service => 
      new Date(service.createdAt) >= filterDate
    );
  };

  const calculateEarnings = () => {
    const filteredServices = getFilteredServices();
    const completedServices = filteredServices.filter(s => s.status === 'completed');
    
    const totalEarnings = completedServices.reduce((total, service) => {
      return total + (service.agreedPrice || 0);
    }, 0);

    const averageEarning = completedServices.length > 0 
      ? totalEarnings / completedServices.length 
      : 0;

    return { totalEarnings, averageEarning, completedCount: completedServices.length };
  };

  const getServicesByCategory = () => {
    const filteredServices = getFilteredServices();
    const categories: { [key: string]: number } = {};
    
    filteredServices.forEach(service => {
      categories[service.category] = (categories[service.category] || 0) + 1;
    });

    return Object.entries(categories).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / filteredServices.length) * 100) || 0
    }));
  };

  const getPerformanceMetrics = () => {
    const filteredServices = getFilteredServices();
    const completedServices = filteredServices.filter(s => s.status === 'completed');
    
    const completionRate = filteredServices.length > 0 
      ? Math.round((completedServices.length / filteredServices.length) * 100) 
      : 0;

    const averageRating = completedServices.length > 0
      ? completedServices.reduce((sum, s) => sum + (s.rating || 0), 0) / completedServices.length
      : 0;

    const responseTime = '< 2 ساعات'; // يمكن حسابها من timestamps الرسائل

    return { completionRate, averageRating, responseTime };
  };

  const earnings = calculateEarnings();
  const categoryData = getServicesByCategory();
  const performance = getPerformanceMetrics();
  const filteredServices = getFilteredServices();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (user?.userType !== 'craftsman') {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>🚫 غير مصرح</h2>
          <p>هذه الصفحة متاحة للحرفيين فقط</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="card-title">📊 إحصائيات الأداء</h1>
              <p>تحليل مفصل لأدائك وأرباحك</p>
            </div>
            
            <select 
              className="form-select" 
              style={{ width: 'auto' }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
            >
              <option value="week">آخر أسبوع</option>
              <option value="month">آخر شهر</option>
              <option value="year">آخر سنة</option>
            </select>
          </div>
        </div>

        {/* إحصائيات الأرباح */}
        <div className="card">
          <h3>💰 إحصائيات الأرباح</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#27ae60' }}>💵</div>
              <h3>{earnings.totalEarnings.toLocaleString()} درهم</h3>
              <h4>إجمالي الأرباح</h4>
              <p>خلال {timeRange === 'week' ? 'الأسبوع' : timeRange === 'month' ? 'الشهر' : 'السنة'} الماضية</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#3498db' }}>📈</div>
              <h3>{Math.round(earnings.averageEarning).toLocaleString()} درهم</h3>
              <h4>متوسط الربح</h4>
              <p>لكل خدمة مكتملة</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#f39c12' }}>✅</div>
              <h3>{earnings.completedCount}</h3>
              <h4>خدمات مكتملة</h4>
              <p>تم إنجازها بنجاح</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#9b59b6' }}>📊</div>
              <h3>{performance.completionRate}%</h3>
              <h4>معدل الإنجاز</h4>
              <p>نسبة الخدمات المكتملة</p>
            </div>
          </div>
        </div>

        {/* مقاييس الأداء */}
        <div className="card">
          <h3>📈 مقاييس الأداء</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: `conic-gradient(#27ae60 ${performance.completionRate * 3.6}deg, #e0e0e0 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                {performance.completionRate}%
              </div>
              <h4>معدل إكمال الخدمات</h4>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                color: '#f39c12', 
                marginBottom: '1rem' 
              }}>
                ⭐ {performance.averageRating.toFixed(1)}
              </div>
              <h4>متوسط التقييم</h4>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                color: '#3498db', 
                marginBottom: '1rem' 
              }}>
                ⚡ {performance.responseTime}
              </div>
              <h4>متوسط وقت الاستجابة</h4>
            </div>
          </div>
        </div>

        {/* التوزيع حسب التخصص */}
        <div className="card">
          <h3>🔧 التوزيع حسب التخصص</h3>
          {categoryData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>
              لا توجد بيانات للفترة المحددة
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {categoryData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <div style={{ minWidth: '120px' }}>
                    <strong>{item.category}</strong>
                  </div>
                  
                  <div style={{ 
                    flex: 1, 
                    height: '20px', 
                    background: '#e0e0e0', 
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      background: '#667eea',
                      borderRadius: '10px',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  
                  <div style={{ 
                    minWidth: '80px', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#667eea'
                  }}>
                    {item.count} ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* نصائح لتحسين الأداء */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea20, #764ba220)' }}>
          <h3>💡 نصائح لتحسين الأداء</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <h4>🚀 زيادة الأرباح</h4>
              <ul style={{ margin: 0, paddingRight: '1rem' }}>
                <li>قدم خدمات عالية الجودة</li>
                <li>كن سريعاً في الاستجابة</li>
                <li>احرص على المواعيد</li>
              </ul>
            </div>

            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <h4>⭐ تحسين التقييم</h4>
              <ul style={{ margin: 0, paddingRight: '1rem' }}>
                <li>تواصل بوضوح مع العملاء</li>
                <li>قدم نصائح مفيدة</li>
                <li>اطلب التقييم بعد الانتهاء</li>
              </ul>
            </div>

            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <h4>📈 زيادة الطلبات</h4>
              <ul style={{ margin: 0, paddingRight: '1rem' }}>
                <li>حدث ملفك الشخصي</li>
                <li>أضف صور لأعمالك</li>
                <li>كن متاحاً في أوقات الذروة</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;