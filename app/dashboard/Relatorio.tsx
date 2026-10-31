"use client";

import { useRef, useState } from "react";
import { Download, X } from "lucide-react";

// RELATÓRIO PARA VER NA TELA E BAIXAR EM PDF
// OS ESTILOS FICAM EM style={{}} COM CORES HEX PORQUE O GERADOR DE PDF
// NÃO ENTENDE AS CORES DO TAILWIND

type Props = {
  dados: any;
  faturamento: number;
  fechar: () => void;
};

const azul = "#1f4693";
const vermelho = "#dc2626";
const cinza = "#52525b";
const borda = "#e4e4e7";

const titulo = {
  fontSize: 13,
  fontWeight: 700,
  color: azul,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
  margin: "0 0 8px",
};

export default function Relatorio({ dados, faturamento, fechar }: Props) {
  const folhaRef = useRef<HTMLDivElement>(null);
  const [gerando, setGerando] = useState(false);

  const data = new Date().toLocaleDateString("pt-BR");
  const valorMinuto = (faturamento / 43200).toFixed(2);

  const codigo = String(dados?.codigoSugestao || "").replace(/```\w*/g, "").trim();

  // GERA O PDF A PARTIR DA FOLHA BRANCA QUE APARECE NA TELA
  async function baixarPdf() {
    if (!folhaRef.current) return;
    setGerando(true);

    const html2pdf = (await import("html2pdf.js")).default;

    const opcoes: any = {
      margin: 10,
      filename: "relatorio-bugcost.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"], avoid: ".evitar-quebra" },
    };

    await html2pdf().set(opcoes).from(folhaRef.current).save();

    setGerando(false);
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col">
      {/* BARRA DE CIMA COM O BOTÃO DE BAIXAR (NÃO ENTRA NO PDF) */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-zinc-950">
        <h2 className="font-bold text-white">Pré-visualização do relatório</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={baixarPdf}
            disabled={gerando}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            <Download size={16} />
            {gerando ? "Gerando..." : "Baixar PDF"}
          </button>
          <X onClick={fechar} className="cursor-pointer text-zinc-400 hover:text-white" />
        </div>
      </div>

      {/* FOLHA BRANCA DO RELATÓRIO: TUDO QUE ESTÁ AQUI VAI PARA O PDF */}
      <div className="flex-1 overflow-auto p-4 sm:p-8">
        <div
          ref={folhaRef}
          style={{
            width: 780,
            margin: "0 auto",
            background: "#ffffff",
            color: "#18181b",
            padding: 40,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `3px solid ${azul}`,
              paddingBottom: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/logo.png" alt="BugCost" style={{ height: 36 }} />
              <span style={{ fontSize: 22, fontWeight: 700 }}>
                Bug<span style={{ color: azul }}>Cost</span>
              </span>
            </div>
            <div style={{ textAlign: "right", color: cinza, fontSize: 12 }}>
              <div style={{ fontWeight: 700, color: "#18181b", fontSize: 14 }}>
                Relatório de Impacto Financeiro
              </div>
              <div>Gerado em {data}</div>
            </div>
          </div>

          <div
            className="evitar-quebra"
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderLeft: `6px solid ${vermelho}`,
              padding: "18px 22px",
              marginBottom: 20,
            }}
          >
            <div style={{ color: cinza, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>
              Prejuízo estimado
            </div>
            <div style={{ color: vermelho, fontSize: 38, fontWeight: 700 }}>
              R$ {dados?.prejuizoEstimado}
            </div>
          </div>

          <div className="evitar-quebra" style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {[
              ["Fora do ar", `${dados?.downtimeMinutos ?? "-"} min`],
              ["Erros encontrados", dados?.errosEncontrados],
              ["Nível de risco", dados?.nivelRisco],
              ["Valor por minuto", `R$ ${valorMinuto}`],
            ].map(([nome, valor]) => (
              <div
                key={String(nome)}
                style={{ flex: 1, border: `1px solid ${borda}`, padding: "10px 12px" }}
              >
                <div style={{ color: cinza, fontSize: 11 }}>{nome}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{valor}</div>
              </div>
            ))}
          </div>

          <div className="evitar-quebra" style={{ marginBottom: 22 }}>
            <h3 style={titulo}>Resumo</h3>
            <p style={{ margin: 0 }}>{dados?.explicacao}</p>
          </div>

          <div className="evitar-quebra" style={{ marginBottom: 22 }}>
            <h3 style={titulo}>Impacto no negócio</h3>
            <p style={{ margin: 0 }}>{dados?.impactoDireto}</p>
            <p style={{ margin: "8px 0 0", color: cinza, fontSize: 12 }}>
              Cálculo: faturamento mensal de R$ {faturamento.toLocaleString("pt-BR")} ÷ 43.200
              minutos = R$ {valorMinuto} por minuto, multiplicado por {dados?.downtimeMinutos ?? 0}{" "}
              minutos fora do ar.
            </p>
          </div>

          <div style={{ marginBottom: 22 }}>
            <h3 style={titulo}>Erros encontrados</h3>
            {dados?.listaDeErros?.map((erro: string, i: number) => (
              <div
                key={i}
                className="evitar-quebra"
                style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${borda}` }}
              >
                <span style={{ color: azul, fontWeight: 700 }}>{i + 1}.</span>
                <span>{erro}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={titulo}>Correção sugerida</h3>
            <pre
              style={{
                background: "#f4f4f5",
                border: `1px solid ${borda}`,
                padding: 14,
                margin: 0,
                fontFamily: "Consolas, monospace",
                fontSize: 11,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {codigo}
            </pre>
          </div>

          <div
            style={{
              borderTop: `1px solid ${borda}`,
              paddingTop: 10,
              color: "#a1a1aa",
              fontSize: 10,
              textAlign: "center",
            }}
          >
            Relatório gerado pelo BugCost. Os valores são estimativas feitas a partir do log enviado.
          </div>
        </div>
      </div>
    </div>
  );
}
