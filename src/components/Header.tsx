import { useApp } from '../context/AppContext';

export function Header() {
  const { role, setRole } = useApp();
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">🐾</div>
        <div>
          <div className="header-title">PetDoc</div>
          <div className="header-subtitle">Follow-up Care Plan</div>
        </div>
      </div>
      <div className="role-switcher">
        <button
          className={role === 'vet' ? 'active' : ''}
          onClick={() => setRole('vet')}
        >
          🩺 Veterinarian
        </button>
        <button
          className={role === 'owner' ? 'active' : ''}
          onClick={() => setRole('owner')}
        >
          🐾 Pet Owner
        </button>
      </div>
    </header>
  );
}
