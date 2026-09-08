import { useApp } from '../context/AppContext';
import { ELIGIBLE_SEGMENTS } from '../types';

const petEmoji: Record<string, string> = {
  Dog: '🐕',
  Cat: '🐈',
  Rabbit: '🐇',
  Bird: '🐦',
};

export function ConsultationList() {
  const { consultations, selectConsultation } = useApp();
  const openConsultations = consultations.filter((c) => c.status === 'open');

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">Open Consultations</h1>
        <p className="section-subtitle">
          Select a consultation to close with a follow-up care plan
        </p>
      </div>
      <div className="consultation-list">
        {openConsultations.map((c) => {
          const eligible = ELIGIBLE_SEGMENTS.includes(c.segment);
          return (
            <div
              key={c.id}
              className={`consultation-card ${eligible ? '' : 'excluded'}`}
              onClick={() => eligible && selectConsultation(c.id)}
            >
              <div className="pet-avatar">
                {petEmoji[c.pet.species] || '🐾'}
              </div>
              <div className="consultation-card-body">
                <div className="consultation-card-header">
                  <span className="consultation-card-name">{c.pet.name}</span>
                  <span className={`segment-badge ${c.segment.toLowerCase()}`}>
                    {c.segment}
                  </span>
                </div>
                <div className="consultation-card-meta">
                  {c.pet.species} · {c.pet.breed} · {c.pet.age} · {c.doctorName}
                </div>
                <div className="consultation-card-diagnosis">{c.diagnosis}</div>
                {!eligible && (
                  <div className="excluded-note">
                    ⚠ Excluded segment — follow-up care plan not available
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
