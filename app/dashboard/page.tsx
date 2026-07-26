"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AlertTriangle,
  TrendingDown,
  Loader2,
  ChevronDown,
  CircleAlert,
  ArrowLeft,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [dadosIA, setDadosIA] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [painelAberto, setPainelAberto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function analisarDados() {
      const log = localStorage.getItem("BugcostLogTexto");
      const faturamento = localStorage.getItem("bugcostFaturamento");

      if (!log || !faturamento) {
        window.location.href = "/";
        return;
      }

      try {
        const resposta = await fetch("/api/analisar", {
          method: "POST",
          body: JSON.stringify({ logTexto: log, faturamento }),
        });

        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error("Erro");

        setDadosIA(resultado);
      } catch (error) {
        setErro("AVISO: A API ESTÁ EM REPOUSO, MOSTRANDO DADOS SIMULADOS.");
        setDadosIA({
          prejuizoEstimado: "250,00",
          errosEncontrados: 3,
          nivelRisco: "Alto",
          impactoDireto: "Instabilidade no Checkout",
          explicacao:
            "Simulação: detectados múltiplos timeouts na camada de banco de dados.",
          listaDeErros: [
            "Erro na sintaxe",
            "Código duplicado",
            "Chave faltando",
          ],
          codigoSugestao:
            "// CORREÇÃO DE TIMEOUT\nconst db = await connect({ timeout: 5000 });",
        });
      } finally {
        setCarregando(false);
      }
    }
    analisarDados();
  }, []);

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center select-all justify-center text-white">
        <Loader2 className="animate-spin size-12 text-blue-500 mb-4" />
        <p className="tracking-widest font-bold">AGUARDE...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-x-hidden relative font-sans">
      <main
        className={`transition-all duration-500 p-4 md:p-8 w-full ${painelAberto ? "lg:mr-[33%]" : ""}`}
      >
        {erro && (
          <div className="max-w-4xl mx-auto mb-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center justify-between gap-4">
            <p className="text-[10px] md:text-xs text-amber-200 font-semibold">{erro}</p>
            <button
              onClick={() => setErro(null)}
              className="text-xs bg-amber-500/20 px-3 py-1 rounded-lg font-bold"
            >
              OK
            </button>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex justify-between items-center border-b border-white/10 pb-6">
            <h1 className="text-xl md:text-2xl font-bold italic">
              BUG <span className="text-blue-500">COST</span>
            </h1>
            <ArrowLeft
              onClick={() => (window.location.href = "/hub")}
              className="cursor-pointer text-zinc-400 hover:text-white"
            />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-2 text-red-600 mb-2 font-bold text-sm">
                <TrendingDown size={18} /> PREJUÍZO
              </div>
              <p className="text-2xl md:text-3xl font-bold">
                R${dadosIA?.prejuizoEstimado}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
                <AlertTriangle size={18} /> ERROS
              </div>
              <button
                onClick={() => setPainelAberto(!painelAberto)}
                className="flex items-center gap-2 group"
              >
                <span className="text-2xl md:text-3xl font-bold">
                  {dadosIA?.errosEncontrados}
                </span>
                <ChevronDown
                  className={`transition-transform ${painelAberto ? "rotate-180" : ""} cursor-pointer`}
                />
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-orange-400 mb-2 font-bold text-sm">
                <CircleAlert size={18} /> RISCO
              </div>
              <p className="text-2xl md:text-3xl font-bold">
                {dadosIA?.nivelRisco}
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <h2 className="text-blue-400 mb-4 italic font-bold text-sm">
              RESUMO DOS ERROS:
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {dadosIA?.explicacao}
            </p>
          </div>
        </div>
      </main>

      <aside
        className={`fixed top-0 right-0 h-full bg-[#0a0f1a] border-l border-white/10 flex flex-col z-50 transition-all duration-500 ${painelAberto ? "translate-x-0 w-[85%] md:w-[40%] lg:w-1/3" : "translate-x-full w-0"}`}
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold uppercase tracking-wider text-sm">ANÁLISE</h3>
          <X
            onClick={() => setPainelAberto(false)}
            className="cursor-pointer text-zinc-400 hover:text-white"
            size={20}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#0d1321]">
          {dadosIA?.listaDeErros?.map((erro: string, i: number) => (
            <div
              key={i}
              className="flex gap-3 p-3 rounded-lg bg-white/[0.02] text-[12px] font-mono text-zinc-400"
            >
              <span className="text-zinc-600 font-bold">{i + 1}.</span> {erro}
            </div>
          ))}
        </div>

        <div className="h-3/6 border-t border-white/10 bg-[#05070a] p-4 overflow-auto">
          <span className="text-[10px] text-green-500 font-bold uppercase block mb-2">
            CORREÇÃO
          </span>

          <div className="text-xs text-zinc-300 space-y-3 leading-relaxed">
            <ReactMarkdown
              components={{
                strong: ({ children }: { children?: React.ReactNode }) => (
                  <strong className="font-bold text-white block mt-3 mb-1 text-xs uppercase">
                    {children}
                  </strong>
                ),
                p: ({ children }: { children?: React.ReactNode }) => (
                  <p className="text-xs text-zinc-300 my-1">{children}</p>
                ),
                code: ({ children }: { children?: React.ReactNode }) => (
                  <code className="bg-zinc-950 border border-zinc-800 text-blue-300 font-mono text-[11px] p-2 rounded-lg block overflow-x-auto my-2">
                    {children}
                  </code>
                ),
                li: ({ children }: { children?: React.ReactNode }) => (
                  <li className="ml-4 list-disc text-xs text-zinc-300 my-0.5">{children}</li>
                ),
              }}
            >
              {dadosIA?.codigoSugestao}
            </ReactMarkdown>
          </div>
        </div>
      </aside>

      {painelAberto && (
        <div
          onClick={() => setPainelAberto(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </div>
  );
}