import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CLINICAL_REASONS, TERM_OPTIONS, ELIGIBLE_SEGMENTS, type Medication } from '../types';
import { calculateCheckpointDate, formatDate, wasShiftedFromSunday } from '../utils/dateUtils';

const petEmoji: Record<string, string> = {
  Dog: '🐕',
  Cat: '🐈',
  Rabbit: '🐇',
  Bird: '🐦',
};

function generateMonitoringPoints(diagnosis: string, medications: Medication[]): string[] {
  const points: string[] = [];
  const lower = diagnosis.toLowerCase();

  if (medications.length > 0) {
    points.push(`Response to ${medications.map((m) => m.name).join(' + ')}`);
  }

  if (lower.includes('arthr') || lower.includes('osteo') || lower.includes('joint')) {
    points.push('Mobility and pain level assessment');
  } else if (lower.includes('dermat') || lower.includes('skin') || lower.includes('pruritus') || lower.includes('atop')) {
    points.push('Skin condition and itch severity');
  } else if (lower.includes('gastro') || lower.includes('diarrh') || lower.includes('vomit')) {
    points.push('Digestive function and stool quality');
  } else if (lower.includes('urinary') || lower.includes('bladder')) {
    points.push('Urination frequency and comfort');
  } else {
    points.push('Symptom progression since last visit');
  }

  points.push('Appetite and general activity level');
  return points.slice(0, 3);
}

export function ClosurePanel() {
  const { consultations, selectedConsultationId, selectConsultation, closeConsultation } = useApp();
  const consultation = consultations.find((c) => c.id === selectedConsultationId);

  const [followUp, setFollowUp] = useState<boolean | null>(false);
  const [term, setTerm] = useState<number | null>(null);
  const [customDate, setCustomDate] = useState('');
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [reason, setReason] = useState('');
  const [monitoringPoints, setMonitoringPoints] = useState<string[]>([]);

  if (!consultation) return null;
  if (!ELIGIBLE_SEGMENTS.includes(consultation.segment)) return null;

  const handleToggle = (value: boolean) => {
    setFollowUp(value);
    if (value && monitoringPoints.length === 0) {
      setMonitoringPoints(
        generateMonitoringPoints(consultation.diagnosis, consultation.medications)
      );
    }
  };

  const getCheckpointDate = (): string | null => {
    if (!followUp) return null;
    if (useCustomDate && customDate) return customDate;
    if (term) return calculateCheckpointDate(consultation.date, term);
    return null;
  };

  const checkpointDate = getCheckpointDate();
  const shifted = !useCustomDate && term ? wasShiftedFromSunday(consultation.date, term) : false;
  const canClose = followUp === false || (followUp === true && !!checkpointDate && !!reason);

  const handleClose = () => {
    if (!canClose) return;
    closeConsultation(consultation.id, {
      followUpRecommended: followUp,
      term: followUp ? term : null,
      customDate: followUp && useCustomDate ? customDate : null,
      reason: followUp ? reason : null,
      monitoringPoints: followUp ? monitoringPoints : [],
      checkpointDate: checkpointDate || '',
      status: 'pending',
      delivered: true,
      reminderSent: false,
    });
  };

  return (
    <div className="closure-panel">
      <div className="closure-panel-header">
        <button className="closure-panel-back" onClick={() => selectConsultation(null)}>
          ← Back to consultations
        </button>
        <div className="closure-panel-pet-info">
          <div className="pet-avatar">{petEmoji[consultation.pet.species] || '🐾'}</div>
          <div>
            <div className="closure-panel-pet-name">{consultation.pet.name}</div>
            <div className="closure-panel-pet-meta">
              {consultation.pet.species} · {consultation.pet.breed} · {consultation.pet.age}
            </div>
            <div className="closure-panel-pet-meta">Owner: {consultation.pet.ownerName}</div>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={`segment-badge ${consultation.segment.toLowerCase()}`}>
                {consultation.segment}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="closure-panel-body">
        <div className="closure-section">
          <div className="closure-section-label">Diagnosis</div>
          <div className="closure-diagnosis-box">{consultation.diagnosis}</div>
        </div>

        <div className="closure-section">
          <div className="closure-section-label">Prescription</div>
          {consultation.medications.map((m, i) => (
            <div key={i} className="closure-medication-item">
              <span className="closure-medication-name">{m.name}</span>
              <span>— {m.dosage}, {m.duration}</span>
            </div>
          ))}
        </div>

        <div className="closure-section">
          <div className="closure-section-label">
            Follow-up Recommended? <span style={{ color: 'var(--color-danger)' }}>*</span>
          </div>
          <div className="toggle-group">
            <button
              className={`toggle-option no ${followUp === false ? 'active' : ''}`}
              onClick={() => handleToggle(false)}
            >
              No
            </button>
            <button
              className={`toggle-option yes ${followUp === true ? 'active' : ''}`}
              onClick={() => handleToggle(true)}
            >
              Yes
            </button>
          </div>
        </div>

        {followUp && (
          <>
            <div className="closure-section">
              <div className="closure-section-label">Term / Date</div>
              <div className="term-selector">
                {TERM_OPTIONS.map((t) => (
                  <button
                    key={t}
                    className={`term-option ${!useCustomDate && term === t ? 'active' : ''}`}
                    onClick={() => {
                      setTerm(t);
                      setUseCustomDate(false);
                    }}
                  >
                    {t} days
                  </button>
                ))}
                <button
                  className={`term-option ${useCustomDate ? 'active' : ''}`}
                  onClick={() => setUseCustomDate(true)}
                >
                  📅 Custom
                </button>
              </div>
              {useCustomDate && (
                <div className="term-custom">
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                  />
                </div>
              )}
              {checkpointDate && (
                <div className="checkpoint-preview">
                  <span>📅</span>
                  <span>
                    Checkpoint: <span className="checkpoint-preview-date">{formatDate(checkpointDate)}</span>
                  </span>
                  {shifted && (
                    <span className="checkpoint-shift-note">(shifted from Sunday)</span>
                  )}
                </div>
              )}
            </div>

            <div className="closure-section">
              <div className="closure-section-label">Reason</div>
              <select
                className="reason-dropdown"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select a clinical reason…</option>
                {CLINICAL_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="closure-section">
              <div className="closure-section-label">Monitoring Points (pre-filled)</div>
              <div className="monitoring-points">
                {monitoringPoints.map((p, i) => (
                  <div key={i} className="monitoring-point">
                    <span className="monitoring-point-icon">✓</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          className="close-btn"
          onClick={handleClose}
          disabled={!canClose}
        >
          {followUp ? 'Close & Send Care Plan' : 'Close Consultation'}
        </button>
      </div>
    </div>
  );
}
