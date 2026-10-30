import React, { useEffect, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Code2, Braces, Palette, Zap,
  Layers3, Sparkles, MousePointer2, MonitorSmartphone
} from 'lucide-react';

const FORM_URL = 'https://forms.gle/o14rbRFGixwhGPrk9';

function NexusLogo() {
  return (
    <div className="brand">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a5f2ff" />
            <stop offset=".5" stopColor="#328dff" />
            <stop offset="1" stopColor="#9c85ff" />
          </linearGradient>
        </defs>
        <path d="M7 8.5 19 15.5V25L7 18.1V8.5Z" fill="url(#brandGradient)" />
        <path d="M41 39.5 29 32.5V23l12 6.9v9.6Z" fill="url(#brandGradient)" />
        <path d="M7 39V8.5l34 31V8.8L29 15.7v9.4L19 32.2v-9.4L7 39Z"
          fill="none" stroke="url(#brandGradient)" strokeWidth="4.2" strokeLinejoin="round" />
      </svg>
      <span>NEXUS</span>
    </div>
  );
}

function PageNavigation({ page, setPage }) {
  return (
    <nav className="page-nav" aria-label="Page navigation">
      <button className={page === 0 ? 'page-number selected' : 'page-number'} onClick={() => setPage(0)}>
        <span>01</span><i />
      </button>
      <span className="nav-line" />
      <button className={page === 1 ? 'page-number selected' : 'page-number'} onClick={() => setPage(1)}>
        <span>02</span><i />
      </button>
    </nav>
  );
}

function TechOrbit() {
  return (
    <div className="tech-orbit" aria-label="HTML, CSS, JavaScript and React">
      <div className="orbit-track orbit-a" />
      <div className="orbit-track orbit-b" />
      <div className="orbit-track orbit-c" />
      <div className="core-glow">
        <div className="core-logo"><Code2 size={76} strokeWidth={1.5} /></div>
        <span className="core-caption">THE WEB UNIVERSE</span>
      </div>
      <div className="tech-node html-node"><b>5</b><span>HTML</span></div>
      <div className="tech-node css-node"><b>#</b><span>CSS</span></div>
      <div className="tech-node js-node"><b>JS</b><span>JAVASCRIPT</span></div>
      <div className="tech-node react-node"><b>⚛</b><span>REACT</span></div>
      <span className="tiny-star star-a" /><span className="tiny-star star-b" />
      <span className="tiny-star star-c" /><span className="tiny-star star-d" />
    </div>
  );
}

const topics = [
  { number: '01', name: 'HTML', subtitle: 'Structure the web', description: 'Build the foundation of every web page with semantic elements and clean structure.', icon: Code2, color: 'orange', tag: 'THE STRUCTURE' },
  { number: '02', name: 'CSS', subtitle: 'Bring ideas to life', description: 'Create beautiful layouts, responsive designs, colors, motion and visual experiences.', icon: Palette, color: 'blue', tag: 'THE STYLE' },
  { number: '03', name: 'JavaScript', subtitle: 'Make it interactive', description: 'Add logic, behavior and dynamic interactions that make websites come alive.', icon: Braces, color: 'yellow', tag: 'THE LOGIC' },
  { number: '04', name: 'React', subtitle: 'Build modern interfaces', description: 'Create reusable components and powerful user interfaces with a modern UI library.', icon: Layers3, color: 'cyan', tag: 'THE COMPONENTS' }
];

