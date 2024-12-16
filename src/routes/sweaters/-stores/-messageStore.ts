import { create } from 'zustand';
import { OrnamentType } from '../../../types/enum';

interface MessageState {
  ornament: OrnamentType | null;
  setOrnament: (ornament: OrnamentType) => void;
  message: string;
  setMessage: (message: string) => void;
  receiver: string;
  setReceiver: (receiver: string) => void;
}

export const useMessageStore = create<MessageState>(set => ({
  ornament: null,
  setOrnament: (ornament: OrnamentType) => set({ ornament }),
  message: '',
  setMessage: (message: string) => set({ message }),
  receiver: '',
  setReceiver: (receiver: string) => set({ receiver }),
}));
