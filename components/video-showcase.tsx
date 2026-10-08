'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';
import { videos } from '@/data/videos';
import { Star } from './brand';
import styles from './video-showcase.module.css';

export function VideoShowcase() {
  const strip = useRef<HTMLDivElement>(null);
  const region = useRef<HTMLDivElement>(null);
  const playingAt = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [activity, setActivity] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const interact = () => setActivity(value => value + 1);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(media.matches);
    const visibility = () => { setHidden(document.hidden); setActivity(value => value + 1); };
    const release = () => { drag.current = null; setDragging(false); setActivity(value => value + 1); };
    window.addEventListener('pointerup', release);
    motion(); visibility();
    media.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    const resize = new ResizeObserver(() => {
      const el = strip.current;
      if (el) setEdges({ start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    });
    if (strip.current) resize.observe(strip.current);
    return () => { window.removeEventListener('pointerup', release); media.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); resize.disconnect(); };
  }, []);

  useEffect(() => {
    if (hovered || focused || dragging || hidden || reduced || selected !== null) return;
    const timer = window.setTimeout(() => {
      const el = strip.current;
      if (!el) return;
      const step = (el.firstElementChild as HTMLElement)?.offsetWidth + 24;
      el.scrollTo({ left: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 ? 0 : el.scrollLeft + step, behavior: 'smooth' });
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [hovered, focused, dragging, hidden, reduced, selected, activity]);

  function onScroll() {
    const el = strip.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    if (selected !== null && Math.abs(el.scrollLeft - playingAt.current) > 8) setSelected(null);
    interact();
  }
  function scroll(direction: number) {
    const el = strip.current;
    if (!el) return;
    setSelected(null);
    interact();
    el.scrollBy({ left: direction * ((el.firstElementChild as HTMLElement).offsetWidth + 24), behavior: reduced ? 'instant' : 'smooth' });
  }
  function open(index: number) {
    const el = strip.current;
    // Cancel any in-flight carousel animation before mounting the player.
    if (el) el.scrollTo({ left: el.scrollLeft, behavior: 'instant' });
    playingAt.current = el?.scrollLeft ?? 0;
    setSelected(index);
    interact();
    requestAnimationFrame(() => strip.current?.querySelector<HTMLButtonElement>('[data-close-video]')?.focus({ preventScroll: true }));
  }
  function close(index: number) {
    setSelected(null);
    interact();
    requestAnimationFrame(() => strip.current?.querySelector<HTMLButtonElement>(`[data-play-video="${index}"]`)?.focus({ preventScroll: true }));
  }
  return <section id="films" className={`section-pad ${styles.section}`} aria-labelledby="films-heading">
    <div className={styles.heading}>
      <div><p className="eyebrow">The moving stuff / 02</p><h2 id="films-heading">Watch us make things<span className="red">.</span></h2><p className={styles.support}>Campaign films, brand reels and a few moments from behind the scenes.</p></div>
      <div className={styles.annotation}><Star /><p className="handwritten">Made for<br/>the scroll.</p><Star /></div>
    </div>
    <div ref={region} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); interact(); }}
      onFocusCapture={event => { if (event.target.matches(':focus-visible')) setFocused(true); }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); interact(); } }}>
    <div className={styles.strip} ref={strip} id="video-film-strip" data-dragging={dragging} onScroll={onScroll} role="group" aria-label="Glowth video showcase"
      onWheel={interact}
      onPointerDown={event => {
        interact(); setDragging(true);
        if (event.pointerType === 'mouse' && !(event.target as HTMLElement).closest('button, iframe')) {
          drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }}
      onPointerMove={event => {
        if (!drag.current) return;
        const distance = event.clientX - drag.current.x;
        if (Math.abs(distance) > 5) drag.current.moved = true;
        if (drag.current.moved) event.currentTarget.scrollLeft = drag.current.left - distance;
      }}
      onPointerUp={() => { drag.current = null; setDragging(false); interact(); }}
      onPointerCancel={() => { drag.current = null; setDragging(false); interact(); }}
      onLostPointerCapture={() => { drag.current = null; setDragging(false); interact(); }}>
      {videos.map((video, index) => <article className={styles.card} key={video.id}>
        <div className={styles.poster}>
          {selected === index ? <>
            <iframe className={styles.inlinePlayer} src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`} title={`${video.title} video player`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/>
            <button type="button" data-close-video className={styles.closeVideo} onClick={() => close(index)} aria-label={`Close video: ${video.title}`}><X size={18} aria-hidden="true"/></button>
          </> : <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnail} alt={video.alt} width={1080} height={1920} loading="lazy" decoding="async" draggable={false} onError={event => { event.currentTarget.style.visibility = 'hidden'; }}/>
            <span className={styles.reelNumber} aria-hidden="true">G / {String(index + 1).padStart(2, '0')}</span>
            <button type="button" data-play-video={index} className={styles.play} onClick={() => open(index)} aria-label={`Watch reel: ${video.title}`}><Play size={24} fill="currentColor" aria-hidden="true"/><span>Watch reel</span></button>
          </>}
        </div>
        <span className={styles.caption}><span>{video.title}</span><ArrowRight size={19} aria-hidden="true"/></span>
        <span className={styles.category}>{video.category}</span>
        {video.disclosure && <span className={styles.disclosure}>{video.disclosure}</span>}
      </article>)}
    </div>
    <div className={styles.stripFooter}><p>Little films. Big imagination.</p><div className={styles.controls}><button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous videos" aria-controls="video-film-strip"><ArrowLeft aria-hidden="true"/></button><button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next videos" aria-controls="video-film-strip"><ArrowRight aria-hidden="true"/></button></div></div>
    </div>
  </section>;
}
