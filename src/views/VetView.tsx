import { useApp } from '../context/AppContext';
import { ConsultationList } from '../vet/ConsultationList';
import { ClosurePanel } from '../vet/ClosurePanel';

export function VetView() {
  const { selectedConsultationId } = useApp();
  return selectedConsultationId ? <ClosurePanel /> : <ConsultationList />;
}
