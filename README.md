# BugCost

> Traduzindo falhas técnicas e instabilidades em impacto financeiro real para o seu negócio.

## Sobre o Projeto

Durante o desenvolvimento e a manutenção de softwares, é comum que desenvolvedores lidem com logs extensos de erro cheios de *stack traces* complexos. No entanto, para gerentes de produto, diretores e times de negócio, um log de erro por si só não comunica a urgência do problema.

O **BugCost** foi criado para resolver essa lacuna de comunicação entre o time técnico e a área de negócios. Em vez de apenas emitir alertas técnicos, a plataforma analisa arquivos de log de erros, calcula o tempo de inatividade (*downtime*) do sistema e cruza essas informações com a taxa de faturamento da empresa. 

O resultado é um diagnóstico claro que mostra quanto dinheiro a empresa perdeu enquanto a falha esteve ativa, qual a gravidade da métrica e qual o trecho de código exato necessário para corrigir o problema.

## O Problema que Resolvemos

1. **Falta de visibilidade financeira:** Times de produto muitas vezes não sabem qual bug deve ser priorizado primeiro.
2. **Perda de tempo em diagnósticos:** Analisar arquivos de logs extensos manualmente consome horas da equipe de engenharia.
3. **Ruído de comunicação:** Dificuldade em justificar investimentos em infraestrutura e refatoração para partes interessadas (*stakeholders*).

## Como Funciona

1. **Entrada de Dados:** O usuário informa a taxa de faturamento por hora ou minuto da aplicação e envia o arquivo de log.
2. **Processamento e Análise:** A aplicação faz a leitura do arquivo, identifica o tipo de exceção, o tempo inicial e final da instabilidade e a severidade do erro.
3. **Métrica de Prejuízo:** O algoritmo calcula o tempo total fora do ar e multiplica pela taxa de faturamento informada.
4. **Relatório e Correção:** O dashboard exibe o impacto financeiro em tempo real e fornece a sugestão de código corrigido pronta para ser aplicada.

## Funcionalidades

- **Landing Page:** Apresentação clara do valor do produto e navegação intuitiva.
- **Dashboard de Gestão:** Visualização centralizada dos prejuízos calculados e métricas do sistema.
- **Leitura Automática de Logs:** Parser estruturado para processar arquivos de log de erros.
- **Algoritmo de Cálculo de Impacto:** Estimativa financeira exata com base em instabilidade e faturamento.
- **API Interna Otimizada:** Endpoints configurados no Next.js para processar os arquivos com velocidade e segurança.

## Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (Ícones)

## Pré-requisitos

Para rodar o projeto localmente, você precisará de:

- Node.js versão 18.0.0 ou superior
- Um gerenciador de pacotes (NPM, Yarn ou PNPM)

## Instalação e Execução

1. Clone o repositório:
```bash
git clone [https://github.com/AnaClara-S-Pereira/BugCost.git](https://github.com/AnaClara-S-Pereira/BugCost.git)