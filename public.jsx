// Componentes da tela PÚBLICA
const { useState, useEffect, useRef, useMemo } = React;

// ========== Hook: reveal on scroll ==========
function useReveal() {
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const wh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getAttribute("data-revealed") === "true") return;
        const r = el.getBoundingClientRect();
        if (r.top < wh * 0.9 && r.bottom > 0) {
          el.setAttribute("data-revealed", "true");
        }
      });
    };
    const schedule = () => {if (!raf) raf = requestAnimationFrame(check);};
    check();
    const t1 = setTimeout(check, 100);
    const t2 = setTimeout(check, 500);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t1);clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
    };
  }, []);
}

// ========== Cursor custom ==========
function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx = window.innerWidth / 2,my = window.innerHeight / 2;
    let rx = mx,ry = my;
    const onMove = (e) => {mx = e.clientX;my = e.clientY;dot.style.left = mx + "px";dot.style.top = my + "px";};
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);
    const onOver = (e) => {
      const t = e.target.closest("a, button, .stat, .tool-chip, .soft-item, .exp-item, .project-card, .tl-event");
      document.body.classList.toggle("hovering-link", !!t);
    };
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      dot.remove();ring.remove();
    };
  }, []);
  return null;
}

// ========== Scroll progress ==========
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      if (el) el.style.width = p + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" ref={ref}></div>;
}

