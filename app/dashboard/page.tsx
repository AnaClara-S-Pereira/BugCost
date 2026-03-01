"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, TrendingDown, Download, Loader2, ChevronDown, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const [dadosIA, setDadosIA] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [painelAberto, setPainelAberto] = useState(false);

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
        setDadosIA(resultado);
      } catch (error) {
        console.error("Erro ao chamar a IA", error);
      } finally {
        setCarregando(false);
      }
    }

    analisarDados();
  }, []);

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin size-12 text-blue-500 mb-4" />
        <p className="text-xl font-medium tracking-widest animate-pulse">AGUARDE...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* CONTEÚDO PRINCIPAL */}
      <main className={`transition-all duration-500 p-8 ${painelAberto ? 'w-2/3' : 'w-full'}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex justify-between items-center border-b border-white/10 pb-6 tracking-wider">
            <h1 className="text-2xl font-bold">BUG <span className="text-blue-500 -ml-1.5">COST</span></h1>
            <button onClick={() => window.location.href = "/hub"} className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">
              Nova Análise
            </button>
          </header>

          {/* CARDS DE VIZUALIZAÇÃO */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-3 text-red-600 mb-2">
                <TrendingDown size={20} />
                <span className="text-sm font-medium">Prejuízo Estimado</span>
              </div>
              <p className="text-3xl font-bold">R${dadosIA?.prejuizoEstimado}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <AlertTriangle size={20} />
                <span className="text-sm font-medium">Erros Críticos</span>
              </div>
              
              {/* BOTÃO SETA*/}
              <button 
                onClick={() => setPainelAberto(!painelAberto)}
                className="flex items-center gap-2 transition-all group cursor-pointer"
              >
                <p className="text-3xl font-bold">{dadosIA?.errosEncontrados}</p>
                <ChevronDown 
                  className={`transition-all duration-300 ${painelAberto ? 'rotate-180' : 'text-zinc-500 group-hover:text-white'}`} 
                  size={24}
                />
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl cursor-pointer flex items-center justify-center">
              <div className="hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 text-blue-700">
                <Download size={30} />
                <span className="text-xl font-medium text-amber-50">Baixar relatório</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-400 italic">Resumo dos erros encontrados:</h2>
            <p className="leading-relaxed text-zinc-300">{dadosIA?.explicacao}</p>
          </div>

{/*RELATÓRIO*/}

< div className="mt-20 mb-32 px-6 selecionavel font-sans">
  <div className="max-w-4xl bg-zinc-100 text-[#1a1c21] p-12 rounded-[24px] shadow-2x">
    
    {/* Header do Relatório */}
    <div className="flex justify-between items-start mb-16">
      <div>
        <h2 className="text-3xl font-extrabold tracking-wide text-zinc-900 uppercase">Relatório de erros</h2>
        <p className="text-slate-400 font-medium tracking-wide">Análise de Impacto Financeiro</p>
      </div>
      <div className="text-right">
        <p className="mt-2 text-[11px] font-bold text-slate-400 tracking-tighter uppercase bg-zinc-300 text-zinc-700 rounded-2xl p-2 tracking-wide">{new Date().toLocaleDateString('pt-BR')} </p>
      </div>
    </div>

    {/* Vizualização de Perda, Risco e Erros*/}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div className="flex flex-col border-l-2 border-slate-100 pl-6">
        <span className="text-[11px] font-bold text-slate-400 9ppercase mb-2">Perda Financeira</span>
        <span className="text-2xl font-black text-red-600 tracking-tight">R$ {dadosIA?.prejuizoEstimado}</span>
        <p className="text-[10px] text-slate-400 mt-1">Estimativa baseada no faturamento/hora</p>
      </div>
      <div className="flex flex-col border-l-2 border-slate-100 pl-6">
        <span className="text-[11px] font-bold text-slate-400 uppercase mb-2">Nível de risco</span>
        <span className="text-2xl font-black text-slate-800 tracking-tight">{dadosIA?.nivelRisco} </span>
        <p className="text-[10px] text-slate-400 mt-1"> {dadosIA?.impactoDireto} </p>
      </div>
      <div className="flex flex-col border-l-2 border-slate-100 pl-6">
        <span className="text-[11px] font-bold text-slate-400 uppercase mb-2">Erros Críticos</span>
        <span className="text-2xl font-black text-slate-800 tracking-tight">{dadosIA?.errosEncontrados}</span>
        <p className="text-[10px] text-slate-400 mt-1">Falhas que exigem intervenção</p>
      </div>
    </div>

    {/* RESUMO IMPACTO*/}
    <div className="grid grid-cols-1 gap-12 mb-16 font-medium">
      <div>
        <h3 className=" font-black text-blue-800 uppercase mb-4 tracking-widest">Resumo do Impacto</h3>
        <p className="text-base leading-relaxed text-slate-500 italic">
          {dadosIA?.explicacao}
        </p>
      </div>
      
    </div>
  </div>
</div>
        </div>
      </main>

      {/* PAINEL LATERAL */}
      {painelAberto && (
        <aside className="w-1/3 bg-[#0a0f1a] border-l border-white/5 flex flex-col h-screen animate-in slide-in-from-right duration-500 shadow-2xl">
  
  {/* HEADER PAINEL */}
  <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0f1a]">
    <div>
      <h3 className="text-white font-semibold text-lg">Análise</h3>
      <p className="text-zinc-500 text-xs">{dadosIA?.errosEncontrados} erros identificados</p>
    </div>
    <button onClick={() => setPainelAberto(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
      <ChevronRight size={20} className="text-zinc-400" />
    </button>
  </div>

  {/* ANÁLISE DE ERROS */}
  <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#0d1321]">
    {dadosIA?.listaDeErros?.map((erro: string, i: number) => (
      <div key={i} className="flex gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5 group">
        <span className="text-[10px] font-mono text-zinc-600 mt-0.5 w-4">{i + 1}.</span>
        <p className="text-[13px] text-zinc-400 group-hover:text-red-400 transition-colors leading-snug font-mono">
          {erro}
        </p>
      </div>
    ))}
  </div>

  {/* CÓDIGO CORRIGIDO: Ocupa metade da altura para mostrar o código todo */}
  <div className="h-1/2 border-t border-white/10 flex flex-col bg-[#0a0f1a]">
    <div className="px-6 py-3 border-b border-white/5 flex justify-between items-center bg-black/20">
      <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold">Correção</span>
    </div>
    
    <div className="flex-1 overflow-auto p-4 bg-[#05070a]">
      <pre className="selecionavel text-[12px] leading-relaxed font-mono text-zinc-300">
        <code className="whitespace-pre">
          {dadosIA?.codigoSugestao || "// Processando correção..."}
        </code>
      </pre>
    </div>
  </div>

</aside>
      )}
    </div>
  );

  
}