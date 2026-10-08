'use client';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { projects, site, type Project } from '@/data/site';

export function ProjectGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Project>(projects[0]);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const current = active.gallery[index];
  function open(project: Project) { setActive(project); setIndex(0); dialog.current?.showModal(); if (dialog.current) dialog.current.scrollTop = 0; }
  return <>
    <div className="project-grid" id="portfolio-projects">
      {projects.filter(project => expanded || project.featured).map((project) => <button className="project-card group text-left" key={project.id} onClick={() => open(project)} aria-label={`Preview ${project.title}`}>
        <div className="project-image" style={{ backgroundColor: project.thumbnailBackground }}><Image src={project.thumbnailSrc} alt={project.thumbnailAlt} fill sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, (min-width: 1600px) 465px, 29vw" style={{ objectPosition: project.thumbnailPosition, objectFit: project.thumbnailFit }}/><span className="preview-pill">Take a look <ArrowUpRight size={15}/></span></div>
        <div className="project-caption"><h3>{project.title}</h3><ArrowRight aria-hidden="true"/></div>
        <span className="asset-label">{project.category}</span>
      </button>)}
    </div>
    <div className="portfolio-more"><button className="pill dark" aria-expanded={expanded} aria-controls="portfolio-projects" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show selected work' : 'More of our work'} <ArrowRight size={18}/></button></div>
    <dialog ref={dialog} className="project-dialog portfolio-dialog" aria-labelledby="portfolio-title" onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="portfolio-toolbar"><span>{active.category}</span><button className="close-dialog" aria-label="Close project preview" onClick={() => dialog.current?.close()}><X/></button></div>
      <div className="dialog-layout">
        <div className="portfolio-gallery">
          <div className="portfolio-full-image"><Image key={current.src} src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(max-width: 640px) 92vw, 450px"/></div>
          {active.gallery.length > 1 && <div className="portfolio-gallery-controls"><button aria-label="Previous image" onClick={() => setIndex((index - 1 + active.gallery.length) % active.gallery.length)}><ChevronLeft size={20}/></button><span aria-live="polite">{index + 1} of {active.gallery.length}</span><button aria-label="Next image" onClick={() => setIndex((index + 1) % active.gallery.length)}><ChevronRight size={20}/></button></div>}
          <div className="portfolio-thumbnails">{active.gallery.map((image, i) => <button key={image.src} aria-label={`View image ${i + 1} of ${active.title}`} aria-pressed={index === i} onClick={() => setIndex(i)}><Image src={image.src} alt="" width={66} height={66} sizes="66px"/></button>)}</div>
        </div>
        <div className="dialog-copy"><p className="eyebrow">{active.category}</p><h2 id="portfolio-title">{active.title}<span className="red">.</span></h2><p>{active.description}</p>{active.disclosure && <p className="asset-disclosure">{active.disclosure}</p>}<a className="pill dark" href={site.enquiry}>Let’s make something <ArrowUpRight size={18}/></a></div>
      </div>
    </dialog>
  </>;
}
