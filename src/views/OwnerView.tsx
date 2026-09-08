import { useApp } from '../context/AppContext';
import { CarePlan } from '../owner/CarePlan';
import { RebookingScreen } from '../owner/RebookingScreen';
import { NotificationBanner } from '../owner/NotificationBanner';

export function OwnerView() {
  const { consultations, rebookingConsultationId } = useApp();

  if (rebookingConsultationId) {
    return <RebookingScreen />;
  }

  const plans = consultations.filter(
    (c) => c.status === 'closed' && c.followUpPlan && c.followUpPlan.followUpRecommended
  );

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">Your Pet's Care Plans</h1>
        <p className="section-subtitle">
          Follow-up plans from your recent veterinary consultations
        </p>
      </div>

      {plans.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-text">
            No follow-up care plans yet. Your veterinarian will send one after
            your next consultation.
          </div>
        </div>
      ) : (
        plans.map((c) => (
          <div key={c.id}>
            {c.followUpPlan!.reminderSent && <NotificationBanner consultation={c} />}
            <CarePlan consultation={c} />
          </div>
        ))
      )}
    </div>
  );
}
