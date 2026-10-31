"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowRight, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function Hub() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [valor, setValor] = useState("");
  const router = useRouter();

  // PREENCHE O FATURAMENTO COM O ÚLTIMO VALOR QUE A PESSOA JÁ DIGITOU
  useEffect(() => {
    const salvo = localStorage.getItem("bugcostFaturamento");
    if (salvo) setValor(salvo);
  }, []);

  // LÊ O ARQUIVO DE LOG, SALVA OS DADOS NO NAVEGADOR E VAI PARA O DASHBOARD
  const calcular = (e: FormEvent) => {
    e.preventDefault();
    if (!valor || !arquivo) return alert("Preencha tudo!");

    const leitor = new FileReader();
    leitor.onload = (evento) => {
      const textoDoLog = evento.target?.result as string;
      localStorage.setItem("BugcostLogTexto", textoDoLog);
      localStorage.setItem("bugcostFaturamento", valor);
      router.push("/dashboard");
    };
    leitor.readAsText(arquivo);
  };

  return (
    <div className="min-h-screen relative bg-zinc-950 text-zinc-100 font-sans selection:bg-[#1f4693] selection:text-white overflow-x-hidden">
      {/* FUNDO COM VÍDEO */}
      <div className="absolute inset-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
          <source src="/FundoCod.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950" />
      </div>

      <main className="relative z-10 min-h-screen max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <div className="flex-1 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-10">
          {/* LADO ESQUERDO: TÍTULO E PASSOS */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Quanto o seu bug <br />
              <span className="text-blue-500">custou?</span>
            </h1>
            <p className="mt-5 text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
              Informe o faturamento e envie o log. Em segundos você vê o prejuízo e a correção sugerida.
            </p>

            <ol className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full border border-blue-500/40 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </span>
                <span className="text-zinc-300">Digite o faturamento mensal da empresa</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full border border-blue-500/40 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </span>
                <span className="text-zinc-300">Envie o arquivo de log do erro</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full border border-blue-500/40 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0">
                  3
                </span>
                <span className="text-zinc-300">Veja o prejuízo e o código para corrigir</span>
              </li>
            </ol>
          </div>

          {/* LADO DIREITO: FORMULÁRIO COM FATURAMENTO E ARQUIVO DE LOG */}
          <div className="w-full max-w-md lg:ml-auto p-6 sm:p-8 border border-zinc-800 rounded-2xl bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50">
            <h2 className="text-xl font-bold mb-6">Avaliação do arquivo</h2>

            <form onSubmit={calcular} className="space-y-6">
              <div className="space-y-2">
                <label className="text-zinc-300 font-medium text-sm">
                  Faturamento mensal (R$)
                </label>
                <input
                  type="number"
                  className="w-full p-3.5 bg-zinc-950/60 border border-zinc-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-white placeholder:text-zinc-600 transition-all"
                  placeholder="Ex: 50000"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-300 font-medium text-sm">Arquivo de log</label>
                <label
                  className={`border-2 border-dashed p-6 flex flex-col justify-center items-center rounded-xl cursor-pointer transition-all group ${
                    arquivo
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-700 hover:border-blue-500/50 hover:bg-zinc-800/40"
                  }`}
                >
                  {arquivo ? (
                    <FileText className="mb-2 size-8 text-blue-400 shrink-0" />
                  ) : (
                    <Upload className="mb-2 size-8 text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  )}

                  <span className={`text-sm text-center break-all font-medium line-clamp-2 ${arquivo ? "text-blue-400" : "text-zinc-300"}`}>
                    {arquivo ? arquivo.name : "Clique para selecionar o arquivo"}
                  </span>

                  <span className="text-xs text-zinc-500 mt-1">Arquivos .log ou .txt</span>

                  <input
                    type="file"
                    className="hidden"
                    accept=".log,text/plain"
                    onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#1f4693] hover:bg-[#2755b3] text-white font-semibold rounded-xl py-3.5 flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                Analisar prejuízo
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
