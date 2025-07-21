import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RegisterData } from '../types';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'customer',
    location: {
      address: '',
      city: ''
    },
    skills: []
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const skillsOptions = [
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'address' || name === 'city') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
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

  const handleSkillChange = (skill: string) => {
    const updatedSkills = formData.skills?.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...(formData.skills || []), skill];
    
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // التحقق من البيانات
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.password !== confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (formData.userType === 'craftsman' && (!formData.skills || formData.skills.length === 0)) {
      setError('يرجى اختيار مهارة واحدة على الأقل للحرفيين');
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في إنشاء الحساب');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card-header">
          <h2 className="card-title">إنشاء حساب جديد</h2>
          <p>انضم إلى خبير الحي واحصل على خدمات منزلية موثوقة</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              الاسم الكامل *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="أحمد محمد"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              رقم الهاتف *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0612345678"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType" className="form-label">
              نوع الحساب *
            </label>
            <select
              id="userType"
              name="userType"
              className="form-select"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="customer">عميل - أحتاج خدمات</option>
              <option value="craftsman">حرفي - أقدم خدمات</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              العنوان
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formData.location.address}
              onChange={handleChange}
              placeholder="الحي، الشارع، رقم المنزل"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city" className="form-label">
              المدينة
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              value={formData.location.city}
              onChange={handleChange}
              placeholder="الرباط، الدار البيضاء، فاس..."
            />
          </div>

          {formData.userType === 'craftsman' && (
            <div className="form-group">
              <label className="form-label">
                المهارات والتخصصات *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {skillsOptions.map((skill) => (
                  <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.skills?.includes(skill) || false}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              كلمة المرور *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="6 أحرف على الأقل"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              تأكيد كلمة المرور *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="أعد كتابة كلمة المرور"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login" style={{ color: '#667eea' }}>
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;