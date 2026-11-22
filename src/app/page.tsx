"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "ml" | "web">("all");

  // Rotating typing phrases
  const phrases = [
    "Data Science & AI Enthusiast",
    "Machine Learning Researcher",
    "Full-Stack Web Developer",
    "UIU CSE Graduate (CGPA 3.88)",
    "Building Intelligent Solutions",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setTypedText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // Scroll listener & reveal observer
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Intersection observer for .reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#thesis", label: "Research" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* ─── CV Modal ──────────────────────────────────────────────────────── */}
      {showCvModal && (
        <div className="cv-modal-overlay" onClick={() => setShowCvModal(false)}>
          <div className="cv-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="cv-modal-header">
              <span className="cv-modal-title">Md. Nazmul Haque Fahim — Curriculum Vitae</span>
              <div className="cv-modal-actions">
                <a
                  href="/my_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-modal-btn cv-modal-btn-external"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Open External
                </a>
                <a
                  href="/my_cv.pdf"
                  download="Nazmul_Haque_Fahim_CV.pdf"
                  className="cv-modal-btn cv-modal-btn-download"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download PDF
                </a>
                <button
                  className="cv-modal-close"
                  onClick={() => setShowCvModal(false)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="cv-modal-body">
              <iframe
                src="/my_cv.pdf#toolbar=1"
                className="cv-modal-iframe"
                title="Curriculum Vitae"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── Navbar ────────────────────────────────────────────────────────── */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar-inner">
          <a href="#hero" className="navbar-logo" id="nav-logo">
            Fahim
          </a>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="navbar-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar-actions">
            <button
              onClick={() => setShowCvModal(true)}
              className="btn btn-outline"
              style={{ padding: "0.45rem 1rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              View CV
            </button>
            <a
              href="/my_cv.pdf"
              download="Nazmul_Haque_Fahim_CV.pdf"
              className="btn btn-primary navbar-cta"
              id="nav-cv-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>

            <button
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowCvModal(true);
              }}
              className="btn btn-outline"
              style={{ width: "100%" }}
            >
              View CV
            </button>
            <a
              href="/my_cv.pdf"
              download="Nazmul_Haque_Fahim_CV.pdf"
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Download CV
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── Hero Section ──────────────────────────────────────────────────── */}
        <section id="hero" className="hero section">
          <div className="hero-grid" aria-hidden="true"></div>
          <div className="container">
            <div className="hero-layout">
              {/* Text content */}
              <div className="hero-content">
                <div className="hero-badge" id="hero-badge">
                  <span className="hero-badge-dot" aria-hidden="true"></span>
                  Open to opportunities
                </div>

                <h1 className="hero-name" id="hero-name">
                  Md. Nazmul
                  <br />
                  <span className="hero-name-gradient">Haque Fahim</span>
                </h1>

                <p className="hero-title" id="hero-title" aria-live="polite">
                  <span className="typed-text">{typedText}</span>
                  <span className="cursor" aria-hidden="true"></span>
                </p>

                <p className="hero-desc" id="hero-desc">
                  I&apos;m a Computer Science &amp; Engineering graduate from{" "}
                  <strong style={{ color: "var(--clr-violet-light)" }}>
                    United International University (UIU)
                  </strong>{" "}
                  with an outstanding{" "}
                  <strong style={{ color: "var(--clr-cyan)" }}>CGPA of 3.88 / 4.00</strong>.
                  Passionate about{" "}
                  <strong style={{ color: "var(--clr-cyan)" }}>Data Science, Machine Learning, and AI</strong>,
                  I led undergraduate research on video-based{" "}
                  <strong style={{ color: "var(--clr-violet-light)" }}>
                    Bangla Sign Language Recognition
                  </strong>{" "}
                  using Transformers (94.28% accuracy). I also build full-stack web and desktop applications,
                  combining strong technical skills, strategic thinking, and leadership to deliver real-world impact.
                </p>

                <div className="hero-actions">
                  <a href="#projects" className="btn btn-primary" id="hero-view-projects">
                    View Projects
                  </a>
                  <button
                    className="btn btn-outline"
                    id="hero-view-cv"
                    onClick={() => setShowCvModal(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: "0.4rem" }}
                    >
                      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                    View CV
                  </button>
                  <a
                    href="/my_cv.pdf"
                    download="Nazmul_Haque_Fahim_CV.pdf"
                    className="btn btn-outline"
                    id="hero-download-cv"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="16"
                      height="16"
                      style={{ marginRight: "0.4rem" }}
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                  </a>
                </div>

                <div className="hero-socials">
                  <a
                    href="https://github.com/Md-Nazmul-Haque-Fahim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    id="hero-social-github"
                    title="GitHub Profile"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nazmul-haque-fahim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    id="hero-social-linkedin"
                    title="LinkedIn Profile"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:nazmulhaquefahim02@gmail.com"
                    className="social-link"
                    id="hero-social-email"
                    title="Send Email"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Photo */}
              <div className="hero-photo-wrapper" id="hero-photo">
                <div className="hero-photo-ring" aria-hidden="true"></div>
                <div className="hero-photo-ring hero-photo-ring-2" aria-hidden="true"></div>
                <div className="hero-photo-container">
                  <Image
                    src="/profile-photo.jpg"
                    alt="Md. Nazmul Haque Fahim"
                    fill
                    className="hero-photo-img"
                    sizes="(max-width: 768px) 220px, 320px"
                    priority
                  />
                </div>
                <div className="hero-float-badge hero-float-badge-1">
                  🎓 UIU · CSE
                </div>
                <div className="hero-float-badge hero-float-badge-2">
                  ⭐ CGPA 3.88
                </div>
              </div>
            </div>

            {/* Scroll down indicator */}
            <div className="hero-scroll" aria-hidden="true">
              <a href="#about" aria-label="Scroll to about section">
                <div className="scroll-line"></div>
              </a>
            </div>
          </div>
        </section>

        {/* ─── About Section ─────────────────────────────────────────────────── */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">About Me</span>
              <h2 className="section-title">
                Who I <span>Am</span>
              </h2>
              <div className="divider"></div>
            </div>

            <div className="about-grid">
              <div className="about-text reveal">
                <p>
                  I am a motivated Computer Science and Engineering graduate with a strong academic
                  record (<strong style={{ color: "var(--clr-cyan)" }}>CGPA: 3.88 / 4.00</strong>) from{" "}
                  <strong style={{ color: "var(--clr-violet-light)" }}>United International University</strong>{" "}
                  and extensive experience in leading research, technical implementation, and project delivery.
                </p>
                <p>
                  As Team Leader and Lead Developer for my undergraduate thesis, I developed a video-based{" "}
                  <strong style={{ color: "var(--clr-cyan)" }}>
                    Bangla Sign Language Recognition System
                  </strong>{" "}
                  from initial concept through data collection (100 classes, 10,000 videos), 1,662-landmark
                  extraction with <strong style={{ color: "var(--clr-violet-light)" }}>MediaPipe Holistic</strong>,
                  and sequence classification using custom{" "}
                  <strong style={{ color: "var(--clr-cyan)" }}>Transformer Encoder, LSTM, and GRU</strong>{" "}
                  architectures—achieving an outstanding{" "}
                  <strong style={{ color: "var(--clr-cyan)" }}>94.28% test accuracy</strong>.
                </p>
                <p>
                  Beyond machine learning, I possess a versatile skillset in full-stack web and desktop application development
                  using <strong style={{ color: "var(--clr-violet-light)" }}>Python, JavaScript, PHP, Java, JavaFX, and SQL</strong>.
                  I engineered the Bachelor Platform housing system and a JavaFX-based Project Management Suite with
                  interactive Kanban boards and role-based access control.
                </p>
                <p>
                  My goal is to thrive at the intersection of business, data, and technology—leveraging analytics,
                  systematic problem-solving, and leadership to build high-impact, human-centric solutions.
                </p>

                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button
                    className="btn btn-primary"
                    id="about-view-cv"
                    onClick={() => setShowCvModal(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: "0.4rem" }}
                    >
                      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                    View CV
                  </button>
                  <a
                    href="/my_cv.pdf"
                    download="Nazmul_Haque_Fahim_CV.pdf"
                    className="btn btn-outline"
                    id="about-download-cv"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="18"
                      height="18"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {" "}Download CV
                  </a>
                </div>
              </div>

              <div className="about-stats reveal reveal-delay-2">
                <div className="glass-card stat-card">
                  <div className="stat-value">3.88</div>
                  <div className="stat-label">CGPA / 4.00</div>
                </div>
                <div className="glass-card stat-card">
                  <div className="stat-value">94.3%</div>
                  <div className="stat-label">Thesis Accuracy</div>
                </div>
                <div className="glass-card stat-card">
                  <div className="stat-value">8+</div>
                  <div className="stat-label">Scholarships Won</div>
                </div>
                <div className="glass-card stat-card">
                  <div className="stat-value">2026</div>
                  <div className="stat-label">B.Sc. in CSE (UIU)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Skills Section ────────────────────────────────────────────────── */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Technical Arsenal</span>
              <h2 className="section-title">
                Skills &amp; <span>Tools</span>
              </h2>
              <div className="divider"></div>
            </div>

            <div className="skills-grid">
              {/* Card 1: Data Science & Analytics */}
              <div
                className="skill-card reveal reveal-delay-1"
                style={{ "--skill-color": "#22d3ee", "--skill-glow": "rgba(34, 211, 238, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#22d3ee" }}>
                    📊
                  </div>
                </div>
                <div className="skill-category-title">Data Science &amp; Analytics</div>
                <div className="skill-tags">
                  {["Pandas", "NumPy", "Matplotlib", "Data Analysis", "Data Visualization", "SQL Querying", "Statistical Analysis"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#22d3ee" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#22d3ee" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 2: AI & Deep Learning */}
              <div
                className="skill-card reveal reveal-delay-2"
                style={{ "--skill-color": "#a78bfa", "--skill-glow": "rgba(167, 139, 250, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#a78bfa" }}>
                    🤖
                  </div>
                </div>
                <div className="skill-category-title">AI &amp; Deep Learning</div>
                <div className="skill-tags">
                  {["TensorFlow", "Keras", "Scikit-learn", "MediaPipe Holistic", "OpenCV", "Transformer", "LSTM", "GRU", "ANN", "Computer Vision"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#a78bfa" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#a78bfa" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 3: Programming Languages */}
              <div
                className="skill-card reveal reveal-delay-1"
                style={{ "--skill-color": "#f97316", "--skill-glow": "rgba(249, 115, 22, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#f97316" }}>
                    💻
                  </div>
                </div>
                <div className="skill-category-title">Programming Languages</div>
                <div className="skill-tags">
                  {["Python", "JavaScript (ES6+)", "C", "C++", "Java", "PHP", "SQL", "HTML5", "CSS3"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#f97316" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#f97316" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 4: Web Development */}
              <div
                className="skill-card reveal reveal-delay-2"
                style={{ "--skill-color": "#10b981", "--skill-glow": "rgba(16, 185, 129, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#10b981" }}>
                    🌐
                  </div>
                </div>
                <div className="skill-category-title">Web Development</div>
                <div className="skill-tags">
                  {["Next.js", "React", "JavaScript", "PHP", "Tailwind CSS", "Bootstrap", "RESTful APIs", "Responsive Design"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#10b981" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#10b981" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 5: Database Management */}
              <div
                className="skill-card reveal reveal-delay-3"
                style={{ "--skill-color": "#38bdf8", "--skill-glow": "rgba(56, 189, 248, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#38bdf8" }}>
                    🗄️
                  </div>
                </div>
                <div className="skill-category-title">Database Management</div>
                <div className="skill-tags">
                  {["MySQL", "PostgreSQL", "Database Design", "Data Verification", "Data Integrity", "Query Optimization"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#38bdf8" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#38bdf8" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 6: Tools & Platforms */}
              <div
                className="skill-card reveal reveal-delay-4"
                style={{ "--skill-color": "#ec4899", "--skill-glow": "rgba(236, 72, 153, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#ec4899" }}>
                    🛠️
                  </div>
                </div>
                <div className="skill-category-title">Tools &amp; Platforms</div>
                <div className="skill-tags">
                  {["Git", "GitHub", "VS Code", "Figma", "Adobe XD", "Photoshop", "Jira", "Notion", "MS Office 365"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#ec4899" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#ec4899" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 7: Project & Operations */}
              <div
                className="skill-card reveal reveal-delay-3"
                style={{ "--skill-color": "#6366f1", "--skill-glow": "rgba(99, 102, 241, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#6366f1" }}>
                    📈
                  </div>
                </div>
                <div className="skill-category-title">Project &amp; Operations</div>
                <div className="skill-tags">
                  {["Stakeholder Coordination", "Task Prioritization", "Sprint Planning", "Advanced Excel", "Google Sheets", "Documentation"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#6366f1" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#6366f1" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Card 8: Soft Skills & Leadership */}
              <div
                className="skill-card reveal reveal-delay-4"
                style={{ "--skill-color": "#14b8a6", "--skill-glow": "rgba(20, 184, 166, 0.2)" } as any}
              >
                <div className="skill-card-glow" aria-hidden="true"></div>
                <div className="skill-icon-ring">
                  <div className="skill-icon-svg" style={{ color: "#14b8a6" }}>
                    🤝
                  </div>
                </div>
                <div className="skill-category-title">Leadership &amp; Communication</div>
                <div className="skill-tags">
                  {["Team Leadership", "Strategic Thinking", "Critical Thinking", "Professional Communication", "Presentation Skills", "Negotiation"].map(
                    (skill) => (
                      <span key={skill} className="skill-pill" style={{ "--pill-color": "#14b8a6" } as any}>
                        <span className="skill-pill-dot" style={{ backgroundColor: "#14b8a6" }}></span>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Thesis Section (Featured Research) ────────────────────────────── */}
        <section id="thesis" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Undergraduate Research</span>
              <h2 className="section-title">
                Featured <span>Thesis</span>
              </h2>
              <div className="divider"></div>
            </div>

            <div className="glass-card reveal" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)", border: "1px solid var(--clr-border-glow)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "0.75rem",
                    background: "rgba(139, 92, 246, 0.15)",
                    border: "1px solid var(--clr-border-glow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.75rem",
                    flexShrink: 0,
                  }}
                >
                  🧠
                </div>
                <div style={{ flex: 1, minWidth: "280px" }}>
                  <span className="project-badge project-badge-ml">AI &amp; Deep Learning Thesis</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      fontWeight: 700,
                      color: "var(--clr-text)",
                      lineHeight: 1.25,
                      marginTop: "0.5rem",
                    }}
                  >
                    Transformer-Based Video Recognition of Bangla Sign Language for Accessible Educational Communication
                  </h3>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap", fontSize: "0.9rem", color: "var(--clr-text-muted)" }}>
                    <span style={{ color: "var(--clr-cyan)", fontWeight: 600 }}>👑 Team Leader &amp; Lead Project Developer</span>
                    <span>👥 Team of 5 Members</span>
                    <span>🏛️ United International University</span>
                  </div>
                </div>
              </div>

              {/* Research Metrics */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "1rem",
                  margin: "1.75rem 0",
                  padding: "1.25rem",
                  background: "rgba(3, 7, 18, 0.6)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--clr-border)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    94.28%
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginTop: "0.25rem" }}>Test Accuracy</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    94.46%
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginTop: "0.25rem" }}>Macro Precision</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    94.21%
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginTop: "0.25rem" }}>Macro F1-Score</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--clr-cyan)" }}>
                    10,000
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginTop: "0.25rem" }}>100 Classes × 100 Videos</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--clr-violet-light)" }}>
                    1,662
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginTop: "0.25rem" }}>Landmarks / Frame</div>
                </div>
              </div>

              {/* Research Highlights */}
              <ul className="project-desc-list" style={{ marginTop: "1rem" }}>
                <li>
                  Led a five-member team in conceptualizing, architecting, and training a video-based Bangla Sign Language recognition system from scratch.
                </li>
                <li>
                  Engineered an end-to-end dataset pipeline capturing 100 sign classes (100 videos each), extracting 1,662 spatial body, hand, and facial landmarks per frame via MediaPipe Holistic.
                </li>
                <li>
                  Implemented, trained, and benchmarked custom Transformer Encoder, LSTM, and GRU temporal sequence models across 30-frame video windows.
                </li>
                <li>
                  The custom Transformer Encoder achieved state-of-the-art results with 94.28% test accuracy, 94.46% precision, and 94.21% F1-score.
                </li>
                <li>
                  Engineered an interactive Bengali text translation interface for real-time recognized sign gestures.
                </li>
              </ul>

              {/* Tech Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                {["Python", "TensorFlow", "Keras", "MediaPipe Holistic", "OpenCV", "NumPy", "Scikit-learn", "Transformer", "LSTM", "GRU"].map(
                  (tech) => (
                    <span key={tech} className="tech-tag cyan">
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Featured Projects Section ─────────────────────────────────────── */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Portfolio</span>
              <h2 className="section-title">
                Featured <span>Projects</span>
              </h2>
              <p className="section-subtitle">
                Demonstrated capability across AI/ML research, full-stack web platforms, and desktop software.
              </p>
              <div className="divider"></div>
            </div>

            {/* Filter Tabs */}
            <div className="project-tabs reveal" role="tablist" aria-label="Project categories">
              <button
                role="tab"
                aria-selected={activeTab === "all"}
                className={`project-tab ${activeTab === "all" ? "project-tab-active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                <span className="project-tab-emoji">🚀</span>
                All Projects
                <span className="project-tab-count">3</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "ml"}
                className={`project-tab ${activeTab === "ml" ? "project-tab-active" : ""}`}
                onClick={() => setActiveTab("ml")}
              >
                <span className="project-tab-emoji">🤖</span>
                AI &amp; Machine Learning
                <span className="project-tab-count">1</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "web"}
                className={`project-tab ${activeTab === "web" ? "project-tab-active" : ""}`}
                onClick={() => setActiveTab("web")}
              >
                <span className="project-tab-emoji">🌐</span>
                Full-Stack &amp; Software
                <span className="project-tab-count">2</span>
              </button>
            </div>

            <div className="category-divider-line" style={{ marginBottom: "1.75rem" }}>
              <span className="category-divider-label">
                {activeTab === "all" && "⭐ All Featured Projects"}
                {activeTab === "ml" && "🤖 Machine Learning & AI"}
                {activeTab === "web" && "🌐 Full-Stack & Desktop Applications"}
              </span>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {/* Project 1: Thesis */}
              {(activeTab === "all" || activeTab === "ml") && (
                <div className="glass-card project-card project-card-animated reveal">
                  <div className="project-top">
                    <div className="project-icon" style={{ fontSize: "1.75rem" }}>
                      🧠
                    </div>
                    <div className="project-links">
                      <a
                        href="https://github.com/Md-Nazmul-Haque-Fahim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="GitHub Repository"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="project-meta">
                    <span className="project-badge project-badge-ml">AI &amp; Deep Learning</span>
                    <span className="project-period">2025 – 2026</span>
                  </div>

                  <h3 className="project-title">Bangla Sign Language Recognition System</h3>
                  <p className="project-desc">
                    A deep learning video recognition pipeline translating dynamic Bangla sign gestures into readable Bengali text with 94.28% accuracy.
                  </p>

                  <ul className="project-desc-list">
                    <li>Led a team of 5 in dataset collection, preprocessing, and model development.</li>
                    <li>Extracted 1,662 landmark features per frame across 10,000 video samples with MediaPipe.</li>
                    <li>Trained custom Transformer Encoder, LSTM, and GRU models for temporal sequence classification.</li>
                    <li>Designed real-time 30-frame sequence processing with interactive text output.</li>
                  </ul>

                  <div className="project-tags">
                    <span className="tech-tag cyan">Python</span>
                    <span className="tech-tag cyan">TensorFlow</span>
                    <span className="tech-tag cyan">MediaPipe</span>
                    <span className="tech-tag cyan">Transformer</span>
                    <span className="tech-tag cyan">OpenCV</span>
                  </div>
                </div>
              )}

              {/* Project 2: Bachelor Platform */}
              {(activeTab === "all" || activeTab === "web") && (
                <div className="glass-card project-card project-card-animated reveal">
                  <div className="project-top">
                    <div className="project-icon" style={{ fontSize: "1.75rem" }}>
                      🏠
                    </div>
                    <div className="project-links">
                      <a
                        href="https://github.com/Md-Nazmul-Haque-Fahim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="GitHub Repository"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="project-meta">
                    <span className="project-badge project-badge-web">Full-Stack Web App</span>
                    <span className="project-period">2024 – 2025</span>
                  </div>

                  <h3 className="project-title">Bachelor Platform</h3>
                  <p className="project-desc">
                    An all-in-one housing ecosystem for bachelor students and young professionals in urban Bangladesh.
                  </p>

                  <ul className="project-desc-list">
                    <li>Developed room, seat, and flat rental listings with budget filtering and booking.</li>
                    <li>Built an intelligent flatmate matching algorithm based on habits, academic field, and lifestyle.</li>
                    <li>Integrated transit route scheduling, vehicle details, and estimated fare calculator.</li>
                    <li>Created area-based community discussion boards, local reviews, and emergency helpline finder.</li>
                  </ul>

                  <div className="project-tags">
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">PHP</span>
                    <span className="tech-tag">MySQL</span>
                    <span className="tech-tag">HTML5</span>
                    <span className="tech-tag">CSS3</span>
                  </div>
                </div>
              )}

              {/* Project 3: Project Management Tool */}
              {(activeTab === "all" || activeTab === "web") && (
                <div className="glass-card project-card project-card-animated reveal">
                  <div className="project-top">
                    <div className="project-icon" style={{ fontSize: "1.75rem" }}>
                      📋
                    </div>
                    <div className="project-links">
                      <a
                        href="https://github.com/Md-Nazmul-Haque-Fahim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="GitHub Repository"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="project-meta">
                    <span className="project-badge project-badge-web">Desktop Application</span>
                    <span className="project-period">2023 – 2024</span>
                  </div>

                  <h3 className="project-title">Project Management Tool</h3>
                  <p className="project-desc">
                    A desktop project collaboration suite engineered with Java and JavaFX, featuring role-based access control and interactive Kanban boards.
                  </p>

                  <ul className="project-desc-list">
                    <li>Implemented Role-Based Access Control (RBAC) with secure user authentication.</li>
                    <li>Designed an interactive Kanban board for task assignment, priority levels, and drag-and-drop progress tracking.</li>
                    <li>Engineered sprint calendar views, deadline reminder alerts, and team project messaging.</li>
                    <li>Integrated real-time analytics dashboards with project report import and export.</li>
                  </ul>

                  <div className="project-tags">
                    <span className="tech-tag">Java</span>
                    <span className="tech-tag">JavaFX</span>
                    <span className="tech-tag">CSS</span>
                    <span className="tech-tag">OOP</span>
                    <span className="tech-tag">SQL</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Education Section ─────────────────────────────────────────────── */}
        <section id="education" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Academic Background</span>
              <h2 className="section-title">
                <span>Education</span>
              </h2>
              <div className="divider"></div>
            </div>

            {/* UIU */}
            <div className="glass-card education-card reveal" id="education-card">
              <div className="edu-icon">🎓</div>
              <div>
                <div className="edu-degree">B.Sc. in Computer Science &amp; Engineering</div>
                <div className="edu-uni">United International University (UIU)</div>
                <div className="edu-period">2022 – 2026 · Dhaka, Bangladesh</div>
                <div className="edu-gpa">
                  <span>⭐ CGPA</span>
                  <strong>3.88 / 4.00</strong>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {[
                    "Data Science",
                    "Machine Learning",
                    "Deep Learning",
                    "Computer Vision",
                    "Algorithms",
                    "Database Systems",
                    "Software Engineering",
                    "Object-Oriented Programming",
                  ].map((subject) => (
                    <span key={subject} className="tech-tag cyan">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* HSC */}
            <div className="glass-card education-card reveal" style={{ marginTop: "1.25rem" }}>
              <div className="edu-icon">🏫</div>
              <div>
                <div className="edu-degree">Higher Secondary Certificate (HSC)</div>
                <div className="edu-uni">Thakurgaon Government College</div>
                <div className="edu-period">2018 – 2020 · Rangpur, Bangladesh</div>
                <div className="edu-gpa">
                  <span>⭐ GPA</span>
                  <strong>5.00 / 5.00</strong>
                </div>
                <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  <span className="tech-tag">Science Group</span>
                  <span className="tech-tag">Physics</span>
                  <span className="tech-tag">Chemistry</span>
                  <span className="tech-tag">Higher Mathematics</span>
                  <span className="tech-tag">ICT</span>
                </div>
              </div>
            </div>

            {/* SSC */}
            <div className="glass-card education-card reveal" style={{ marginTop: "1.25rem" }}>
              <div className="edu-icon">🏫</div>
              <div>
                <div className="edu-degree">Secondary School Certificate (SSC)</div>
                <div className="edu-uni">Thakurgaon Sugar Mills High School</div>
                <div className="edu-period">2016 – 2018 · Rangpur, Bangladesh</div>
                <div className="edu-gpa">
                  <span>⭐ GPA</span>
                  <strong>5.00 / 5.00</strong>
                </div>
                <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  <span className="tech-tag">Science Group</span>
                  <span className="tech-tag">General Science</span>
                  <span className="tech-tag">Mathematics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Certifications & Achievements Section ─────────────────────────── */}
        <section id="certifications" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Credentials &amp; Recognition</span>
              <h2 className="section-title">
                Certifications &amp; <span>Achievements</span>
              </h2>
              <div className="divider"></div>
            </div>

            <div className="honors-grid">
              {/* Scholarship */}
              <div className="glass-card honor-card reveal reveal-delay-1" id="honor-scholarship">
                <div className="honor-card-top">
                  <div className="honor-emoji">🏆</div>
                  <span className="honor-badge honor-badge-award">Merit Scholarship</span>
                </div>
                <h3 className="honor-title">UIU Academic Scholarship Program</h3>
                <div className="honor-event">United International University</div>
                <div className="honor-detail">
                  Awarded a 50% tuition scholarship in 8 trimesters and a 25% scholarship in 2 trimesters based on outstanding academic results. Received continuous 25% tuition waiver across all trimesters.
                </div>
                <div className="honor-meta">
                  Period: <strong>Oct 2022 – Nov 2026</strong> · Status: <strong>Honors Recipient</strong>
                </div>
              </div>

              {/* Certificate 1: Art of Communication */}
              <div className="glass-card honor-card reveal reveal-delay-2" id="honor-1">
                <div className="honor-card-top">
                  <div className="honor-emoji">🗣️</div>
                  <span className="honor-badge honor-badge-cert">Certificate</span>
                </div>
                <h3 className="honor-title">Art of Communication</h3>
                <div className="honor-event">Professional Career Development</div>
                <div className="honor-detail">
                  Comprehensive training in active listening, executive interpersonal engagement, assertiveness, and professional cross-functional workplace communication.
                </div>
                <div className="honor-meta">
                  Issued: <strong>April 2026</strong> · Verified Professional Credential
                </div>
              </div>

              {/* Certificate 2: Corporate Presentation Skills */}
              <div className="glass-card honor-card reveal reveal-delay-3" id="honor-2">
                <div className="honor-card-top">
                  <div className="honor-emoji">📊</div>
                  <span className="honor-badge honor-badge-cert">Certificate</span>
                </div>
                <h3 className="honor-title">Corporate Presentation Skills</h3>
                <div className="honor-event">Professional Career Development</div>
                <div className="honor-detail">
                  High-impact executive presentation techniques, structured slide creation, technical project demonstrations, and persuasive speaking to executive stakeholders.
                </div>
                <div className="honor-meta">
                  Issued: <strong>April 2026</strong> · Verified Professional Credential
                </div>
              </div>

              {/* Certificate 3: LinkedIn 101 */}
              <div className="glass-card honor-card reveal reveal-delay-1" id="honor-3">
                <div className="honor-card-top">
                  <div className="honor-emoji">💼</div>
                  <span className="honor-badge honor-badge-cert">Certificate</span>
                </div>
                <h3 className="honor-title">LinkedIn 101</h3>
                <div className="honor-event">Professional Career Development</div>
                <div className="honor-detail">
                  Strategic profile optimization, personal branding, industry networking, technical content creation, and leveraging LinkedIn for career opportunities.
                </div>
                <div className="honor-meta">
                  Issued: <strong>April 2026</strong> · Verified Professional Credential
                </div>
              </div>

              {/* Certificate 4: Sharpen Your Interview Skills */}
              <div className="glass-card honor-card reveal reveal-delay-2" id="honor-4">
                <div className="honor-card-top">
                  <div className="honor-emoji">🎯</div>
                  <span className="honor-badge honor-badge-cert">Certificate</span>
                </div>
                <h3 className="honor-title">Sharpen Your Interview Skills</h3>
                <div className="honor-event">Professional Career Development</div>
                <div className="honor-detail">
                  Mock interview simulations, STAR methodology for competency queries, behavioral situational response frameworks, and professional interview etiquette.
                </div>
                <div className="honor-meta">
                  Issued: <strong>April 2026</strong> · Verified Professional Credential
                </div>
              </div>

              {/* Certificate 5: Smart CV */}
              <div className="glass-card honor-card reveal reveal-delay-3" id="honor-5">
                <div className="honor-card-top">
                  <div className="honor-emoji">📝</div>
                  <span className="honor-badge honor-badge-cert">Certificate</span>
                </div>
                <h3 className="honor-title">Smart CV</h3>
                <div className="honor-event">Professional Career Development</div>
                <div className="honor-detail">
                  ATS-compliant resume design, quantifiable impact statement structuring, keyword alignment for tech roles, and executive portfolio presentation.
                </div>
                <div className="honor-meta">
                  Issued: <strong>April 2026</strong> · Verified Professional Credential
                </div>
              </div>

              {/* Extracurricular: Scouting */}
              <div className="glass-card honor-card reveal reveal-delay-1" id="honor-scouting">
                <div className="honor-card-top">
                  <div className="honor-emoji">⛺</div>
                  <span className="honor-badge honor-badge-award">Leadership</span>
                </div>
                <h3 className="honor-title">School Scout Member</h3>
                <div className="honor-event">Upazila, District &amp; National-Level Camps</div>
                <div className="honor-detail">
                  Participated in hiking, camping, tent deployment, and community preparedness. Developed high discipline, emergency crisis handling, and teamwork under pressure.
                </div>
                <div className="honor-meta">
                  Scope: <strong>National &amp; District Camps</strong> · Values: <strong>Discipline &amp; Service</strong>
                </div>
              </div>

              {/* Extracurricular: Cricket */}
              <div className="glass-card honor-card reveal reveal-delay-2" id="honor-cricket">
                <div className="honor-card-top">
                  <div className="honor-emoji">🏏</div>
                  <span className="honor-badge honor-badge-award">Sports Leadership</span>
                </div>
                <h3 className="honor-title">Cricket Division-Level Player &amp; Captain</h3>
                <div className="honor-event">Division-Level Competitions</div>
                <div className="honor-detail">
                  Competed at division levels, leading and coordinating squad members on the field. Honed tactical game decisions, resilience, communication, and performance under high-pressure scenarios.
                </div>
                <div className="honor-meta">
                  Role: <strong>Team Leader &amp; Player</strong> · Focus: <strong>Strategy &amp; Teamwork</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contact Section ───────────────────────────────────────────────── */}
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Get In Touch</span>
              <h2 className="section-title">
                Let&apos;s <span>Connect</span>
              </h2>
              <div className="divider"></div>
            </div>

            <div className="contact-wrapper reveal">
              <p className="contact-desc">
                I am actively seeking opportunities as a{" "}
                <strong style={{ color: "var(--clr-violet-light)" }}>Junior Data Scientist</strong>,{" "}
                <strong style={{ color: "var(--clr-cyan)" }}>AI / Machine Learning Engineer</strong>, or{" "}
                <strong style={{ color: "var(--clr-violet-light)" }}>Full-Stack Software Developer</strong>.
                Whether you have an exciting project, a job opportunity, or simply want to connect—my inbox is always open!
              </p>

              <div className="contact-links">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/nazmul-haque-fahim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  id="contact-linkedin"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Md-Nazmul-Haque-Fahim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  id="contact-github"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>

                {/* Email */}
                <a
                  href="mailto:nazmulhaquefahim02@gmail.com"
                  className="contact-link"
                  id="contact-email"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  nazmulhaquefahim02@gmail.com
                </a>

                {/* Phone */}
                <a
                  href="tel:+8801786751637"
                  className="contact-link"
                  id="contact-phone"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +880 1786751637
                </a>

                {/* Location */}
                <div className="contact-link" style={{ cursor: "default" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Vatara, Dhaka, Bangladesh
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            &copy; 2026 Md. Nazmul Haque Fahim. Built with{" "}
            <span>Next.js</span> &amp; <span>Space Grotesk</span>. Deployed on{" "}
            <span>Vercel</span>.
          </p>
        </div>
      </footer>
    </>
  );
}
