import { create } from 'zustand';

export type AppointmentStep = 1 | 2 | 3 | 4 | 5;

interface AppointmentState {
  step: AppointmentStep;
  reason: string;
  date: Date | undefined;
  time: string;
  patientInfo: {
    name: string;
    phone: string;
    email: string;
    is_first_visit: boolean;
    notes: string;
  };
  setStep: (step: AppointmentStep) => void;
  setReason: (reason: string) => void;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string) => void;
  setPatientInfo: (info: Partial<AppointmentState['patientInfo']>) => void;
  reset: () => void;
}

const initialState = {
  step: 1 as AppointmentStep,
  reason: '',
  date: undefined,
  time: '',
  patientInfo: {
    name: '',
    phone: '',
    email: '',
    is_first_visit: true,
    notes: '',
  },
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setReason: (reason) => set({ reason }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setPatientInfo: (info) =>
    set((state) => ({
      patientInfo: { ...state.patientInfo, ...info },
    })),
  reset: () => set(initialState),
}));

