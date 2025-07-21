import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { servicesAPI } from '../services/api';
import { Service } from '../types';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offerData, setOfferData] = useState({
    price: '',
    message: '',
    estimatedDuration: ''
  });
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [submittingOffer, setSubmittingOffer] = useState(false);

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const serviceData = await servicesAPI.getServiceById(id!);
      setService(serviceData);
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في جلب بيانات الخدمة');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !user) return;

    if (!offerData.price || !offerData.message) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setSubmittingOffer(true);
      setError('');
      
      const updatedService = await servicesAPI.submitOffer(service._id, {
        price: parseInt(offerData.price),
        message: offerData.message,
        estimatedDuration: offerData.estimatedDuration
      });
      
      setService(updatedService);
      setShowOfferForm(false);
      setOfferData({ price: '', message: '', estimatedDuration: '' });
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في تقديم العرض');
    } finally {
      setSubmittingOffer(false);
    }
  };

  const handleAcceptOffer = async (craftsmanId: string) => {
    if (!service) return;

    try {
      const updatedService = await servicesAPI.acceptOffer(service._id, craftsmanId);
      setService(updatedService);
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في قبول العرض');
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!service) return;

    try {
      const updatedService = await servicesAPI.updateServiceStatus(service._id, status);
      setService(updatedService);
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في تحديث الحالة');
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

  const canSubmitOffer = () => {
    return user?.userType === 'craftsman' && 
           service?.status === 'pending' && 
           !service.offers.some(offer => offer.craftsman._id === user._id);
  };

  const isCustomer = () => {
    return user?._id === service?.customer._id;
  };

  const isCraftsman = () => {
    return user?._id === service?.craftsman?._id;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>الخدمة غير موجودة</h2>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            العودة للوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h1 className="card-title">{service.title}</h1>
              <span className="service-category">{service.category}</span>
            </div>
            <span className={`status-badge status-${service.status}`}>
              {getStatusText(service.status)}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* معلومات الخدمة */}
          <div>
            <div className="card">
              <h3>تفاصيل المشكلة</h3>
              <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                {service.description}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <strong>📅 تاريخ الطلب:</strong>
                  <p>{formatDate(service.createdAt.toString())}</p>
                </div>
                
                <div>
                  <strong>⚡ مستوى الأولوية:</strong>
                  <span className={`urgency-badge urgency-${service.urgency}`}>
                    {service.urgency}
                  </span>
                </div>
                
                <div>
                  <strong>📍 الموقع:</strong>
                  <p>{service.location.address}, {service.location.city}</p>
                </div>
                
                {service.budget && (
                  <div>
                    <strong>💰 الميزانية المتوقعة:</strong>
                    <p>{service.budget.min} - {service.budget.max} درهم</p>
                  </div>
                )}
              </div>
            </div>

            {/* العروض المقدمة */}
            {service.offers.length > 0 && (
              <div className="card">
                <h3>العروض المقدمة ({service.offers.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {service.offers.map((offer, index) => (
                    <div key={index} className="card" style={{ background: '#f8f9fa' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h4>{offer.craftsman.name}</h4>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`star ${i < offer.craftsman.rating ? '' : 'empty'}`}>
                                ⭐
                              </span>
                            ))}
                            <span>({offer.craftsman.reviewsCount} تقييم)</span>
                          </div>
                          <p style={{ margin: '0.5rem 0' }}>{offer.message}</p>
                          <small>📞 {offer.craftsman.phone}</small>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                            {offer.price} درهم
                          </div>
                          {offer.estimatedDuration && (
                            <small>⏱️ {offer.estimatedDuration}</small>
                          )}
                          
                          {isCustomer() && service.status === 'pending' && (
                            <button
                              onClick={() => handleAcceptOffer(offer.craftsman._id)}
                              className="btn btn-success"
                              style={{ marginTop: '0.5rem' }}
                            >
                              قبول العرض
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* الشريط الجانبي */}
          <div>
            {/* معلومات العميل */}
            <div className="card">
              <h3>معلومات العميل</h3>
              <div style={{ textAlign: 'center' }}>
                <div className="user-avatar" style={{ margin: '0 auto 1rem' }}>
                  {service.customer.name.charAt(0)}
                </div>
                <h4>{service.customer.name}</h4>
                <p>📞 {service.customer.phone}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < service.customer.rating ? '' : 'empty'}`}>
                      ⭐
                    </span>
                  ))}
                  <span>({service.customer.reviewsCount} تقييم)</span>
                </div>
              </div>
            </div>

            {/* معلومات الحرفي (إذا تم قبول العرض) */}
            {service.craftsman && (
              <div className="card">
                <h3>الحرفي المسؤول</h3>
                <div style={{ textAlign: 'center' }}>
                  <div className="user-avatar" style={{ margin: '0 auto 1rem' }}>
                    {service.craftsman.name.charAt(0)}
                  </div>
                  <h4>{service.craftsman.name}</h4>
                  <p>📞 {service.craftsman.phone}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < service.craftsman.rating ? '' : 'empty'}`}>
                        ⭐
                      </span>
                    ))}
                    <span>({service.craftsman.reviewsCount} تقييم)</span>
                  </div>
                  {service.agreedPrice && (
                    <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                      السعر المتفق عليه: {service.agreedPrice} درهم
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* أزرار الإجراءات */}
            <div className="card">
              <h3>الإجراءات</h3>
              
              {canSubmitOffer() && (
                <button
                  onClick={() => setShowOfferForm(true)}
                  className="btn btn-primary"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  تقديم عرض
                </button>
              )}

              {isCraftsman() && service.status === 'accepted' && (
                <button
                  onClick={() => handleUpdateStatus('in_progress')}
                  className="btn btn-primary"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  بدء العمل
                </button>
              )}

              {isCraftsman() && service.status === 'in_progress' && (
                <button
                  onClick={() => handleUpdateStatus('completed')}
                  className="btn btn-success"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  إنهاء العمل
                </button>
              )}

              {(isCustomer() || isCraftsman()) && service.status !== 'completed' && service.status !== 'cancelled' && (
                <button
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="btn btn-danger"
                  style={{ width: '100%' }}
                >
                  إلغاء الخدمة
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* نموذج تقديم العرض */}
      {showOfferForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '500px', margin: 0 }}>
            <div className="card-header">
              <h3 className="card-title">تقديم عرض</h3>
            </div>

            <form onSubmit={handleSubmitOffer}>
              <div className="form-group">
                <label className="form-label">السعر المطلوب (درهم) *</label>
                <input
                  type="number"
                  className="form-control"
                  value={offerData.price}
                  onChange={(e) => setOfferData({ ...offerData, price: e.target.value })}
                  placeholder="300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">رسالة للعميل *</label>
                <textarea
                  className="form-control"
                  value={offerData.message}
                  onChange={(e) => setOfferData({ ...offerData, message: e.target.value })}
                  placeholder="اشرح خبرتك وكيف ستحل المشكلة..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">المدة المتوقعة</label>
                <input
                  type="text"
                  className="form-control"
                  value={offerData.estimatedDuration}
                  onChange={(e) => setOfferData({ ...offerData, estimatedDuration: e.target.value })}
                  placeholder="ساعتين، يوم واحد..."
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submittingOffer}
                  style={{ flex: 1 }}
                >
                  {submittingOffer ? 'جاري الإرسال...' : 'إرسال العرض'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowOfferForm(false)}
                  style={{ flex: 1 }}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;