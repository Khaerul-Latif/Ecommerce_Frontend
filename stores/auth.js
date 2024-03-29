import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
	persist(
		(set, get) => ({
			user: get()?.user,
			login: (params) => {
				set({ user: params });
			},
			logout: () => {
				set({ user: null });
			},
		}),
		{
			name: "auth-storage",
		}
	)
);

export default useAuthStore;
