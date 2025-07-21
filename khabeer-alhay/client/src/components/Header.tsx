import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🛠️ خبير الحي
        </Link>
        
        <nav>
          <ul className="nav-links">
            {user ? (
              <>
                <li><Link to="/dashboard">لوحة التحكم</Link></li>
                {user.userType === 'customer' && (
                  <li><Link to="/create-service">طلب خدمة</Link></li>
                )}
                <li><Link to="/profile">الملف الشخصي</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">تسجيل الدخول</Link></li>
                <li><Link to="/register">إنشاء حساب</Link></li>
              </>
            )}
          </ul>
        </nav>

        {user && (
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>
              <span>{user.name}</span>
              <span className="user-type">
                {user.userType === 'customer' ? 'عميل' : 'حرفي'}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline">
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;