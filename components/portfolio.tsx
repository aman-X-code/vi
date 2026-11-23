import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { PortfolioMotion } from '@/components/portfolio-motion'

const projects = [
  {
    number: '01',
    title: 'NOA',
    type: 'Branding · Packaging',
    year: '2025',
    image: '/noa-skincare.png',
    tone: 'project-card--cream',
    description: 'A softer kind of skincare.',
  },
  {
    number: '02',
    title: 'Stories in print',
    type: 'Publication · Editorial',
    year: '2024',
    image: '/editorial-art.png',
    tone: 'project-card--blue',
    description: 'A little space for big ideas.',
  },
]

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="monogram" href="#top" aria-label="Vaibhavi Lawadkar, home">VL<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Selected work</a>
        <a href="#about">About</a>
        <a className="nav-contact" href="mailto:lawadkarvaibhavi@gmail.com">Let&apos;s talk <ArrowUpRight aria-hidden="true" /></a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-kicker"><span className="status-dot" /> Available for select projects <span className="kicker-year">2025 — 26</span></div>
      <div className="hero-title-wrap">
        <h1 id="hero-title" className="hero-title" aria-label="Portfolio."><span className="hero-letters" aria-hidden="true">{'Portfolio'.split('').map((letter, index) => <span className="hero-letter" style={{ animationDelay: `${index * 55}ms` }} key={`${letter}-${index}`}>{letter}</span>)}<span className="hero-period hero-letter" style={{ animationDelay: '520ms' }}>.</span></span></h1>
        <p className="hero-role">Graphic<br />Designer</p>
      </div>
      <div className="hero-bottom">
        <p>Thoughtful visuals, rooted in<br />culture and made for what&apos;s next.</p>
        <a className="scroll-link" href="#work"><span>Scroll to explore</span><ArrowDown aria-hidden="true" /></a>
        <span className="hero-index">01 / 04</span>
      </div>
    </section>
  )
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>
}

function WorkSection() {
  return (
    <section className="work-section section-pad" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal">
        <SectionLabel number="01">The selected work</SectionLabel>
        <h2 id="work-title">A few things<br /><em>made with meaning.</em></h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project-card ${project.tone} reveal`} key={project.number}>
            <div className="project-visual">
              <Image src={project.image} alt={`${project.title} visual identity project`} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <span className="project-no">{project.number}</span>
              <a className="project-link" href="mailto:lawadkarvaibhavi@gmail.com?subject=Tell%20me%20about%20your%20work" aria-label={`Ask about ${project.title}`}><ArrowUpRight aria-hidden="true" /></a>
            </div>
            <div className="project-caption"><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div></div>
          </article>
        ))}
      </div>
      <div className="work-footnote"><span>More stories are always in progress.</span><span>Scroll on <span aria-hidden="true">↓</span></span></div>
      <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 4 }, (_, index) => <span key={index}>Made with meaning <b>✳</b> Made to be remembered <b>✳</b></span>)}</div></div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="about-top reveal"><SectionLabel number="02">A little about me</SectionLabel><span className="about-location">Based in India · Working everywhere</span></div>
      <div className="about-grid">
        <div className="portrait-wrap reveal"><Image src="/vaibhavi-portrait.png" alt="Portrait of graphic designer Vaibhavi Lawadkar" fill sizes="(max-width: 700px) 90vw, 38vw" className="portrait-image" /><span className="portrait-note">a face behind the work <span>↗</span></span></div>
        <div className="about-copy reveal"><h2 id="about-title">Hi, I&apos;m<br /><em>Vaibhavi.</em></h2><p className="about-lede">I turn curious ideas into thoughtful visual worlds.</p><p className="about-body">A graphic designer drawn to the stories held in traditional art, history, and culture. I love finding the detail that makes a brand feel like itself—and bringing that feeling to life through identity, print, and digital design.</p><p className="about-body">Good work starts with listening. Then comes a little research, a lot of play, and the kind of craft that makes a simple idea stay with you.</p><a className="text-link" href="mailto:lawadkarvaibhavi@gmail.com">Have a project in mind? <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}

function PracticeSection() {
  const skills = ['Branding', 'Packaging', 'Publication design', 'Typography', 'UI / UX', 'Photography']
  return (
    <section className="practice-section section-pad" aria-labelledby="practice-title">
      <SectionLabel number="03">What I bring to the table</SectionLabel>
      <div className="practice-grid reveal">
        <div className="practice-title"><h2 id="practice-title">A curious<br /><em>kind of practice.</em></h2><p>Mixing instinct with intention to make work that feels considered, human, and a little unexpected.</p></div>
        <div className="skills-list" aria-label="Design disciplines">{skills.map((skill, index) => <div className="skill-row" key={skill}><span className="skill-index">0{index + 1}</span><span>{skill}</span><ArrowUpRight aria-hidden="true" /></div>)}</div>
      </div>
      <div className="experience-strip"><div><span className="eyebrow">A recent chapter</span><h3>Fruit Bowl Digital</h3></div><p>Graphic Design Intern <span>·</span> 2025<br />Building engaging visual stories with a lovely team.</p><span className="experience-mark">✳</span></div>
    </section>
  )
}

function ContactFooter() {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-top"><SectionLabel number="04">Have something in mind?</SectionLabel><span className="contact-availability"><span className="status-dot" /> Open to select collaborations</span></div>
      <a className="contact-title reveal" href="mailto:lawadkarvaibhavi@gmail.com">Let&apos;s make<br /><em>something lovely.</em><ArrowUpRight aria-hidden="true" /></a>
      <div className="footer-bottom"><a href="mailto:lawadkarvaibhavi@gmail.com">lawadkarvaibhavi@gmail.com</a><div className="social-links"><a href="https://www.instagram.com/_vaibhavi_xo">Instagram ↗</a><a href="https://www.behance.net/">Behance ↗</a><a href="https://www.linkedin.com/">LinkedIn ↗</a></div><span>© 2025 Vaibhavi Lawadkar</span><a href="#top" className="back-top">Back to top ↑</a></div>
    </footer>
  )
}

export function Portfolio() {
  return <main className="portfolio-shell"><PortfolioMotion /><SiteHeader /><Hero /><WorkSection /><AboutSection /><PracticeSection /><ContactFooter /></main>
}
