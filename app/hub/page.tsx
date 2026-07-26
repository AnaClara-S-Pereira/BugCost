"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowRight, ArrowLeft, Link, FileText } from "lucide-react";

export default function Hub() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [valor, setValor] = useState("");
  const router = useRouter();

  useEffect(() => {
    const salvo = localStorage.getItem("bugcostFaturamento");
    if (salvo) setValor(salvo);
  }, []);

  const Calcular = async (e: FormEvent) => {
    e.preventDefault();
    if (!valor || !arquivo) return alert("Preencha tudo!");

    const leitor = new FileReader();
    leitor.onload = async (evento) => {
      const textoDoLog = evento.target?.result as string;
      localStorage.setItem("BugcostLogTexto", textoDoLog);
      localStorage.setItem("bugcostFaturamento", valor);
      router.push("/dashboard");
    };
    leitor.readAsText(arquivo);
  };
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-[#1f4693] selection:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10">

        {/* CARD PRINCIPAL */}
        <div className="w-full max-w-xl p-8 md:p-12 border border-zinc-800 rounded-3xl bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50 transition-all duration-300">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-arial tracking-wide text-white mb-2">
              BUG<span className="text-blue-500">COST</span>
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 font-medium tracking-widest uppercase">
              Avaliação do arquivo
            </p>
          </header>
          <form onSubmit={Calcular} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-300 font-semibold text-sm ml-1">
                Faturamento Mensal (R$)
              </label>
              <input
                type="number"
                className="w-full p-4 bg-zinc-950/60 border border-zinc-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-white placeholder:text-zinc-600 font-medium transition-all"
                placeholder="Ex: 50000"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            {/*UPLOAD DE ARQUIVO */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-300 font-semibold text-sm ml-1">
                Arquivo de Log
              </label>
              <label className={`border-2 border-dashed p-8 flex flex-col justify-center items-center rounded-2xl cursor-pointer transition-all group ${
                arquivo 
                  ? "border-blue-500 bg-blue-500/10" 
                  : "border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800/40"
              }`}>
                {arquivo ? (
                  <FileText className="mb-3 size-8 text-blue-400" />
                ) : (
                  <Upload className="mb-3 size-8 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                )}
                
                <span className={`text-sm md:text-base text-center break-all font-medium ${
                  arquivo ? "text-blue-400" : "text-zinc-300"
                }`}>
                  {arquivo ? arquivo.name : "Selecione o arquivo .log"}
                </span>

                <span className="text-xs text-zinc-500 mt-1">
                  Suporta arquivos .log ou .txt
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept=".log,text/plain"
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* BOTÃO DE SUBMIT */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-4 flex justify-center items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-600/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Analisar prejuízo</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

