import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { servicesAPI } from '../services/api';
import { Service } from '../types';
import SearchFilters from '../components/SearchFilters';
import DashboardStats from '../components/DashboardStats';
import ReviewModal from '../components/ReviewModal';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-services' | 'available'>('my-services');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);
  
  // فلاتر البحث
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    urgency: '',
    search: ''
  });

  // الإحصائيات
  const [stats, setStats] = useState({
    totalServices: 0,
    pendingServices: 0,
    completedServices: 0,
    activeServices: 0,
    thisMonthEarnings: 0
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    calculateStats();
  }, [services]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'my-services') {
        const response = await servicesAPI.getMyServices();
        setServices(response.services);
      } else if (user?.userType === 'craftsman') {
        const response = await servicesAPI.getAvailableServices(filters);
        setAvailableServices(response.services);
      }
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const pending = services.filter(s => s.status === 'pending').length;
    const completed = services.filter(s => s.status === 'completed').length;
    const active = services.filter(s => s.status === 'accepted' || s.status === 'in_progress').length;
    
    setStats({
      totalServices: services.length,
      pendingServices: pending,
      completedServices: completed,
      activeServices: active,
      thisMonthEarnings: 0 // يمكن حسابها من الخدمات المكتملة
    });
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearch = () => {
    if (activeTab === 'available') {
      fetchAvailableServices();
    }
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      city: '',
      urgency: '',
      search: ''
    });
    if (activeTab === 'available') {
      fetchAvailableServices();
    }
  };

  const fetchAvailableServices = async () => {
    if (user?.userType !== 'craftsman') return;
    
    try {
      setLoading(true);
      const response = await servicesAPI.getAvailableServices(filters);
      setAvailableServices(response.services);
    } catch (error) {
      console.error('خطأ في البحث:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewService = (service: Service) => {
    setSelectedService(service);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async (review: { rating: number; comment: string }) => {
    if (!selectedService) return;

    try {
      setSubmittingReview(true);
      await servicesAPI.submitReview(selectedService._id, review);
      
      // تحديث الخدمة في القائمة
      setServices(prev => prev.map(s => 
        s._id === selectedService._id 
          ? { ...s, rating: review.rating, review: { comment: review.comment, createdAt: new Date() } }
          : s
      ));
      
      setShowReviewModal(false);
      setSelectedService(null);
    } catch (error) {
      console.error('خطأ في إرسال التقييم:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'في انتظار العروض',
      accepted: 'تم قبول العرض',
      in_progress: 'قيد التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغي'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-MA');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            مرحباً، {user?.name} 👋
          </h1>
          <p>
            {user?.userType === 'customer' 
              ? 'إدارة طلبات الخدمات الخاصة بك' 
              : 'إدارة عملك والعثور على خدمات جديدة'
            }
          </p>
        </div>

        {/* الإحصائيات */}
        {user && (
          <DashboardStats user={user} stats={stats} />
        )}

        {/* التبويبات */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #eee' }}>
            <button
              onClick={() => setActiveTab('my-services')}
              className={`btn ${activeTab === 'my-services' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '8px 8px 0 0' }}
            >
              {user?.userType === 'customer' ? '📋 طلباتي' : '🛠️ خدماتي'}
            </button>
            
            {user?.userType === 'craftsman' && (
              <button
                onClick={() => setActiveTab('available')}
                className={`btn ${activeTab === 'available' ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '8px 8px 0 0' }}
              >
                🔍 الخدمات المتاحة
              </button>
            )}
          </div>
        </div>

        {/* فلاتر البحث للخدمات المتاحة */}
        {activeTab === 'available' && user?.userType === 'craftsman' && (
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClear={handleClearFilters}
          />
        )}

        {/* محتوى التبويبات */}
        {activeTab === 'my-services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>
                {user?.userType === 'customer' ? '📋 طلبات الخدمات' : '🛠️ خدماتي المقبولة'}
              </h2>
              {user?.userType === 'customer' && (
                <Link to="/create-service" className="btn btn-primary">
                  ➕ طلب خدمة جديدة
                </Link>
              )}
            </div>

            {services.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                  {user?.userType === 'customer' ? '📋' : '🛠️'}
                </div>
                <h3>لا توجد خدمات حالياً</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  {user?.userType === 'customer' 
                    ? 'لم تطلب أي خدمة بعد. ابدأ بطلب خدمتك الأولى!' 
                    : 'لم تقبل أي خدمة بعد. تصفح الخدمات المتاحة!'
                  }
                </p>
                {user?.userType === 'customer' && (
                  <Link to="/create-service" className="btn btn-primary">
                    🚀 اطلب خدمتك الأولى
                  </Link>
                )}
              </div>
            ) : (
              <div className="services-grid">
                {services.map((service) => (
                  <div key={service._id} className="service-card">
                    <div className="service-card-header">
                      <h3 className="service-title">{service.title}</h3>
                      <span className="service-category">{service.category}</span>
                    </div>
                    
                    <div className="service-card-body">
                      <div className="service-meta">
                        <span>📅 {formatDate(service.createdAt.toString())}</span>
                        <span className={`urgency-badge urgency-${service.urgency}`}>
                          {service.urgency}
                        </span>
                      </div>
                      
                      <p style={{ marginBottom: '1rem', color: '#666' }}>
                        {service.description.substring(0, 100)}...
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span className={`status-badge status-${service.status}`}>
                          {getStatusText(service.status)}
                        </span>
                        {service.agreedPrice && (
                          <span style={{ color: '#667eea', fontWeight: 'bold' }}>
                            💰 {service.agreedPrice} درهم
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          to={`/service/${service._id}`} 
                          className="btn btn-primary"
                          style={{ flex: 1 }}
                        >
                          👁️ عرض التفاصيل
                        </Link>
                        
                        {/* زر التقييم للعملاء */}
                        {user?.userType === 'customer' && 
                         service.status === 'completed' && 
                         !service.rating && (
                          <button
                            onClick={() => handleReviewService(service)}
                            className="btn btn-success"
                            style={{ flex: 1 }}
                          >
                            ⭐ تقييم
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'available' && user?.userType === 'craftsman' && (
          <div>
            <h2>🔍 الخدمات المتاحة للعمل</h2>
            
            {availableServices.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                  🔍
                </div>
                <h3>لا توجد خدمات متاحة</h3>
                <p style={{ color: '#666' }}>
                  لا توجد خدمات متاحة في تخصصك حالياً. جرب تغيير فلاتر البحث أو تحقق لاحقاً.
                </p>
              </div>
            ) : (
              <div className="services-grid">
                {availableServices.map((service) => (
                  <div key={service._id} className="service-card">
                    <div className="service-card-header">
                      <h3 className="service-title">{service.title}</h3>
                      <span className="service-category">{service.category}</span>
                    </div>
                    
                    <div className="service-card-body">
                      <div className="service-meta">
                        <span>📅 {formatDate(service.createdAt.toString())}</span>
                        <span className={`urgency-badge urgency-${service.urgency}`}>
                          {service.urgency}
                        </span>
                      </div>
                      
                      <p style={{ marginBottom: '1rem', color: '#666' }}>
                        {service.description.substring(0, 100)}...
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span>📍 {service.location.city}</span>
                        {service.budget && (
                          <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
                            💰 {service.budget.min}-{service.budget.max} درهم
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>
                          👤 {service.customer.name}
                        </span>
                        <Link to={`/service/${service._id}`} className="btn btn-primary">
                          💼 تقديم عرض
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* نموذج التقييم */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedService(null);
        }}
        onSubmit={handleSubmitReview}
        craftsmanName={selectedService?.craftsman?.name || ''}
        loading={submittingReview}
      />
    </div>
  );
};

export default Dashboard;