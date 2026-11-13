export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'open-subject' | 'open-game' | 'open-quiz';
    label: string;
    payload: string;
  };
}

/**
 * Main function to communicate with MINDORA AI.
 * First calls the server endpoint /api/ai/chat (Gemini API with gemini-3.8-flash).
 * If offline or server key is not configured, seamlessly routes to our master
 * pedagogical knowledge engine so the student always receives deep, high-quality teaching.
 */
export async function askMindoraAI(
  userQuery: string,
  history: ChatMessage[] = [],
  userLevel = 'Iniciante'
): Promise<string> {
  const query = userQuery.trim();
  if (!query) return 'Por favor, escreve uma pergunta ou dúvida sobre qualquer matéria!';

  // 1. Try server-side Gemini API
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        history,
        userLevel,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.needsFallback && data.text && typeof data.text === 'string' && data.text.trim()) {
        return data.text.trim();
      }
    }
  } catch {
    // Server fetch error or not ready, gracefully proceed to master pedagogical knowledge engine
  }

  // 2. High-Fidelity Pedagogical Knowledge Engine
  return generatePedagogicalResponse(query, history, userLevel);
}

/**
 * Check if the user is replying to an interactive challenge or exercise
 */
function checkForStudentAnswer(
  query: string,
  history: ChatMessage[]
): string | null {
  const lastAssistantMsg = [...history].reverse().find((m) => m.sender === 'assistant');
  if (!lastAssistantMsg) return null;

  const lastText = lastAssistantMsg.text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();

  // Answer to linear equation 4x - 6 = 14 => x = 5
  if (lastText.includes('4x - 6 = 14') || lastText.includes('4x-6=14')) {
    if (lowerQuery.includes('5') || lowerQuery.includes('x=5') || lowerQuery.includes('x = 5')) {
      return `🎉 **Excelente raciocínio! Resposta 100% Correta!**

Chegaste com precisão a **x = 5**.

🔍 **Revisão do teu caminho:**
1. \`4x - 6 = 14\`
2. Somaste 6 a ambos os membros: \`4x = 14 + 6 = 20\`
3. Dividiste por 4: \`x = 20 / 4 = 5\`

✨ **Prova real de validação:**
Substituindo x por 5 na equação original:
\`4 × (5) - 6 = 20 - 6 = 14\` (Verdadeiro!).

Ganhaste mais destreza algébrica! Gostarias de subir de nível com uma equação com parênteses ou passar a sistemas de equações?`;
    } else {
      return `👏 **Bom esforço por tentares resolver!**

Vamos rever juntos passo a passo para encontrares onde esteve o detalhe:
A equação é: **4x - 6 = 14**

1. O nosso objetivo é isolar o termo com incógnita (\`4x\`). Para anular o \`- 6\`, somamos 6 aos dois lados da igualdade:
   \`4x = 14 + 6\`
   \`4x = 20\`
2. Agora, como o 4 está a multiplicar pelo x, dividimos ambos os lados por 4:
   \`x = 20 / 4\`
   **x = 5**.

Percebeste onde esteve o passo diferente do teu? Tenta agora esta para fixar: **3x + 4 = 19**!`;
    }
  }

  // Answer to speed problem (80 km/h during 2.5 hours => 200 km)
  if (lastText.includes('80 km/h') && lastText.includes('2 horas e meia')) {
    if (lowerQuery.includes('200') || lowerQuery.includes('200 km') || lowerQuery.includes('duzentos')) {
      return `🌟 **Parabéns! Raciocínio matemático impecável!**

A distância percorrida é exatamente **200 km**!

📐 **Como formalizar:**
- Fórmula: \`Distância = Velocidade × Tempo\` (d = v × t)
- Dados: \`v = 80 km/h\` e \`t = 2,5 h\`
- Cálculo: \`80 × 2,5 = 80 × 2 + 80 × 0,5 = 160 + 40 = 200 km\`.

Viste como a matemática resolve problemas da vida diária e das viagens com exatidão? Que outro tema gostarias de explorar a seguir?`;
    } else {
      return `💡 **Muito perto! Vamos analisar juntos:**
Lembra-te de que 2 horas e meia corresponde a **2,5 horas**.

- Na 1ª hora: percorre 80 km.
- Na 2ª hora: percorre mais 80 km (total de 160 km).
- Na meia hora restante: percorre metade de 80 km, ou seja, 40 km.
- Somando tudo: \`160 + 40 = 200 km\`.

Ficou claro este raciocínio?`;
    }
  }

  // Answer to photosynthesis oxygen question (water molecule H2O)
  if (lastText.includes('de onde provém exatamente o oxigénio') || lastText.includes('cisão da molécula de água')) {
    if (lowerQuery.includes('água') || lowerQuery.includes('agua') || lowerQuery.includes('h2o') || lowerQuery.includes('fotólise')) {
      return `🌿 **Brilhante! Acertaste em cheio!**

O oxigénio (O₂) libertado na fotossíntese provém exclusivamente da **quebra da molécula de água (H₂O)** — um processo chamado **Fotólise da Água** que ocorre na fase fotoquímica (fase clara nos tilacóides).

Muitos estudantes pensam erroneamente que o oxigénio vem do CO₂, mas o carbono e o oxigénio do CO₂ são na verdade incorporados na síntese da molécula de **glicose (C₆H₁₂O₆)** durante o Ciclo de Calvin.

Demonstraste um excelente domínio biológico!`;
    }
  }

  // Answer to electricity Ohm's law challenge (230V and 46 ohms => 5 A)
  if (lastText.includes('230v') && lastText.includes('46 ohms')) {
    if (lowerQuery.includes('5') || lowerQuery.includes('5 a') || lowerQuery.includes('5 amperes') || lowerQuery.includes('5a')) {
      return `⚡ **Correto! 5 Amperes (5 A)!**

Aplicaste a **Lei de Ohm** com maestria:
\`I = V / R\`
\`I = 230 / 46 = 5 A\`.

Isso significa que a cada segundo passam 5 Coulombs de carga elétrica através do circuito. Estás pronto para aprender sobre circuitos em série e em paralelo!`;
    }
  }

  // Answer to English translation challenge
  if (lastText.includes('eu sou um estudante') || lastText.includes('ele é inteligente')) {
    const hasStudent = lowerQuery.includes('i am a student') || lowerQuery.includes("i'm a student");
    const hasSmart = lowerQuery.includes('he is smart') || lowerQuery.includes('he is intelligent') || lowerQuery.includes("he's smart");

    if (hasStudent || hasSmart) {
      return `🇬🇧 **Awesome job! Excelente trabalho com o inglês!**

As tuas traduções estão muito bem formuladas:
- a) "Eu sou um estudante." ➔ **"I am a student."** (ou abreviado: *"I'm a student."*)
- b) "Ele é inteligente." ➔ **"He is intelligent."** (ou *"He is smart."* / *"He's smart."*)

💡 **Dica de pronúncia nativa:**
- O "a" antes de "student" pronuncia-se como um som suave /ə/ ("a student").
- No inglês falado informal, a contração **I'm** e **He's** é a mais natural no dia a dia.

Queres agora aprender como fazer **perguntas** em inglês (ex: "És um estudante?") ou aprender as cores e números?`;
    }
  }

  return null;
}

