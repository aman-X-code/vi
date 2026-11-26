"use client"

import GlassFolder from '@/components/ui/glass-folder-cards'

export default function ProjectCategoriesSection() {
  const enquire = (file: { name: string }) => {
    window.location.assign(
      `mailto:lawadkarvaibhavi@gmail.com?subject=${encodeURIComponent('Tell me about ' + file.name)}`,
    )
  }

  return (
    <section className="project-categories-section section-pad" id="categories" aria-labelledby="categories-title">
      <div className="section-heading reveal">
        <div className="section-label"><span>02</span><span>Browse by craft</span></div>
        <h2 id="categories-title">A shelf of<br /><em>project kinds.</em></h2>
      </div>
      <div className="project-categories-grid reveal">
        <GlassFolder
          label="Branding"
          art="aurora"
          seed={3}
          appearDelay={0}
          width={300}
          files={[
            { name: 'NOA Skincare', meta: '2025', art: 'ember' },
            { name: 'Marks & type', meta: '12 marks', art: 'dusk' },
            { name: 'Guidelines.pdf', meta: 'PDF · 8 MB' },
          ]}
          onFileSelect={enquire}
        />
        <GlassFolder
          label="Packaging"
          art="verdant"
          seed={11}
          appearDelay={140}
          width={300}
          files={[
            { name: 'NOA Bottle', meta: '2025', art: 'verdant' },
            { name: 'Box dielines', meta: '6 files' },
            { name: 'Label proofs', meta: 'Print-ready', art: 'glacier' },
          ]}
          onFileSelect={enquire}
        />
        <GlassFolder
          label="Publication"
          tone="dark"
          art="ember"
          seed={7}
          appearDelay={280}
          width={300}
          action="none"
          labelPlacement="top-right"
          files={[
            { name: 'Stories in print', meta: '2024', art: 'aurora' },
            { name: 'Editorial spreads', meta: '24 pages', art: 'dusk' },
            { name: 'Cover study', meta: 'Drafts' },
          ]}
          onFileSelect={enquire}
        />
      </div>
      <p className="project-categories-hint">Hover to peek · Click to open · Tap a file to enquire</p>
    </section>
  )
}
