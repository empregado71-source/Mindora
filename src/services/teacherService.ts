import {
  TeacherApplication,
  TeacherCourse,
  TeacherSubject,
  TeacherEnrollment,
  ContentReport,
  TeacherCourseReview,
  TeacherApplicationStatus,
  ContentStatus
} from '../types';

const APPS_KEY = 'MINDORA_TEACHER_APPS_V2';
const COURSES_KEY = 'MINDORA_TEACHER_COURSES_V2';
const SUBJECTS_KEY = 'MINDORA_TEACHER_SUBJECTS_V2';
const ENROLLMENTS_KEY = 'MINDORA_TEACHER_ENROLLMENTS_V2';
const REPORTS_KEY = 'MINDORA_CONTENT_REPORTS_V2';

/* Initial Seed Data for Approved Teachers and Sample Courses */
const INITIAL_APPLICATIONS: TeacherApplication[] = [
  {
    id: 'app_prof_1',
    userId: 'usr_prof_alberto',
    name: 'Prof. Alberto Magalhães',
    email: 'alberto.magalhaes@mindora.edu',
    specialty: 'Ciências Exatas & Física Quântica',
    subjectsTaught: ['Física', 'Matemática', 'Astronomia'],
    bio: 'Doutorado em Física Aplicada, apaixonado por tornar conceitos cósmicos e equações acessíveis a todos os estudantes.',
    experience: '12 anos de docência universitária e criador de conteúdos educativos.',
    avatarEmoji: '👨‍🏫',
    agreementAccepted: true,
    status: 'aprovado',
    submittedAt: '2026-10-15',
    reviewedAt: '2026-10-16',
    adminNotes: 'Documentação académica verificada com distinção.'
  },
  {
    id: 'app_prof_2',
    userId: 'usr_prof_helena',
    name: 'Prof.ª Helena Vasconcelos',
    email: 'helena.vasconcelos@mindora.edu',
    specialty: 'Inteligência Artificial & Programação Web',
    subjectsTaught: ['Programação', 'Inteligência Artificial', 'Informática'],
    bio: 'Engenheira de Software e investigadora em IA generativa. Dedicada a ensinar código limpo e ética em tecnologia.',
    experience: '8 anos no setor tecnológico e mentora em programas de literacia digital.',
    avatarEmoji: '👩‍💻',
    agreementAccepted: true,
    status: 'aprovado',
    submittedAt: '2026-10-20',
    reviewedAt: '2026-10-21',
    adminNotes: 'Aprovada com perfil de excelência técnica.'
  },
  {
    id: 'app_prof_3',
    userId: 'usr_prof_miguel',
    name: 'Prof. Miguel Arantes',
    email: 'miguel.arantes@mindora.edu',
    specialty: 'Linguística & Comunicação Global',
    subjectsTaught: ['Inglês', 'Português', 'Literatura'],
    bio: 'Mestre em Estudos Anglo-Americanos. Promove o ensino comunicativo sem barreiras para exames internacionais.',
    experience: '10 anos em colégios internacionais e centros de línguas.',
    avatarEmoji: '📚',
    agreementAccepted: true,
    status: 'aprovado',
    submittedAt: '2026-10-25',
    reviewedAt: '2026-10-26',
    adminNotes: 'Aprovado para docência em línguas.'
  }
];

