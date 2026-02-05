"use client";
import { ChartNoAxesCombined, SearchCheck, OctagonAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DotLottiePlayer } from "@dotlottie/react-player";

export default function LandingPage() {
  return (
    <div className="">
      <main className="min-h-screen pt-20 bg-zinc-950 text-slate-50 flex flex-col items-center justify-center p-8 overflow-hidden relative">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        {/*NAVBAR*/}
        <nav className="fixed top-0 left-0 w-full z-50 border border-white/5 bg-zinc-950/50 backdrop-blur-md ">
          <div className="flex items-center justify-between px-6">
            <span className="flex items-center cursor-pointer">
              <Image
                src="/logoOfc.png"
                alt="Logo BugCost"
                width={40}
                height={40}
                className="object-contain"
              />
            </span>

            <div className="flex items-center mr-7 h-15 justify-end gap-8 text-sm text-slate-400">
              <a
                href="#como-funciona"
                className="hover:text-white transition-colors"
              >
                Como funciona
              </a>
              <a
                href="#diferencial"
                className="hover:text-white transition-colors"
              >
                Diferencial
              </a>
              <a href="#contato" className="hover:text-white transition-colors">
                Contato
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl text-center space-y-12 z-10">
          <h1 className="text-7xl md:text-8xl font-black tracking-wide text-fuchsia-50">
            BugCost
          </h1>

          <p className="text-xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Traduza erros técnicos em prejuízo real. Suba seu arquivo, informe
            seu faturamento e deixe nosso site calcular
            <span className="text-emerald-400 font-medium">
              {" "}
              o impacto financeiro{" "}
            </span>
            de cada falha no seu sistema.
          </p>

          <div className="mt-16 w-full cursor-pointer gap-6 grid grid-cols-1 md: grid-cols-3">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl border border-white/2 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 text-left space-y-4">
              <OctagonAlert className="text-emerald-500 w-8 h-8" />
              <h3 className="text-lg font-bold">Cálculo de prejuízo</h3>
              <p className="text-sm text-slate-400">
                Entenda exatamente quais falhas seu projeto possuí e quanto cada
                falha custa para o seu bolso.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl border border-white/2 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 text-left space-y-4">
              <SearchCheck className="text-emerald-500 w-8 h-8" />
              <h3 className="text-lg font-bold">Avaliação de código</h3>
              <p className="text-sm text-slate-400">
                Foi usado o Llama 3 para analisar seu arquivo e sugerir a
                correção exata em segundos.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl border border-white/2 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 text-left space-y-4">
              <ChartNoAxesCombined className="text-emerald-500 w-8 h-8" />
              <h3 className="text-lg font-bold">Dashboard de resultados</h3>
              <p className="text-sm text-slate-400">
                Painel limpo com o valor do prejuízo, o que causou o erro e o
                código corrigido.
              </p>
            </div>
          </div>

          {/* Seção "Como Funciona" */}
          <section id="como-funciona" className="items-start scroll-mt-40">
            <div className="flex flex-col items-start md:flex-row ">
              <div className="md:w-1/2 cursor-pointer">
                <DotLottiePlayer
                  src="/AnimaBot.lottie"
                  autoplay
                  loop
                  className="bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
              <div className="flex flex-col text-left pl-12 pt-5 md:w-1/2">
                <h1 className="font-bold text-5xl tracking-wide pb-5  text-zinc-300">
                  COMO FUNCIONA?
                </h1>
                <p className="text-zinc-400 leading-relaxed">
                  É analisado os erros do sistema junto ao faturamento do site
                  para mostrar exatamente quanto <strong>dinheiro</strong> você
                  <strong> perde </strong> por erros de código, permitindo focar
                  no que realmente impacta seu lucro.
                </p>

                <p className="text-zinc-400 leading-relaxed">
                  Para começar, informe o faturamento da sua operação e cole o
                  <strong> relatório de erros</strong> ou o log do seu servidor.
                  Nossa inteligência analisa os registros em segundos,
                  calculando o impacto financeiro exato e entregando a solução
                  técnica para você resolver o problema imediatamente.
                </p>
              </div>
            </div>
          </section>

          {/* Seção "Diferencial" */}
          <section id="diferencial" className="items-start scroll-mt-60">
            <div className="flex flex-col items-start md:flex-row ">
              <div className="flex flex-col text-left pl-12 pt-5 md:w-3xl">
                <h1 className="font-bold text-5xl tracking-wide pb-5 text-zinc-300">
                  NOSSO DIFERENCIAL
                </h1>
                <p className="text-zinc-400 leading-relaxed">
                  O <strong> BugCost </strong>calcula o prejuízo real. A
                  ferramenta cruza o tempo em que o site ficou instável com o
                  faturamento da operação, mostrando exatamente quanto dinheiro
                  foi perdido. Assim, em vez de apenas corrigir códigos, o foco
                  se volta para resolver as falhas que mais impactam o bolso e o
                  retorno do negócio.
                </p>
              </div>

              <div className="md:w-1/3 cursor-pointer relative bottom-9">
                <DotLottiePlayer
                  src="/moeda.lottie"
                  autoplay
                  loop
                  className="bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
            </div>
          </section>

          {/* Botão */}
          <div className="pb-20">
            <Link
              href="/hub"
              className="px-30 py-4 bg-emerald-500 hover:bg-emerald-700 text-zinc-950 font-bold rounded-full transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              Comece agora
            </Link>
          </div>
        </div>

        {/*FOOTER*/}
      </main>
      <footer className="w-full bg-zinc-900 py-6 px-10">
        <div className=" grid grid-cols-2">
          <h1 className="tracking-wide text-3xl text-blue-200 flex justify-start pl-8 pt-2 font-bold bg-gradient-to-r from-emerald-800 to-emerald-500 to-emerald-200 text-transparent bg-clip-text hover:  from-emerald-400 to-emerald-600 cursor-pointer ">
            BugCost
          </h1>
          {/* Contato */}
          <div className="flex gap-6 items-center flex justify-end">
            <a
              href="URL_DO_LINKEDIN"
              target="_blank"
              className="text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="URL_DO_GITHUB"
              target="_blank"
              className="text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              GitHub
            </a>
            <span className="text-zinc-700">|</span>
            <p className="text-zinc-500 text-sm">
              pereira.anaclara1303@gmail.com
            </p>
          </div>
        </div>
        <p className="text-zinc-600 text-xs flex justify-end">
          © 2026 Desenvolvido por Ana Clara Pereira. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
