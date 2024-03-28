import { create } from "zustand";

const useTimeStore = create((set) => ({
    startTime : 0,
    endTime : 0,
    duration : 10 ,
    setDuration : (duration) => set({ duration }),
    setStartTime : () => set({ startTime: new Date().toISOString() }),
    setEndTime : () => set({ endTime: new Date().toISOString() }),
    clear : () => set({ startTime: 0,endTime:0}),
    
}));

export default useTimeStore;
