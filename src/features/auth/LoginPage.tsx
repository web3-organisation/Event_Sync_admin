//src/features/auth/LoginPage.tsx
import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { useThemeMode } from "../../lib/ThemeContext";
import "./login.css";

function IconSpinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ animation: "spin 0.7s linear infinite", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mode } = useThemeMode();

  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ username: email, password });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials.";
      setError(message);
      notify(message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <main className="login-page" data-theme={mode}>
        <section className="login-card">
          <div className="login-left">
            <div className="login-brand">
              <img src="/logo.png" alt="EventSync" className="brand-logo-img" />
            </div>

            <div className="login-copy">
              <span className="live-badge">ADMIN ONLY</span>
              <h2>Secure Login</h2>
              <p>
                This access is restricted to administrators to manage
                broadcasting, moderation, and publications.
              </p>
            </div>
          </div>

          <div className="login-right">
            <div className="form-box">
              <h3>Sign in</h3>
              <p>Use your administrator account.</p>

              <form className="login-form" onSubmit={handleSubmit} noValidate>
                {/* Message d'erreur */}
                {error && (
                  <div className="login-error" role="alert">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    disabled={loading}
                    placeholder="admin@eventsync.com"
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    placeholder="••••••••"
                  />
                </label>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <IconSpinner />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
