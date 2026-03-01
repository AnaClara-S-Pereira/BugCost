import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { logTexto, faturamento } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Você é um Engenheiro Sênior de SRE. Analise o log e o faturamento de R$${faturamento}.

          REGRAS DE CÁLCULO REALISTA:
          1. Calcule o faturamento por hora: (Faturamento / 720).
          2. Estime o tempo de inatividade baseado no volume de erros no log.
          3. Multiplique o tempo pelo faturamento/hora para obter o "prejuizoEstimado".
          4. O "prejuizoEstimado" DEVE ser um número real (ex: 12,50) e NUNCA pode ser maior que R$ ${faturamento}.

          JSON:
          {
           "prejuizoEstimado": "valor_calculado_com_virgula",
           "errosEncontrados": total_de_erros,
           "explicacao": "Explique a matemática: 'X erros causaram Y horas de queda, resultando em R$ Z de perda. Explique detalhadamente tambem: oque os erros estão causando. Não cite os cálculos, apenas os valores'.",
           "listaDeErros": ["Erro 1", "Erro 2"],
           "codigoSugestao": "Código completo corrigido do início ao fim sem markdown.",
           "nivelRisco": "Baixo, Moderado ou Alto",
           "impactoDireto": "Impacto no faturamento ou operação"
           }`,
        },

        {
          role: "user",
          content: `Aqui está o log: ${logTexto}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const resposta = chatCompletion.choices[0].message.content;
    return NextResponse.json(JSON.parse(resposta || "{}"));
  } catch (error) {
    return NextResponse.json({ error: "Erro na análise" }, { status: 500 });
  }
}
