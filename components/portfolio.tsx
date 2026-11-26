import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { PortfolioMotion } from '@/components/portfolio-motion'
import HeroIdCard from '@/components/hero-id-card'
import HoverImageReveal from '@/components/hover-image-reveal'
import GooeyPreloader from '@/components/gooey-preloader'
import ProjectCategoriesSection from '@/components/project-categories'

const projects = [
  {
    title: 'NOA',
    type: 'Branding · Packaging',
    year: '2025',
    image: '/noa-skincare.png',
  },
  {
    title: 'Stories in print',
    type: 'Publication · Editorial',
    year: '2024',
    image: '/editorial-art.png',
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
    <section className="id-card-hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-caption">
        <span><span className="status-dot" /> Independent designer</span>
        <span>Portfolio / 2026</span>
      </div>
      <HeroIdCard />
      <div className="hero-bottomline">
        <p>Good ideas deserve<br />a little room to play.</p>
        <a href="#work">Explore selected work <ArrowDown aria-hidden="true" /></a>
        <span>Drag the card to explore</span>
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
      <div className="project-reveal-stage reveal">
        <HoverImageReveal
          items={{
            itemCount: projects.length,
            ...Object.fromEntries(projects.map((project, index) => [`item${index + 1}`, {
              text: project.title,
              meta: `${project.type} · ${project.year}`,
              image: { src: project.image, alt: `${project.title} visual identity project` },
              link: `mailto:lawadkarvaibhavi@gmail.com?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`,
            }]))
          }}
          font={{ fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 8vw, 112px)', fontWeight: 400, lineHeight: '.88', letterSpacing: '-.065em' }}
          textColor="#24233d"
          dimColor="#9e968f"
          align="left"
          rowGap={24}
          imageWidth={280}
          imageHeight={350}
          rounded={2}
          offsetX={180}
          followStrength={3}
          backgroundColor="transparent"
          style={{ height: 'auto', minHeight: 'clamp(280px, 34vw, 430px)', padding: 0 }}
        />
      </div>
      <div className="work-footnote"><span>More stories are always in progress.</span><span>Scroll on <span aria-hidden="true">↓</span></span></div>
      <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 4 }, (_, index) => <span key={index}>Made with meaning <b>✳</b> Made to be remembered <b>✳</b></span>)}</div></div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="about-top reveal"><SectionLabel number="03">A little about me</SectionLabel><span className="about-location">Based in India · Working everywhere</span></div>
      <div className="about-grid">
        <div className="portrait-wrap reveal"><Image src="/vaibhavi-portrait-new.jpg" alt="Portrait of graphic designer Vaibhavi Lawadkar" fill sizes="(max-width: 700px) 90vw, 38vw" className="portrait-image" /><span className="portrait-note">a face behind the work <span>↗</span></span></div>
        <div className="about-copy reveal"><h2 id="about-title">Hi, I&apos;m<br /><em>Vaibhavi.</em></h2><p className="about-lede">I turn curious ideas into thoughtful visual worlds.</p><p className="about-body">A graphic designer drawn to the stories held in traditional art, history, and culture. I love finding the detail that makes a brand feel like itself—and bringing that feeling to life through identity, print, and digital design.</p><p className="about-body">Good work starts with listening. Then comes a little research, a lot of play, and the kind of craft that makes a simple idea stay with you.</p><a className="text-link" href="mailto:lawadkarvaibhavi@gmail.com">Have a project in mind? <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}

function PracticeSection() {
  const skills = ['Branding', 'Packaging', 'Publication design', 'Typography', 'UI / UX', 'Photography']
  return (
    <section className="practice-section section-pad" aria-labelledby="practice-title">
      <SectionLabel number="04">What I bring to the table</SectionLabel>
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
      <div className="contact-top"><SectionLabel number="05">Have something in mind?</SectionLabel><span className="contact-availability"><span className="status-dot" /> Open to select collaborations</span></div>
      <a className="contact-title reveal" href="mailto:lawadkarvaibhavi@gmail.com">Let&apos;s make<br /><em>something lovely.</em><ArrowUpRight aria-hidden="true" /></a>
      <div className="footer-bottom"><a href="mailto:lawadkarvaibhavi@gmail.com">lawadkarvaibhavi@gmail.com</a><div className="social-links"><a href="https://www.instagram.com/_vaibhavi_xo">Instagram ↗</a><a href="https://www.behance.net/">Behance ↗</a><a href="https://www.linkedin.com/">LinkedIn ↗</a></div><span>© 2025 Vaibhavi Lawadkar</span><a href="#top" className="back-top">Back to top ↑</a></div>
    </footer>
  )
}

export function Portfolio() {
  return <><GooeyPreloader className="gp_portfolio-loader" minDuration={1.8} goo={14} blobs={5} revealDuration={0.9} /><main className="portfolio-shell"><PortfolioMotion /><SiteHeader /><Hero /><WorkSection /><ProjectCategoriesSection /><AboutSection /><PracticeSection /><ContactFooter /></main></>
}
