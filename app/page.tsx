import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { Brand, Star } from '@/components/brand';
import { Navigation } from '@/components/navigation';
import { VideoShowcase } from '@/components/video-showcase';
import { ProjectGallery } from '@/components/project-gallery';
import { heroImages, services, site } from '@/data/site';

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-composition">
        {heroImages.map((item, index) => <div className={`floating-art ${item.className}`} key={item.className} style={{ aspectRatio: item.aspectRatio }}><Image src={item.src} alt={item.alt} fill priority={index < 2} sizes={item.sizes} style={{ objectPosition: item.position, objectFit: item.fit }}/>{item.label && <span>{item.label}</span>}</div>)}
        <div className="handwritten note-one">a little<br/>unexpected<svg viewBox="0 0 80 65" aria-hidden="true"><path d="M60 5Q62 37 17 48m0 0 6-13m-6 13 16 2"/></svg></div>
        <div className="handwritten note-two">Good food,<br/>brighter days.</div>
        <div className="handwritten note-three"><svg viewBox="0 0 80 65" aria-hidden="true"><path d="M9 60Q18 17 64 15m0 0-13-8m13 8-10 12"/></svg>Brands that<br/>feel different.</div>
        <Star className="hero-star" /><span className="doodle doodle-one">✧</span><span className="doodle doodle-two">✧</span>
        <div className="hero-copy"><p className="eyebrow hero-kicker">Independent minds. Shared imagination.</p><h1 id="hero-heading">Good brands.<br/><em>Wild ideas.</em></h1><p className="hero-description">Branding, social content and visual campaigns.<br/>Australia & Sri Lanka.</p><a className="pill dark" href="#work">Explore our work <ArrowUpRight size={19} /></a></div>
        <a href="#work" className="hero-bottom">A little scroll. A lot of possibility. <ArrowDown size={14}/></a>
        </div>
      </section>
      <div className="service-strip" aria-label="Our disciplines">{['Branding','Social content','Visual campaigns','Photography','Video production'].map(s=><span key={s}>{s}<span aria-hidden="true">✦</span></span>)}</div>
      <section id="work" className="work-section section-pad">
        <div className="section-heading"><div><p className="eyebrow">The creative playground / 01</p><h2>A few things<br className="mobile-break"/> we’ve made<span className="red">.</span></h2></div><p className="handwritten work-note">Different ideas.<br/>A brighter tomorrow.<span className="scribble"/></p></div>
        <ProjectGallery />
      </section>
      <VideoShowcase />
      <section id="services" className="services-section section-pad">
        <div className="services-intro"><p className="eyebrow">What we do / 03</p><h2>Big ideas<span className="red">.</span><br/>Many forms<span className="red">.</span></h2><Star className="services-star"/><p className="handwritten">Same playground.<br/>Different toys.<span className="scribble"/></p></div>
        <div className="services-list">{services.map((service,index)=><details key={service.title}><summary><span className="service-number">0{index+1}</span><h3>{service.title}</h3><Plus size={23} aria-hidden="true" /></summary><p>{service.description}</p></details>)}</div>
      </section>
      <section id="about" className="about-section section-pad"><p className="eyebrow">Hello, we’re Glowth.</p><p>{site.introduction}</p><span className="handwritten">Small team.<br/>Wide open imagination.</span></section>
      <section id="contact" className="contact-section section-pad"><div><p className="eyebrow">Let’s make something good.</p><h2>Got a wonderfully<br/><em>weird idea?</em></h2><span className="contact-underline"/></div><a className="pill light" href={site.enquiry}>Let’s make it happen <ArrowUpRight size={21}/></a><Star className="contact-star"/></section>
    </main>
    <footer className="footer section-pad"><div className="footer-top"><Brand /><p className="eyebrow">Australia <span>/</span> Sri Lanka</p><a href={site.enquiry}>{site.email} <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Glowth. Made with a curious mind.</p><a href={site.studio} target="_blank" rel="noopener noreferrer">Construction content in Australia? Meet Glowth Studio <ArrowUpRight size={14}/></a></div></footer>
  </>;
}
