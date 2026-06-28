// src/features/auth/authProvider.ts
// authProvider React Admin — s'appuie sur POST /api/auth/login côté Next.js

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error(
    "VITE_API_URL est manquant dans les variables d'environnement.",
  );
}

const TOKEN_KEY = "token";

// ─── Types ────────────────────────────────────────────────────────────────────
interface JwtPayload {
  id?: string;
  sub?: string;
  name?: string;
  username?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface HttpError {
  status?: number;
  message?: string;
}

// ─── authProvider ─────────────────────────────────────────────────────────────
export const authProvider = {
  // ── Login ──────────────────────────────────────────────────────────────────
  async login({ username, password }: LoginCredentials) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data: unknown = await res.json().catch(() => ({}));
    const body =
      typeof data === "object" && data !== null
        ? (data as Record<string, unknown>)
        : {};

    if (!res.ok) {
      throw new Error(
        typeof body.error === "string" ? body.error : "Identifiants incorrects",
      );
    }

    // Le backend renvoie { token: "..." }
    if (typeof body.token === "string") {
      localStorage.setItem(TOKEN_KEY, body.token);
    }

    return body;
  },

  // ── Logout ─────────────────────────────────────────────────────────────────
  async logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // ── Vérification de l'auth ─────────────────────────────────────────────────
  async checkAuth() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error("Non authentifié");
  },

  // ── Gestion des erreurs HTTP ───────────────────────────────────────────────
  async checkError(error: HttpError) {
    const status = error?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      throw new Error("Session expirée");
    }
  },

  // ── Infos de l'utilisateur connecté ───────────────────────────────────────
  async getIdentity() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error("Non authentifié");

    // Décode le payload JWT sans lib externe (lecture seule, pas de vérif signature)
    try {
      const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
      return {
        id: payload.id ?? payload.sub ?? "admin",
        fullName: payload.name ?? payload.username ?? "Administrateur",
        avatar: undefined,
      };
    } catch {
      return { id: "admin", fullName: "Administrateur", avatar: undefined };
    }
  },

  // ── Permissions ────────────────────────────────────────────────────────────
  async getPermissions() {
    return null;
  },
};
