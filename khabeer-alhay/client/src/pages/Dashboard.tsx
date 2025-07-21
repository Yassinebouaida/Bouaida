import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { servicesAPI } from '../services/api';
import { Service } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-services' | 'available'>('my-services');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'my-services') {
        const response = await servicesAPI.getMyServices();
        setServices(response.services);
      } else if (user?.userType === 'craftsman') {
        const response = await servicesAPI.getAvailableServices();
        setAvailableServices(response.services);
      }
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
    } finally {
      setLoading(false);
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
            مرحباً، {user?.name}
          </h1>
          <p>
            {user?.userType === 'customer' 
              ? 'إدارة طلبات الخدمات الخاصة بك' 
              : 'إدارة عملك والعثور على خدمات جديدة'
            }
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="features-grid" style={{ margin: '2rem 0' }}>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>{services.length}</h3>
            <p>
              {user?.userType === 'customer' ? 'طلبات الخدمات' : 'الخدمات المقبولة'}
            </p>
          </div>
          
          {user?.userType === 'craftsman' && (
            <>
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h3>{user.rating.toFixed(1)}</h3>
                <p>التقييم العام</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>{user.completedJobs || 0}</h3>
                <p>المهام المكتملة</p>
              </div>
            </>
          )}
        </div>

        {/* التبويبات */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #eee' }}>
            <button
              onClick={() => setActiveTab('my-services')}
              className={`btn ${activeTab === 'my-services' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '8px 8px 0 0' }}
            >
              {user?.userType === 'customer' ? 'طلباتي' : 'خدماتي'}
            </button>
            
            {user?.userType === 'craftsman' && (
              <button
                onClick={() => setActiveTab('available')}
                className={`btn ${activeTab === 'available' ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '8px 8px 0 0' }}
              >
                الخدمات المتاحة
              </button>
            )}
          </div>
        </div>

        {/* محتوى التبويبات */}
        {activeTab === 'my-services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>
                {user?.userType === 'customer' ? 'طلبات الخدمات' : 'خدماتي المقبولة'}
              </h2>
              {user?.userType === 'customer' && (
                <Link to="/create-service" className="btn btn-primary">
                  طلب خدمة جديدة
                </Link>
              )}
            </div>

            {services.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>لا توجد خدمات حالياً</p>
                {user?.userType === 'customer' && (
                  <Link to="/create-service" className="btn btn-primary">
                    اطلب خدمتك الأولى
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
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`status-badge status-${service.status}`}>
                          {getStatusText(service.status)}
                        </span>
                        <Link to={`/service/${service._id}`} className="btn btn-primary">
                          عرض التفاصيل
                        </Link>
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
            <h2>الخدمات المتاحة للعمل</h2>
            
            {availableServices.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>لا توجد خدمات متاحة في تخصصك حالياً</p>
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
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>📍 {service.location.city}</span>
                        <Link to={`/service/${service._id}`} className="btn btn-primary">
                          تقديم عرض
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
    </div>
  );
};

export default Dashboard;