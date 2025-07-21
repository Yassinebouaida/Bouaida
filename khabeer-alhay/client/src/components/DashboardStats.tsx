import React from 'react';
import { User } from '../types';

interface DashboardStatsProps {
  user: User;
  stats: {
    totalServices: number;
    pendingServices: number;
    completedServices: number;
    activeServices: number;
    totalEarnings?: number;
    thisMonthEarnings?: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user, stats }) => {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} درهم`;
  };

  const getCustomerStats = () => [
    {
      icon: '📋',
      title: 'إجمالي الطلبات',
      value: stats.totalServices,
      color: '#667eea',
      description: 'جميع طلبات الخدمة'
    },
    {
      icon: '⏳',
      title: 'في انتظار العروض',
      value: stats.pendingServices,
      color: '#f39c12',
      description: 'طلبات تنتظر عروض الحرفيين'
    },
    {
      icon: '🔄',
      title: 'قيد التنفيذ',
      value: stats.activeServices,
      color: '#3498db',
      description: 'خدمات يتم العمل عليها'
    },
    {
      icon: '✅',
      title: 'مكتملة',
      value: stats.completedServices,
      color: '#27ae60',
      description: 'خدمات تم إنجازها بنجاح'
    }
  ];

  const getCraftsmanStats = () => [
    {
      icon: '🛠️',
      title: 'الخدمات المقبولة',
      value: stats.totalServices,
      color: '#667eea',
      description: 'إجمالي الخدمات التي قبلتها'
    },
    {
      icon: '⭐',
      title: 'التقييم العام',
      value: user.rating.toFixed(1),
      color: '#f39c12',
      description: `من ${user.reviewsCount} تقييم`
    },
    {
      icon: '✅',
      title: 'المهام المكتملة',
      value: user.completedJobs || 0,
      color: '#27ae60',
      description: 'خدمات أنجزتها بنجاح'
    },
    {
      icon: '💰',
      title: 'الأرباح الشهرية',
      value: stats.thisMonthEarnings ? formatCurrency(stats.thisMonthEarnings) : 'غير متاح',
      color: '#e74c3c',
      description: 'أرباح هذا الشهر'
    }
  ];

  const statsData = user.userType === 'customer' ? getCustomerStats() : getCraftsmanStats();

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>
        📊 إحصائياتك السريعة
      </h3>
      
      <div className="features-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="feature-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* خلفية ملونة */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
              borderRadius: '0 12px 0 50px'
            }} />
            
            <div className="feature-icon" style={{ background: stat.color }}>
              {stat.icon}
            </div>
            
            <h3 style={{ 
              fontSize: '2rem', 
              margin: '0.5rem 0',
              color: stat.color,
              fontWeight: 'bold'
            }}>
              {stat.value}
            </h3>
            
            <h4 style={{ 
              fontSize: '1.1rem', 
              margin: '0.5rem 0',
              color: '#333'
            }}>
              {stat.title}
            </h4>
            
            <p style={{ 
              color: '#666', 
              fontSize: '0.9rem',
              margin: 0
            }}>
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* إحصائيات إضافية للحرفيين */}
      {user.userType === 'craftsman' && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h4>📈 أداءك هذا الشهر</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold' }}>
                {user.availability ? '🟢' : '🔴'}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                {user.availability ? 'متاح للعمل' : 'غير متاح'}
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '1.5rem', color: '#27ae60', fontWeight: 'bold' }}>
                {user.skills?.length || 0}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>تخصص</p>
            </div>
            
            <div>
              <div style={{ fontSize: '1.5rem', color: '#f39c12', fontWeight: 'bold' }}>
                {user.experience || 0}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>سنة خبرة</p>
            </div>
            
            {user.priceRange && (
              <div>
                <div style={{ fontSize: '1rem', color: '#e74c3c', fontWeight: 'bold' }}>
                  {user.priceRange.min} - {user.priceRange.max}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>نطاق الأسعار (درهم)</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;