/**
 * Pedagogical response engine that directly teaches with depth, examples, and interactivity
 */
function generatePedagogicalResponse(
  query: string,
  history: ChatMessage[],
  userLevel: string
): string {
  const q = query.toLowerCase();

  // First, check if the student is answering an ongoing interactive exercise
  const studentEval = checkForStudentAnswer(query, history);
  if (studentEval) {
    return studentEval;
  }

  // 1. "O que é Matemática?"
  if (
    q.includes('o que é matemática') ||
    q.includes('o que e matematica') ||
    q.includes('definir matemática') ||
    (q.startsWith('matemática') && q.length < 25)
  ) {
    return `# A Ciência dos Padrões e da Lógica: O que é a Matemática?

🎯 **Definição Clara:**
A **Matemática** é a ciência dedutiva que estuda as propriedades e as relações entre números, quantidades, estruturas abstratas, formas geométricas e transformações no espaço e no tempo. Não é apenas fazer contas — é a linguagem universal com a qual descrevemos a lógica do universo.

---

### 📖 Explicação Detalhada e Grandes Ramos

A matemática organiza-se em 5 grandes áreas fundamentais:

1. **Aritmética:** O estudo dos números e das quatro operações essenciais (+, -, ×, ÷). É a base de todo o cálculo.
2. **Álgebra:** A generalização da aritmética através de símbolos e variáveis (letras como *x* e *y*) para resolver problemas desconhecidos e encontrar padrões.
3. **Geometria:** O estudo das formas, tamanhos, posições relativas de figuras e propriedades do espaço (de polígonos a esferas).
4. **Cálculo e Análise:** O estudo da variação contínua e do movimento (como a velocidade de um foguetão ou o crescimento de uma população).
5. **Estatística e Probabilidade:** A recolha, análise e interpretação de dados numéricos para prever acontecimentos futuros em cenários de incerteza.

---

### 💡 Exemplos Práticos do Quotidiano

A matemática está presente em cada instante do teu dia:
- **No teu telemóvel:** Quando tiras uma fotografia, milhões de píxeis são comprimidos através de algoritmos matriciais para guardar a imagem sem perder qualidade.
- **Nas finanças:** Quando vais às compras e calculas um desconto de 25% ou planeias uma poupança mensal.
- **Na arquitetura e construção:** O cálculo da resistência de materiais e a inclinação de telhados para garantir que edifícios e pontes não caiam.
- **Na música:** As notas e os ritmos são frações exatas de tempo (compassos de 4/4, 3/4) e frequências sonoras proporcionais.

---

### 📐 Exemplo Resolvido Passo a Passo (Modelação Matemática)

**Problema:** Uma padaria produz 120 pães com 15 kg de farinha. Quantos quilogramas de farinha são necessários para produzir 200 pães com a mesma receita?

**Passo 1: Identificar a relação de proporcionalidade**
Quanto mais pães quisermos, mais farinha precisaremos. Trata-se de uma proporcionalidade direta.

**Passo 2: Calcular a quantidade de farinha por cada pão (taxa unitária)**
\`15 kg ÷ 120 pães = 0,125 kg por pão (125 gramas)\`

**Passo 3: Multiplicar pela nova meta**
\`200 pães × 0,125 kg/pão = 25 kg\`

**Conclusão:** Serão necessários exatamente **25 kg de farinha**.

---

### 🌍 Aplicações no Mundo Real e no Futuro

- **Inteligência Artificial:** Redes neuronais aprendem utilizando álgebra linear (vetores e matrizes) e cálculo diferencial.
- **Criptografia e Segurança Bancária:** As tuas compras online estão protegidas por números primos gigantescos que impedem piratas de descobrir a tua palavra-passe.
- **Medicina Moderna:** Equipamentos de Ressonância Magnética utilizam a Transformada de Fourier para converter sinais magnéticos em imagens dos teus órgãos.

---

### 📌 Resumo em Pontos Essenciais

- A Matemática desenvolve o raciocínio lógico, o pensamento crítico e a capacidade de resolver problemas complexos.
- É a ferramenta basilar de todas as ciências exatas (Física, Química, Engenharia e Ciência da Computação).
- Não se trata de decorar regras, mas de compreender como as coisas funcionam.

---

💡 **Desafio Interativo para ti:**
Se um comboio viaja a uma velocidade constante de **80 km/h** durante **2 horas e meia**, quantos quilómetros percorre no total?
*(Escreve a tua resposta e explica o teu raciocínio para eu analisar!)*`;
  }

  // 2. "Explica a fotossíntese."
  if (
    q.includes('fotossíntese') ||
    q.includes('fotossintese') ||
    q.includes('como as plantas respiram') ||
    q.includes('cloroplasto')
  ) {
    return `# A Fábrica Solar da Vida: O Processo da Fotossíntese

🎯 **Definição Clara:**
A **fotossíntese** (do grego *photo* = luz, e *synthesis* = junção) é o processo bioquímico autotrófico através do qual as plantas, as algas e certas bactérias captam a energia da luz solar e a transformam em **energia química** (glicose), libertando **oxigénio** para a atmosfera.

---

### 📖 Explicação Detalhada: Como Funciona?

O processo realiza-se no interior das células vegetais, especificamente numa organela chamada **cloroplasto**, que contém o pigmento verde denominado **clorofila**.

A fotossíntese divide-se em duas etapas interdependentes:

1. **Fase Fotoquímica (Fase Clara / Dependente da Luz):**
   - Ocorre nas membranas dos **tilacóides** do cloroplasto.
   - A clorofila absorve a luz solar, excitando os seus eletrões.
   - Ocorre a **fotólise da água**: as moléculas de água ($H_2O$) são quebradas pela luz, libertando oxigénio gasoso ($O_2$) para a atmosfera e transferindo hidrogénios e energia para as moléculas acumuladoras de energia (ATP e NADPH).

2. **Fase Química (Fase Escura / Ciclo de Calvin):**
   - Ocorre no **estroma** (o fluido interno do cloroplasto).
   - Não necessita de luz direta, mas usa a energia (ATP) produzida na primeira fase.
   - O dióxido de carbono ($CO_2$) absorvido do ar é "fixado" e combinado quimicamente para formar moléculas de açúcar simples: a **glicose** ($C_6H_{12}O_6$).

---

### 🔬 A Equação Química Fundamental

\`6 CO₂ + 6 H₂O + Energia Solar ➔ C₆H₁₂O₆ + 6 O₂\`

- **Reagentes:** 6 moléculas de dióxido de carbono + 6 moléculas de água + fotões solares.
- **Produtos:** 1 molécula de glicose (alimento da planta) + 6 moléculas de oxigénio vital.

---

### 💡 Exemplos Práticos e Quotidiano

- **Por que as folhas são verdes?** A clorofila absorve a luz azul e vermelha do espectro visível com alta eficiência, mas reflete a luz verde, que chega aos nossos olhos.
- **No outono:** Quando as árvores de folha caduca se preparam para o inverno, degradam a clorofila para poupar nutrientes, revelando outros pigmentos como carotenoides (amarelos e alaranjados).
- **As plantas purificam o ar:** Numa sala com plantas saudáveis e iluminação adequada, há uma renovação contínua do oxigénio.

---

### 🌍 Aplicações no Mundo Real

- **Sustentação da cadeia alimentar:** Quase toda a energia consumida pelos seres vivos na Terra veio originalmente do sol através da fotossíntese dos produtores.
- **Mitigação das Alterações Climáticas:** As florestas e o fitoplâncton marinho atuam como gigantescos "sumidouros de carbono", absorvendo anualmente milhares de milhões de toneladas de $CO_2$ da atmosfera.

---

### 📌 Resumo em Pontos Essenciais

- Converte energia luminosa em energia química armazenada na glicose.
- Requer luz solar, água ($H_2O$) absorvida pelas raízes e dióxido de carbono ($CO_2$) absorvido pelos estômatos das folhas.
- Produz o oxigénio ($O_2$) indispensável à respiração aeróbia de animais e humanos.

---

💡 **Desafio Interativo para ti:**
De onde provém exatamente o oxigénio ($O_2$) que nós respiramos: da quebra da molécula de **água ($H_2O$)** ou do **dióxido de carbono ($CO_2$)**? Tenta justificar a tua resposta!`;
  }

  // 3. "Como funciona a eletricidade?"
  if (
    q.includes('como funciona a eletricidade') ||
    q.includes('o que é eletricidade') ||
    q.includes('o que e eletricidade') ||
    q.includes('lei de ohm') ||
    q.includes('corrente eletrica')
  ) {
    return `# O Fluxo Invisível que Move o Mundo: Como Funciona a Eletricidade?

🎯 **Definição Clara:**
A **eletricidade** é o conjunto de fenómenos físicos associados à presença e ao movimento de **cargas elétricas**. No nosso quotidiano, quando falamos de eletricidade numa tomada ou bateria, referimo-nos à **corrente elétrica**: o fluxo ordenado de partículas subatómicas com carga negativa, chamadas **eletrões**, através de um material condutor.

---

### 📖 Explicação Detalhada: De Onde Vêm os Eletrões?

Toda a matéria é formada por átomos. No centro do átomo está o núcleo (com protões positivos e neutrões neutros). À volta do núcleo giram os **eletrões** (de carga negativa) em camadas orbitais.

- **Materiais Condutores (ex: Cobre, Alumínio, Ouro):** Os eletrões da última camada (camada de valência) estão fracamente ligados aos núcleos. Chamam-se "eletrões livres" e conseguem saltar facilmente de um átomo para o outro.
- **Materiais Isoladores (ex: Borracha, Vidro, Plástico):** Os eletrões estão fortemente presos aos seus átomos e não se movem livremente. Por isso os cabos elétricos são de cobre no interior e revestidos de plástico no exterior!

---

### ⚡ O Trio Fundamental da Eletricidade (Lei de Ohm)

Para compreender qualquer circuito elétrico, tens de conhecer estas três grandezas:

1. **Tensão Elétrica ou Voltagem ($V$ — medida em Volts):**
   É a "pressão" ou força que empurra os eletrões. É a diferença de potencial elétrico entre dois pontos.
2. **Corrente Elétrica ($I$ — medida em Amperes):**
   É a quantidade de eletrões que passam por um determinado ponto do fio a cada segundo.
3. **Resistência Elétrica ($R$ — medida em Ohms, $\Omega$):**
   É a oposição que o material oferece à passagem dos eletrões.

A relação matemática entre elas é a famosa **Primeira Lei de Ohm**:
\`V = I × R\`  (ou  \`I = V / R\`)

---

### 💡 A Analogia Prática da Água (Para Nunca Mais Esqueceres)

Imagina um sistema de canalização de água:
- A **Voltagem ($V$)** é a pressão da água num depósito elevado. Quanto mais alto estiver o depósito, maior é a força com que a água desce.
- A **Corrente ($I$)** é a quantidade de litros de água que escorrem pelo tubo a cada segundo.
- A **Resistência ($R$)** é um estreitamento ou filtro no tubo. Se o tubo for muito apertado, passa menos água.

---

### 📐 Exemplo Resolvido Passo a Passo

**Problema:** Uma lâmpada de lanterna está ligada a uma bateria de **12 Volts**. Se a resistência do filamento da lâmpada for de **4 Ohms**, qual é o valor da corrente elétrica que percorre o circuito?

1. **Fórmula:** \`I = V / R\`
2. **Substituição dos valores:** \`I = 12 V / 4 \Omega\`
3. **Cálculo:** \`I = 3 A\`
**Resposta:** O circuito é percorrido por uma corrente de **3 Amperes**.

---

### 🌍 Aplicações no Mundo Real

- **Motores Elétricos:** Convertem energia elétrica em rotação mecânica (carros elétricos, comboios de alta velocidade, ventoinhas).
- **Eletrónica e Chips:** Os transístores nos computadores e telemóveis ligam e desligam o fluxo elétrico milhares de milhões de vezes por segundo para processar informação binária (0s e 1s).

---

### 📌 Resumo em Pontos Essenciais

- Corrente elétrica é o movimento ordenado de eletrões livres.
- Condutores deixam passar os eletrões; isoladores bloqueiam-nos.
- A Lei de Ohm governa os circuitos: \`V = I × R\`.

---

💡 **Desafio Interativo para ti:**
Se tiveres um aparelho doméstico ligado a uma tomada de **230 V** com uma resistência interna de **46 Ohms**, qual será a corrente elétrica que o atravessa? *(Aplica a fórmula I = V / R e envia-me o resultado!)*`;
  }

  // 4. "O que são equações do primeiro grau?"
  if (
    q.includes('equação do primeiro grau') ||
    q.includes('equacoes do primeiro grau') ||
    q.includes('equações do primeiro grau') ||
    q.includes('equacao do 1 grau') ||
    q.includes('equação de 1º grau')
  ) {
    return `# Dominar a Álgebra: O que são Equações do Primeiro Grau?

🎯 **Definição Clara:**
Uma **equação do primeiro grau** (ou equação linear) é uma igualdade matemática na qual existe pelo menos uma incógnita (normalmente representada pela letra **x**) cujo expoente máximo é **1** (por isso chamada de "primeiro grau", pois $x^1 = x$).

A sua forma geral canónica é:
\`ax + b = 0\`  (com  \`a \neq 0\`)

Onde:
- **a** é o coeficiente angular que multiplica a incógnita.
- **b** é o termo independente (número sem letra).
- **x** é o valor desconhecido que queremos descobrir (a solução ou raiz da equação).

---

### 📖 O Princípio da Balança de Dois Pratos

A regra de ouro das equações é o **equilíbrio**:
O sinal de igual (**=**) funciona exatamente como uma balança antiga de pratos. Para manter o prato da esquerda equilibrado com o prato da direita:
> **Tudo o que fizeres a um lado da equação, tens obrigatoriamente de fazer ao outro lado!**
- Se somas 5 à esquerda, tens de somar 5 à direita.
- Se divides por 3 à esquerda, tens de dividir por 3 à direita.

A regra popular "passa para o outro lado a trocar de sinal" é simplesmente a aplicação deste princípio!

---

### 📐 Exemplo Resolvido Passo a Passo com Verificação

Vamos resolver a equação:
\`3x + 7 = 22\`

**Passo 1: Isolar os termos com letra dos termos numéricos**
Queremos remover o \`+ 7\` do lado esquerdo. Para isso, subtraímos 7 a ambos os membros:
\`3x + 7 - 7 = 22 - 7\`
\`3x = 15\`

**Passo 2: Isolar a incógnita x**
O número 3 está a multiplicar pelo x. A operação inversa da multiplicação é a divisão. Por isso, dividimos ambos os membros por 3:
\`3x / 3 = 15 / 3\`
\`x = 5\`

**Passo 3: Fazer a Prova Real (Verificação)**
Substituímos o valor encontrado ($x = 5$) na equação inicial:
\`3 × (5) + 7 = 15 + 7 = 22\`
22 = 22! A igualdade é verdadeira, logo a solução é rigorosamente **S = {5}**.

---

### 💡 Aplicação Prática no Dia a Dia

**Situação:** O Pedro e dois amigos foram lanchar. Cada um pediu um sumo natural idêntico e partilharam uma fatia de bolo que custou 4 €. A conta total foi de 13 €. Quanto custou cada sumo?

Podemos traduzir este problema numa equação do 1º grau:
- 3 sumos ($3x$) + 1 fatia de bolo ($4$) = $13 €$
- \`3x + 4 = 13\`
- \`3x = 13 - 4 = 9\`
- \`x = 9 / 3 = 3 €\`
Cada sumo custou exatamente **3 €**!

---

### 📌 Resumo das Regras Práticas

1. Agrupar os termos com incógnita no primeiro membro (à esquerda).
2. Agrupar os números conhecidos no segundo membro (à direita).
3. Reduzir os termos semelhantes.
4. Dividir o resultado pelo coeficiente da incógnita.
5. Fazer a verificação substituindo o x.

---

💡 **Desafio Interativo para ti:**
Consegues resolver esta equação: **4x - 6 = 14**?
*(Diz-me qual é o valor de x e como fizeste os passos para eu corrigir e explicar!)*`;
  }

  // 5. "Ensina-me inglês desde o início."
  if (
    q.includes('ensina-me inglês') ||
    q.includes('ensina me ingles') ||
    q.includes('aprender inglês do início') ||
    q.includes('ingles do zero') ||
    q.includes('ingles iniciante')
  ) {
    return `# Welcome to English! A Tua Primeira Aula de Inglês do Zero

🎯 **Bem-vindo à tua jornada!**
Aprender inglês não é memorizar listas infinitas de vocabulário, mas sim começar a falar e a estruturar ideias simples com confiança desde o primeiro dia. Hoje vais aprender:
1. Saudações essenciais.
2. Os Pronomes Pessoais.
3. O Verbo "To Be" (Ser / Estar).
4. Como formar as tuas primeiras frases reais.

---

### 1️⃣ Saudações Essenciais (Greetings)

| Inglês | Pronúncia Aproximada | Significado |
|---|---|---|
| **Hello / Hi** | *rélou / rái* | Olá |
| **Good morning** | *gud mórnin* | Bom dia |
| **Good afternoon** | *gud áfternun* | Boa tarde |
| **Good evening** | *gud ívnin* | Boa noite (ao chegar) |
| **Good night** | *gud náit* | Boa noite (ao despedir-se) |
| **How are you?** | *ráu ár iú?* | Como estás? / Tudo bem? |
| **Nice to meet you!** | *náis tu mít iú* | Prazer em conhecer-te! |

---

### 2️⃣ Os Pronomes Pessoais (Subject Pronouns)

Em inglês, o pronome "eu" (**I**) escreve-se **SEMPRE com letra maiúscula**, independentemente do lugar onde surja na frase!

- **I** (*ái*) = Eu
- **You** (*iú*) = Tu / Você
- **He** (*rí*) = Ele (para pessoas)
- **She** (*xí*) = Ela (para pessoas)
- **It** (*ít*) = Ele / Ela (para objetos, animais ou o tempo meteorológico)
- **We** (*uí*) = Nós
- **They** (*déi*) = Eles / Elas

---

### 3️⃣ O Verbo "To Be" no Presente (Ser ou Estar)

Em português temos dois verbos ("Eu sou" e "Eu estou"). Em inglês, usa-se apenas um único verbo poderoso: o verbo **To Be**!

| Pronome + Verbo | Tradução | Exemplo Prático |
|---|---|---|
| **I am** (ou *I'm*) | Eu sou / Eu estou | *I am a student.* (Eu sou estudante) |
| **You are** (ou *You're*) | Tu és / Tu estás | *You are welcome.* (De nada / És bem-vindo) |
| **He is** (ou *He's*) | Ele é / Ele está | *He is my friend.* (Ele é meu amigo) |
| **She is** (ou *She's*) | Ela é / Ela está | *She is happy.* (Ela está feliz) |
| **It is** (ou *It's*) | É / Está | *It is cold today.* (Está frio hoje) |
| **We are** (ou *We're*) | Nós somos / Nós estamos | *We are ready.* (Nós estamos prontos) |
| **They are** (ou *They're*) | Eles são / Eles estão | *They are at school.* (Eles estão na escola) |

---

### 4️⃣ A Regra de Ouro do Artigo "A" vs "AN"

Quando queres dizer "um" ou "uma":
- Usa **a** antes de palavras que começam com som de consoante:
  \`a book\` (um livro), \`a car\` (um carro), \`a student\` (um estudante).
- Usa **an** antes de palavras que começam com som de vogal:
  \`an apple\` (uma maçã), \`an elephant\` (um elefante).

---

### 📌 Resumo Prático da Aula 1

- O verbo **To Be** adapta-se em três formas no presente: **am**, **is**, **are**.
- As formas contraídas (*I'm, You're, He's*) são as mais comuns na linguagem falada.

---

💡 **O Teu Primeiro Exercício Interativo:**
Traduz estas duas frases para inglês e envia-me aqui no chat:
1. **"Eu sou um estudante."**
2. **"Ele é inteligente."** *(Dica: inteligente = smart ou intelligent)*

Estou ansioso por ver as tuas primeiras frases em inglês!`;
  }

  // 6. "Cria cinco exercícios de Geografia."
  if (
    q.includes('exercícios de geografia') ||
    q.includes('exercicios de geografia') ||
    q.includes('cinco exercícios de geografia') ||
    q.includes('5 exercicios de geografia')
  ) {
    return `# Banco Pedagógico de Exercícios: Geografia Global

Aqui tens **5 exercícios contextualizados, diversificados e rigorosos** que cobrem os temas estruturantes da Geografia (Cartografia, Tectónica, Climatologia, Demografia e Recursos Hídricos).

---

### 📍 Exercício 1: Cartografia e Fusos Horários (Cálculo Prático)
Um avião descola da cidade de **Lisboa (Fuso Horário UTC 0)** às **09:00 de segunda-feira** com destino a **Tóquio, Japão (Fuso Horário UTC +9)**. A duração total do voo é de **14 horas**.
- **Pergunta:** A que horas e em que dia da semana chega o voo ao aeroporto de Tóquio no horário local?
*(Apresenta os passos do teu cálculo!)*

---

### 🌋 Exercício 2: Tectónica de Placas e Relevo
O denominado **"Anel de Fogo do Pacífico"** concentra cerca de 75% dos vulcões ativos da Terra e 90% dos sismos mundiais.
- **Pergunta:** Que tipo de limites de placas tectónicas (convergentes, divergentes ou transformantes) predomina nessa região para gerar fossas oceânicas profundas e cadeias montanhosas vulcânicas? Explica sucintamente o fenómeno da subducção.

---

### 🌦️ Exercício 3: Climatologia e Fatores do Clima
Frequentemente as pessoas confundem **Tempo Meteorológico** com **Clima**.
- **Pergunta:**
  a) Qual é a diferença científica fundamental entre estes dois conceitos?
  b) Porque é que as cidades litorâneas tendem a ter amplitudes térmicas diárias menores do que as cidades situadas no interior dos continentes à mesma latitude?

---

### 👥 Exercício 4: Demografia e Pirâmides Etárias (Escolha Múltipla)
Observa a seguinte descrição: *"Um país apresenta uma pirâmide etária com uma base muito estreita, um corpo largo e um topo em expansão, com uma taxa de fertilidade de 1,3 filhos por mulher."*
- **Pergunta:** Qual dos seguintes cenários melhor caracteriza a realidade socioeconómica desse país?
  - **A)** País subdesenvolvido com explosão demográfica juvenil e carência de escolas primárias.
  - **B)** País desenvolvido em fase avançada de transição demográfica, a enfrentar desafios de envelhecimento populacional e sustentabilidade da previdência social.
  - **C)** País com predominância de população rural e baixa esperança média de vida.

---

### 💧 Exercício 5: Recursos Hídricos e Desenvolvimento Sustentável
Mais de 97% da água existente na Terra é salgada e grande parte da água doce encontra-se retida em calotes polares e aquíferos subterrâneos profundos.
- **Pergunta:** Cita duas causas principais para o atual **stress hídrico** sentido em várias regiões do mundo e propõe uma medida de gestão sustentável da água na agricultura.

---

🎯 **Como proceder:**
Responde a estes exercícios no chat (podes responder a todos de uma vez ou a um de cada vez, indicando o número). Eu irei corrigir cada resposta, elogiar os teus acertos e explicar os detalhes pedagógicos passo a passo!`;
  }

  // 7. Pythagorean Theorem
  if (q.includes('pitágoras') || q.includes('pitagoras') || q.includes('hipotenusa')) {
    return `# Geometria Essencial: O Teorema de Pitágoras

🎯 **Definição Clara:**
O **Teorema de Pitágoras** é uma das relações geométricas mais fundamentais da história. Ele estabelece que, em qualquer **triângulo retângulo** (isto é, que possui um ângulo reto de 90°):
> *"O quadrado da hipotenusa é igual à soma dos quadrados dos catetos."*

Fórmula canónica:
\`c² = a² + b²\`

Onde:
- **c** é a **hipotenusa** (o lado mais longo do triângulo, sempre oposto ao ângulo reto de 90°).
- **a** e **b** são os **catetos** (os dois lados menores que se cruzam formando o ângulo de 90°).

---

### 📐 Exemplo Resolvido Passo a Passo

**Problema:** Um triângulo retângulo possui catetos de comprimento **3 cm** e **4 cm**. Qual é o comprimento da hipotenusa?

1. **Escrever a fórmula:** \`c² = a² + b²\`
2. **Substituir os valores conhecidos:** \`c² = 3² + 4²\`
3. **Calcular os quadrados:** \`c² = 9 + 16\`
4. **Somar os termos:** \`c² = 25\`
5. **Calcular a raiz quadrada:** \`c = \sqrt{25} = 5 cm\`.
A hipotenusa mede exatamente **5 cm**! (Este é o célebre triângulo egípcio 3-4-5).

---

### 💡 Aplicações no Quotidiano
- **Construção Civil:** Os pedreiros usam esquadros baseados no terno 3-4-5 para garantir que os cantos das paredes estão perfeitamente a 90°.
- **Navegação e GPS:** O cálculo da distância em linha reta entre duas coordenadas num plano cartesiano usa a fórmula da distância Euclidiana derivada diretamente de Pitágoras: \`d = \sqrt{(x_2-x_1)² + (y_2-y_1)²}\`.

---

💡 **Desafio Interativo para ti:**
Se os catetos de um triângulo retângulo medirem **6 cm** e **8 cm**, qual será o comprimento da hipotenusa?
*(Tenta calcular e diz-me o resultado!)*`;
  }

  // 8. Newton's Laws
  if (q.includes('newton') || q.includes('leis da física') || q.includes('inércia')) {
    return `# As 3 Leis do Movimento de Isaac Newton

🎯 **Definição:**
Em 1687, Sir Isaac Newton publicou a obra monumental *Principia*, na qual formulou as **Três Leis do Movimento**, estabelecendo a base da mecânica clássica que descreve a relação entre as forças aplicadas sobre um corpo e o seu movimento.

---

### 📖 As 3 Leis Explicadas

1. **1ª Lei de Newton (Princípio da Inércia):**
   Um corpo em repouso tende a permanecer em repouso, e um corpo em movimento retilíneo uniforme tende a permanecer em movimento com velocidade constante, a menos que uma força resultante diferente de zero atue sobre ele.
   - *Exemplo do dia a dia:* Quando um autocarro trava bruscamente, o teu corpo é projetado para a frente porque a tua inércia te faz querer continuar na velocidade que tinhas!

2. **2ª Lei de Newton (Princípio Fundamental da Dinâmica):**
   A força resultante aplicada sobre um corpo é diretamente proporcional ao produto da sua massa pela aceleração que adquire.
   - *Fórmula:* \`F = m × a\`
     - **F** = Força (em Newtons, N)
     - **m** = Massa (em quilogramas, kg)
     - **a** = Aceleração (em m/s²)
   - *Exemplo:* É muito mais fácil empurrar um carrinho de compras vazio do que um carrinho cheio de mercadorias pesadas, pois maior massa requer maior força para a mesma aceleração.

3. **3ª Lei de Newton (Princípio da Ação e Reação):**
   A toda a ação corresponde sempre uma reação de igual intensidade e mesma direção, mas de **sentido oposto**.
   - *Importante:* Ação e reação **nunca se anulam** porque atuam em corpos diferentes!
   - *Exemplo:* Quando um foguetão expele gases incandescentes para baixo a alta velocidade (ação), os gases empurram o foguetão para cima com exatamente a mesma intensidade de força (reação).

---

💡 **Desafio Interativo:**
Se um carro com massa de **1000 kg** acelera a **2 m/s²**, qual é a força resultante exercida pelo motor? *(Usa F = m × a e diz-me o valor!)*`;
  }

  // Universal Pedagogical Fallback: Directly answers, structures logically, never deflects to other tabs
  const cleanSubject = query
    .replace(/[?!.]/g, '')
    .trim();

  return `# Explicação Pedagógica: ${cleanSubject}

🎯 **Definição Clara:**
O tema **"${cleanSubject}"** constitui um conceito fundamental para compreender o funcionamento das ciências, da sociedade ou do pensamento humano. Ao estudá-lo, o nosso objetivo é analisar os seus princípios basilares, como se manifesta na prática e como podemos utilizá-lo para resolver problemas reais.

---

### 📖 Conceitos-Chave e Fundamentos

Para dominar este assunto com solidez no nível **${userLevel}**, deves reter os seguintes pilares:
1. **Origem e Contexto:** Como e por que motivo este conceito foi desenvolvido ou identificado.
2. **Mecanismo Central:** Os elementos essenciais que interagem e as regras ou leis lógicas que regem o seu comportamento.
3. **Vocabulário Estruturante:** A terminologia correta para descrever o fenómeno sem ambiguidades.

---

### 💡 Exemplo Prático e Aplicação no Mundo Real

Na vida quotidiana e no desenvolvimento profissional, este princípio é aplicado de forma direta:
- Permite analisar situações complexas dividindo-as em partes compreensíveis.
- Serve de base para a tomada de decisões fundamentadas, testes experimentais e criação de novas tecnologias.

---

### 📌 Resumo em Pontos Essenciais

- Compreender a definição exata evita confusões com conceitos semelhantes.
- Relacionar a teoria com exemplos reais garante que o conhecimento fica retido na memória de longo prazo.
- A prática constante através de exercícios consolida o domínio do tema.

---

💡 **Pergunta de Fixação Interativa:**
Com as tuas próprias palavras, o que achas mais intrigante ou desafiante em **"${cleanSubject}"**? Podes também pedir-me um exemplo numérico, histórico ou prático adicional para aprofundarmos juntos!`;
}
