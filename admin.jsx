// Tela de ADMIN — cadastro de projetos com localStorage
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA, useMemo: useMemoA } = React;

const STORAGE_KEY = "mayumi_projects";
const GOALS_KEY = "mayumi_goals";

const GOAL_STATUSES = [
  { id: "proximo", label: "Próximo passo" },
  { id: "em-progresso", label: "Em progresso" },
  { id: "alcancado", label: "Alcançado ✦" },
];

function readGoals() {
  try { return JSON.parse(localStorage.getItem(GOALS_KEY) || "[]"); } catch (e) { return []; }
}
function writeGoals(list) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(list));
  window.dispatchEvent(new StorageEvent("storage", { key: GOALS_KEY }));
}
function newGoal() {
  return { id: "g_" + Date.now(), title_pt: "", title_en: "", description_pt: "", description_en: "", tag: "", status: "proximo" };
}

// Appearance manager
const APPEARANCE_KEY = "mayumi_appearance";
const APPEARANCE_DEFAULTS = { palette: "ash", typography: "geometric", theme: "dark" };
function readAppearance() {
  try { return JSON.parse(localStorage.getItem(APPEARANCE_KEY) || "null") || APPEARANCE_DEFAULTS; } catch (e) { return APPEARANCE_DEFAULTS; }
}

