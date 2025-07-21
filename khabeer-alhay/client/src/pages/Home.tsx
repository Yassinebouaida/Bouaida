import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>🛠️ خبير الحي - الحل بين يديك!</h1>
          <p>
            تطبيق مبتكر يربط بين السكان المحليين والحرفيين المتخصصين
            <br />
            لحل جميع مشاكل المنزل اليومية بسرعة وأمان
          </p>
          {!user ? (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary">
                ابدأ الآن - مجاناً
              </Link>
              <Link to="/login" className="btn btn-outline">
                تسجيل الدخول
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">
              لوحة التحكم
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>سهولة الاستخدام</h3>
            <p>واجهة بسيطة وعصرية، اطلب الخدمة في ثوانٍ، وتواصل مع خبير خلال دقائق</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>حرفيون موثوقون</h3>
            <p>كل خبير يتم التحقق من هويته وتقييمه من طرف العملاء السابقين</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>خدمة سريعة ومحلّية</h3>
            <p>الخبراء الأقرب لك، في نفس الحي أو المدينة، لضمان سرعة التدخل</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>تنوع الخدمات</h3>
            <p>كهربائي، سباك، نجار، دهان، ميكانيكي، فني تكييف، وأكثر</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>دردشة داخل التطبيق</h3>
            <p>تواصل مباشر مع الخبير، إرسال الصور، الاتفاق على السعر قبل القدوم</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>دفع مرن</h3>
            <p>دفع نقداً، أو تحويل، أو عبر التطبيق مستقبلاً</p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
          خدماتنا المتاحة
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>الأعطال الكهربائية</h3>
            <p>إصلاح الأسلاك، المفاتيح، الإضاءة، واللوحات الكهربائية</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚿</div>
            <h3>مشاكل السباكة والتسربات</h3>
            <p>إصلاح الأنابيب، الحنفيات، المراحيض، وحل مشاكل التسربات</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚪</div>
            <h3>إصلاح الأبواب والنوافذ</h3>
            <p>تركيب وإصلاح الأبواب، النوافذ، والأقفال</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📺</div>
            <h3>صيانة الأجهزة المنزلية</h3>
            <p>إصلاح الثلاجات، الغسالات، المكيفات، والأجهزة الإلكترونية</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚗</div>
            <h3>خدمات الميكانيكي</h3>
            <p>إصلاحات السيارات الطارئة والصيانة الدورية</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏗️</div>
            <h3>بناء وترميم</h3>
            <p>أعمال البناء، الترميم، الدهان، والتشطيبات</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero" style={{ marginTop: '4rem' }}>
        <div className="container">
          <h2>هل أنت حرفي محترف؟</h2>
          <p>انضم إلى شبكة خبراء الحي واحصل على عمل مستقر ومحلي</p>
          {!user && (
            <Link to="/register" className="btn btn-primary">
              سجل كحرفي الآن
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;