// ========== Petals (sakura falling) ==========
function Petals({ count = 14 }) {
  return (
    <div className="petals">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const dur = 12 + Math.random() * 14;
        const tx = (Math.random() - 0.5) * 300;
        const size = 8 + Math.random() * 12;
        return (
          <div
            key={i}
            className="petal"
            style={{
              left: `${left}vw`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              "--tx": `${tx}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.3 + Math.random() * 0.4
            }} />);


      })}
    </div>);

}

// ========== Typewriter ==========
function Typewriter({ lines, speed = 38, startDelay = 400 }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const spans = root.querySelectorAll("[data-tw]");
    spans.forEach((s) => {s.textContent = "\u00A0";s.classList.remove("cursor-blink");});
    let i = 0,j = 0,timer = 0,cancelled = false;
    const tick = () => {
      if (cancelled) return;
      if (i >= lines.length) {
        spans.forEach((s) => s.classList.remove("cursor-blink"));
        return;
      }
      const cur = lines[i];
      const span = spans[i];
      if (!span) return;
      spans.forEach((s, k) => s.classList.toggle("cursor-blink", k === i));
      if (j < cur.length) {
        span.textContent = cur.slice(0, j + 1);
        j++;
        timer = setTimeout(tick, speed);
      } else {
        i++;j = 0;
        timer = setTimeout(tick, 280);
      }
    };
    timer = setTimeout(tick, startDelay);
    return () => {cancelled = true;clearTimeout(timer);};
  }, [lines.join("|")]);
  return (
    <div className="hero-tagline" ref={containerRef}>
      {lines.map((_, i) =>
      <span key={i} data-tw>{"\u00A0"}</span>
      )}
    </div>);

}

// ========== Hero name with letter-by-letter ==========
function AnimatedName({ name }) {
  return (
    <h1 className="hero-name">
      {name.split("").map((ch, i) =>
      <span key={i} className="letter" style={{ animationDelay: `${0.05 + i * 0.08}s` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      )}
    </h1>);

}

// ========== Hero ==========
function Hero({ data, lang, onCta }) {
  const now = new Date();
  const dt = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-corner">
          <div>v.2026 / <b>portfolio</b></div>
          <div>{dt}</div>
        </div>
        <div className="hero-grid">
          <div className="hero-flower hero-flower-1">✿</div>
          <div className="hero-flower hero-flower-2">❀</div>
          <div className="hero-kicker reveal">{data.kicker}</div>
          <AnimatedName name={data.name} />
          <Typewriter lines={data.tagline} />
          <div className="hero-bottom reveal reveal-delay-3">
            <div className="hero-meta">
              <div>{lang === "pt" ? "NOME" : "NAME"} · <b>{data.fullName}</b></div>
              <div>{lang === "pt" ? "LOCALIZAÇÃO" : "BASED IN"} · <b>{data.location}</b></div>
            </div>
            <a href="#projects" className="hero-cta" onClick={(e) => {e.preventDefault();onCta();}}>
              {data.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>);

}

// ========== Marquee ==========
function Marquee({ lang }) {
  const items = lang === "pt" ?
  ["código que pensa", "dados que falam", "modelos que aprendem", "agentes autônomos", "matemática viva", "curiosidade aplicada"] :
  ["code that thinks", "data that speaks", "models that learn", "autonomous agents", "living math", "applied curiosity"];
  const all = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((t, i) =>
        <React.Fragment key={i}>
            <span>{t}</span>
            <span className="flower">✿</span>
          </React.Fragment>
        )}
      </div>
    </div>);

}

// ========== About ==========
function About({ data }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-kicker reveal">01 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">
          {data.heading} <em>—</em>
        </h2>
        <div className="about-grid">
          <div className="about-text">
            {data.paragraphs.map((p, i) =>
            <p key={i} className={`reveal reveal-delay-${Math.min(i + 1, 3)}`}>{p}</p>
            )}
          </div>
          <div className="stats reveal reveal-delay-2">
            {data.stats.map((s, i) =>
            <div className="stat" key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ========== Timeline ==========
function Timeline({ data }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.6;
      const end = -rect.height + window.innerHeight * 0.4;
      const t = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setProgress(t);
      const items = el.querySelectorAll(".tl-event");
      let last = -1;
      items.forEach((it, i) => {
        const r = it.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.5) last = i;
      });
      setActiveIdx(last);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section" id="timeline">
      <div className="container">
        <div className="section-kicker reveal">02 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">{data.heading}</h2>
        <p className="section-sub reveal reveal-delay-2">{data.subheading}</p>
        <div className="timeline" ref={ref}>
          <div className="timeline-progress" style={{ height: `${progress * 100}%` }}></div>
          {data.events.map((ev, i) =>
          <div className={`tl-event reveal ${i <= activeIdx ? "active" : ""}`} key={i}>
              <div className="tl-year">{ev.year}</div>
              <h3 className="tl-title">{ev.title}</h3>
              <p className="tl-body">{ev.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ========== Skills ==========
function Skills({ data }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {setAnimated(true);io.disconnect();}},
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <div className="section-kicker reveal">03 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">{data.heading}</h2>
        <div className="skills-grid">
          <div className="reveal reveal-delay-1">
            <div className="skills-block-title">
              <span>{data.hardTitle}</span>
              <span>✦ {data.hard.length}</span>
            </div>
            <div className="hard-list">
              {data.hard.map((s, i) =>
              <div className="hard-item" key={i}>
                  <div className="hard-name">{s.name}</div>
                  <div className="hard-bar">
                    <div className="hard-bar-fill" style={{
                    width: animated ? `${s.level}%` : "0%",
                    transitionDelay: `${i * 60}ms`
                  }}></div>
                  </div>
                  <div className="hard-cat">{s.cat}</div>
                </div>
              )}
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="skills-block-title">
              <span>{data.softTitle}</span>
              <span>✦ {data.soft.length}</span>
            </div>
            <div className="soft-list">
              {data.soft.map((s, i) =>
              <div className="soft-item" key={i}>
                  <div className="soft-name">{s.name}</div>
                  <div className="soft-body">{s.body}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ========== Tools ==========
function Tools({ data }) {
  return (
    <section className="section" id="tools">
      <div className="container">
        <div className="section-kicker reveal">04 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">{data.heading}</h2>
        <p className="section-sub reveal reveal-delay-2">{data.subheading}</p>
        <div className="tools-groups">
          {data.groups.map((g, i) =>
          <div className="tools-group reveal" key={i}>
              <div className="tools-group-name">{g.name}</div>
              <div className="tools-list">
                {g.items.map((t) =>
              <div className="tool-chip" key={t}>{t}</div>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ========== Projects ==========
function ProjectCard({ p, lang }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(e.clientX - r.left) / r.width * 100}%`);
    el.style.setProperty("--my", `${(e.clientY - r.top) / r.height * 100}%`);
  };
  return (
    <article className={`project-card reveal ${p.featured ? "featured" : ""}`} ref={ref} onMouseMove={onMove}>
      <div className="project-thumb">
        {p.image ? <img src={p.image} alt={p.title} /> :
        <div className="project-thumb-placeholder">— {p.title} —</div>
        }
      </div>
      <div className="project-cat">{p.category}</div>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.description}</p>
      <div className="project-tags">
        {p.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}
      </div>
      {p.link &&
      <a href={p.link} target="_blank" rel="noopener" className="project-link">
          {lang === "pt" ? "Ver projeto" : "View project"} ↗
        </a>
      }
    </article>);

}

function Projects({ data, lang }) {
  const [stored, setStored] = useState([]);
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("mayumi_projects");
        const list = raw ? JSON.parse(raw) : [];
        setStored(list.filter((p) => p.status === "publicado" || p.status === "published" || p.status === "destaque" || p.status === "featured"));
      } catch (e) {setStored([]);}
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const all = stored.length > 0 ? stored : data.defaults;

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-kicker reveal">05 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">{data.heading}</h2>
        <p className="section-sub reveal reveal-delay-2">{data.subheading}</p>
        {all.length === 0 ?
        <div className="empty-state">{data.empty}</div> :

        <div className="projects-grid">
            {all.map((p, i) => <ProjectCard p={p} lang={lang} key={p.id || i} />)}
          </div>
        }
        <div style={{ marginTop: 32 }}>
          <a href="https://github.com/JessicaMayumi" target="_blank" rel="noopener" className="project-link">
            {data.viewAll} ↗
          </a>
        </div>
      </div>
    </section>);

}

