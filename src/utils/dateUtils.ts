export function calculateCheckpointDate(consultationDate: string, termDays: number): string {
  const date = new Date(consultationDate);
  date.setDate(date.getDate() + termDays);
  // If Sunday (0), shift to Monday
  if (date.getDay() === 0) {
    date.setDate(date.getDate() + 1);
  }
  return date.toISOString().split('T')[0];
}

export function wasShiftedFromSunday(consultationDate: string, termDays: number): boolean {
  const date = new Date(consultationDate);
  date.setDate(date.getDate() + termDays);
  return date.getDay() === 0;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getWeekday(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}
