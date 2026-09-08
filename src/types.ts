export type Segment = 'Chroniker' | 'Jungtier' | 'Akut' | 'Unklar';
export type ConsultationStatus = 'open' | 'closed';
export type PlanStatus = 'pending' | 'kept' | 'not_needed';
export type OwnerStatus = 'Better' | 'Same' | 'Worse' | null;
export type Role = 'vet' | 'owner';

export interface Medication {
  name: string;
  dosage: string;
  duration: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  ownerName: string;
}

export interface FollowUpPlan {
  followUpRecommended: boolean;
  term: number | null;
  customDate: string | null;
  reason: string | null;
  monitoringPoints: string[];
  checkpointDate: string;
  status: PlanStatus;
  delivered: boolean;
  reminderSent: boolean;
}

export interface Consultation {
  id: string;
  pet: Pet;
  segment: Segment;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string;
  medications: Medication[];
  photos: string[];
  doctorNote: string;
  status: ConsultationStatus;
  followUpPlan: FollowUpPlan | null;
  ownerStatus: OwnerStatus;
}

export const CLINICAL_REASONS = [
  'Medication effectiveness review',
  'Symptom progression monitoring',
  'Post-treatment recovery check',
  'Chronic condition management',
  'Diagnostic result follow-up',
  'General health reassessment',
] as const;

export const TERM_OPTIONS = [7, 10, 14, 28] as const;

export const ELIGIBLE_SEGMENTS: Segment[] = ['Chroniker', 'Jungtier'];
