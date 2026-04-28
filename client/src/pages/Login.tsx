/*
 * LOGIN PAGE — Estilo Minimalismo Tático / Operator Aesthetic
 * - Fundo preto (#0a0a0a)
 * - Vermelho (#e63946) em acentos e botões
 * - Space Grotesk para títulos, Inter para corpo
 * - Animações suaves
 */

import { useState } from "react";
import { Zap, AlertCircle } from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Credenciais fixas
  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Salvar sessão no localStorage
        localStorage.setItem("hub_authenticated", "true");
        localStorage.setItem("hub_username", username);
        onLoginSuccess();
      } else {
        setError("Usuário ou senha inválidos");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "oklch(0.07 0 0)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at top-right, oklch(0.52 0.22 25 / 0.1), transparent)",
        }}
      />

      {/* Login card */}
      <div
        className="relative w-full max-w-md p-8 rounded-lg border"
        style={{
          background: "oklch(0.1 0 0)",
          borderColor: "oklch(0.18 0 0)",
          borderTop: "2px solid oklch(0.52 0.22 25)",
          boxShadow: "0 8px 32px oklch(0.52 0.22 25 / 0.1)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center"
            style={{
              background: "oklch(0.52 0.22 25)",
              boxShadow: "0 0 20px oklch(0.52 0.22 25 / 0.4)",
            }}
          >
            <Zap size={20} color="white" fill="white" />
          </div>
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{
              color: "oklch(0.52 0.22 25)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Hub Pessoal
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-bold text-white mb-2 text-center"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Acesso Restrito
        </h1>
        <p
          className="text-sm text-center mb-6"
          style={{ color: "oklch(0.55 0 0)" }}
        >
          Faça login para acessar suas ferramentas
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username field */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{
                color: "oklch(0.55 0 0)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 rounded-md border outline-none transition-all"
              style={{
                background: "oklch(0.16 0 0)",
                borderColor: "oklch(0.2 0 0)",
                color: "oklch(0.95 0 0)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.52 0.22 25 / 0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px oklch(0.52 0.22 25 / 0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.2 0 0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password field */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{
                color: "oklch(0.55 0 0)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-md border outline-none transition-all"
              style={{
                background: "oklch(0.16 0 0)",
                borderColor: "oklch(0.2 0 0)",
                color: "oklch(0.95 0 0)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.52 0.22 25 / 0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px oklch(0.52 0.22 25 / 0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.2 0 0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-md text-sm"
              style={{
                background: "oklch(0.52 0.22 25 / 0.15)",
                borderLeft: "2px solid oklch(0.52 0.22 25)",
                color: "oklch(0.52 0.22 25)",
              }}
            >
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-md font-semibold uppercase tracking-widest text-sm transition-all mt-6"
            style={{
              background: isLoading
                ? "oklch(0.52 0.22 25 / 0.6)"
                : "oklch(0.52 0.22 25)",
              color: "oklch(0.98 0 0)",
              fontFamily: "'Space Grotesk', sans-serif",
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "oklch(0.58 0.24 25)";
                e.currentTarget.style.boxShadow =
                  "0 0 16px oklch(0.52 0.22 25 / 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.52 0.22 25)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {isLoading ? "Autenticando..." : "Entrar"}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div
          className="mt-6 p-3 rounded-md text-xs text-center"
          style={{
            background: "oklch(0.16 0 0)",
            borderLeft: "2px solid oklch(0.35 0 0)",
            color: "oklch(0.45 0 0)",
          }}
        >
          <p className="font-semibold mb-1">Credenciais de Demo:</p>
          <p>Usuário: <span style={{ color: "oklch(0.55 0 0)" }}>admin</span></p>
          <p>Senha: <span style={{ color: "oklch(0.55 0 0)" }}>123456</span></p>
        </div>
      </div>
    </div>
  );
}
