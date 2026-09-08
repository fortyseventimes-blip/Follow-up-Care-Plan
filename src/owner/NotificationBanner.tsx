import { useApp } from '../context/AppContext';
import type { Consultation } from '../types';

export function NotificationBanner({ consultation }: { consultation: Consultation }) {
  const { openRebooking } = useApp();
  const plan = consultation.followUpPlan!;

  return (
    <div className="notification-banner" onClick={() => openRebooking(consultation.id)}>
      <div className="notification-banner-icon">🔔</div>
      <div className="notification-banner-content">
        <div className="notification-banner-title">Follow-up Reminder</div>
        <div className="notification-banner-text">
          Time for {consultation.pet.name}'s checkpoint — {plan.reason}. Tap to rebook.
        </div>
      </div>
      <div style={{ fontSize: '1.5rem' }}>→</div>
    </div>
  );
}
