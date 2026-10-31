"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Relatorio from "./Relatorio";
import {
  AlertTriangle,
  TrendingDown,
  Loader2,
  ChevronDown,
  CircleAlert,
  ArrowLeft,
  Clock,
  FileText,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [dadosIA, setDadosIA] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [painelAberto, setPainelAberto] = useState(false);
  const [relatorioAberto, setRelatorioAberto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [faturamento, setFaturamento] = useState(0);

  // PEGA O LOG E O FATURAMENTO SALVOS, MANDA PARA A API E GUARDA A RESPOSTA
  // SE A API FALHAR, MOSTRA UM RESULTADO DE EXEMPLO COM UM AVISO
  useEffect(() => {
    async function analisarDados() {
      const log = localStorage.getItem("BugcostLogTexto");
      const valorSalvo = localStorage.getItem("bugcostFaturamento");

      if (!log || !valorSalvo) {
        window.location.href = "/";
        return;
      }
      setFaturamento(parseFloat(valorSalvo) || 0);

      try {
        const resposta = await fetch("/api/analisar", {
          method: "POST",
          body: JSON.stringify({ logTexto: log, faturamento: valorSalvo }),
        });

        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error("Erro");

        setDadosIA(resultado);
      } catch {
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

  // TELA DE CARREGAMENTO ENQUANTO A IA ANALISA O LOG
  if (carregando) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center select-all justify-center text-white">
        <Loader2 className="animate-spin size-12 text-blue-500 mb-4" />
        <p className="tracking-widest font-bold">AGUARDE...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white overflow-x-hidden relative font-sans">
      {/* CONTEÚDO PRINCIPAL: AVISO DE ERRO, TOPO, CARDS DE RESULTADO E RESUMOS */}
      <main
        className={`transition-all duration-500 p-4 md:p-8 w-full ${painelAberto ? "lg:mr-[33%]" : ""}`}
      >
        {erro && (
          <div className="max-w-6xl mx-auto mb-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-center justify-between gap-4">
            <p className="text-[10px] md:text-xs text-amber-200 font-semibold">{erro}</p>
            <button
              onClick={() => setErro(null)}
              className="text-xs bg-amber-500/20 px-3 py-1 rounded-lg font-bold"
            >
              OK
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex justify-between items-center border-b border-white/10 pb-6">
            <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold italic">
              <Image src="/logo.png" alt="BugCost" width={32} height={32} className="h-8 w-auto rounded-md" />
              <span>
                BUG <span className="text-blue-500">COST</span>
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRelatorioAberto(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                <FileText size={16} />
                Ver relatório
              </button>
              <ArrowLeft
                onClick={() => (window.location.href = "/enviar")}
                className="cursor-pointer text-zinc-400 hover:text-white"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
              <div className="flex items-center gap-2 text-red-500 mb-2 font-bold text-sm">
                <TrendingDown size={18} /> PREJUÍZO
              </div>
              <p className="text-3xl md:text-4xl font-bold">
                R${dadosIA?.prejuizoEstimado}
              </p>
            </div>

            <div
              onClick={() => setPainelAberto(!painelAberto)}
              className="bg-white/5 border border-blue-500/40 p-6 rounded-lg hover:border-blue-400 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
                <AlertTriangle size={18} /> ERROS
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-bold">
                  {dadosIA?.errosEncontrados}
                </span>
                <ChevronDown
                  className={`transition-transform ${painelAberto ? "rotate-180" : ""}`}
                />
              </div>
              <p className="mt-2 text-xs text-blue-400 font-medium animate-pulse">
                Clique para ver os erros e a correção
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
              <div className="flex items-center gap-2 text-sky-400 mb-2 font-bold text-sm">
                <Clock size={18} /> FORA DO AR
              </div>
              <p className="text-3xl md:text-4xl font-bold">
                {dadosIA?.downtimeMinutos ?? "-"}
                <span className="text-base text-zinc-400 font-medium"> min</span>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
              <div className="flex items-center gap-2 text-orange-400 mb-2 font-bold text-sm">
                <CircleAlert size={18} /> RISCO
              </div>
              <p className="text-3xl md:text-4xl font-bold">
                {dadosIA?.nivelRisco}
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
            <h2 className="text-blue-400 mb-4 italic font-bold text-sm">
              RESUMO DOS ERROS:
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              {dadosIA?.explicacao}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
              <h2 className="text-blue-400 mb-4 italic font-bold text-sm">
                IMPACTO NO NEGÓCIO:
              </h2>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {dadosIA?.impactoDireto}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
              <h2 className="text-blue-400 mb-4 italic font-bold text-sm">
                COMO O PREJUÍZO FOI CALCULADO:
              </h2>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Faturamento de R$ {faturamento.toLocaleString("pt-BR")} por mês,
                ou seja, R$ {(faturamento / 43200).toFixed(2)} por minuto.
                Multiplicado por {dadosIA?.downtimeMinutos ?? 0} minutos fora do
                ar.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* PAINEL LATERAL COM A LISTA DE ERROS E O CÓDIGO DE CORREÇÃO */}
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

      {/* TELA DO RELATÓRIO PARA VER E BAIXAR EM PDF */}
      {relatorioAberto && (
        <Relatorio
          dados={dadosIA}
          faturamento={faturamento}
          fechar={() => setRelatorioAberto(false)}
        />
      )}
    </div>
  );
}