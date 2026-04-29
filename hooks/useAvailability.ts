import { useState, useCallback } from 'react';
import { format } from 'date-fns';

interface Slot {
  time: string;
  available: boolean;
}

export function useAvailability() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAvailability = useCallback(async (date: Date) => {
    setLoading(true);
    setError('');
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const response = await fetch(`/api/appointments/availability?date=${dateStr}`);
      if (!response.ok) throw new Error('Error al cargar disponibilidad');
      const data = await response.json();
      setSlots(data.slots || []);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { slots, loading, error, fetchAvailability };
}
