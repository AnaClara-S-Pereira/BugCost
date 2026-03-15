import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY || "" });

export async function POST(request: Request) {
  try {
    const { logTexto, faturamento } = await request.json();
    // Cálculo da taxa por minuto (Faturamento / 30 dias / 24h / 60min)
    const valorMinuto = (parseFloat(faturamento) || 0) / 43200; //43.200 => minutos por mês.
    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `Aja como Engenheiro SRE. Analise o log e retorne APENAS um JSON.
          Estime o 'downtimeMinutos' baseando-se no tempo entre o primeiro e último erro.

          Formato:
          {
           "downtimeMinutos": 0,
           "errosEncontrados": 0,
           "explicacao": "Resumo técnico detalhado, falando quanto tempo o sistema ficou fora do ar e oque isso está causando.",
           "listaDeErros": ["Erro 1", "Erro 2"],
           "codigoSugestao": "Código corrigido detalhado falando onde e como resolver cada coisa com quebra de linha.",
           "nivelRisco": "Baixo, Moderado ou Alto",
           "impactoDireto": "Impacto no negócio"
          }`,
        },
        { role: "user", content: `Log: ${logTexto}` },
      ],
      responseFormat: { type: "json_object" },
    });

    const resposta = chatResponse.choices?.[0]?.message?.content;
    const dadosIA = JSON.parse(typeof resposta === "string" ? resposta : "{}");

    // Mostrar minutos em downtime e fixar 2 casas decimais no prejuízo.
    const minutos = dadosIA.downtimeMinutos || 0;
    const prejuizoFinal = (minutos * valorMinuto).toFixed(2);

    return NextResponse.json({
      ...dadosIA,
      prejuizoEstimado: prejuizoFinal,
    });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json({ error: "Falha na análise" }, { status: 500 });
  }
}
