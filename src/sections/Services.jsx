import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { services } from '../data/portfolio';

function ReelCard({ item, onExpand }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div
      className="reel-card"
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePlay(e); }}
      aria-label={`Play ${item.title} reel`}
    >
      <video
        ref={videoRef}
        src={item.video}
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        className="reel-video"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Top Bar: Number Tag & Audio Toggle */}
      <div className="reel-top-bar">
        <span className="reel-badge">{item.number} · REEL</span>
        <button
          type="button"
          className="reel-action-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Center Play Button (visible when paused) */}
      {!isPlaying && (
        <div className="reel-play-overlay">
          <div className="reel-play-bubble">
            <Play size={24} fill="#ffffff" color="#ffffff" style={{ marginLeft: 3 }} />
          </div>
        </div>
      )}

      {/* Bottom Bar: Title & Full View Expand */}
      <div className="reel-bottom-bar">
        <div className="reel-meta">
          <span className="reel-category">UGC CONCEPT</span>
          <h3 className="reel-title">{item.title}</h3>
        </div>
        <button
          type="button"
          className="reel-expand-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
            onExpand(item);
          }}
          aria-label="Watch full size"
          title="Watch full size"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeReel, setActiveReel] = useState(null);

  const closeModal = useCallback(() => {
    setActiveReel(null);
  }, []);

  useEffect(() => {
    if (!activeReel) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [activeReel, closeModal]);

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-title center">
          <p className="eyebrow">WHAT I CAN CREATE</p>
          <h2>Featured UGC <em>Reels.</em></h2>
          <p>Short-form vertical video concepts made to capture attention and tell your brand story.</p>
        </div>

        <div className="reels-grid">
          {services.map((item) => (
            <ReelCard
              key={item.number}
              item={item}
              onExpand={(reel) => setActiveReel(reel)}
            />
          ))}
        </div>
      </div>

      {/* Full-Screen Reel Modal */}
      {activeReel && (
        <div
          className="lightbox-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-dialog reel-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeModal}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="lightbox-media-wrapper reel-modal-media">
              <video
                src={activeReel.video}
                controls
                autoPlay
                playsInline
                className="lightbox-video reel-full-video"
              />
            </div>

            <div className="lightbox-footer">
              <div>
                <span className="work-category">{activeReel.number} · FEATURED REEL</span>
                <h3>{activeReel.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
