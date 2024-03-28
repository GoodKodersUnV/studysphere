import { create } from "zustand";

const useTimeStore = create((set) => ({
    startTime : 0,
    endTime : 0,
    duration : 10 ,
    Mode : '',
    setDuration : (duration) => set({ duration }),
    setMode : (Mode) =>set({Mode}),
    setStartTime : () => set({ startTime: new Date().toISOString() }),
    setEndTime : () => set({ endTime: new Date().toISOString() }),
    clear : () => set({ startTime: 0,endTime:0}),
    
}));

export default useTimeStore;
