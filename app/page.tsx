"use client";

import { BookOpenCheck, SearchCheck, ArrowRight, Mail, DollarSign, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-zinc-950 select-none text-white min-h-screen selection:bg-[#1f4693] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* MENU DE NAVEGAÇÃO: LOGO, LINKS DAS SEÇÕES E BOTÃO PARA ANALISAR LOGS */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="w-full flex items-center justify-between bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-700/50 px-6 sm:px-10 py-5 shadow-lg shadow-black/30">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="BugCost" width={32} height={32} className="h-8 w-auto rounded-md" />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Bug<span className="text-[#3b82f6] ml-0.5">Cost</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 sm:gap-8 text-sm">
            <a href="#como-funciona" className="relative text-zinc-400 font-medium hover:text-white transition-colors hidden sm:block after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#3b82f6] after:transition-all hover:after:w-full">
              Como funciona
            </a>
            <a href="#diferencial" className="relative text-zinc-400 font-medium hover:text-white transition-colors hidden sm:block after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#3b82f6] after:transition-all hover:after:w-full">
              Diferencial
            </a>
            <Link
              href="/enviar"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#1f4693] hover:bg-[#2755b3] text-white rounded-full transition-all shadow-md shadow-blue-600/30 hover:shadow-blue-500/40"
            >
              Analisar Logs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* TOPO DA PÁGINA: TÍTULO PRINCIPAL, VÍDEO DE FUNDO E BOTÃO PARA CALCULAR */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-zinc-950 text-white">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-right opacity-20"
          >
            <source src="/header.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full font-sans">
          <div className="max-w-3xl flex flex-col items-start text-left">
            <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
              Descubra o impacto <br />
              financeiro dos bugs no <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                seu negócio.
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
              Converta logs de erro em métricas de prejuízo real. Saiba exatamente quanto cada falha custa por minuto e receba soluções prontas para produção.
            </p>

            <div className="mt-6 sm:mt-8 w-full sm:w-auto">
              <Link
                href="/enviar"
                className="group w-full sm:w-auto justify-center inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 bg-[#1f4693] hover:bg-[#183775] text-white font-semibold rounded-3xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-[1.02]"
              >
                <span>Calcular Prejuízo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="text-zinc-100">

        {/* CARDS COM OS 3 BENEFÍCIOS DO SITE */}
        <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">

            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-blue-500/40 hover:-translate-y-1 hover:bg-zinc-900/70 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 sm:mb-6">
                <SearchCheck className="text-blue-400 w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Encontre o erro sem complicação
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Não perca tempo lendo milhares de linhas de log. A gente aponta exatamente onde o código quebrou e o que causou o problema.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-blue-500/40 hover:-translate-y-1 hover:bg-zinc-900/70 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 sm:mb-6">
                <DollarSign className="text-emerald-400 w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Saiba quanto dinheiro você perdeu
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Calculamos o prejuízo em reais cruzando os minutos que o sistema ficou fora do ar com o quanto a sua empresa fatura.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-blue-500/40 hover:-translate-y-1 hover:bg-zinc-900/70 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 sm:mb-6">
                <BookOpenCheck className="text-indigo-400 w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Receba o código pronto pra arrumar
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Além de mostrar o erro e o prejuízo, geramos a solução pronta para você copiar, colar e resolver o problema na hora.
              </p>
            </div>

          </div>
        </section>

        {/* EXPLICAÇÃO DE COMO O SITE FUNCIONA, COM UM EXEMPLO DE RESULTADO */}
        <section id="como-funciona" className="pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
          <div className="p-6 sm:p-8 md:p-12 rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/60 to-zinc-950 flex flex-col gap-8">
            <div className="w-full text-left space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Como funciona a plataforma?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                O BugCost cruza a taxa de erro e a duração da instabilidade com a receita estimada por minuto da sua operação. O resultado é um indicador claro para tomada de decisão técnica e executiva.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                Insira os dados do seu ecossistema, faça o upload dos logs e receba um relatório completo com priorização de severidade e código para correção imediata.
              </p>
            </div>

            <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 font-mono text-xs shadow-2xl shadow-blue-900/20 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80 text-zinc-500">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>Monitoramento de Falhas em Tempo Real</span>
              </div>

              <div className="space-y-2 text-zinc-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <p className="text-red-400 font-semibold text-[11px] sm:text-xs">[ERRO 500] Falha no gateway de pagamento</p>
                  <span className="w-fit text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Crítico</span>
                </div>

                <p className="text-zinc-400">Origem: <span className="text-zinc-200">API de Checkout (PIX/Cartão)</span></p>
                <p className="text-zinc-400">Tempo de inatividade: <span className="text-zinc-200">42 minutos</span></p>

                <div className="p-3 my-2 rounded bg-red-950/40 border border-red-900/50 text-red-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-xs">Perda estimada no período:</span>
                  <span className="font-bold text-red-400 text-sm">R$ 14.280,00</span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] pt-1">
                  <span>✓</span>
                  <span>Solução sugerida pronta para aplicação</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* COMPARAÇÃO ENTRE UMA FERRAMENTA COMUM E O BUGCOST */}
        <section id="diferencial" className="pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
          <div className="p-6 sm:p-8 md:p-12 rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/60 to-zinc-950 flex flex-col gap-8">
            <div className="w-full text-left space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Por que usar o BugCost?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                Outras ferramentas mostram apenas erros em código que só desenvolvedores entendem. O BugCost vai além: traduzimos esses erros em reais para que todo mundo na empresa entenda a gravidade do problema.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                Assim, sua equipe sabe exatamente qual bug arrumar primeiro, focando no que realmente está fazendo a empresa perder dinheiro.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950 shadow-lg space-y-3">
                <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                  Ferramenta Tradicional
                </span>
                <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 font-mono text-[11px] text-zinc-400 leading-snug break-all">
                  NullPointerException em PagamentoService.java:142
                </div>
                <p className="text-xs text-zinc-500">
                  Apenas mostra onde o código travou, deixando você no escuro sobre o prejuízo real.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-blue-900/50 bg-blue-950/20 shadow-lg space-y-3">
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-400 uppercase tracking-wider block">
                  Visão BugCost
                </span>
                <div className="p-3 rounded bg-blue-900/20 border border-blue-800/40 text-xs text-blue-200 font-semibold flex flex-col gap-1">
                  <span className="text-[10px] text-blue-300">Prejuízo em Tempo Real</span>
                  <span className="text-red-400 font-bold text-sm sm:text-base">- R$ 340,00 por minuto</span>
                </div>
                <p className="text-xs text-blue-200/70">
                  Traduz o erro técnico em custo real para acelerar a tomada de decisão.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      {/* RODAPÉ: LOGO, LINKS DE CONTATO E DIREITOS AUTORAIS */}
      <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 pt-10 pb-8 px-4 sm:px-6 text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="BugCost Logo"
              width={140}
              height={40}
              className="h-10 sm:h-12 w-auto rounded-xl object-contain"
              priority
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-zinc-400">
            <a href="https://www.linkedin.com/in/ana-pereira-dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/AnaClara-S-Pereira" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="mailto:pereira.anaclara1303@gmail.com" className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3.5 py-2 rounded-lg text-zinc-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Contato</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-zinc-600 gap-2">
          <p>© 2026 BugCost. Todos os direitos reservados.</p>
          <p>Desenvolvido por Ana Clara Pereira.</p>
        </div>
      </footer>

    </div>
  );
}