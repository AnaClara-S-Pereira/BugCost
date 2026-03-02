"use client";
import {
  FormEvent,
  ReactHTMLElement,
  useState,
  useEffect,
  ReactElement,
} from "react";
import { useRouter } from "next/navigation";
import { Upload, DollarSign } from "lucide-react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Hub() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [valor, setValor] = useState("");
  const router = useRouter();

  useEffect(() => {
    const salvo = localStorage.getItem("bugcostFaturamento");
    if (salvo) setValor(salvo);
  }, []);

  const Calcular = async (e: React.FormEvent) => {
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
    <div className="flex justify-center items-center">
      <main className="  text-slate-50 flex flex-col items-center justify-center p-8 overflow-hidden relative min-h-screen min-w-screen bg-gradient-to-r from-gray-800 to-zinc-900">
        <div className="w-full flex justify-start ml-30">
          <button className="-mb-2 text-zinc-400  hover:text-white transition-colors ml-20">
            <ArrowLeft
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer"
              width={30}
              height={30}
            />
          </button>
        </div>
        <div className=" p-20 border border-zinc-300/10 rounded-4xl w-150 shadow-2xl shadow-slate-900 transition-shadow duration-300 cursor-pointer">
          <header className="text-center -mt-4 mb-5">
            <h1 className="text-2xl mb-4">
              BUG<span className="text-blue-500 tracking-tight">COST</span>
            </h1>
            <p className="text-sm text-zinc-400 tracking-widest uppercase">
              Avaliação do arquivo
            </p>
          </header>
          <form onSubmit={Calcular}>
            <div className="space-y-2 grid grid-row-2">
              <label className="tracking-wide ml-1 text-zinc-300 text-slate-400 font-medium text-sm">
                Faturamento Mensal
              </label>
              <input
                type="number"
                className=" p-3 border border-white/10 focus:outline-none focus:border-blue-600 focus:backdrop-blur-3xl rounded-xl"
                placeholder="Ex: 1000"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              ></input>
            </div>
            <label className="border border-dashed border-zinc-600 p-10 flex flex-col justify-center items-center rounded-2xl mt-4 mb-4 cursor-pointer hover:border-zinc-300 duration-400 transition-colors">
              <Upload className="mb-2 size-7"></Upload>
              <span className="">
                {arquivo ? arquivo.name : "Selecione o arquivo .log"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              />
            </label>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className=" bg-blue-950 rounded-xl p-3 w-50 tracking-wide flex justify-center items-center gap-2 mt-4 cursor-pointer hover:bg-blue-900 hover:scale-110 duration-300"
              >
                Analizar prejuízo <ArrowRight size={18}></ArrowRight>{" "}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
