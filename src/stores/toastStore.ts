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
  addToast: (toast: ToastProps) => set(state => addToast(state, toast))
}));

const addToast = (state: ToastState, toast: ToastProps) => {
  const id = Date.now().toString();

  return {
    toasts: [
      ...state.toasts,
      { ...toast, id }
    ],
  };
};