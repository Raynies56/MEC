"use client";

import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastStore {
  toasts: ToastOptions[];
  addToast: (toast: Omit<ToastOptions, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const toast = {
  success: (title: string, message?: string) => useToastStore.getState().addToast({ title, message, type: 'success' }),
  error: (title: string, message?: string) => useToastStore.getState().addToast({ title, message, type: 'error' }),
  info: (title: string, message?: string) => useToastStore.getState().addToast({ title, message, type: 'info' }),
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastOptions; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    error: <XCircle className="h-5 w-5 text-error" />,
    info: <Info className="h-5 w-5 text-accent" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="pointer-events-auto relative mt-4 flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border bg-white p-6 pr-8 shadow-lg transition-all dark:bg-slate-900"
    >
      <div className="flex w-full items-start gap-4">
        <div className="mt-0.5">{icons[toast.type]}</div>
        <div className="flex pb-1 flex-col gap-1">
          <h3 className="text-sm font-semibold">{toast.title}</h3>
          {toast.message && (
            <p className="text-sm opacity-90 text-neutral-600 dark:text-neutral-400">
              {toast.message}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

