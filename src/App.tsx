import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { VetView } from './views/VetView';
import { OwnerView } from './views/OwnerView';

function AppContent() {
  const { role } = useApp();
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {role === 'vet' ? <VetView /> : <OwnerView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
