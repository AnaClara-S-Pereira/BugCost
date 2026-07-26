"use client";

import { BookOpenCheck, SearchCheck, ArrowRight, Mail, DollarSign, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-zinc-950 select-none text-white min-h-screen selection:bg-[#1f4693] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav className="w-full bg-zinc-950/80 fixed top-0 left-0 z-50 p-4 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-bold tracking-tight text-white">
              Bug<span className="text-[#3b82f6] ml-0.5">Cost</span>
            </span>
          </Link>

          <div className="flex items-center gap-8 text-sm">
            <a href="#como-funciona" className="text-zinc-400 font-medium hover:text-white transition-colors">
              Como funciona
            </a>
            <a href="#diferencial" className="text-zinc-400 font-medium hover:text-white transition-colors">
              Diferencial
            </a>
            <Link
              href="/hub"
              className="px-5 py-2 text-xs font-semibold bg-[#1f4693] hover:bg-[#183775] text-white rounded-lg transition-all shadow-md hover:shadow-blue-900/20"
            >
              Analisar Logs
            </Link>
          </div>
        </div>
      </nav>

      {/* BANNER PRINCIPAL (HERO) */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-zinc-950 text-white">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-right opacity-20"
          >
            <source src="/header.mp4" type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl flex flex-col items-start text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Descubra o impacto <br />
              financeiro dos bugs no <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                seu negócio.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
              Converta logs de erro em métricas de prejuízo real. Saiba exatamente quanto cada falha custa por minuto e receba soluções prontas para produção.
            </p>

            <div className="mt-8">
              <Link
                href="/hub"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#1f4693] hover:bg-[#183775] text-white font-semibold rounded-3xl transition-all duration-200 shadow-lg shadow-blue-950/50 hover:scale-[1.02]"
              >
                <span>Calcular Prejuízo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="text-zinc-100">
        {/* SEÇÃO DE RECURSOS */}
        <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <SearchCheck className="text-blue-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Análise de Logs</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Leitura inteligente de stack traces e falhas críticas em arquivos extensos, simplificando a identificação da causa raiz.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <DollarSign className="text-emerald-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cálculo de Downtime</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Cruzamento direto entre o tempo de inatividade do servidor e a receita estimada da empresa para precificar a falha.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <BookOpenCheck className="text-indigo-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Patch Recomendado</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Sugestão automatizada da correção do código para reduzir o MTTR (tempo médio de reparo) da sua equipe.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO COMO FUNCIONA */}
        <section id="como-funciona" className="pb-20 px-6 max-w-7xl mx-auto scroll-mt-28">
          <div className="p-8 md:p-12 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col md:flex-row items-center gap-12">
            
            {/* PAINEL EM PORTUGUÊS REAIS */}
            <div className="w-full md:w-1/2 rounded-xl border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs shadow-2xl space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80 text-zinc-500">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>Monitoramento de Falhas</span>
              </div>
              
              <div className="space-y-2 text-zinc-300">
                <div className="flex items-center justify-between">
                  <p className="text-red-400 font-semibold">[ERRO 500] Falha no gateway de pagamento</p>
                  <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Crítico</span>
                </div>
                
                <p className="text-zinc-400">Origem: <span className="text-zinc-200">API de Checkout (PIX/Cartão)</span></p>
                <p className="text-zinc-400">Tempo de inatividade: <span className="text-zinc-200">42 minutos</span></p>
                
                <div className="p-3 my-2 rounded bg-red-950/40 border border-red-900/50 text-red-200 flex justify-between items-center">
                  <span>Perda estimada no período:</span>
                  <span className="font-bold text-red-400 text-sm">R$ 14.280,00</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] pt-1">
                  <span>✓</span>
                  <span>Solução sugerida pronta para aplicação</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 text-left space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Como funciona a plataforma?
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                O BugCost cruza a taxa de erro e a duração da instabilidade com a receita estimada por minuto da sua operação. O resultado é um indicador claro para tomada de decisão técnica e executiva.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Insira os dados do seu ecossistema, faça o upload dos logs e receba um relatório completo com priorização de severidade e código para correção imediata.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO DIFERENCIAL */}
        <section id="diferencial" className="pb-24 px-6 max-w-7xl mx-auto scroll-mt-28">
          <div className="p-8 md:p-12 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 text-left space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Nosso Diferencial 
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Sistemas tradicionais de monitoramento apontam falhas técnicas, mas ignoram a linguagem dos negócios. O BugCost conecta engenharia e finanças na mesma métrica.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Priorize gargalos baseando-se no verdadeiro impacto financeiro que cada bug causa à sua operação.
              </p>
            </div>

            {/* 2 CARDS FINOS COMPARATIVOS */}
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950 shadow-lg space-y-3">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                  Ferramenta Tradicional
                </span>
                <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 font-mono text-[11px] text-zinc-400 leading-snug">
                  NullPointerException em PagamentoService.java:142
                </div>
                <p className="text-xs text-zinc-500">
                  Mostra apenas onde o código quebrou, sem impacto direto.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-blue-900/50 bg-blue-950/20 shadow-lg space-y-3">
                <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block">
                  Visão BugCost
                </span>
                <div className="p-2.5 rounded bg-blue-900/20 border border-blue-800/40 text-xs text-blue-200 font-semibold flex flex-col gap-1">
                  <span className="text-[10px] text-blue-300">Prejuízo em Tempo Real</span>
                  <span className="text-red-400 font-bold text-sm">- R$ 340,00 por minuto</span>
                </div>
                <p className="text-xs text-blue-200/70">
                  Traduz o erro técnico em custo real para a tomada de decisão.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 pt-12 pb-8 px-6 text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="BugCost Logo" 
              width={140} 
              height={40} 
              className="h-12 w-auto rounded-xl ml-6" 
              priority 
            />
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <a href="https://www.linkedin.com/in/ana-pereira-dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/AnaClara-S-Pereira" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="mailto:pereira.anaclara1303@gmail.com" className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Contato</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 text-center md:text-right">
          <p className="text-xs text-zinc-600">
            © 2026 Desenvolvido por Ana Clara Pereira. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}