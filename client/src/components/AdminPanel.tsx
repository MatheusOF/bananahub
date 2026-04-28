/*
 * ADMIN PANEL — Estilo Minimalismo Tático / Operator Aesthetic
 * - Fundo preto (#0a0a0a)
 * - Vermelho (#e63946) em acentos e botões
 * - Space Grotesk para títulos, Inter para corpo
 */

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  siteUrl?: string;
  tutorialUrl?: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
  onAddTool: (tool: Omit<Tool, "id">) => void;
  onDeleteTool: (id: number) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  tools,
  onAddTool,
  onDeleteTool,
}: AdminPanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "IA",
    siteUrl: "",
    tutorialUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onAddTool({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      siteUrl: formData.siteUrl || undefined,
      tutorialUrl: formData.tutorialUrl || undefined,
    });

    setFormData({
      name: "",
      description: "",
      category: "IA",
      siteUrl: "",
      tutorialUrl: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        style={{ background: "oklch(0 0 0 / 0.5)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 z-50 rounded-lg border overflow-y-auto max-h-[90vh]"
        style={{
          background: "oklch(0.1 0 0)",
          borderColor: "oklch(0.18 0 0)",
          borderTop: "2px solid oklch(0.52 0.22 25)",
          boxShadow: "0 20px 64px oklch(0.52 0.22 25 / 0.2)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between p-6 border-b"
          style={{ borderColor: "oklch(0.18 0 0)" }}
        >
          <h2
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Painel Administrativo
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Add Tool Form */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Adicionar Nova Ferramenta
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{
                    color: "oklch(0.55 0 0)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Nome da Ferramenta
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Meu App"
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all"
                  style={{
                    background: "oklch(0.16 0 0)",
                    borderColor: "oklch(0.2 0 0)",
                    color: "oklch(0.95 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "oklch(0.52 0.22 25 / 0.6)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px oklch(0.52 0.22 25 / 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.2 0 0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{
                    color: "oklch(0.55 0 0)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descrição breve da ferramenta"
                  rows={3}
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all resize-none"
                  style={{
                    background: "oklch(0.16 0 0)",
                    borderColor: "oklch(0.2 0 0)",
                    color: "oklch(0.95 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "oklch(0.52 0.22 25 / 0.6)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px oklch(0.52 0.22 25 / 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.2 0 0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{
                    color: "oklch(0.55 0 0)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all"
                  style={{
                    background: "oklch(0.16 0 0)",
                    borderColor: "oklch(0.2 0 0)",
                    color: "oklch(0.95 0 0)",
                  }}
                >
                  <option value="IA">IA</option>
                  <option value="Segurança">Segurança</option>
                  <option value="OSINT">OSINT</option>
                  <option value="Privacidade">Privacidade</option>
                  <option value="Conteúdo">Conteúdo</option>
                  <option value="Utilidades">Utilidades</option>
                </select>
              </div>

              {/* Site URL */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{
                    color: "oklch(0.55 0 0)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Link do Site
                </label>
                <input
                  type="url"
                  value={formData.siteUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, siteUrl: e.target.value })
                  }
                  placeholder="https://exemplo.com"
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all"
                  style={{
                    background: "oklch(0.16 0 0)",
                    borderColor: "oklch(0.2 0 0)",
                    color: "oklch(0.95 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "oklch(0.52 0.22 25 / 0.6)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px oklch(0.52 0.22 25 / 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.2 0 0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Tutorial URL */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{
                    color: "oklch(0.55 0 0)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Link do Tutorial (Opcional)
                </label>
                <input
                  type="url"
                  value={formData.tutorialUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, tutorialUrl: e.target.value })
                  }
                  placeholder="https://tutorial.com"
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all"
                  style={{
                    background: "oklch(0.16 0 0)",
                    borderColor: "oklch(0.2 0 0)",
                    color: "oklch(0.95 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      "oklch(0.52 0.22 25 / 0.6)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px oklch(0.52 0.22 25 / 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.2 0 0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-md font-semibold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "oklch(0.52 0.22 25)",
                  color: "oklch(0.98 0 0)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.58 0.24 25)";
                  e.currentTarget.style.boxShadow =
                    "0 0 16px oklch(0.52 0.22 25 / 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "oklch(0.52 0.22 25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Plus size={16} />
                Adicionar Ferramenta
              </button>
            </form>
          </div>

          {/* Tools List */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ferramentas Adicionadas ({tools.length})
            </h3>

            {tools.length === 0 ? (
              <p style={{ color: "oklch(0.45 0 0)" }}>
                Nenhuma ferramenta adicionada ainda.
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-start justify-between p-3 rounded-md border"
                    style={{
                      background: "oklch(0.16 0 0)",
                      borderColor: "oklch(0.2 0 0)",
                      borderLeft: "2px solid oklch(0.52 0.22 25)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-white truncate"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {tool.name}
                      </p>
                      <p
                        className="text-xs mt-1 truncate"
                        style={{ color: "oklch(0.45 0 0)" }}
                      >
                        {tool.category}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteTool(tool.id)}
                      className="ml-2 p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0"
                      style={{
                        background: "oklch(0.52 0.22 25 / 0.15)",
                        color: "oklch(0.52 0.22 25)",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
