import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-border"
          >
            <div className="p-8">
              <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                <Trash2 className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-black text-center text-neutral-900 dark:text-white mb-2">
                {title}
              </h3>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 mb-6 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-12 rounded-2xl font-bold"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="accent"
                  onClick={onConfirm}
                  isLoading={isLoading}
                  className="flex-1 h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 border-none text-white shadow-lg shadow-red-600/20"
                >
                  Confirmar Eliminación
                </Button>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-bg-secondary transition-colors text-neutral-400"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
