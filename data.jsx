// Conteúdo do portfólio em PT e EN, baseado no perfil GitHub/LinkedIn da Mayumi.
// Edite aqui livremente — não afeta a tela admin (essa é localStorage).

const PORTFOLIO_DATA = {
  pt: {
    nav: { about: "Sobre", timeline: "Trajetória", skills: "Skills", tools: "Ferramentas", projects: "Projetos", experience: "Experiência", contact: "Contato" },
    hero: {
      kicker: "AI Engineer · Cientista de Dados",
      name: "Mayumi",
      fullName: "Jessica Mayumi Schuhmacher Kogake",
      tagline: ["Construindo agentes que pensam,", "modelos que aprendem,", "e dados que contam histórias."],
      location: "Blumenau, SC — Brasil",
      cta: "Ver projetos",
    },
    about: {
      heading: "Sobre",
      paragraphs: [
        "Tenho 19 anos e sou engenheira de IA e cientista de dados — meu trabalho mora na intersecção entre matemática, código e curiosidade. Com 3 anos estudando e 1 ano aplicando na prática, construo agentes inteligentes, treino modelos de machine learning e transformo dados crus em decisões que importam.",
        "Apaixonada por IA generativa, NLP e tudo que envolve ensinar máquinas a entender o mundo. Acredito que tecnologia boa é a que serve gente — e que o próximo grande salto da indústria vai vir de quem sabe equilibrar rigor técnico com sensibilidade humana.",
      ],
      stats: [
        { value: "3+", label: "anos programando" },
        { value: "16", label: "repos públicos" },
        { value: "2", label: "graduações em curso" },
      ],
    },
    timeline: {
      heading: "Trajetória",
      subheading: "De onde vim, pra onde vou",
      events: [
        { year: "2021", title: "Primeiros passos em programação", body: "Comecei a estudar lógica e Python por conta própria. Descobri que código é uma linguagem para conversar com máquinas — e me apaixonei." },
        { year: "2022", title: "Curso Técnico em TI — IFC Blumenau", body: "Ingressei no Instituto Federal Catarinense. Fundamentos sólidos: estrutura de dados, redes, banco de dados, primeiro contato com web." },
        { year: "2023", title: "Mergulho em Data Science", body: "Pandas, NumPy, scikit-learn entraram na vida. Comecei a publicar projetos no GitHub e a entender o ciclo completo de um modelo." },
        { year: "2024", title: "Formação em Engenharia de Dados — DNC", body: "Pipelines, ETL, SQL avançado, cloud. Aprendi que dado bom é dado tratado — e que ML sem engenharia é só notebook bonito." },
        { year: "2024", title: "Conclusão do Técnico em TI", body: "Formada pelo IFC. Levei comigo a base que ainda sustenta tudo que construo." },
        { year: "2025", title: "Bacharelado em Ciência da Computação — FURB", body: "Comecei a graduação para aprofundar fundamentos: algoritmos, sistemas, teoria da computação." },
        { year: "2025", title: "Bacharelado em Ciência de Dados — FURB", body: "Em paralelo, dupla graduação. Estatística, modelagem, IA aplicada." },
        { year: "2026", title: "Construindo agentes de IA", body: "Hoje, mergulhada em LLMs, agentes autônomos, RAG e ML aplicado. O próximo capítulo está sendo escrito." },
      ],
    },
    skills: {
      heading: "Skills",
      hardTitle: "Hard Skills",
      softTitle: "Soft Skills",
      hard: [
        { name: "Python", level: 95, cat: "Linguagem" },
        { name: "Machine Learning", level: 88, cat: "IA" },
        { name: "Deep Learning", level: 80, cat: "IA" },
        { name: "TensorFlow", level: 78, cat: "Framework" },
        { name: "Pandas / NumPy", level: 92, cat: "Data" },
        { name: "SQL / MySQL", level: 85, cat: "Data" },
        { name: "LLMs & Agentes", level: 82, cat: "IA" },
        { name: "Flask / Django", level: 75, cat: "Backend" },
        { name: "Java", level: 70, cat: "Linguagem" },
        { name: "JavaScript / React", level: 72, cat: "Frontend" },
        { name: "HTML / CSS", level: 80, cat: "Frontend" },
        { name: "Engenharia de Dados", level: 78, cat: "Data" },
      ],
      soft: [
        { name: "Pensamento analítico", body: "Decompor problemas complexos em partes resolvíveis." },
        { name: "Comunicação técnica", body: "Traduzir ideias densas para quem precisa entendê-las." },
        { name: "Aprendizado contínuo", body: "Curiosidade como motor — toda tecnologia é uma porta nova." },
        { name: "Resiliência", body: "Bug que insiste, modelo que não converge — paciência é skill." },
        { name: "Colaboração", body: "Bons projetos nascem de boas conversas, não de monólogos." },
        { name: "Atenção ao detalhe", body: "Em dados, o diabo (e a beleza) mora nos detalhes." },
      ],
    },
    tools: {
      heading: "Ferramentas",
      subheading: "Stack que uso no dia a dia",
      groups: [
        { name: "Linguagens", items: ["Python", "SQL", "JavaScript"] },
        { name: "Gen AI & Agentes", items: ["LangChain", "LangGraph", "OpenAI API", "Hugging Face", "Ollama", "Groq"] },
        { name: "ML & DL", items: ["TensorFlow", "PyTorch", "scikit-learn", "XGBoost", "Transformers"] },
        { name: "Data", items: ["Pandas", "NumPy", "Jupyter", "MySQL", "PostgreSQL", "dbt"] },
        { name: "Backend", items: ["FastAPI", "Flask", "Docker", "REST APIs"] },
        { name: "Dev", items: ["Git/GitHub", "VS Code", "Linux", "Cursor"] },
      ],
    },
    projects: {
      heading: "Projetos",
      subheading: "Coisas que construí",
      empty: "Nenhum projeto publicado ainda. Em breve.",
      viewAll: "Ver no GitHub",
      defaults: [
        { id: "ml-playground", title: "ML Playground", category: "ML", tags: ["Machine Learning", "Jupyter", "Python"], description: "Espaço de experimentação prática em ML, Deep Learning e IA. Notebooks, testes de algoritmos, anotações da minha jornada de aprendizado.", link: "https://github.com/JessicaMayumi/ml-playground", featured: true, status: "publicado" },
        { id: "aumigo", title: "Aumigo", category: "Web", tags: ["Web", "HTML", "Acessibilidade"], description: "Plataforma web que facilita a adoção de pets, conectando ONGs e adotantes em uma interface simples e acolhedora.", link: "https://github.com/JessicaMayumi/Aumigo", featured: true, status: "publicado" },
        { id: "codigos-2025", title: "Códigos 2025", category: "Estudos", tags: ["Java", "Algoritmos"], description: "Repositório que documenta minha evolução em programação ao longo de 2025. Algoritmos, exercícios e projetos de aprendizado.", link: "https://github.com/JessicaMayumi/codigos_2025", featured: false, status: "publicado" },
      ],
    },
    experience: {
      heading: "Experiência",
      items: [
        { role: "Cientista de Dados & AI Engineer", company: "Projetos independentes", period: "2024 — presente", body: "Desenvolvimento de agentes com IA, modelos de Machine Learning e pipelines de dados aplicados a problemas reais." },
        { role: "Estudante & Pesquisadora", company: "FURB — Universidade Regional de Blumenau", period: "2025 — presente", body: "Dupla graduação em Ciência da Computação e Ciência de Dados. Aprofundamento em fundamentos teóricos e práticos." },
        { role: "Formação em Engenharia de Dados", company: "DNC", period: "2024", body: "Pipelines de dados, ETL, modelagem dimensional, cloud. Foco em produção de soluções reais." },
      ],
    },
    education: {
      heading: "Educação",
      items: [
        { degree: "Bacharelado em Ciência da Computação", institution: "FURB", period: "2025 — em curso", note: "Fase 3" },
        { degree: "Bacharelado em Ciência de Dados", institution: "FURB", period: "2025 — em curso", note: "Fase 1" },
        { degree: "Engenharia de Dados", institution: "DNC", period: "2024", note: "Concluído" },
        { degree: "Técnico em Tecnologia da Informação", institution: "Instituto Federal Catarinense — Blumenau", period: "2022 — 2024", note: "Concluído" },
      ],
    },
    contact: {
      heading: "Vamos conversar",
      subheading: "Aberta a colaborações, oportunidades e boas ideias",
      ctaLabel: "Me chama no email",
      links: [
        { label: "GitHub", value: "JessicaMayumi", url: "https://github.com/JessicaMayumi" },
        { label: "LinkedIn", value: "in/jessicamsk", url: "https://www.linkedin.com/in/jessicamsk" },
        { label: "Email", value: "jessicamayumi@email.com", url: "mailto:jessicamayumi@email.com" },

      ],
    },
    footer: "Feito com ❤️ por Mayumi",
  },
  en: {
    nav: { about: "About", timeline: "Journey", skills: "Skills", tools: "Tools", projects: "Projects", experience: "Experience", contact: "Contact" },
    hero: {
      kicker: "AI Engineer · Data Scientist",
      name: "Mayumi",
      fullName: "Jessica Mayumi Schuhmacher Kogake",
      tagline: ["Building agents that think,", "models that learn,", "and data that tells stories."],
      location: "Blumenau, SC — Brazil",
      cta: "See projects",
    },
    about: {
      heading: "About",
      paragraphs: [
        "I'm 19 years old, an AI engineer and data scientist — my work lives at the intersection of math, code, and curiosity. With 3 years of study and 1 year of hands-on experience, I build intelligent agents, train ML models, and turn raw data into decisions that matter.",
        "Passionate about generative AI, NLP, and everything related to teaching machines to understand the world. I believe good tech is the kind that serves people — and that the next big leap in the industry will come from those who balance technical rigor with human sensibility.",
      ],
      stats: [
        { value: "3+", label: "years coding" },
        { value: "16", label: "public repos" },
        { value: "2", label: "ongoing degrees" },
      ],
    },
    timeline: {
      heading: "Journey",
      subheading: "Where I came from, where I'm going",
      events: [
        { year: "2021", title: "First steps in programming", body: "Started learning logic and Python on my own. Discovered that code is a language to talk to machines — and fell in love." },
        { year: "2022", title: "IT Technical Degree — IFC Blumenau", body: "Joined Instituto Federal Catarinense. Solid foundations: data structures, networks, databases, first taste of web." },
        { year: "2023", title: "Diving into Data Science", body: "Pandas, NumPy, scikit-learn entered my life. Started publishing projects on GitHub and understanding the full lifecycle of a model." },
        { year: "2024", title: "Data Engineering — DNC", body: "Pipelines, ETL, advanced SQL, cloud. Learned that good data is treated data — and that ML without engineering is just a pretty notebook." },
        { year: "2024", title: "Finished IT Technical Degree", body: "Graduated from IFC. Took with me the foundation that still supports everything I build." },
        { year: "2025", title: "BSc in Computer Science — FURB", body: "Started undergrad to deepen fundamentals: algorithms, systems, theory of computation." },
        { year: "2025", title: "BSc in Data Science — FURB", body: "In parallel, double degree. Statistics, modeling, applied AI." },
        { year: "2026", title: "Building AI agents", body: "Today, deep into LLMs, autonomous agents, RAG and applied ML. The next chapter is being written." },
      ],
    },
    skills: {
      heading: "Skills",
      hardTitle: "Hard Skills",
      softTitle: "Soft Skills",
      hard: [
        { name: "Python", level: 95, cat: "Language" },
        { name: "Machine Learning", level: 88, cat: "AI" },
        { name: "Deep Learning", level: 80, cat: "AI" },
        { name: "TensorFlow", level: 78, cat: "Framework" },
        { name: "Pandas / NumPy", level: 92, cat: "Data" },
        { name: "SQL / MySQL", level: 85, cat: "Data" },
        { name: "LLMs & Agents", level: 82, cat: "AI" },
        { name: "Flask / Django", level: 75, cat: "Backend" },
        { name: "Java", level: 70, cat: "Language" },
        { name: "JavaScript / React", level: 72, cat: "Frontend" },
        { name: "HTML / CSS", level: 80, cat: "Frontend" },
        { name: "Data Engineering", level: 78, cat: "Data" },
      ],
      soft: [
        { name: "Analytical thinking", body: "Breaking complex problems into solvable pieces." },
        { name: "Technical communication", body: "Translating dense ideas for those who need to understand them." },
        { name: "Continuous learning", body: "Curiosity as fuel — every technology is a new door." },
        { name: "Resilience", body: "Stubborn bug, model that won't converge — patience is a skill." },
        { name: "Collaboration", body: "Good projects come from good conversations, not monologues." },
        { name: "Attention to detail", body: "In data, the devil (and the beauty) lives in the details." },
      ],
    },
    tools: {
      heading: "Tools",
      subheading: "Stack I use day to day",
      groups: [
        { name: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "HTML/CSS"] },
        { name: "Gen AI & Agents", items: ["LangChain", "LangGraph", "OpenAI API", "Hugging Face", "Ollama", "Groq"] },
        { name: "ML & DL", items: ["TensorFlow", "PyTorch", "scikit-learn", "XGBoost", "Transformers"] },
        { name: "Data", items: ["Pandas", "NumPy", "Jupyter", "MySQL", "PostgreSQL", "dbt"] },
        { name: "Backend", items: ["FastAPI", "Flask", "Docker", "REST APIs"] },
        { name: "Dev", items: ["Git/GitHub", "VS Code", "Linux", "Cursor"] },
      ],
    },
    projects: {
      heading: "Projects",
      subheading: "Things I've built",
      empty: "No projects published yet. Soon.",
      viewAll: "View on GitHub",
      defaults: [
        { id: "ml-playground", title: "ML Playground", category: "ML", tags: ["Machine Learning", "Jupyter", "Python"], description: "A practical experimentation space in ML, Deep Learning and AI. Notebooks, algorithm tests, notes from my learning journey.", link: "https://github.com/JessicaMayumi/ml-playground", featured: true, status: "published" },
        { id: "aumigo", title: "Aumigo", category: "Web", tags: ["Web", "HTML", "Accessibility"], description: "Web platform that facilitates pet adoption, connecting NGOs and adopters in a simple, welcoming interface.", link: "https://github.com/JessicaMayumi/Aumigo", featured: true, status: "published" },
        { id: "codigos-2025", title: "Códigos 2025", category: "Studies", tags: ["Java", "Algorithms"], description: "Repository documenting my programming evolution throughout 2025. Algorithms, exercises and learning projects.", link: "https://github.com/JessicaMayumi/codigos_2025", featured: false, status: "published" },
      ],
    },
    experience: {
      heading: "Experience",
      items: [
        { role: "Data Scientist & AI Engineer", company: "Independent projects", period: "2024 — present", body: "Developing AI agents, Machine Learning models, and data pipelines applied to real-world problems." },
        { role: "Student & Researcher", company: "FURB — Universidade Regional de Blumenau", period: "2025 — present", body: "Double degree in Computer Science and Data Science. Deepening theoretical and practical foundations." },
        { role: "Data Engineering Training", company: "DNC", period: "2024", body: "Data pipelines, ETL, dimensional modeling, cloud. Focus on shipping real solutions." },
      ],
    },
    education: {
      heading: "Education",
      items: [
        { degree: "BSc Computer Science", institution: "FURB", period: "2025 — ongoing", note: "Phase 3" },
        { degree: "BSc Data Science", institution: "FURB", period: "2025 — ongoing", note: "Phase 1" },
        { degree: "Data Engineering", institution: "DNC", period: "2024", note: "Completed" },
        { degree: "IT Technical Degree", institution: "Instituto Federal Catarinense — Blumenau", period: "2022 — 2024", note: "Completed" },
      ],
    },
    contact: {
      heading: "Let's talk",
      subheading: "Open to collaborations, opportunities and good ideas",
      ctaLabel: "Email me",
      links: [
        { label: "GitHub", value: "JessicaMayumi", url: "https://github.com/JessicaMayumi" },
        { label: "LinkedIn", value: "in/jessicamsk", url: "https://www.linkedin.com/in/jessicamsk" },
        { label: "Email", value: "jessicamayumi@email.com", url: "mailto:jessicamayumi@email.com" },

      ],
    },
    footer: "Made with ❤️ by Mayumi",
  },
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
