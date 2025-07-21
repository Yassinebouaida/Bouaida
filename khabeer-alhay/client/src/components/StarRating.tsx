import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  readonly = false,
  size = 'medium'
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    small: { fontSize: '1rem' },
    medium: { fontSize: '1.5rem' },
    large: { fontSize: '2rem' }
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div 
      className="star-rating" 
      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating);
        return (
          <span
            key={star}
            className={`star ${isActive ? '' : 'empty'}`}
            style={{
              ...sizeClasses[size],
              cursor: readonly ? 'default' : 'pointer',
              transition: 'color 0.2s',
              color: isActive ? '#ffc107' : '#e0e0e0'
            }}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
          >
            ⭐
          </span>
        );
      })}
      {rating > 0 && (
        <span style={{ marginRight: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default StarRating;