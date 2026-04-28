/*
 * DESIGN PHILOSOPHY: Minimalismo Tático / Operator Aesthetic
 * - Fundo #0a0a0a, cards #111, vermelho #e63946 em acentos e botões
 * - Space Grotesk para títulos, Inter para corpo
 * - Linha vermelha fina no topo de cada card
 * - Hover com glow vermelho difuso
 * - Grid responsivo 3 → 2 → 1 colunas
 */

import { useState, useMemo, useEffect } from "react";
import { ExternalLink, BookOpen, Search, Zap, LogOut, Settings } from "lucide-react";
import Login from "./Login";
import AdminPanel from "@/components/AdminPanel";

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  siteUrl?: string;
  tutorialUrl?: string;
}

const defaultTools: Tool[] = [
  {
    id: 1,
    name: "Manus IA",
    description: "Criar apps e sites com inteligência artificial de forma rápida e intuitiva.",
    category: "IA",
    siteUrl: "https://manus.im/app",
  },
  {
    id: 2,
    name: "Shodan",
    description: "Motor de busca para dispositivos conectados à internet, incluindo câmeras IP.",
    category: "Segurança",
    siteUrl: "https://www.shodan.io/",
    tutorialUrl: "https://www.facebook.com/watch/?v=1680914693076000",
  },
  {
    id: 3,
    name: "Astral Instagram UserGPS",
    description: "Localizar o local de fotos publicadas no Instagram através de metadados.",
    category: "OSINT",
    tutorialUrl: "https://www.facebook.com/watch/?v=1464468088511272",
  },
  {
    id: 4,
    name: "Auto Tor IP Changer",
    description: "Troca automática de IP via rede Tor para maior anonimato e privacidade.",
    category: "Privacidade",
    siteUrl: "https://github.com/FDX100/Auto_Tor_IP_changer",
    tutorialUrl: "https://www.facebook.com/watch/?v=2274836776379847",
  },
  {
    id: 5,
    name: "GhostScan Kali Linux",
    description: "Ferramenta de escaneamento furtivo de redes e portas para Kali Linux.",
    category: "Segurança",
    siteUrl: "https://github.com/scf13/ghostscan",
    tutorialUrl: "https://www.facebook.com/watch/?v=2274836776379847",
  },
  {
    id: 6,
    name: "RunAble",
    description: "Plataforma de conteúdo infinito para aprendizado e entretenimento contínuo.",
    category: "Conteúdo",
    siteUrl: "https://runable.com/",
    tutorialUrl: "https://www.facebook.com/reel/1485656079719609",
  },
  {
    id: 7,
    name: "LovART",
    description: "Criação de artes profissionais com inteligência artificial generativa.",
    category: "IA",
    siteUrl: "https://www.lovart.ai/pt",
    tutorialUrl: "https://www.facebook.com/watch/?v=745410501623328",
  },
  {
    id: 8,
    name: "iFixIt",
    description: "Guias detalhados para reparar qualquer dispositivo eletrônico ou objeto.",
    category: "Utilidades",
    siteUrl: "https://pt.ifixit.com/",
    tutorialUrl: "https://www.facebook.com/watch/?v=1275559411104583",
  },
  {
    id: 9,
    name: "DreamFace",
    description: "Criar avatar com IA e sincronização labial realista para vídeos e animações.",
    category: "IA",
    siteUrl: "https://www.dreamfaceapp.com/pt",
    tutorialUrl: "https://www.youtube.com/watch?v=V7b89oHuI_k",
  },
  {
    id: 10,
    name: "Opus IA",
    description: "Gera automaticamente cortes virais a partir de vídeos longos com IA.",
    category: "IA",
    siteUrl: "https://www.opus.pro/",
    tutorialUrl: "https://www.facebook.com/watch/?v=705839032609841",
  },
  {
    id: 11,
    name: "Hugging Face",
    description: "Hub com todas as principais IAs e modelos de machine learning em um só lugar.",
    category: "IA",
    siteUrl: "https://huggingface.co/",
    tutorialUrl: "https://www.facebook.com/watch/?v=878699667982948",
  },
  {
    id: 12,
    name: "FaceCheck.ID",
    description: "Busca reversa por foto para encontrar perfis e informações de uma pessoa.",
    category: "OSINT",
    siteUrl: "https://facecheck.id/pt",
    tutorialUrl: "https://www.facebook.com/watch/?v=2686943498329689",
  },
];

