import { create } from "zustand";

// Zustand store for auth state — persists token and user in localStorage
const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, token: userData.token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  updateUser: (userData) => {
    const updated = { ...JSON.parse(localStorage.getItem("user")), ...userData };
    localStorage.setItem("user", JSON.stringify(updated));
    set({ user: updated });
  },
}));

export default useAuthStore;
