import React from 'react';

interface SearchFiltersProps {
  filters: {
    category: string;
    city: string;
    urgency: string;
    search: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onClear
}) => {
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

  const cities = [
    'الرباط',
    'الدار البيضاء',
    'فاس',
    'مراكش',
    'أغادير',
    'طنجة',
    'مكناس',
    'وجدة',
    'القنيطرة',
    'تطوان'
  ];

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3>🔍 البحث والفلترة</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        {/* البحث النصي */}
        <div className="form-group">
          <label className="form-label">البحث</label>
          <input
            type="text"
            className="form-control"
            placeholder="ابحث في العنوان أو الوصف..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        {/* فلتر التخصص */}
        <div className="form-group">
          <label className="form-label">التخصص</label>
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">جميع التخصصات</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* فلتر المدينة */}
        <div className="form-group">
          <label className="form-label">المدينة</label>
          <select
            className="form-select"
            value={filters.city}
            onChange={(e) => onFilterChange('city', e.target.value)}
          >
            <option value="">جميع المدن</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* فلتر الأولوية */}
        <div className="form-group">
          <label className="form-label">الأولوية</label>
          <select
            className="form-select"
            value={filters.urgency}
            onChange={(e) => onFilterChange('urgency', e.target.value)}
          >
            <option value="">جميع الأولويات</option>
            <option value="عادي">عادي</option>
            <option value="مستعجل">مستعجل</option>
            <option value="طارئ">طارئ</option>
          </select>
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={onSearch} className="btn btn-primary">
          🔍 بحث
        </button>
        <button onClick={onClear} className="btn btn-secondary">
          🗑️ مسح الفلاتر
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;