const INITIAL_TEACHER_COURSES: TeacherCourse[] = [
  {
    id: 'tc_fisica_moderna',
    teacherId: 'usr_prof_alberto',
    teacherName: 'Prof. Alberto Magalhães',
    teacherAvatar: '👨‍🏫',
    teacherBio: 'Doutorado em Física Aplicada e investigador em relatividade e física moderna.',
    teacherSpecialty: 'Física & Astronomia',
    title: 'Desvendando a Física Quântica e Relatividade',
    description: 'Um percurso fascinante desde a dualidade onda-partícula até à curvatura do espaço-tempo de Einstein, explicado de forma clara e visual.',
    category: 'Ciências Exatas',
    level: 'Intermédio',
    objectives: [
      'Compreender o efeito fotoelétrico e a constante de Planck',
      'Desmistificar o princípio da incerteza de Heisenberg',
      'Analisar a dilatação temporal na relatividade restrita'
    ],
    prerequisites: 'Noções básicas de álgebra e física clássica.',
    estimatedDuration: '14 Horas',
    status: 'aprovado',
    createdAt: '2026-10-28',
    updatedAt: '2026-11-01',
    enrolledCount: 148,
    averageRating: 4.9,
    reviews: [
      {
        id: 'rev_1',
        userId: 'usr_std_1',
        userName: 'Tiago Santos',
        userAvatar: '🎓',
        rating: 5,
        comment: 'Excelente didática! Consegui finalmente entender a experiência da fenda dupla.',
        createdAt: '2026-11-03'
      },
      {
        id: 'rev_2',
        userId: 'usr_std_2',
        userName: 'Carolina Ramos',
        userAvatar: '⭐',
        rating: 5,
        comment: 'Os exercícios passo a passo são incríveis. Parabéns professor!',
        createdAt: '2026-11-06'
      }
    ],
    modules: [
      {
        id: 'mod_1',
        title: 'Módulo 1 — O Colapso da Física Clássica',
        description: 'A radiação de corpo negro e a catástrofe ultravioleta que levaram à revolução de Max Planck.',
        lessons: [
          {
            id: 'tc_l_1',
            title: 'Aula 1: A Luz como Partícula (Fótons)',
            duration: '25 min',
            content: `No final do século XIX, a física clássica de Maxwell considerava a luz exclusivamente como uma onda eletromagnética contínua. Contudo, experiências como a radiação de corpo negro e o efeito fotoelétrico não podiam ser explicadas por esse modelo.\n\nEm 1900, Max Planck propôs uma hipótese audaciosa: a energia luminosa não é emitida continuamente, mas sim em pacotes discretos de energia chamados 'quanta'.\n\nFórmula de Planck-Einstein:\nE = h × f\nOnde E é a energia do fotão, h é a constante de Planck (6.626 × 10⁻³⁴ J·s) e f é a frequência da radiação.`,
            videoUrl: 'https://www.youtube.com/watch?v=7ku0jK2Kk0E',
            materials: [
              {
                id: 'mat_pdf_1',
                title: 'Guia Ilustrado de Física Quântica (PDF)',
                url: 'https://example.com/fisica-quantica-guia.pdf',
                type: 'pdf',
                fileSize: '2.4 MB'
              }
            ],
            exercises: [
              {
                q: 'O que representa o termo "quantum" na proposta revolucionária de Max Planck?',
                options: [
                  'Uma quantidade contínua e infinita de calor.',
                  'Um pacote mínimo e indivisível de energia eletromagnética.',
                  'Um tipo raro de átomo metálico.',
                  'A velocidade da luz medida em km/h.'
                ],
                correct: 1,
                hint: 'Refere-se à discretização da radiação em "pacotes".',
                explanation: 'A palavra "quantum" em latim significa "quantidade discreta". Planck postulou que a energia é trocada em múltiplos inteiros de hf.'
              }
            ]
          },
          {
            id: 'tc_l_2',
            title: 'Aula 2: A Dualidade Onda-Partícula',
            duration: '30 min',
            content: `Louis de Broglie em 1924 estendeu a ideia de Einstein: se as ondas luminosas têm comportamento corpuscular, será que partículas de matéria (como eletrões) também possuem comportamento ondulatório?\n\nComprimento de onda de de Broglie:\nλ = h / p\nOnde p é o momento linear da partícula (p = m × v). Esta hipótese foi comprovada pela difração de feixes de eletrões em cristais de níquel.`,
            materials: [
              {
                id: 'mat_slides_1',
                title: 'Apresentação em Slides — Difração de Eletrões',
                url: 'https://example.com/difracao-eletrons-slides.pdf',
                type: 'presentation',
                fileSize: '3.1 MB'
              }
            ],
            exercises: [
              {
                q: 'Se a velocidade de uma partícula com massa aumenta, o que acontece ao seu comprimento de onda de de Broglie (λ = h / (m·v))?',
                options: [
                  'O comprimento de onda diminui.',
                  'O comprimento de onda aumenta exponencialmente.',
                  'Permanece rigorosamente constante.',
                  'A massa da partícula desaparece.'
                ],
                correct: 0,
                hint: 'A velocidade v encontra-se no denominador da fração.',
                explanation: 'Como a velocidade está no denominador, quanto maior a velocidade (ou momento), menor é o comprimento de onda associado.'
              }
            ]
          }
        ]
      }
    ],
    finalProject: 'Elaboração de um artigo explicativo sobre a aplicação da superposição quântica na computação quântica moderna.'
  },
  {
    id: 'tc_ia_fullstack',
    teacherId: 'usr_prof_helena',
    teacherName: 'Prof.ª Helena Vasconcelos',
    teacherAvatar: '👩‍💻',
    teacherBio: 'Engenheira de Software e mentora de tecnologia com foco em IA generativa.',
    teacherSpecialty: 'Inteligência Artificial & Web',
    title: 'Construindo Aplicações Inteligentes com LLMs & TypeScript',
    description: 'Aprende a integrar modelos de inteligência artificial de última geração em interfaces web reativas, com prompts estruturados e segurança de dados.',
    category: 'Tecnologia & IA',
    level: 'Intermédio',
    objectives: [
      'Compreender chamadas assíncronas a APIs de IA generativa (Gemini)',
      'Construir prompts com saída estruturada JSON garantida',
      'Implementar streaming de respostas em tempo real no frontend'
    ],
    prerequisites: 'Bons conhecimentos de JavaScript ou TypeScript básico.',
    estimatedDuration: '18 Horas',
    status: 'aprovado',
    createdAt: '2026-10-30',
    updatedAt: '2026-11-02',
    enrolledCount: 215,
    averageRating: 5.0,
    reviews: [
      {
        id: 'rev_3',
        userId: 'usr_std_3',
        userName: 'Gonçalo Pereira',
        userAvatar: '💡',
        rating: 5,
        comment: 'O melhor curso de IA que já fiz! Sem rodeios e com código limpo de produção.',
        createdAt: '2026-11-05'
      }
    ],
    modules: [
      {
        id: 'mod_ia_1',
        title: 'Módulo 1 — Fundamentos de Engenharia de Prompts',
        description: 'Como instruir modelos de linguagem para obter respostas determinísticas e seguras.',
        lessons: [
          {
            id: 'tc_l_ia_1',
            title: 'Aula 1: A Arquitetura do Prompt Perfeito',
            duration: '35 min',
            content: `Um prompt profissional para IA deve ter 4 componentes indispensáveis:\n1. Papel/Persona (System Instruction): Quem o modelo deve emular.\n2. Contexto de Negócio: Os dados e limites do problema.\n3. Instrução Direta: A tarefa específica a realizar.\n4. Formato de Saída: Especificação de saída (ex: JSON Schema, Markdown restrito).\n\nEvita termos vagos como "sê inteligente". Prefira "retorna apenas um array de objetos com campos { id, titulo, duracao }".`,
            materials: [
              {
                id: 'mat_ia_code_1',
                title: 'Exemplos Práticos de Código TypeScript (Link)',
                url: 'https://github.com/mindora-teachers/ia-prompts-sample',
                type: 'link'
              }
            ],
            exercises: [
              {
                q: 'Para garantir que uma IA devolva dados prontos para consumo por uma API REST, qual formato deve ser especificado no prompt?',
                options: [
                  'Texto corrido informal sem pontuação.',
                  'JSON com esquema de validação estrito.',
                  'Imagem em formato bitmap.',
                  'Áudio gravado em estéreo.'
                ],
                correct: 1,
                hint: 'Formato padrão de interoperabilidade entre cliente e servidor web.',
                explanation: 'O formato JSON estruturado permite que o código JavaScript parseie a resposta com JSON.parse() sem erros de formatação.'
              }
            ]
          }
        ]
      }
    ]
  }
];

