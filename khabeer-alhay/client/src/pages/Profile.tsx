import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.location?.address || '',
    city: user?.location?.city || '',
    skills: user?.skills || [],
    experience: user?.experience || 0,
    description: user?.description || '',
    priceRange: {
      min: user?.priceRange?.min || 0,
      max: user?.priceRange?.max || 0
    },
    workingHours: {
      start: user?.workingHours?.start || '',
      end: user?.workingHours?.end || ''
    },
    availability: user?.availability !== undefined ? user.availability : true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'address' || name === 'city') {
      setFormData({
        ...formData,
        location: {
          ...formData,
          [name]: value
        }
      });
    } else if (name === 'minPrice' || name === 'maxPrice') {
      setFormData({
        ...formData,
        priceRange: {
          ...formData.priceRange,
          [name === 'minPrice' ? 'min' : 'max']: parseInt(value) || 0
        }
      });
    } else if (name === 'startTime' || name === 'endTime') {
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [name === 'startTime' ? 'start' : 'end']: value
        }
      });
    } else if (type === 'checkbox' && name === 'availability') {
      setFormData({
        ...formData,
        availability: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseInt(value) || 0 : value
      });
    }
  };

  const handleSkillChange = (skill: string) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updateData: any = {
        name: formData.name,
        phone: formData.phone,
        location: {
          address: formData.address,
          city: formData.city
        }
      };

      if (user?.userType === 'craftsman') {
        updateData.skills = formData.skills;
        updateData.experience = formData.experience;
        updateData.description = formData.description;
        updateData.priceRange = formData.priceRange;
        updateData.workingHours = formData.workingHours;
        updateData.availability = formData.availability;
      }

      await updateProfile(updateData);
      setSuccess('تم تحديث البيانات بنجاح');
      setIsEditing(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'خطأ في تحديث البيانات');
    }
  };

  if (!user) {
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="card-title">الملف الشخصي</h1>
              <p>إدارة معلوماتك الشخصية والمهنية</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* المعلومات الأساسية */}
          <div>
            <div className="card">
              <div style={{ textAlign: 'center' }}>
                <div className="user-avatar" style={{ width: '100px', height: '100px', fontSize: '2rem', margin: '0 auto 1rem' }}>
                  {user.name.charAt(0)}
                </div>
                <h2>{user.name}</h2>
                <p style={{ color: '#667eea', fontWeight: 'bold' }}>
                  {user.userType === 'customer' ? 'عميل' : 'حرفي'}
                </p>
                
                {user.userType === 'craftsman' && (
                  <>
                    <div className="rating" style={{ justifyContent: 'center', margin: '1rem 0' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < user.rating ? '' : 'empty'}`}>
                          ⭐
                        </span>
                      ))}
                      <span>({user.reviewsCount} تقييم)</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                      <div className="feature-card" style={{ padding: '1rem' }}>
                        <div className="feature-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                          ✅
                        </div>
                        <h4>{user.completedJobs || 0}</h4>
                        <p>مهمة مكتملة</p>
                      </div>
                      
                      <div className="feature-card" style={{ padding: '1rem' }}>
                        <div className="feature-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                          ⭐
                        </div>
                        <h4>{user.rating.toFixed(1)}</h4>
                        <p>التقييم</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* تفاصيل الملف الشخصي */}
          <div>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="card">
                <h3>تعديل البيانات</h3>
                
                <div className="form-group">
                  <label htmlFor="name" className="form-label">الاسم الكامل</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">رقم الهاتف</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="address" className="form-label">العنوان</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city" className="form-label">المدينة</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {user.userType === 'craftsman' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">المهارات والتخصصات</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                        {skillsOptions.map((skill) => (
                          <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={formData.skills.includes(skill)}
                              onChange={() => handleSkillChange(skill)}
                            />
                            {skill}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="experience" className="form-label">سنوات الخبرة</label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        className="form-control"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description" className="form-label">نبذة عنك</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="اشرح خبرتك ومهاراتك..."
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label htmlFor="minPrice" className="form-label">الحد الأدنى للسعر (درهم)</label>
                        <input
                          type="number"
                          id="minPrice"
                          name="minPrice"
                          className="form-control"
                          value={formData.priceRange.min}
                          onChange={handleChange}
                          min="0"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="maxPrice" className="form-label">الحد الأقصى للسعر (درهم)</label>
                        <input
                          type="number"
                          id="maxPrice"
                          name="maxPrice"
                          className="form-control"
                          value={formData.priceRange.max}
                          onChange={handleChange}
                          min="0"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label htmlFor="startTime" className="form-label">بداية العمل</label>
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          className="form-control"
                          value={formData.workingHours.start}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="endTime" className="form-label">نهاية العمل</label>
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          className="form-control"
                          value={formData.workingHours.end}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          name="availability"
                          checked={formData.availability}
                          onChange={handleChange}
                        />
                        متاح للعمل حالياً
                      </label>
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              <div className="card">
                <h3>معلومات الحساب</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <p><strong>البريد الإلكتروني:</strong></p>
                    <p>{user.email}</p>
                  </div>
                  
                  <div>
                    <p><strong>رقم الهاتف:</strong></p>
                    <p>{user.phone}</p>
                  </div>
                  
                  <div>
                    <p><strong>العنوان:</strong></p>
                    <p>{user.location?.address || 'غير محدد'}</p>
                  </div>
                  
                  <div>
                    <p><strong>المدينة:</strong></p>
                    <p>{user.location?.city || 'غير محددة'}</p>
                  </div>
                </div>

                {user.userType === 'craftsman' && (
                  <>
                    <hr style={{ margin: '2rem 0' }} />
                    <h3>المعلومات المهنية</h3>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <p><strong>المهارات:</strong></p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {user.skills?.map((skill) => (
                          <span key={skill} className="service-category">
                            {skill}
                          </span>
                        )) || <p>لا توجد مهارات محددة</p>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1rem' }}>
                      <div>
                        <p><strong>سنوات الخبرة:</strong></p>
                        <p>{user.experience || 0} سنة</p>
                      </div>
                      
                      <div>
                        <p><strong>الحالة:</strong></p>
                        <span className={user.availability ? 'status-badge status-accepted' : 'status-badge status-cancelled'}>
                          {user.availability ? 'متاح للعمل' : 'غير متاح'}
                        </span>
                      </div>
                    </div>

                    {user.priceRange && (user.priceRange.min > 0 || user.priceRange.max > 0) && (
                      <div style={{ marginBottom: '1rem' }}>
                        <p><strong>نطاق الأسعار:</strong></p>
                        <p>{user.priceRange.min} - {user.priceRange.max} درهم</p>
                      </div>
                    )}

                    {user.workingHours && (user.workingHours.start || user.workingHours.end) && (
                      <div style={{ marginBottom: '1rem' }}>
                        <p><strong>ساعات العمل:</strong></p>
                        <p>{user.workingHours.start} - {user.workingHours.end}</p>
                      </div>
                    )}

                    {user.description && (
                      <div>
                        <p><strong>نبذة شخصية:</strong></p>
                        <p style={{ lineHeight: 1.6 }}>{user.description}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;