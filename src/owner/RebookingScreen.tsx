import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { OwnerStatus } from '../types';
import { formatDate } from '../utils/dateUtils';

const ALL_DOCTORS = [
  { name: 'Dr. Emma Wagner', id: 'd1' },
  { name: 'Dr. Markus Fischer', id: 'd2' },
  { name: 'Dr. Julia Becker', id: 'd3' },
];

export function RebookingScreen() {
  const { consultations, rebookingConsultationId, closeRebooking, setOwnerStatus } = useApp();
  const consultation = consultations.find((c) => c.id === rebookingConsultationId);

  const [selectedDoctor, setSelectedDoctor] = useState(consultation?.doctorName || '');
  const [localStatus, setLocalStatus] = useState<OwnerStatus>(consultation?.ownerStatus || null);
  const [booked, setBooked] = useState(false);

  if (!consultation || !consultation.followUpPlan) return null;
  const plan = consultation.followUpPlan;

  const handleStatus = (status: OwnerStatus) => {
    setLocalStatus(status);
    setOwnerStatus(consultation.id, status);
  };

  return (
    <div className="rebooking">
      <div className="rebooking-header">
        <button className="rebooking-back" onClick={closeRebooking}>
          ← Back to care plans
        </button>
        <h1 className="rebooking-title">Rebook Follow-up</h1>
      </div>
      <div className="rebooking-body">
        <div className="rebooking-section">
          <div className="rebooking-section-title">Animal</div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Name</span>
            <span className="rebooking-info-value">{consultation.pet.name}</span>
          </div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Species / Breed</span>
            <span className="rebooking-info-value">
              {consultation.pet.species} · {consultation.pet.breed}
            </span>
          </div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Animal ID</span>
            <span className="rebooking-info-value">{consultation.pet.id}</span>
          </div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Owner</span>
            <span className="rebooking-info-value">{consultation.pet.ownerName}</span>
          </div>
        </div>

        <div className="rebooking-section">
          <div className="rebooking-section-title">First Consultation Findings</div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Date</span>
            <span className="rebooking-info-value">{formatDate(consultation.date)}</span>
          </div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Diagnosis</span>
            <span className="rebooking-info-value">{consultation.diagnosis}</span>
          </div>
          <div className="rebooking-info-row">
            <span className="rebooking-info-label">Checkpoint</span>
            <span className="rebooking-info-value">{formatDate(plan.checkpointDate)}</span>
          </div>
        </div>

        <div className="rebooking-section">
          <div className="rebooking-section-title">Medication Status</div>
          {consultation.medications.map((m, i) => (
            <div key={i} className="rebooking-info-row">
              <span className="rebooking-info-label">{m.name}</span>
              <span className="rebooking-info-value">
                {m.dosage} · {m.duration}
                <span className="med-badge">ongoing</span>
              </span>
            </div>
          ))}
        </div>

        {consultation.photos.length > 0 && (
          <div className="rebooking-section">
            <div className="rebooking-section-title">Uploaded Photos</div>
            <div className="rebooking-photos">
              {consultation.photos.map((p, i) => (
                <div key={i} className="photo-placeholder">📷</div>
              ))}
            </div>
          </div>
        )}

        <div className="rebooking-section">
          <div className="rebooking-section-title">Your Status Report</div>
          <div className="status-selector">
            <button
              className={`status-option better ${localStatus === 'Better' ? 'active' : ''}`}
              onClick={() => handleStatus('Better')}
            >
              😊 Better
            </button>
            <button
              className={`status-option same ${localStatus === 'Same' ? 'active' : ''}`}
              onClick={() => handleStatus('Same')}
            >
              😐 Same
            </button>
            <button
              className={`status-option worse ${localStatus === 'Worse' ? 'active' : ''}`}
              onClick={() => handleStatus('Worse')}
            >
              😟 Worse
            </button>
          </div>
        </div>

        <div className="rebooking-section">
          <div className="rebooking-section-title">Doctor's Initial Note</div>
          <div className="rebooking-note">"{consultation.doctorNote}"</div>
        </div>

        <div className="rebooking-section">
          <div className="rebooking-section-title">Select Doctor</div>
          {ALL_DOCTORS.map((d) => (
            <div
              key={d.id}
              className={`doctor-option ${selectedDoctor === d.name ? 'active' : ''}`}
              onClick={() => setSelectedDoctor(d.name)}
            >
              <div className="doctor-radio" />
              <span>{d.name}</span>
              {d.name === consultation.doctorName && (
                <span className="doctor-option-badge">Original</span>
              )}
            </div>
          ))}
        </div>

        {booked ? (
          <div className="plan-status kept" style={{ justifyContent: 'center' }}>
            ✓ Appointment booked with {selectedDoctor}
          </div>
        ) : (
          <button className="book-btn" onClick={() => setBooked(true)}>
            Book Appointment
          </button>
        )}
      </div>
    </div>
  );
}