export default function App() {
  const [page, setPage] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const [voiceFinished, setVoiceFinished] = useState(false);
  const [voiceBlocked, setVoiceBlocked] = useState(false);
  const welcomeMessage = 'Welcome to NEXUS.';

  const playWelcomeVoice = () => {
    if (!('speechSynthesis' in window)) { setVoiceBlocked(true); setVoiceFinished(true); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(welcomeMessage);
    utterance.lang = 'en-US'; utterance.rate = 0.88; utterance.pitch = 0.92;
    utterance.onstart = () => { setSpeaking(true); setVoiceBlocked(false); };
    utterance.onend = () => { setSpeaking(false); setVoiceFinished(true); };
    utterance.onerror = () => { setSpeaking(false); setVoiceBlocked(true); setVoiceFinished(true); };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (page !== -1) return undefined;
    const timer = window.setTimeout(playWelcomeVoice, 2300);
    return () => { window.clearTimeout(timer); window.speechSynthesis?.cancel(); };
  }, [page]);

  const enterJourney = () => { window.speechSynthesis?.cancel(); setPage(0); };

  return (
    <main className={`site-shell ${page === 1 ? 'second-page' : page === 0 ? 'first-page' : 'welcome-page'}`}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      {page !== -1 && <header className="site-header"><NexusLogo /><div className="header-label"><span className="status-dot" /> FRONTEND DEVELOPMENT JOURNEY</div></header>}

      <section className={`cinematic-welcome ${page === -1 ? 'screen-active' : 'screen-hidden'}`} aria-hidden={page !== -1}>
        <div className="welcome-grain" /><div className="welcome-light welcome-light-blue" /><div className="welcome-light welcome-light-violet" />
        <div className="welcome-centerpiece">
          <div className="welcome-kicker">THE FUTURE IS YOURS TO CREATE</div>
          <h1 className="cinematic-title">Welcome to <span>NEXUS</span><i>.</i></h1>
          <div className="title-underline" />
          <p className="cinematic-subtitle">A NEW WORLD OF FRONTEND DEVELOPMENT</p>
          <div className="cinematic-audio-state">
            <span className={`audio-pulse ${speaking ? 'is-speaking' : ''}`}><i /><i /><i /><i /><i /></span>
            <span>{speaking ? 'WELCOME MESSAGE PLAYING' : voiceFinished ? (voiceBlocked ? 'SOUND BLOCKED — PLAY IT HERE' : 'WELCOME MESSAGE COMPLETE') : 'PREPARING YOUR EXPERIENCE'}</span>
          </div>
          {voiceFinished && <div className="welcome-actions">
            {voiceBlocked && <button className="replay-voice" onClick={playWelcomeVoice}>PLAY VOICE AGAIN</button>}
            <button className="cinematic-enter" onClick={enterJourney}>ENTER NEXUS <ArrowRight size={17} /></button>
          </div>}
        </div>
        <div className="cinematic-corner corner-left">NEXUS / 001</div><div className="cinematic-corner corner-right">LEARN · CREATE · BUILD</div>
      </section>

      <section className={`screen splash-screen ${page === 0 ? 'screen-active' : 'screen-hidden'}`} aria-hidden={page !== 0}>
        <div className="splash-copy">
          <div className="eyebrow"><Sparkles size={15} /> YOUR CREATIVE JOURNEY STARTS HERE</div>
          <h1>CREATE THE<br /><span>WEB</span> EXPERIENCE.</h1>
          <p className="splash-description">From your first line of code to interactive digital experiences.<br className="desktop-only" /> Discover the tools that bring the web to life.</p>
          <div className="stack-chips">
            <span className="chip chip-html">HTML</span><span className="chip chip-css">CSS</span>
            <span className="chip chip-js">JavaScript</span><span className="chip chip-react">React</span>
          </div>
          <button className="primary-button" onClick={() => setPage(1)}>
            Let's Start <ArrowRight size={20} />
          </button>
          <div className="scroll-hint"><span className="scroll-line" /> EXPLORE THE POSSIBILITIES</div>
        </div>
        <TechOrbit />
        <div className="splash-bottom-note"><span>01 / 02</span><span>DESIGN · CODE · CREATE</span></div>
      </section>

      <section className={`screen intro-screen ${page === 1 ? 'screen-active' : 'screen-hidden'}`} aria-hidden={page !== 1}>
        <div className="intro-heading">
          <div className="eyebrow"><Sparkles size={15} /> THE FRONTEND TOOLKIT</div>
          <h2>One journey.<br /><span>Four powerful tools.</span></h2>
          <p>Everything you need to start creating for the web.</p>
        </div>
        <div className="topic-grid">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article className={`topic-card ${topic.color}`} key={topic.number}>
                <div className="topic-top"><span>{topic.number} / 04</span><span className="topic-tag">{topic.tag}</span></div>
                <div className="topic-icon"><Icon size={35} strokeWidth={1.7} /></div>
                <h3>{topic.name}</h3>
                <h4>{topic.subtitle}</h4>
                <p>{topic.description}</p>
              </article>
            );
          })}
        </div>
        <div className="intro-footer">
          <div className="hand-note"><MousePointer2 size={19} /> No experience needed. Just curiosity.</div>
          <button className="form-button" onClick={() => window.open(FORM_URL, '_blank', 'noopener,noreferrer')}>
            <span><strong>Fill the Form Now</strong><small>Take your first step with NEXUS</small></span>
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="bottom-caption"><MonitorSmartphone size={15} /> LEARN · PRACTICE · BUILD</div>
      </section>

      {page !== -1 && <PageNavigation page={page} setPage={setPage} />}
    </main>
  );
}