import {create} from "zustand";

const useLocalStorageStore = create((set) => {

  const localStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  return {
    items: localStorageAvailable ? JSON.parse(localStorage.getItem("items")) || [] : [],

    addItem: (newItem) => {
      set((state) => {
        const updatedItems = [newItem];
        localStorage.setItem("items", JSON.stringify(updatedItems));
        return { items: updatedItems };
      });
    },

    removeItem: (itemId) => {
      set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== itemId);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        return { items: updatedItems };
      });
    },

    getAllItems: () => {
      return localStorageAvailable ? JSON.parse(localStorage.getItem("items")) || [] : [];
    },

    clearAllItems: () => {
      if (localStorageAvailable) {
        localStorage.removeItem("items");
        set({ items: [] });
      }
    },
  };
});

export default useLocalStorageStore;
