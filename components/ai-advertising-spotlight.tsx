import styles from './ai-advertising-spotlight.module.css';

export function AiAdvertisingSpotlight() {
  return <section id="ai-advertising" className={`section-pad ${styles.section}`} aria-labelledby="ai-advertising-heading">
    <p className={`eyebrow ${styles.eyebrow}`}>AI Advertising</p>
    <h2 id="ai-advertising-heading" className={styles.heading}>See what we’re creating with AI.</h2>
    <p className={styles.description}>Watch our ongoing AI advertisement project for Tropica Chocolate.</p>
    <div className={styles.video}>
      <iframe
        src="https://www.youtube-nocookie.com/embed/tYznYVw0y2s"
        title="Tropica Chocolate AI advertisement concept"
        width={900}
        height={506}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
    <p className={styles.note}>Independent concept project.</p>
  </section>;
}
