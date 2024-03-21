import { create } from "zustand";

interface ProfileModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProfileModel = create<ProfileModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfileModel;
