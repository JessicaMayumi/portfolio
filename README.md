# Portfólio · Jessica Mayumi

Portfólio pessoal de **Jessica Mayumi Schuhmacher Kogake** — AI Engineer & Cientista de Dados.

🔗 **[Ver ao vivo](https://jessicamayumi.github.io/portfolio)**

---

## Estrutura

```
portfolio/
├── index.html          # Site público (entry point)
├── admin.html          # Painel admin (entry point)
├── src/
│   ├── data.jsx        # Conteúdo do portfólio (PT/EN)
│   ├── public.jsx      # Componente do site público
│   ├── admin.jsx       # Componente do painel admin
│   └── tweaks-panel.jsx
├── assets/
│   ├── styles.css      # Estilos globais
│   └── uploads/        # Imagens e mídias
└── dist/               # Versões standalone compiladas
    ├── portfolio-standalone.html
    └── admin-standalone.html
```

## Stack

- **React 18** via CDN (sem build step)
- **Babel Standalone** — JSX no browser
- **CSS puro** — sem frameworks

## Como rodar localmente

Qualquer servidor HTTP serve. Exemplos:

```bash
# Python
python3 -m http.server 3000

# Node
npx serve .
```

Acesse `http://localhost:3000`.

> ⚠️ Não abrir `index.html` direto no browser — o carregamento de `.jsx` por `<script src>` requer servidor HTTP.

## Customização

Todo o conteúdo fica em `src/data.jsx`. Edite lá para atualizar textos, projetos e habilidades.

O painel admin (`/admin.html`) permite ajustar aparência via localStorage — sem deploy necessário.

## Deploy

GitHub Pages via GitHub Actions — push em `main` publica automaticamente em `gh-pages`.

---

> Construindo agentes que pensam, modelos que aprendem, e dados que contam histórias.
