import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Consultation, FollowUpPlan, PlanStatus, Role, OwnerStatus } from '../types';
import { initialConsultations } from '../mockData';

interface AppContextValue {
  role: Role;
  consultations: Consultation[];
  selectedConsultationId: string | null;
  rebookingConsultationId: string | null;
  setRole: (role: Role) => void;
  selectConsultation: (id: string | null) => void;
  closeConsultation: (id: string, plan: FollowUpPlan) => void;
  updatePlanStatus: (consultationId: string, status: PlanStatus) => void;
  simulateReminder: (consultationId: string) => void;
  openRebooking: (consultationId: string) => void;
  closeRebooking: () => void;
  setOwnerStatus: (consultationId: string, status: OwnerStatus) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('vet');
  const [consultations, setConsultations] = useState<Consultation[]>(initialConsultations);
  const [selectedConsultationId, setSelectedConsultationId] = useState<string | null>(null);
  const [rebookingConsultationId, setRebookingConsultationId] = useState<string | null>(null);

  const selectConsultation = (id: string | null) => setSelectedConsultationId(id);

  const closeConsultation = (id: string, plan: FollowUpPlan) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'closed' as const, followUpPlan: { ...plan, delivered: true } }
          : c
      )
    );
    setSelectedConsultationId(null);
  };

  const updatePlanStatus = (consultationId: string, status: PlanStatus) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === consultationId && c.followUpPlan
          ? { ...c, followUpPlan: { ...c.followUpPlan, status } }
          : c
      )
    );
  };

  const simulateReminder = (consultationId: string) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === consultationId && c.followUpPlan
          ? { ...c, followUpPlan: { ...c.followUpPlan, reminderSent: true } }
          : c
      )
    );
  };

  const openRebooking = (consultationId: string) => setRebookingConsultationId(consultationId);
  const closeRebooking = () => setRebookingConsultationId(null);

  const setOwnerStatus = (consultationId: string, status: OwnerStatus) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === consultationId ? { ...c, ownerStatus: status } : c))
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        consultations,
        selectedConsultationId,
        rebookingConsultationId,
        setRole,
        selectConsultation,
        closeConsultation,
        updatePlanStatus,
        simulateReminder,
        openRebooking,
        closeRebooking,
        setOwnerStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
