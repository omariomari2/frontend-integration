import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Toast, ToastType } from '../components/ui/Toast';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?: 'top' | 'bottom';
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastContextData {
  showToast: (message: string, options?: {
    type?: ToastType;
    duration?: number;
    position?: 'top' | 'bottom';
    action?: {
      label: string;
      onPress: () => void;
    };
  }) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastIdCounter = useRef(0);

  const showToast = useCallback((
    message: string,
    {
      type = 'info',
      duration = 3000,
      position = 'bottom',
      action,
    }: {
      type?: ToastType;
      duration?: number;
      position?: 'top' | 'bottom';
      action?: {
        label: string;
        onPress: () => void;
      };
    } = {}
  ) => {
    const id = `toast-${toastIdCounter.current++}`;
    
    setToasts(prevToasts => [
      ...prevToasts,
      {
        id,
        message,
        type,
        duration,
        position,
        action,
      },
    ]);

    // Auto-hide the toast after the specified duration
    if (duration !== 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const hideAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, hideAllToasts }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          visible={true}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onDismiss={() => hideToast(toast.id)}
          action={toast.action}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
