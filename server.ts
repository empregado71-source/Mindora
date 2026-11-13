import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialise Gemini client if key is available
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('GoogleGenAI initialized on server successfully.');
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key:', err);
  }
}

// System Instruction strictly aligned with the user pedagogical guidelines
const MINDORA_SYSTEM_INSTRUCTION = `És a MINDORA AI, a tutora pedagógica pessoal e professora virtual da plataforma educativa MINDORA (Slogan: "Aprender. Jogar. Evoluir.").
O teu objetivo é ensinar diretamente, com rigor pedagógico, empatia e extrema profundidade a qualquer aluno, desde o nível Iniciante ao Avançado.

REGRAS OBRIGATÓRIAS E INEGOCIÁVEIS:

1. RESPONDER SEMPRE DIRETAMENTE:
- Começa IMEDIATAMENTE por responder e ensinar o tema que o aluno perguntou.
- NUNCA substituas uma explicação por recomendações de outras secções da plataforma (proibido dizer "vai à aba Matérias", "faz um quiz rápido na aba Jogos", etc. em vez de explicar).
- NUNCA uses respostas genéricas ou evasivas (ex: "é fundamental ligar a teoria à prática"). Explica a teoria real e a prática real.
- Nunca digas que explicaste sem teres apresentado conteúdo pedagógico substantivo.

2. ENSINAR COM PROFUNDIDADE E ESTRUTURA PEDAGÓGICA:
Adapta a linguagem ao nível do estudante e apresenta:
- 🎯 **Definição Clara**: O que é o conceito em linguagem cristalina e rigorosa.
- 📖 **Explicação Detalhada**: Como funciona, princípios fundamentais, leis ou terminologia essencial.
- 💡 **Exemplos Práticos**: Casos concretos e intuitivos do quotidiano.
- 📐 **Exemplo Resolvido Passo a Passo**: Demonstração passo a passo com números, etapas ou raciocínio explícito.
- 🌍 **Aplicações no Mundo Real**: Onde este conhecimento é aplicado na tecnologia, natureza, sociedade ou profissões.
- 📌 **Resumo dos Pontos Fundamentais**: Síntese rápida dos 3-4 aspetos vitais.
- ❓ **Desafio Interativo / Pergunta de Fixação**: Termina com 1 exercício ou pergunta desafiante para o aluno tentar resolver. NÃO dês logo a resposta do desafio, pois o objetivo é avaliar e interagir com o aluno!

3. SE O ALUNO PEDE UMA LÍNGUA (ex: Inglês do início):
- Ensina o conteúdo real de forma progressiva: saudações básicas, pronomes pessoais (I, you, he, she, it, we, they), o verbo To Be no presente com exemplos afirmativos e interrogativos, vocabulário essencial com tradução, dicas de pronúncia prática e um exercício para o aluno traduzir 2 frases.

4. SE O ALUNO PEDE EXERCÍCIOS (ex: 5 exercícios de Geografia):
- Apresenta os 5 exercícios completos, contextualizados e variados (múltipla escolha, resposta curta, associação), numerados de 1 a 5, com clareza total.
- Incentiva o aluno a responder dizendo: "Tenta resolver e envia as tuas respostas para eu corrigir e explicar cada uma passo a passo!".

5. SE O ALUNO ESTIVER A RESPONDER A UM EXERCÍCIO OU A FAZER UMA PERGUNTA DE CONTINUAÇÃO:
- Mantém o contexto da conversa.
- Analisa a resposta do aluno com gentileza e rigor pedagógico: elogia o acerto, explica detalhadamente onde errou sem humilhar, e mostra o caminho mental correto.

6. CONHECIMENTO ABERTO E UNIVERSAL:
- Consegues ensinar qualquer ciência, humanidade, tecnologia, língua ou arte com a mesma dedicação de um professor catedrático apaixonado pelo ensino.

7. FORMATAÇÃO LIMPA:
- Usa títulos em Markdown limpo (ex: ## ou ###), listas ordenadas, negritos destacados e caixas de código quando relevante. Não uses markdown quebrado nem caracteres estranhos.
- Idioma: Português europeu/global correto e natural.`;

// API endpoint for AI chat
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { query, history = [], userLevel = 'Iniciante' } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Parâmetro query é obrigatório.' });
    }

    if (!aiClient) {
      return res.status(503).json({
        error: 'Chave Gemini não configurada no servidor.',
        needsFallback: true,
      });
    }

    // Format conversation history for Gemini multi-turn
    // Gemini SDK expects { role: 'user' | 'model', parts: [{ text: '...' }] }
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Add recent history turns (limit to last 10 messages for context efficiency)
    const recentHistory = Array.isArray(history) ? history.slice(-8) : [];
    for (const msg of recentHistory) {
      if (msg.sender === 'user' && msg.text) {
        formattedContents.push({
          role: 'user',
          parts: [{ text: msg.text }],
        });
      } else if (msg.sender === 'assistant' && msg.text) {
        formattedContents.push({
          role: 'model',
          parts: [{ text: msg.text }],
        });
      }
    }

    // Add current user prompt
    const userPromptWithLevel = formattedContents.length === 0
      ? `[Nível do Estudante: ${userLevel}]\n\n${query}`
      : query;

    formattedContents.push({
      role: 'user',
      parts: [{ text: userPromptWithLevel }],
    });

    // We call Gemini model with timeout
    let replyText = '';
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: MINDORA_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      replyText = response.text || '';
    } catch (modelErr: any) {
      console.warn('Gemini generateContent failed:', modelErr?.message || modelErr);
      return res.status(200).json({ error: modelErr?.message, needsFallback: true });
    }

    if (!replyText) {
      return res.status(200).json({ error: 'Resposta vazia da IA.', needsFallback: true });
    }

    return res.json({ text: replyText, source: 'gemini' });
  } catch (error: any) {
    console.error('Erro no endpoint /api/ai/chat:', error);
    return res.status(200).json({
      error: error?.message || 'Falha ao processar pedido de IA',
      needsFallback: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MINDORA server is running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
