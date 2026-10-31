<h1>
  <img src="public/logo.png" alt="Logo do BugCost" width="40" align="center" />
  BugCost
</h1>

> Traduzindo falhas técnicas e instabilidades em impacto financeiro real para o seu negócio.

---

## Sobre o projeto

Durante o desenvolvimento e a manutenção de softwares, é comum lidar com logs de erro enormes, cheios de *stack traces* complexos. Para gerentes de produto, diretores e times de negócio, um log de erro sozinho não mostra a urgência do problema.

O **BugCost** foi criado para ligar o time técnico à área de negócios. A plataforma lê o arquivo de log, estima por quanto tempo o sistema ficou fora do ar e cruza esse tempo com o faturamento da empresa.

O resultado é um diagnóstico claro: **quanto dinheiro foi perdido**, **qual o nível de risco** e **qual código pode corrigir o problema**.

## O problema que resolvemos

- **Falta de visibilidade financeira:** o time de produto não sabe qual bug priorizar primeiro.
- **Diagnóstico demorado:** ler logs extensos manualmente consome horas da engenharia.
- **Ruído de comunicação:** é difícil justificar investimento em infraestrutura para quem decide.

## Como funciona

1. **Envio dos dados:** a pessoa informa o faturamento mensal da empresa e envia o arquivo de log (`.log` ou `.txt`).
2. **Análise:** uma IA lê o log, identifica os erros, estima os minutos fora do ar e classifica o risco.
3. **Cálculo do prejuízo:** o faturamento mensal é dividido por 43.200 (minutos de um mês de 30 dias) e multiplicado pelos minutos fora do ar.
4. **Resultado:** o dashboard mostra o prejuízo, os erros, o risco e a correção sugerida. Dá para exportar tudo em um relatório em PDF.

```text
prejuízo = (faturamento mensal ÷ 43.200) × minutos fora do ar
```

## Funcionalidades

- **Página inicial:** apresenta o produto e leva direto para a análise.
- **Envio do log:** formulário com faturamento e upload do arquivo. O faturamento digitado fica salvo para a próxima análise.
- **Dashboard:** mostra prejuízo, quantidade de erros, tempo fora do ar, nível de risco, resumo e impacto no negócio.
- **Painel de erros:** lista os erros encontrados e o código de correção sugerido.
- **Relatório em PDF:** tem pré-visualização na tela e pode ser baixado para enviar a gestores.
- **API com plano reserva:** se um modelo de IA estiver indisponível ou com limite de uso, a API tenta o próximo da lista.

## Tecnologias

- **Framework:** Next.js 16 (App Router) e React 19
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS 4
- **IA:** Mistral AI (`@mistralai/mistralai`)
- **Ícones:** Lucide React
- **Código sugerido:** React Markdown
- **Relatório em PDF:** html2pdf.js

## Como rodar localmente

### Pré-requisitos

- Node.js 20 ou superior
- NPM, Yarn ou PNPM
- Uma chave de API da [Mistral AI](https://console.mistral.ai/)

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/AnaClara-S-Pereira/BugCost.git
cd BugCost
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env.local` na raiz do projeto com a sua chave:

```env
MISTRAL_API_KEY=sua_chave_aqui
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Outros comandos

- `npm run build`: gera a versão de produção
- `npm run start`: roda a versão de produção
- `npm run lint`: verifica o código com o ESLint
