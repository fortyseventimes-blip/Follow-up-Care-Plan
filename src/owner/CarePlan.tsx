import { useApp } from '../context/AppContext';
import type { Consultation } from '../types';
import { formatDate, getWeekday } from '../utils/dateUtils';

const petEmoji: Record<string, string> = { Dog: '🐕', Cat: '🐈' };

export function CarePlan({ consultation }: { consultation: Consultation }) {
  const { updatePlanStatus, simulateReminder, openRebooking } = useApp();
  const plan = consultation.followUpPlan!;

  return (
    <div
      className="care-plan"
      onClick={() => openRebooking(consultation.id)}
    >
      <div className="care-plan-header">
        <h2>📋 Follow-up Care Plan</h2>
        <p>
          for {petEmoji[consultation.pet.species]} {consultation.pet.name} ·{' '}
          {formatDate(consultation.date)}
        </p>
      </div>
      <div className="care-plan-body" onClick={(e) => e.stopPropagation()}>
        <div className="care-plan-section">
          <div className="care-plan-section-title">Primary Diagnosis</div>
          <div className="care-plan-diagnosis">{consultation.diagnosis}</div>
        </div>

        <div className="care-plan-section">
          <div className="care-plan-section-title">Action Items</div>
          {consultation.medications.map((m, i) => (
            <div key={i} className="action-item">
              <div className="action-item-bullet" />
              <div>
                <strong>{m.name}</strong> — {m.dosage}, {m.duration}
              </div>
            </div>
          ))}
        </div>

        <div className="checkpoint-card">
          <div className="checkpoint-card-icon">📅</div>
          <div className="checkpoint-card-date">{formatDate(plan.checkpointDate)}</div>
          <div className="checkpoint-card-day">{getWeekday(plan.checkpointDate)}</div>
          <div className="checkpoint-card-reason">{plan.reason}</div>
          {plan.monitoringPoints.length > 0 && (
            <div className="checkpoint-card-monitoring">
              <div className="checkpoint-card-monitoring-title">Monitoring Points</div>
              <ul>
                {plan.monitoringPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {plan.status === 'pending' ? (
          <div className="action-buttons">
            <button
              className="btn-keep"
              onClick={() => updatePlanStatus(consultation.id, 'kept')}
            >
              ✓ Keep this date
            </button>
            <button
              className="btn-not-needed"
              onClick={() => updatePlanStatus(consultation.id, 'not_needed')}
            >
              Not needed
            </button>
          </div>
        ) : (
          <div
            className={`plan-status ${plan.status === 'kept' ? 'kept' : 'not-needed'}`}
          >
            {plan.status === 'kept'
              ? '✓ Date confirmed'
              : '✓ Marked as not needed'}
          </div>
        )}

        {!plan.reminderSent && (
          <div className="reminder-schedule">
            <span>
              ⏰ Reminder scheduled for {formatDate(plan.checkpointDate)} at 09:00
            </span>
            <button
              className="reminder-simulate-btn"
              onClick={() => simulateReminder(consultation.id)}
            >
              Simulate
            </button>
          </div>
        )}

        <div className="tap-hint">Tap this card to rebook an appointment →</div>
      </div>
    </div>
  );
}