// ========== Philosophy Section ==========
function Philosophy({ lang }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("mayumi_philosophy");
        setData(raw ? JSON.parse(raw) : null);
      } catch (e) { setData(null); }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  if (!data) return null;
  const text = lang === "pt" ? data.text_pt : data.text_en;
  const heading = lang === "pt" ? (data.heading_pt || "Filosofia") : (data.heading_en || "Philosophy");
  if (!text) return null;

  return (
    <section className="section philosophy-section" id="philosophy">
      <div className="container">
        <div className="section-kicker reveal">// {heading}</div>
        <div className="philosophy-body reveal reveal-delay-1">
          {text.split("\n").filter(Boolean).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== Goals Section ==========
function Goals({ lang }) {
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("mayumi_goals");
        setGoals(raw ? JSON.parse(raw) : []);
      } catch (e) { setGoals([]); }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  if (goals.length === 0) return null;

  const statusColors = {
    "em-progresso": { label: lang === "pt" ? "Em progresso" : "In progress", color: "var(--secondary)" },
    "proximo": { label: lang === "pt" ? "Próximo passo" : "Next step", color: "var(--accent-soft)" },
    "alcancado": { label: lang === "pt" ? "Alcançado ✦" : "Achieved ✦", color: "var(--accent)" },
  };

  return (
    <section className="section" id="goals">
      <div className="container">
        <div className="section-kicker reveal">
          {lang === "pt" ? "// O que quero alcançar" : "// What I want to achieve"}
        </div>
        <h2 className="section-heading reveal reveal-delay-1">
          {lang === "pt" ? <>Objetivos<em>.</em></> : <>Goals<em>.</em></>}
        </h2>
        <div className="goals-grid">
          {goals.map((g, i) => {
            const st = statusColors[g.status] || statusColors["proximo"];
            const title = lang === "pt" ? (g.title_pt || g.title) : (g.title_en || g.title_pt || g.title);
            const desc = lang === "pt" ? (g.description_pt || g.description) : (g.description_en || g.description_pt || g.description);
            return (
              <div className={`goal-card reveal reveal-delay-${(i % 3) + 1}`} key={g.id || i}>
                <div className="goal-status" style={{ color: st.color }}>
                  <span className="goal-dot" style={{ background: st.color }}></span>
                  {st.label}
                </div>
                <h3 className="goal-title">{title}</h3>
                {desc && <p className="goal-desc">{desc}</p>}
                {g.tag && <div className="goal-tag">{g.tag}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Experience({ data }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-kicker reveal">06 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">{data.heading}</h2>
        <div className="exp-list">
          {data.items.map((it, i) =>
          <div className="exp-item reveal" key={i}>
              <div className="exp-period">{it.period}</div>
              <div>
                <h3 className="exp-role">{it.role}</h3>
                <div className="exp-company">{it.company}</div>
                <p className="exp-body">{it.body}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ========== Education ==========
function Education({ data }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-kicker reveal">07 / {data.heading}</div>
        <h2 className="section-heading reveal reveal-delay-1">{data.heading}</h2>
        <div className="exp-list">
          {data.items.map((it, i) =>
          <div className="exp-item reveal" key={i}>
              <div className="exp-period">{it.period}</div>
              <div>
                <h3 className="exp-role">{it.degree}</h3>
                <div className="exp-company">{it.institution}</div>
                <p className="exp-note">{it.note}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ========== Contact ==========
function Contact({ data, lang }) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-kicker reveal">08 / {lang === "pt" ? "Contato" : "Contact"}</div>
        <div className="contact-block">
          <h2 className="contact-heading reveal">
            {lang === "pt" ? <>Vamos <em>conversar</em>?</> : <>Let's <em>talk</em>?</>}
          </h2>
          <p className="contact-sub reveal reveal-delay-1">{data.subheading}</p>
          <div className="contact-cards">
            {data.links.map((l, i) => {
              const icon = l.label.toLowerCase().includes("email") || l.label.toLowerCase().includes("mail") ? "✉" :
              l.label.toLowerCase().includes("local") ? "✿" :
              l.label.toLowerCase().includes("github") ? "◆" :
              l.label.toLowerCase().includes("linkedin") ? "❋" :
              "✦";
              const inner =
              <>
                  <div className="cc-icon">{icon}</div>
                  <div className="cc-label">{l.label}</div>
                  <div className="cc-value">{l.value}</div>
                </>;

              return l.url ?
              <a key={i} href={l.url} target="_blank" rel="noopener" className="contact-card reveal">{inner}</a> :

              <div key={i} className="contact-card reveal">{inner}</div>;

            })}
          </div>
        </div>
      </div>
    </section>);

}

// ========== Footer ==========
function SiteFooter({ lang, contactLinks }) {
  const quote = lang === "pt" ?
  <>Vamos <em>conversar</em>?</> :
  <>Let's <em>talk</em>?</>;
  const sub = lang === "pt" ?
  "Aberta a colaborações, oportunidades e boas ideias." :
  "Open to collaborations, opportunities and good ideas.";
  const tagline = lang === "pt" ?
  "Tecnologia boa transforma vidas. O resto é só ruído bonito." :
  "Good tech transforms lives. Everything else is just pretty noise.";
  // SVG icons
  const icons = {
    github: <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" /></svg>,
    linkedin: <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>,
    email: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
    location: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
  };
  const iconFor = (label) => {
    const k = label.toLowerCase();
    if (k.includes("github")) return icons.github;
    if (k.includes("linkedin")) return icons.linkedin;
    if (k.includes("mail") || k.includes("email")) return icons.email;
    if (k.includes("local")) return icons.location;
    return icons.email;
  };
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-quote-block reveal">
          <h2 className="footer-headline">
            {lang === "pt" ? <>Vamos <em>conversar?</em></> : <>Let's <em>talk?</em></>}
          </h2>
          <p className="footer-sub">{sub}</p>
          <p className="footer-tagline" style={{ width: "1200px" }}>{tagline}</p>
        </div>

        <div className="footer-contacts">
          {contactLinks.filter((l) => l.url && !l.label.toLowerCase().includes("local")).map((l, i) => {
            // Extract nickname from value (strip @, in/, mailto, etc)
            let nick = l.value;
            if (l.label.toLowerCase().includes("github")) nick = l.value.replace(/^@/, "");
            if (l.label.toLowerCase().includes("linkedin")) nick = l.value.replace(/^in\//, "@");
            const inner =
            <>
                <div className="fc-icon">{iconFor(l.label)}</div>
                <div className="fc-value">{nick}</div>
              </>;

            return l.url ?
            <a key={i} href={l.url} target="_blank" rel="noopener" className="footer-contact reveal">{inner}</a> :

            <div key={i} className="footer-contact reveal">{inner}</div>;

          })}
        </div>

        <div className="footer-big">Mayumi ✿</div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} · Jessica Mayumi Schuhmacher Kogake</div>
          <div className="center">
            {lang === "pt" ? "feito com" : "made with"}{" "}
            <span className="footer-heart">❤</span>{" "}
            {lang === "pt" ? "por May" : "by May"}
          </div>
          <div className="right">
            <a href="https://github.com/JessicaMayumi" target="_blank" rel="noopener">github</a>
            {" · "}
            <a href="https://www.linkedin.com/in/jessicamsk" target="_blank" rel="noopener">linkedin</a>
          </div>
        </div>
      </div>
    </footer>);

}

// ========== Nav ==========
function Nav({ data, lang, setLang, sections }) {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const onScroll = () => {
      let cur = "hero";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const links = [
  { id: "about", label: data.about },
  { id: "timeline", label: data.timeline },
  { id: "skills", label: data.skills },
  { id: "projects", label: data.projects },
  { id: "contact", label: lang === "pt" ? "Contato" : "Contact" }];


  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-brand-flower">✿</span>
        <span>Mayumi</span>
      </div>
      <div className="nav-links">
        {links.map((l) =>
        <a key={l.id} href={`#${l.id}`} className={`nav-link ${active === l.id ? "active" : ""}`}>
            {l.label}
          </a>
        )}
      </div>
      <div className="lang-toggle">
        <button className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT</button>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>
    </nav>);

}

// ========== Public Site ==========
function PublicSite({ tweaks = {} }) {
  const [lang, setLang] = useState(() => localStorage.getItem("mayumi_lang") || "pt");
  useEffect(() => {localStorage.setItem("mayumi_lang", lang);}, [lang]);
  const data = window.PORTFOLIO_DATA[lang];
  useReveal();

  const onCta = () => {
    const el = document.getElementById("projects");
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <div className="ambient">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <Petals count={12} />
      <Nav data={data.nav} lang={lang} setLang={setLang} sections={["hero", "about", "timeline", "skills", "tools", "projects", "experience", "education", "contact"]} />
      <main>
        <Hero data={data.hero} lang={lang} onCta={onCta} />
        <Marquee lang={lang} />
        <Philosophy lang={lang} />
        <About data={data.about} />
        <Timeline data={data.timeline} />
        <Skills data={data.skills} />
        <Tools data={data.tools} />
        <Projects data={data.projects} lang={lang} />
        <Goals lang={lang} />
        <Experience data={data.experience} />
        <Education data={data.education} />
      </main>
      <SiteFooter lang={lang} contactLinks={data.contact.links} />
    </>);

}

Object.assign(window, { PublicSite });