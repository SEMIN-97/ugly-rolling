import { create } from 'zustand';
import { ToastProps } from '../components/Toast/Toast.tsx';

interface Toast extends ToastProps {
  id: string;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: ToastProps) => void;
}

export const useToastStore = create<ToastState>(set => ({
  toasts: [],
  addToast: (toast: ToastProps) => {
    const newToast = generateToast(toast);

    set(state => addToast(state, newToast));

    const timeout = setTimeout(() => {
      set(state => deleteToast(state, newToast.id));
    }, newToast.duration);

    return () => clearTimeout(timeout);
  }
}));

const generateToast = (toast: ToastProps): Toast => {
  const id = Date.now().toString();
  const duration = toast.duration || 1000;
  
  return {
    ...toast,
    id,
    duration
  };
};

const addToast = (state: ToastState, toast: Toast) => ({
  toasts: [
    ...state.toasts,
    toast
  ],
});

const deleteToast = (state: ToastState, id: string) => {
  const filteredToasts = state.toasts.filter(toast => toast.id !== id);

  return {
    toasts: filteredToasts
  };
};