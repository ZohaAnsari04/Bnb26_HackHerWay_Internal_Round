'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let icon = <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />;
          if (toast.type === 'error') {
            icon = <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />;
          } else if (toast.type === 'info') {
            icon = <Info className="w-4 h-4 text-[#635BFF] shrink-0" />;
          } else if (toast.type === 'warning') {
            icon = <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
              className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-white/95 backdrop-blur-md rounded-xl border border-[rgba(20,20,40,0.1)] shadow-[0_10px_30px_rgba(20,20,50,0.12)]"
            >
              <div className="flex items-center gap-2.5">
                {icon}
                <span className="text-sm font-medium text-[#17172A]">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#68697A] hover:text-[#17172A] p-0.5 rounded-md hover:bg-black/5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
