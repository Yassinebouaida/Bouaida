import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import { ServiceFormData } from '../types';

const CreateService: React.FC = () => {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    category: '',
    urgency: 'عادي',
    location: {
      address: '',
      city: ''
    },
    budget: {
      min: 0,
      max: 0
    },
    preferredTime: {
      date: '',
      timeSlot: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const categories = [
    'كهربائي',
    'سباك',
    'نجار',
    'دهان',
    'ميكانيكي',
    'فني تكييف',
    'فني أجهزة منزلية',
    'بناء وترميم',
    'أخرى'
  ];

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'address' || name === 'city') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value
        }
      });
    } else if (name === 'minBudget' || name === 'maxBudget') {
      setFormData({
        ...formData,
        budget: {
          ...formData.budget,
          [name === 'minBudget' ? 'min' : 'max']: parseInt(value) || 0
        }
      });
    } else if (name === 'date' || name === 'timeSlot') {
      setFormData({
        ...formData,
        preferredTime: {
          ...formData.preferredTime,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.category) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (!formData.location.address || !formData.location.city) {
      setError('يرجى إدخال العنوان والمدينة');
      return;
    }

    try {
      setLoading(true);
      await servicesAPI.createService(formData);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في إنشاء الطلب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <div className="card-header">
          <h2 className="card-title">طلب خدمة جديدة</h2>
          <p>اوصف مشكلتك وسيتواصل معك أفضل الحرفيين في منطقتك</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              عنوان المشكلة *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="مثال: إصلاح عطل في الكهرباء"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              نوع الخدمة *
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">اختر نوع الخدمة</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              وصف تفصيلي للمشكلة *
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              placeholder="اشرح المشكلة بالتفصيل، متى بدأت، وما هي الأعراض..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="urgency" className="form-label">
              مستوى الأولوية
            </label>
            <select
              id="urgency"
              name="urgency"
              className="form-select"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value="عادي">عادي - يمكن الانتظار</option>
              <option value="مستعجل">مستعجل - في نفس اليوم</option>
              <option value="طارئ">طارئ - فوري</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                العنوان التفصيلي *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={formData.location.address}
                onChange={handleChange}
                placeholder="الحي، الشارع، رقم المنزل"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city" className="form-label">
                المدينة *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                value={formData.location.city}
                onChange={handleChange}
                placeholder="الرباط، الدار البيضاء..."
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="minBudget" className="form-label">
                الحد الأدنى للميزانية (درهم)
              </label>
              <input
                type="number"
                id="minBudget"
                name="minBudget"
                className="form-control"
                value={formData.budget?.min || ''}
                onChange={handleChange}
                placeholder="100"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxBudget" className="form-label">
                الحد الأقصى للميزانية (درهم)
              </label>
              <input
                type="number"
                id="maxBudget"
                name="maxBudget"
                className="form-control"
                value={formData.budget?.max || ''}
                onChange={handleChange}
                placeholder="500"
                min="0"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                التاريخ المفضل
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.preferredTime?.date || ''}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot" className="form-label">
                الوقت المفضل
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="form-select"
                value={formData.preferredTime?.timeSlot || ''}
                onChange={handleChange}
              >
                <option value="">اختر الوقت</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'جاري إنشاء الطلب...' : 'إنشاء طلب الخدمة'}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;