const INITIAL_TEACHER_SUBJECTS: TeacherSubject[] = [
  {
    id: 'ts_termodinamica_avancada',
    teacherId: 'usr_prof_alberto',
    teacherName: 'Prof. Alberto Magalhães',
    teacherAvatar: '👨‍🏫',
    title: 'Ciclo de Carnot e a Entropia Universal',
    description: 'Estudo aprofundado do rendimento térmico máximo e o conceito estatístico de entropia.',
    discipline: 'Física',
    educationLevel: 'Avançado',
    theme: 'Termodinâmica',
    objectives: [
      'Calcular o rendimento máximo de uma máquina térmica teórica de Carnot',
      'Compreender a Segunda Lei da Termodinâmica e o aumento contínuo da entropia'
    ],
    fullExplanation: `O ciclo de Carnot é um ciclo termodinâmico ideal reversível composto por duas transformações isotérmicas e duas adiabáticas.\n\nRendimento de Carnot:\nη = 1 - (T_fria / T_quente)\nOnde as temperaturas devem estar rigorosamente expressas na escala absoluta Kelvin (K).\n\nNenhuma máquina real pode ter rendimento superior a uma máquina de Carnot a operar entre as mesmas temperaturas.`,
    examples: `Exemplo de Cálculo:\nUma máquina opera entre T_quente = 600 K e T_fria = 300 K.\nη = 1 - (300 / 600) = 1 - 0.5 = 0.5 (50% de rendimento térmico teórico máximo).`,
    formulasOrCode: `η = 1 - (T_fria / T_quente)\nΔS = Q / T (Variação de Entropia)`,
    exercises: [
      {
        q: 'Se a fonte quente está a 500 K e a fonte fria a 250 K, qual é o rendimento de Carnot?',
        options: ['25%', '50%', '75%', '100%'],
        correct: 1,
        hint: '1 - (250 / 500) = 1 - 0.5.',
        explanation: 'η = 1 - 0.5 = 0.50 ou 50% de rendimento.'
      }
    ],
    summary: 'A entropia do universo aumenta continuamente em qualquer processo espontâneo real.',
    status: 'aprovado',
    createdAt: '2026-10-27',
    updatedAt: '2026-10-29',
    viewsCount: 380,
    supplementaryResources: [
      {
        id: 'res_1',
        title: 'Formulário Completo de Termodinâmica (PDF)',
        url: 'https://example.com/termodinamica-carnot.pdf',
        type: 'pdf',
        fileSize: '1.2 MB'
      }
    ]
  }
];

