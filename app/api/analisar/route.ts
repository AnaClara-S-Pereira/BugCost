import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY || "" });

// MODELOS DE IA: SE UM DER ERRO (EX: LIMITE DE USO), TENTA O PRÓXIMO DA LISTA
const MODELOS = [
  "mistral-small-latest",
  "ministral-8b-latest",
  "open-mistral-nemo",
];

const PROMPT = `Aja como Engenheiro SRE. Analise o log e retorne APENAS um JSON.
Estime o 'downtimeMinutos' baseando-se no tempo entre o primeiro e último erro.

Regras: todos os campos de texto devem ser uma string simples, em português,
sem objetos, sem listas dentro do texto e sem usar asteriscos ou markdown.

Formato:
{
 "downtimeMinutos": 0,
 "errosEncontrados": 0,
 "explicacao": "Resumo técnico em um parágrafo, falando quanto tempo o sistema ficou fora do ar e o que isso está causando.",
 "listaDeErros": ["Erro 1", "Erro 2"],
 "codigoSugestao": "Código corrigido explicando onde e como resolver, com quebras de linha.",
 "nivelRisco": "Baixo, Moderado ou Alto",
 "impactoDireto": "Impacto no negócio"
}`;

// GARANTE QUE O VALOR SEJA TEXTO E TIRA OS ASTERISCOS QUE A IA COLOCA
function limparTexto(valor: unknown) {
  const texto = typeof valor === "string" ? valor : JSON.stringify(valor ?? "");
  return texto.replace(/\*/g, "");
}

// ENVIA O LOG PARA A IA E DEVOLVE O JSON DA ANÁLISE
async function chamarIA(logTexto: string) {
  for (const model of MODELOS) {
    try {
      const resposta = await client.chat.complete({
        model,
        temperature: 0,
        messages: [
          { role: "system", content: PROMPT },
          { role: "user", content: `Log: ${logTexto}` },
        ],
        responseFormat: { type: "json_object" },
      });

      const conteudo = resposta.choices?.[0]?.message?.content;
      return JSON.parse(typeof conteudo === "string" ? conteudo : "{}");
    } catch (error) {
      console.error(`Modelo ${model} falhou:`, error);
    }
  }
  throw new Error("Todos os modelos falharam");
}

// ROTA /api/analisar: RECEBE O LOG E O FATURAMENTO, CALCULA O PREJUÍZO E RESPONDE
export async function POST(request: Request) {
  try {
    const { logTexto, faturamento } = await request.json();

    if (!logTexto) {
      return NextResponse.json({ error: "Log vazio" }, { status: 400 });
    }

    // Faturamento mensal / 43.200 minutos por mês (30 dias * 24h * 60min)
    const valorMinuto = (parseFloat(faturamento) || 0) / 43200;

    const dadosIA = await chamarIA(logTexto);
    const minutos = Number(dadosIA.downtimeMinutos) || 0;
    const prejuizoFinal = (minutos * valorMinuto).toFixed(2);

    return NextResponse.json({
      ...dadosIA,
      explicacao: limparTexto(dadosIA.explicacao),
      impactoDireto: limparTexto(dadosIA.impactoDireto),
      codigoSugestao: limparTexto(dadosIA.codigoSugestao),
      prejuizoEstimado: prejuizoFinal,
    });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json({ error: "Falha na análise" }, { status: 500 });
  }
}
