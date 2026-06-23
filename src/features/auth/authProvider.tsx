import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Invalid credentials.");

    localStorage.setItem("admin_token", data.token);
  },

  checkAuth: () =>
    localStorage.getItem("admin_token") ? Promise.resolve() : Promise.reject(),

  logout: () => {
    localStorage.removeItem("admin_token");
    return Promise.resolve();
  },

  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("admin_token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve("admin"),

  getIdentity: () => {
    const token = localStorage.getItem("admin_token");
    if (!token) return Promise.reject();

    const payload = JSON.parse(atob(token.split(".")[1]));
    return Promise.resolve({
      id: payload.email as string,
      fullName: "Administrator",
      avatar: undefined,
    });
  },
};
