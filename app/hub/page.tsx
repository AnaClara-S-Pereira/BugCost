"use client";
import { FormEvent, ReactHTMLElement, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, DollarSign } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function Hub() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [valor, setValor] = useState("");
  const router = useRouter();

  const Calcular = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!valor || !arquivo) {
      alert("Preencha todos os campos!");
      return;
    }

    localStorage.setItem("bugcostFaturamento", valor);
    localStorage.setItem("BugcostArquivo", arquivo.name);
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center">
      <main className="  text-slate-50 flex flex-col items-center justify-center p-8 overflow-hidden relative min-h-screen min-w-screen bg-gradient-to-r from-gray-900 to-black">
        <div className="backdrop-blur-lg bg-white/4 p-20 border-white/20 rounded-4xl w-150">
          <div className="items-start ">
            <h1 className="text-xl font-bold -mt-12 items-center justify-center mb-10">
              AVALIAÇÃO DE CÓDIGO E FATURAMENTO
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="-mt-5 mb-5">Informe abaixo:</h3>
            <div className="grid grid-cols-2 gap-5 w-full items-center text-xl">
              <label>Faturamento Mensal</label>
              <div className="border border-zinc-600 rounded-e-sm p-2 hover:border-zinc-100 transition-colors">
                <input
                  type="number"
                  className=""
                  placeholder="Ex: 1000"
                ></input>
              </div>
            </div>
          </div>
          <label className="border border-dashed border-zinc-600 p-10 flex flex-col justify-center items-center rounded-2xl mt-4 mb-4 cursor-pointer hover:border-amber-50 transition-colors">
            <Upload className="mb-2 size-7"></Upload>
            <span className="">Selecione o arquivo .log</span>
          </label>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
          />
          <div className="items-center justify-center">
            <button className="grid grid-cols-2 bg-blue-950 rounded-xl p-3 w-full">
              Analizar prejuízo <ArrowRight size={18}></ArrowRight>{" "}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
