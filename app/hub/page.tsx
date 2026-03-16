"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowRight, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 to-zinc-900 text-slate-50">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Botão Voltar */}
        <div className="w-full max-w-xl mb-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-zinc-400 hover:text-white transition-colors p-2"
          >
            <ArrowLeft width={30} height={30} />
          </button>
        </div>

        {/* Card Principal*/}
        <div className="w-full max-w-xl p-6 md:p-12 border border-zinc-300/10 rounded-3xl md:rounded-[3rem] bg-zinc-900/50 backdrop-blur-sm shadow-2xl transition-all duration-300">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              BUG<span className="text-blue-500 tracking-tight">COST</span>
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 tracking-widest uppercase">
              Avaliação do arquivo
            </p>
          </header>

          <form onSubmit={Calcular} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="tracking-wide ml-1 text-zinc-400 font-medium text-sm">
                Faturamento Mensal
              </label>
              <input
                type="number"
                className="w-full p-4 bg-transparent border border-white/10 focus:outline-none focus:border-blue-600 rounded-xl transition-all"
                placeholder="Ex: 1000"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

            <label className="border-2 border-dashed border-zinc-600 p-8 md:p-12 flex flex-col justify-center items-center rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all group">
              <Upload className="mb-3 size-8 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm md:text-base text-center break-all">
                {arquivo ? arquivo.name : "Selecione o arquivo .log"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".log,text/plain"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              />
            </label>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8 py-4 flex justify-center items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                Analisar prejuízo <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