const categoryColors: Record<string, string> = {
  IA: "oklch(0.52 0.22 25)",
  Segurança: "oklch(0.55 0.18 145)",
  OSINT: "oklch(0.55 0.18 260)",
  Privacidade: "oklch(0.55 0.18 300)",
  Conteúdo: "oklch(0.55 0.18 60)",
  Utilidades: "oklch(0.55 0.18 200)",
};

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const catColor = categoryColors[tool.category] ?? "oklch(0.52 0.22 25)";

  return (
    <div
      className="tool-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm"
              style={{
                background: `${catColor}22`,
                color: catColor,
                border: `1px solid ${catColor}44`,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {tool.category}
            </span>
          </div>
          <h3
            className="text-base font-bold text-white leading-snug"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tool.name}
          </h3>
        </div>
        <span className="red-dot mt-1.5 flex-shrink-0" />
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.6 0 0)" }}>
        {tool.description}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {tool.siteUrl ? (
          <a
            href={tool.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1"
            style={{ minWidth: "120px" }}
          >
            <ExternalLink size={13} />
            Acessar Site
          </a>
        ) : (
          <span
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-md border opacity-30 select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "oklch(0.55 0 0)",
              borderColor: "oklch(0.2 0 0)",
              minWidth: "120px",
            }}
          >
            <ExternalLink size={13} />
            Sem Link
          </span>
        )}

        {tool.tutorialUrl ? (
          <a
            href={tool.tutorialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1"
            style={{ minWidth: "120px" }}
          >
            <BookOpen size={13} />
            Ver Tutorial
          </a>
        ) : (
          <span
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-md border opacity-30 select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "oklch(0.55 0 0)",
              borderColor: "oklch(0.2 0 0)",
              minWidth: "120px",
            }}
          >
            <BookOpen size={13} />
            Sem Tutorial
          </span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState("");
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [tools, setTools] = useState<Tool[]>(defaultTools);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const authenticated = localStorage.getItem("hub_authenticated") === "true";
    setIsAuthenticated(authenticated);

    // Carregar ferramentas customizadas
    const savedTools = localStorage.getItem("hub_custom_tools");
    if (savedTools) {
      try {
        const customTools = JSON.parse(savedTools);
        setTools([...defaultTools, ...customTools]);
      } catch {
        // Se houver erro ao parsear, usar apenas as padrões
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hub_authenticated");
    localStorage.removeItem("hub_username");
    setIsAuthenticated(false);
    setAdminPanelOpen(false);
  };

  const handleAddTool = (newTool: Omit<Tool, "id">) => {
    const id = Math.max(...tools.map((t) => t.id), 0) + 1;
    const toolWithId: Tool = { ...newTool, id };
    const updatedTools = [...tools, toolWithId];
    setTools(updatedTools);

    // Salvar apenas as ferramentas customizadas
    const customTools = updatedTools.filter((t) => t.id > 12);
    localStorage.setItem("hub_custom_tools", JSON.stringify(customTools));
  };

  const handleDeleteTool = (id: number) => {
    const updatedTools = tools.filter((t) => t.id !== id);
    setTools(updatedTools);

    // Atualizar localStorage
    const customTools = updatedTools.filter((t) => t.id > 12);
    localStorage.setItem("hub_custom_tools", JSON.stringify(customTools));
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return tools;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query, tools]);

  // Mostrar tela de login se não autenticado
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.07 0 0)" }}>
      {/* Hero Section */}
      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, oklch(0.04 0 0), oklch(0.07 0 0))`,
          borderBottom: "1px solid oklch(0.14 0 0)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663607116329/daGrESn76FbFYHNvpLj3PQ/hero-banner-7GmwaKv24u9HoYz2fHVCCv.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.04 0 0 / 0.6) 0%, oklch(0.07 0 0 / 0.95) 100%)",
          }}
        />

        <div className="container relative z-10 py-16 md:py-20">
          <div className="flex items-start justify-between gap-4 mb-6">
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(0.52 0.22 25)",
                  boxShadow: "0 0 20px oklch(0.52 0.22 25 / 0.4)",
                }}
              >
                <Zap size={18} color="white" fill="white" />
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

            {/* Header buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAdminPanelOpen(true)}
                className="px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-all"
                style={{
                  background: "oklch(0.16 0 0)",
                  color: "oklch(0.52 0.22 25)",
                  border: "1px solid oklch(0.52 0.22 25 / 0.3)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.52 0.22 25 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "oklch(0.16 0 0)";
                }}
              >
                <Settings size={14} />
                Painel
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-all"
                style={{
                  background: "oklch(0.16 0 0)",
                  color: "oklch(0.55 0 0)",
                  border: "1px solid oklch(0.55 0 0 / 0.3)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.55 0 0 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "oklch(0.16 0 0)";
                }}
              >
                <LogOut size={14} />
                Sair
              </button>
            </div>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Minhas Ferramentas
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-xl" style={{ color: "oklch(0.55 0 0)" }}>
            Acesso rápido e organizado a todos os links, ferramentas e tutoriais que uso no dia a dia.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "oklch(0.45 0 0)" }}
            />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar ferramenta, categoria..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="container py-10 pb-20">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="red-dot" />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.45 0 0)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {filtered.length} {filtered.length === 1 ? "ferramenta" : "ferramentas"}
              {query && ` para "${query}"`}
            </span>
          </div>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs underline"
              style={{ color: "oklch(0.52 0.22 25)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Limpar busca
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search size={40} style={{ color: "oklch(0.25 0 0)" }} className="mb-4" />
            <p
              className="text-lg font-semibold mb-1"
              style={{ color: "oklch(0.45 0 0)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Nenhuma ferramenta encontrada
            </p>
            <p className="text-sm" style={{ color: "oklch(0.35 0 0)" }}>
              Tente outro termo de busca.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="border-t py-6"
        style={{ borderColor: "oklch(0.14 0 0)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: "oklch(0.52 0.22 25)" }}
            >
              <Zap size={11} color="white" fill="white" />
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.35 0 0)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hub de Ferramentas
            </span>
          </div>
          <p className="text-xs" style={{ color: "oklch(0.3 0 0)" }}>
            {tools.length} ferramentas disponíveis · Atualizado em {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        tools={tools}
        onAddTool={handleAddTool}
        onDeleteTool={handleDeleteTool}
      />
    </div>
  );
}