function AppearanceManager() {
  const [ap, setAp] = useStateA(readAppearance());
  const [saved, setSaved] = useStateA(false);
  const setA = (k, v) => setAp((d) => ({ ...d, [k]: v }));

  const save = () => {
    localStorage.setItem(APPEARANCE_KEY, JSON.stringify(ap));
    window.dispatchEvent(new StorageEvent("storage", { key: APPEARANCE_KEY }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const palettes = [
    { id: "ember", label: "Ember", color: "#ff7a59" },
    { id: "plum", label: "Plum", color: "#d18bd6" },
    { id: "sage", label: "Sage", color: "#9ec99c" },
    { id: "rose", label: "Rose", color: "#e89690" },
    { id: "ash", label: "Ash", color: "#d4d4d4" },
  ];
  const typographies = [
    { id: "editorial", label: "Fraunces", sample: "Serif óptico" },
    { id: "instrument", label: "Instrument", sample: "Serif elegante" },
    { id: "cormorant", label: "Cormorant", sample: "Garamond clássico" },
    { id: "baskerville", label: "Baskerville", sample: "Serif robusto" },
    { id: "geometric", label: "Space Grotesk", sample: "Geométrica moderna" },
    { id: "syne", label: "Syne", sample: "Display experimental" },
    { id: "dm", label: "DM Sans", sample: "Humanista limpa" },
    { id: "mono", label: "JetBrains Mono", sample: "Monospace" },
  ];
  const themes = [
    { id: "dark", label: "Escuro" },
    { id: "light", label: "Claro" },
  ];

  return (
    <div>
      <h1 className="admin-h1">Aparência</h1>
      <p className="admin-sub">Controla o visual do site público — paleta de cores, tipografia e modo claro/escuro.</p>

      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", gap: 32 }}>

        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Paleta de cores</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {palettes.map((p) => (
              <button key={p.id} onClick={() => setA("palette", p.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 18px", borderRadius: 100,
                  border: `1px solid ${ap.palette === p.id ? p.color : "var(--border)"}`,
                  background: ap.palette === p.id ? `${p.color}22` : "var(--surface)",
                  color: ap.palette === p.id ? p.color : "var(--text-2)",
                  fontFamily: "var(--font-display)", fontSize: 15,
                  transition: "all .2s",
                }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: p.color, display: "inline-block", flexShrink: 0 }}></span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Tipografia</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {typographies.map((t) => (
              <button key={t.id} onClick={() => setA("typography", t.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-start",
                  padding: "12px 16px", borderRadius: 8,
                  border: `1px solid ${ap.typography === t.id ? "var(--accent)" : "var(--border)"}`,
                  background: ap.typography === t.id ? "var(--surface-2)" : "var(--surface)",
                  color: ap.typography === t.id ? "var(--accent)" : "var(--text-2)",
                  transition: "all .2s", minWidth: 120, textAlign: "left",
                }}>
                <span style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{t.label}</span>
                <span style={{ fontSize: 10, opacity: 0.6, fontFamily: "var(--font-mono)", letterSpacing: ".05em" }}>{t.sample}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 16 }}>Modo</div>
          <div className="status-pills">
            {themes.map((t) => (
              <button key={t.id} className={`status-pill ${ap.theme === t.id ? "active" : ""}`} onClick={() => setA("theme", t.id)}>{t.label}</button>
            ))}
          </div>
        </div>

        <div>
          <button className="btn btn-primary" onClick={save}>{saved ? "✓ Salvo!" : "Aplicar ao site"}</button>
        </div>
      </div>
    </div>
  );
}

// Philosophy manager
const PHIL_KEY = "mayumi_philosophy";
function readPhil() {
  try { return JSON.parse(localStorage.getItem(PHIL_KEY) || "null") || { heading_pt: "Filosofia", heading_en: "Philosophy", text_pt: "", text_en: "" }; } catch (e) { return { heading_pt: "Filosofia", heading_en: "Philosophy", text_pt: "", text_en: "" }; }
}

function PhilosophyManager() {
  const [draft, setDraft] = useStateA(readPhil());
  const [saved, setSaved] = useStateA(false);
  const setD = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const save = () => {
    localStorage.setItem(PHIL_KEY, JSON.stringify(draft));
    window.dispatchEvent(new StorageEvent("storage", { key: PHIL_KEY }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div>
      <h1 className="admin-h1">Filosofia</h1>
      <p className="admin-sub">Texto editorial exibido como primeira seção do site, antes de "Sobre".</p>
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 28 }}>
        <div className="form-grid">
          <div className="field">
            <label>Título (PT)</label>
            <input className="input" value={draft.heading_pt} onChange={(e) => setD("heading_pt", e.target.value)} placeholder="Filosofia" />
          </div>
          <div className="field">
            <label>Título (EN)</label>
            <input className="input" value={draft.heading_en} onChange={(e) => setD("heading_en", e.target.value)} placeholder="Philosophy" />
          </div>
          <div className="field full">
            <label>Texto em Português</label>
            <textarea className="textarea" style={{ minHeight: 160 }} value={draft.text_pt} onChange={(e) => setD("text_pt", e.target.value)} placeholder={"Escreva sua filosofia, valores, visão de mundo…\n\nCada parágrafo separado por linha em branco aparece separado."} />
          </div>
          <div className="field full">
            <label>Texto em Inglês</label>
            <textarea className="textarea" style={{ minHeight: 160 }} value={draft.text_en} onChange={(e) => setD("text_en", e.target.value)} placeholder={"Write your philosophy, values, worldview…"} />
          </div>
        </div>
        <div className="admin-toolbar" style={{ marginTop: 20 }}>
          <button className="btn btn-primary" onClick={save}>{saved ? "✓ Salvo!" : "Salvar filosofia"}</button>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["LLM", "ML", "CV", "NLP", "MLOps", "Data Eng", "Web", "Outro"];
const STATUSES = [
  { id: "rascunho", label: "Rascunho" },
  { id: "publicado", label: "Publicado" },
  { id: "destaque", label: "Destaque" },
];

function readStore() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (e) { return []; }
}
function writeStore(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

function newDraft() {
  return {
    id: "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
    title: "",
    category: "LLM",
    description: "",
    tags: [],
    link: "",
    image: "",
    status: "rascunho",
    featured: false,
    createdAt: Date.now(),
  };
}

function TagInput({ tags, setTags }) {
  const [val, setVal] = useStateA("");
  const add = () => {
    const v = val.trim();
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setVal("");
  };
  return (
    <div className="tag-input-wrap">
      {tags.map((t) => (
        <span className="tag-pill" key={t}>
          {t}
          <button onClick={() => setTags(tags.filter((x) => x !== t))}>×</button>
        </span>
      ))}
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
        onBlur={add}
        placeholder="Digite e Enter…"
      />
    </div>
  );
}

function ImageUpload({ image, setImage }) {
  const inputRef = useRefA(null);
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(f);
  };
  return (
    <div
      className={`upload-zone ${image ? "has-image" : ""}`}
      onClick={() => inputRef.current?.click()}
    >
      {image ? (
        <>
          <img src={image} alt="thumb" />
          <div className="upload-overlay">Trocar imagem</div>
        </>
      ) : (
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".15em", color: "var(--text-3)", marginBottom: 8 }}>
            UPLOAD
          </div>
          <div style={{ fontSize: 14, color: "var(--text-2)" }}>
            Clique para enviar uma imagem (16:9 recomendado)
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
    </div>
  );
}

// Form (criar/editar)
function ProjectForm({ initial, onSave, onCancel }) {
  const [draft, setDraft] = useStateA(initial || newDraft());
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const isValid = draft.title.trim().length > 0;

  return (
    <div>
      <div className="form-grid">
        <div className="field full">
          <label>Título do projeto</label>
          <input className="input" value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="Ex: ML Playground" />
        </div>

        <div className="field">
          <label>Categoria</label>
          <select className="select" value={draft.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Link (GitHub, demo…)</label>
          <input className="input" value={draft.link} onChange={(e) => set("link", e.target.value)} placeholder="https://github.com/…" />
        </div>

        <div className="field full">
          <label>Descrição</label>
          <textarea className="textarea" value={draft.description} onChange={(e) => set("description", e.target.value)} placeholder="O que esse projeto resolve, tecnologias usadas, resultado…"></textarea>
        </div>

        <div className="field full">
          <label>Tags</label>
          <TagInput tags={draft.tags} setTags={(t) => set("tags", t)} />
        </div>

        <div className="field full">
          <label>Thumbnail</label>
          <ImageUpload image={draft.image} setImage={(img) => set("image", img)} />
        </div>

        <div className="field full">
          <label>Status</label>
          <div className="status-pills">
            {STATUSES.map((s) => (
              <button
                key={s.id}
                className={`status-pill ${draft.status === s.id ? "active" : ""}`}
                onClick={() => set("status", s.id)}
              >{s.label}</button>
            ))}
          </div>
        </div>

        <div className="field full">
          <label>Preview</label>
          <div className="preview-frame">
            <PreviewCard p={draft} />
          </div>
        </div>
      </div>

      <div className="admin-toolbar" style={{ marginTop: 24 }}>
        <button className="btn btn-primary" disabled={!isValid} onClick={() => onSave(draft)}>
          Salvar projeto
        </button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

function PreviewCard({ p }) {
  return (
    <article className={`project-card ${p.featured || p.status === "destaque" ? "featured" : ""}`} style={{ minHeight: 240 }}>
      <div className="project-thumb">
        {p.image ? <img src={p.image} alt="" /> : <div className="project-thumb-placeholder">— {p.title || "Sem título"} —</div>}
      </div>
      <div className="project-cat">{p.category || "Categoria"}</div>
      <h3 className="project-title">{p.title || "Título do projeto"}</h3>
      <p className="project-desc">{p.description || "Descrição aparecerá aqui…"}</p>
      <div className="project-tags">
        {(p.tags || []).map((t) => <span className="project-tag" key={t}>{t}</span>)}
      </div>
      {p.link && <a href={p.link} className="project-link" target="_blank" rel="noopener">Ver projeto ↗</a>}
    </article>
  );
}

// Lista
function ProjectsList({ list, onEdit, onDelete, onStatus }) {
  return (
    <div className="admin-list">
      {list.length === 0 && (
        <div className="empty-state">Nenhum projeto cadastrado ainda. Clique em "Novo projeto".</div>
      )}
      {list.map((p) => (
        <div className="admin-row" key={p.id}>
          <div className="admin-row-thumb">
            {p.image ? <img src={p.image} alt="" /> : <div className="admin-row-thumb-empty"></div>}
          </div>
          <div>
            <div className="admin-row-title">{p.title || "(sem título)"}</div>
            <div className="admin-row-meta">{p.category} · {p.tags.length} tags · {new Date(p.createdAt).toLocaleDateString()}</div>
          </div>
          <div className={`admin-row-status ${p.status}`}>{p.status}</div>
          <div className="admin-row-actions">
            <button className="icon-btn" title="Editar" onClick={() => onEdit(p)}>✎</button>
            <button className="icon-btn danger" title="Excluir" onClick={() => onDelete(p)}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Goals manager
function GoalsManager() {
  const [goals, setGoals] = useStateA(readGoals());
  const [editingGoal, setEditingGoal] = useStateA(null);
  const [draft, setDraft] = useStateA(newGoal());
  const setD = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const saveGoal = () => {
    if (!draft.title.trim()) return;
    let next;
    if (goals.find((g) => g.id === draft.id)) {
      next = goals.map((g) => g.id === draft.id ? draft : g);
    } else {
      next = [...goals, draft];
    }
    writeGoals(next);
    setGoals(next);
    setDraft(newGoal());
    setEditingGoal(null);
  };

  const removeGoal = (id) => {
    if (!confirm("Excluir objetivo?")) return;
    const next = goals.filter((g) => g.id !== id);
    writeGoals(next);
    setGoals(next);
  };

  const startEdit = (g) => {
    // Migra goals no formato antigo para o novo formato PT/EN
    setDraft({
      ...newGoal(),
      ...g,
      title_pt: g.title_pt || g.title || "",
      title_en: g.title_en || "",
      description_pt: g.description_pt || g.description || "",
      description_en: g.description_en || "",
    });
    setEditingGoal(g.id);
  };

  const cancelEdit = () => { setDraft(newGoal()); setEditingGoal(null); };

  const statusLabel = { "proximo": "Próximo passo", "em-progresso": "Em progresso", "alcancado": "Alcançado ✦" };

  return (
    <div>
      <h1 className="admin-h1">Objetivos</h1>
      <p className="admin-sub">O que você quer alcançar. Aparece no site público automaticamente.</p>

      {/* Form */}
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 28, marginBottom: 32 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontStyle: "italic", marginBottom: 20 }}>
          {editingGoal ? "Editar objetivo" : "Novo objetivo"}
        </h3>
        <div className="form-grid">
          <div className="field full">
            <label>Objetivo (PT)</label>
            <input className="input" value={draft.title_pt} onChange={(e) => setD("title_pt", e.target.value)} placeholder="Ex: Trabalhar com IA generativa em escala" />
          </div>
          <div className="field full">
            <label>Objetivo (EN)</label>
            <input className="input" value={draft.title_en} onChange={(e) => setD("title_en", e.target.value)} placeholder="Ex: Work with generative AI at scale" />
          </div>
          <div className="field full">
            <label>Descrição (PT)</label>
            <textarea className="textarea" style={{ minHeight: 70 }} value={draft.description_pt} onChange={(e) => setD("description_pt", e.target.value)} placeholder="Detalhe o que isso significa pra você…" />
          </div>
          <div className="field full">
            <label>Descrição (EN)</label>
            <textarea className="textarea" style={{ minHeight: 70 }} value={draft.description_en} onChange={(e) => setD("description_en", e.target.value)} placeholder="Detail what this means to you…" />
          </div>
          <div className="field">
            <label>Área / Tag</label>
            <input className="input" value={draft.tag} onChange={(e) => setD("tag", e.target.value)} placeholder="Ex: Carreira, IA, Pessoal" />
          </div>
          <div className="field">
            <label>Status</label>
            <div className="status-pills">
              {GOAL_STATUSES.map((s) => (
                <button key={s.id} className={`status-pill ${draft.status === s.id ? "active" : ""}`} onClick={() => setD("status", s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="admin-toolbar" style={{ marginTop: 20 }}>
          <button className="btn btn-primary" disabled={!draft.title_pt?.trim()} onClick={saveGoal}>
            {editingGoal ? "Salvar" : "+ Adicionar objetivo"}
          </button>
          {editingGoal && <button className="btn btn-ghost" onClick={cancelEdit}>Cancelar</button>}
        </div>
      </div>

      {/* List */}
      <div className="admin-list">
        {goals.length === 0 && <div className="empty-state">Nenhum objetivo cadastrado ainda.</div>}
        {goals.map((g) => (
          <div className="admin-row" key={g.id} style={{ gridTemplateColumns: "1fr auto auto" }}>
            <div>
              <div className="admin-row-title">{g.title_pt || g.title}</div>
              <div className="admin-row-meta">{g.tag && `${g.tag} · `}{statusLabel[g.status]}</div>
              {(g.description_pt || g.description) && <div style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>{g.description_pt || g.description}</div>}
            </div>
            <div className={`admin-row-status ${g.status === "alcancado" ? "destaque" : g.status === "em-progresso" ? "publicado" : "rascunho"}`}>
              {statusLabel[g.status]}
            </div>
            <div className="admin-row-actions">
              <button className="icon-btn" onClick={() => startEdit(g)}>✎</button>
              <button className="icon-btn danger" onClick={() => removeGoal(g.id)}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminApp() {
  const [list, setList] = useStateA(readStore());
  const [view, setView] = useStateA("dashboard"); // dashboard | new | edit | list | goals | philosophy | appearance
  const [editing, setEditing] = useStateA(null);

  // Seed inicial — popula com defaults se vazio
  useEffectA(() => {
    if (list.length === 0) {
      const seed = (window.PORTFOLIO_DATA?.pt?.projects?.defaults || []).map((p, i) => ({
        ...p,
        id: p.id || ("seed_" + i),
        createdAt: Date.now() - i * 86400000,
        tags: p.tags || [],
      }));
      if (seed.length) {
        writeStore(seed);
        setList(seed);
      }
    }
  }, []);

  const save = (draft) => {
    let next;
    if (list.find((p) => p.id === draft.id)) {
      next = list.map((p) => (p.id === draft.id ? draft : p));
    } else {
      next = [draft, ...list];
    }
    setList(next);
    writeStore(next);
    setView("list");
    setEditing(null);
  };

  const remove = (p) => {
    if (!confirm(`Excluir "${p.title}"?`)) return;
    const next = list.filter((x) => x.id !== p.id);
    setList(next);
    writeStore(next);
  };

  const stats = useMemoA(() => ({
    total: list.length,
    pub: list.filter((p) => p.status === "publicado").length,
    draft: list.filter((p) => p.status === "rascunho").length,
    feat: list.filter((p) => p.status === "destaque").length,
  }), [list]);

  return (
    <div className="admin-shell">
      <aside className="admin-side scrollbar-thin">
        <div className="admin-brand">
          <div className="admin-brand-dot"></div>
          <span>Mayumi · admin</span>
        </div>

        <div className="admin-nav">
          <button className={`admin-nav-item ${view === "dashboard" ? "active" : ""}`} onClick={() => setView("dashboard")}>
            <span>Dashboard</span>
          </button>
          <button className={`admin-nav-item ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>
            <span>Projetos</span>
            <span className="count">{list.length}</span>
          </button>
          <button className={`admin-nav-item ${view === "new" ? "active" : ""}`} onClick={() => { setEditing(null); setView("new"); }}>
            <span>+ Novo projeto</span>
          </button>
          <button className={`admin-nav-item ${view === "appearance" ? "active" : ""}`} onClick={() => setView("appearance")}>
            <span>Aparência</span>
          </button>
          <button className={`admin-nav-item ${view === "philosophy" ? "active" : ""}`} onClick={() => setView("philosophy")}>
            <span>Filosofia</span>
          </button>
          <button className={`admin-nav-item ${view === "goals" ? "active" : ""}`} onClick={() => setView("goals")}>
            <span>Objetivos ✦</span>
          </button>
        </div>

        <div className="admin-warn">
          <b>Acesso restrito</b><br />
          Esta tela é separada do site público. Os projetos com status <b>publicado</b> ou <b>destaque</b> aparecem em <code>/</code>.
        </div>

        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <a href="./index.html" className="admin-nav-item" style={{ display: "block" }}>
            ← Ver site público
          </a>
        </div>
      </aside>

      <main className="admin-main">
        {view === "dashboard" && (
          <>
            <h1 className="admin-h1">Olá, Mayumi 🌸</h1>
            <p className="admin-sub">Gerencie os projetos que aparecem no seu portfólio público.</p>

            <div className="admin-stats">
              <div className="admin-stat">
                <div className="admin-stat-label">Total</div>
                <div className="admin-stat-value">{stats.total}</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-label">Publicados</div>
                <div className="admin-stat-value accent">{stats.pub}</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-label">Rascunhos</div>
                <div className="admin-stat-value">{stats.draft}</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-label">Destaques</div>
                <div className="admin-stat-value accent">{stats.feat}</div>
              </div>
            </div>

            <div className="admin-toolbar">
              <button className="btn btn-primary" onClick={() => { setEditing(null); setView("new"); }}>
                + Novo projeto
              </button>
              <button className="btn btn-ghost" onClick={() => setView("list")}>Ver lista completa</button>
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 16, marginTop: 32 }}>
              Recentes
            </h2>
            <ProjectsList
              list={list.slice(0, 4)}
              onEdit={(p) => { setEditing(p); setView("edit"); }}
              onDelete={remove}
            />
          </>
        )}

        {view === "list" && (
          <>
            <h1 className="admin-h1">Projetos</h1>
            <p className="admin-sub">Total: {list.length}</p>
            <div className="admin-toolbar">
              <button className="btn btn-primary" onClick={() => { setEditing(null); setView("new"); }}>
                + Novo projeto
              </button>
            </div>
            <ProjectsList
              list={list}
              onEdit={(p) => { setEditing(p); setView("edit"); }}
              onDelete={remove}
            />
          </>
        )}

        {view === "appearance" && <AppearanceManager />}
        {view === "philosophy" && <PhilosophyManager />}
        {view === "goals" && <GoalsManager />}

        {(view === "new" || view === "edit") && (
          <>
            <h1 className="admin-h1">{view === "new" ? "Novo projeto" : "Editar projeto"}</h1>
            <p className="admin-sub">Preencha os campos abaixo. O preview atualiza em tempo real.</p>
            <ProjectForm
              initial={editing}
              onSave={save}
              onCancel={() => { setView("list"); setEditing(null); }}
            />
          </>
        )}
      </main>
    </div>
  );
}

Object.assign(window, { AdminApp });
