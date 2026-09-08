import type { Consultation, Pet } from './types';

const pets: Record<string, Pet> = {
  p1: { id: 'p1', name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: '8 years', ownerName: 'Sarah Müller' },
  p2: { id: 'p2', name: 'Milo', species: 'Cat', breed: 'British Shorthair', age: '8 months', ownerName: 'Thomas Weber' },
  p3: { id: 'p3', name: 'Luna', species: 'Dog', breed: 'Border Collie', age: '6 years', ownerName: 'Anna Schmidt' },
  p4: { id: 'p4', name: 'Coco', species: 'Cat', breed: 'Maine Coon', age: '2 years', ownerName: 'Lisa Klein' },
};

// Sep 3, 2026 (Thu) + 10 days = Sep 13 (Sun) → shifted to Sep 14 (Mon)
export const initialConsultations: Consultation[] = [
  {
    id: 'c1',
    pet: pets.p1,
    segment: 'Chroniker',
    date: '2026-09-03',
    doctorName: 'Dr. Emma Wagner',
    diagnosis: 'Chronic osteoarthritis — mild degenerative joint disease in left hip',
    prescription: 'Meloxicam 1.5mg/ml oral suspension — 0.1 mg/kg once daily',
    medications: [
      { name: 'Meloxicam', dosage: '0.1 mg/kg PO', duration: 'Once daily, 28 days' },
    ],
    photos: ['hip-xray.jpg'],
    doctorNote:
      'Mild lameness in left hindlimb. X-ray shows early degenerative changes in hip joint. Start NSAID therapy and reassess mobility response in 10 days.',
    status: 'closed',
    followUpPlan: {
      followUpRecommended: true,
      term: 10,
      customDate: null,
      reason: 'Medication effectiveness review',
      monitoringPoints: [
        'Response to Meloxicam — mobility improvement',
        'GI tolerance and appetite',
        'Pain level on palpation of left hip',
      ],
      checkpointDate: '2026-09-14',
      status: 'pending',
      delivered: true,
      reminderSent: false,
    },
    ownerStatus: null,
  },
  {
    id: 'c2',
    pet: pets.p2,
    segment: 'Jungtier',
    date: '2026-09-08',
    doctorName: 'Dr. Emma Wagner',
    diagnosis: 'Acute gastroenteritis — first occurrence, likely dietary indiscretion',
    prescription: 'Probiotic paste + bland diet for 5 days',
    medications: [
      { name: 'Probiotic Paste (Protexin)', dosage: '1 cm paste PO', duration: 'Twice daily, 5 days' },
    ],
    photos: [],
    doctorNote:
      'Young cat, first visit. Mild diarrhea, no vomiting. Normal hydration. Start probiotics and dietary management.',
    status: 'open',
    followUpPlan: null,
    ownerStatus: null,
  },
  {
    id: 'c3',
    pet: pets.p3,
    segment: 'Chroniker',
    date: '2026-09-08',
    doctorName: 'Dr. Emma Wagner',
    diagnosis: 'Atopic dermatitis — chronic seasonal flare-up',
    prescription: 'Apoquel 5mg + medicated shampoo',
    medications: [
      { name: 'Apoquel 5mg', dosage: '1 tablet PO', duration: 'Twice daily, 14 days' },
      { name: 'Malaseb Shampoo', dosage: 'Topical', duration: 'Twice weekly' },
    ],
    photos: ['skin-1.jpg', 'skin-2.jpg'],
    doctorNote:
      'Recurring seasonal dermatitis. Pruritus on ventral abdomen and paws. Start immunomodulator and topical treatment.',
    status: 'open',
    followUpPlan: null,
    ownerStatus: null,
  },
  {
    id: 'c4',
    pet: pets.p4,
    segment: 'Akut',
    date: '2026-09-08',
    doctorName: 'Dr. Emma Wagner',
    diagnosis: 'Acute urinary obstruction — emergency stabilization',
    prescription: 'IV fluids + urinary catheter',
    medications: [
      { name: "IV Fluids (Lactated Ringer's)", dosage: 'Maintenance rate', duration: '24 hours' },
    ],
    photos: [],
    doctorNote:
      'Emergency case. Urethral obstruction. Stabilized and catheterized. Not eligible for follow-up care plan (acute segment).',
    status: 'open',
    followUpPlan: null,
    ownerStatus: null,
  },
];
