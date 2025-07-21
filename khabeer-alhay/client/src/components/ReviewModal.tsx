import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string }) => void;
  craftsmanName: string;
  loading?: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  craftsmanName,
  loading = false
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('يرجى اختيار تقييم بالنجوم');
      return;
    }

    if (!comment.trim()) {
      setError('يرجى كتابة تعليق على الخدمة');
      return;
    }

    onSubmit({ rating, comment: comment.trim() });
  };

  const handleClose = () => {
    if (!loading) {
      setRating(0);
      setComment('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
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
          <h3 className="card-title">⭐ تقييم الخدمة</h3>
          <p>قيّم تجربتك مع الحرفي: <strong>{craftsmanName}</strong></p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">التقييم العام *</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="large"
              />
              <span style={{ color: '#666' }}>
                {rating === 0 && 'اختر تقييمك'}
                {rating === 1 && 'ضعيف جداً'}
                {rating === 2 && 'ضعيف'}
                {rating === 3 && 'متوسط'}
                {rating === 4 && 'جيد'}
                {rating === 5 && 'ممتاز'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">تعليقك على الخدمة *</label>
            <textarea
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تجربتك مع الحرفي... هل كان في الموعد؟ هل حل المشكلة؟ هل تنصح به؟"
              rows={4}
              maxLength={500}
              required
            />
            <small style={{ color: '#666' }}>
              {comment.length}/500 حرف
            </small>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'جاري الإرسال...' : '✅ إرسال التقييم'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
              style={{ flex: 1 }}
            >
              إلغاء
            </button>
          </div>
        </form>

        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <small style={{ color: '#666' }}>
            💡 <strong>نصائح للتقييم:</strong>
            <br />
            • قيّم بصدق لمساعدة العملاء الآخرين
            <br />
            • اذكر نقاط القوة والضعف
            <br />
            • التقييمات تساعد في تحسين جودة الخدمة
          </small>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;