export class TeacherService {
  /* Helper to read/write from localStorage with fallback */
  private static get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage`, e);
    }
  }

  /* 1. TEACHER APPLICATIONS */
  static getApplications(): TeacherApplication[] {
    return this.get<TeacherApplication[]>(APPS_KEY, INITIAL_APPLICATIONS);
  }

  static getApplicationByUserId(userId: string): TeacherApplication | undefined {
    const apps = this.getApplications();
    return apps.find((a) => a.userId === userId);
  }

  static submitApplication(appData: Omit<TeacherApplication, 'id' | 'status' | 'submittedAt'>): TeacherApplication {
    const apps = this.getApplications();
    const existingIndex = apps.findIndex((a) => a.userId === appData.userId);

    const newApp: TeacherApplication = {
      ...appData,
      id: `app_${Date.now()}`,
      status: 'pendente',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    if (existingIndex >= 0) {
      apps[existingIndex] = newApp;
    } else {
      apps.push(newApp);
    }

    this.set(APPS_KEY, apps);
    return newApp;
  }

  static reviewApplication(appId: string, status: TeacherApplicationStatus, notes?: string): TeacherApplication | undefined {
    const apps = this.getApplications();
    const target = apps.find((a) => a.id === appId);
    if (target) {
      target.status = status;
      target.reviewedAt = new Date().toISOString().split('T')[0];
      if (notes) target.adminNotes = notes;
      this.set(APPS_KEY, apps);
    }
    return target;
  }

  /* 2. TEACHER COURSES */
  static getCourses(): TeacherCourse[] {
    return this.get<TeacherCourse[]>(COURSES_KEY, INITIAL_TEACHER_COURSES);
  }

  static getApprovedCourses(): TeacherCourse[] {
    return this.getCourses().filter((c) => c.status === 'aprovado');
  }

  static getCoursesByTeacher(teacherId: string): TeacherCourse[] {
    return this.getCourses().filter((c) => c.teacherId === teacherId);
  }

  static getCourseById(courseId: string): TeacherCourse | undefined {
    return this.getCourses().find((c) => c.id === courseId);
  }

  static saveCourse(courseData: Partial<TeacherCourse> & { teacherId: string; title: string }): TeacherCourse {
    const courses = this.getCourses();
    const now = new Date().toISOString().split('T')[0];

    if (courseData.id) {
      const idx = courses.findIndex((c) => c.id === courseData.id && c.teacherId === courseData.teacherId);
      if (idx >= 0) {
        const updated: TeacherCourse = {
          ...courses[idx],
          ...courseData,
          updatedAt: now
        } as TeacherCourse;
        courses[idx] = updated;
        this.set(COURSES_KEY, courses);
        return updated;
      }
    }

    // New Course
    const newCourse: TeacherCourse = {
      id: `tc_${Date.now()}`,
      teacherId: courseData.teacherId,
      teacherName: courseData.teacherName || 'Professor Mindora',
      teacherAvatar: courseData.teacherAvatar || '👨‍🏫',
      teacherBio: courseData.teacherBio || 'Educador verificado na plataforma MINDORA.',
      teacherSpecialty: courseData.teacherSpecialty || 'Educação Tecnológica',
      title: courseData.title,
      coverUrl: courseData.coverUrl || '',
      description: courseData.description || 'Curso prático criado para capacitar estudantes.',
      category: courseData.category || 'Tecnologia',
      level: courseData.level || 'Iniciante',
      objectives: courseData.objectives || ['Aprender conceitos fundamentais'],
      prerequisites: courseData.prerequisites || 'Nenhum pré-requisito necessário.',
      estimatedDuration: courseData.estimatedDuration || '10 Horas',
      modules: courseData.modules || [],
      finalProject: courseData.finalProject || '',
      status: courseData.status || 'rascunho',
      createdAt: now,
      updatedAt: now,
      enrolledCount: 0,
      reviews: [],
      averageRating: 5.0
    };

    courses.unshift(newCourse);
    this.set(COURSES_KEY, courses);
    return newCourse;
  }

  static reviewCourse(courseId: string, status: ContentStatus, rejectionReason?: string): boolean {
    const courses = this.getCourses();
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;

    course.status = status;
    course.updatedAt = new Date().toISOString().split('T')[0];
    if (rejectionReason) course.rejectionReason = rejectionReason;

    this.set(COURSES_KEY, courses);
    return true;
  }

  /* 3. TEACHER SUBJECTS */
  static getSubjects(): TeacherSubject[] {
    return this.get<TeacherSubject[]>(SUBJECTS_KEY, INITIAL_TEACHER_SUBJECTS);
  }

  static getApprovedSubjects(): TeacherSubject[] {
    return this.getSubjects().filter((s) => s.status === 'aprovado');
  }

  static getSubjectsByTeacher(teacherId: string): TeacherSubject[] {
    return this.getSubjects().filter((s) => s.teacherId === teacherId);
  }

  static saveSubject(subjectData: Partial<TeacherSubject> & { teacherId: string; title: string }): TeacherSubject {
    const subjects = this.getSubjects();
    const now = new Date().toISOString().split('T')[0];

    if (subjectData.id) {
      const idx = subjects.findIndex((s) => s.id === subjectData.id && s.teacherId === subjectData.teacherId);
      if (idx >= 0) {
        const updated: TeacherSubject = {
          ...subjects[idx],
          ...subjectData,
          updatedAt: now
        } as TeacherSubject;
        subjects[idx] = updated;
        this.set(SUBJECTS_KEY, subjects);
        return updated;
      }
    }

    const newSub: TeacherSubject = {
      id: `ts_${Date.now()}`,
      teacherId: subjectData.teacherId,
      teacherName: subjectData.teacherName || 'Professor Mindora',
      teacherAvatar: subjectData.teacherAvatar || '👨‍🏫',
      title: subjectData.title,
      description: subjectData.description || '',
      discipline: subjectData.discipline || 'Matemática',
      educationLevel: subjectData.educationLevel || 'Iniciante',
      theme: subjectData.theme || 'Conceitos Fundamentais',
      objectives: subjectData.objectives || [],
      fullExplanation: subjectData.fullExplanation || '',
      examples: subjectData.examples || '',
      formulasOrCode: subjectData.formulasOrCode || '',
      exercises: subjectData.exercises || [],
      reviewQuestions: subjectData.reviewQuestions || [],
      summary: subjectData.summary || '',
      supplementaryResources: subjectData.supplementaryResources || [],
      status: subjectData.status || 'rascunho',
      createdAt: now,
      updatedAt: now,
      viewsCount: 0
    };

    subjects.unshift(newSub);
    this.set(SUBJECTS_KEY, subjects);
    return newSub;
  }

  static reviewSubject(subjectId: string, status: ContentStatus, rejectionReason?: string): boolean {
    const subjects = this.getSubjects();
    const sub = subjects.find((s) => s.id === subjectId);
    if (!sub) return false;

    sub.status = status;
    sub.updatedAt = new Date().toISOString().split('T')[0];
    if (rejectionReason) sub.rejectionReason = rejectionReason;

    this.set(SUBJECTS_KEY, subjects);
    return true;
  }

  /* 4. ENROLLMENTS & CHILD SAFETY (NO PRIVATE SENSITIVE EXPOSURE) */
  static getEnrollments(): TeacherEnrollment[] {
    return this.get<TeacherEnrollment[]>(ENROLLMENTS_KEY, []);
  }

  static enrollStudent(studentId: string, studentName: string, courseId: string): TeacherEnrollment {
    const enrollments = this.getEnrollments();
    const existing = enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
    if (existing) return existing;

    const course = this.getCourseById(courseId);
    const newEnrollment: TeacherEnrollment = {
      id: `enr_${Date.now()}`,
      courseId,
      courseTitle: course?.title || 'Curso Mindora Teachers',
      teacherId: course?.teacherId || '',
      studentId,
      studentName, // Display name only! No email, phone, or private address exposed
      enrolledAt: new Date().toISOString().split('T')[0],
      progress: 0,
      completedLessonIds: []
    };

    enrollments.push(newEnrollment);
    this.set(ENROLLMENTS_KEY, enrollments);

    // Increment count on course
    if (course) {
      course.enrolledCount = (course.enrolledCount || 0) + 1;
      const courses = this.getCourses();
      const cIdx = courses.findIndex((c) => c.id === courseId);
      if (cIdx >= 0) courses[cIdx] = course;
      this.set(COURSES_KEY, courses);
    }

    return newEnrollment;
  }

  static getEnrollmentsByStudent(studentId: string): TeacherEnrollment[] {
    return this.getEnrollments().filter((e) => e.studentId === studentId);
  }

  static getEnrollmentsByTeacher(teacherId: string): TeacherEnrollment[] {
    return this.getEnrollments().filter((e) => e.teacherId === teacherId);
  }

  static completeLesson(studentId: string, courseId: string, lessonId: string): void {
    const enrollments = this.getEnrollments();
    const enrollment = enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
    if (!enrollment) return;

    if (!enrollment.completedLessonIds.includes(lessonId)) {
      enrollment.completedLessonIds.push(lessonId);

      const course = this.getCourseById(courseId);
      if (course) {
        let totalLessons = 0;
        course.modules.forEach((m) => {
          totalLessons += m.lessons.length;
        });
        enrollment.progress = totalLessons > 0
          ? Math.min(100, Math.round((enrollment.completedLessonIds.length / totalLessons) * 100))
          : 100;
      }
      this.set(ENROLLMENTS_KEY, enrollments);
    }
  }

  static addReview(courseId: string, review: Omit<TeacherCourseReview, 'id' | 'createdAt'>): void {
    const courses = this.getCourses();
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const newRev: TeacherCourseReview = {
      ...review,
      id: `rev_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    course.reviews = [newRev, ...(course.reviews || [])];
    const total = course.reviews.reduce((acc, r) => acc + r.rating, 0);
    course.averageRating = Number((total / course.reviews.length).toFixed(1));

    this.set(COURSES_KEY, courses);
  }

  /* 5. REPORTS & CONTENT MODERATION */
  static getReports(): ContentReport[] {
    return this.get<ContentReport[]>(REPORTS_KEY, []);
  }

  static submitReport(reportData: Omit<ContentReport, 'id' | 'reportedAt' | 'status'>): ContentReport {
    const reports = this.getReports();
    const newReport: ContentReport = {
      ...reportData,
      id: `rep_${Date.now()}`,
      reportedAt: new Date().toISOString().split('T')[0],
      status: 'pendente'
    };

    reports.unshift(newReport);
    this.set(REPORTS_KEY, reports);
    return newReport;
  }

  static resolveReport(reportId: string, status: 'resolvido' | 'descartado'): void {
    const reports = this.getReports();
    const rep = reports.find((r) => r.id === reportId);
    if (rep) {
      rep.status = status;
      this.set(REPORTS_KEY, reports);
    }
  }
}
