import { useMemo, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { portfolioItems } from '../data/portfolio';

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filters = ['All', 'Beauty', 'Fashion', 'Lifestyle'];

  const items = useMemo(() => {
    if (active === 'All') return portfolioItems;
    return portfolioItems.filter(x => x.category === active);
  }, [active]);

  const currentIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return items.findIndex(x => x.id === selectedItem.id);
  }, [selectedItem, items]);

  const showNext = useCallback(() => {
    if (currentIndex === -1 || items.length === 0) return;
    const nextIdx = (currentIndex + 1) % items.length;
    setSelectedItem(items[nextIdx]);
  }, [currentIndex, items]);

  const showPrev = useCallback(() => {
    if (currentIndex === -1 || items.length === 0) return;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    setSelectedItem(items[prevIdx]);
  }, [currentIndex, items]);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedItem, closeModal, showNext, showPrev]);

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-title">
          <p className="eyebrow">THE CREATIVE EDIT</p>
          <h2>A glimpse of my <em>work.</em></h2>
          <p>A collection of visual concepts across beauty, fashion and lifestyle. Click any photo to view in full resolution.</p>
        </div>

        <div className="portfolio-tools">
          <div className="filters">
            {filters.map(f => (
              <button
                key={f}
                className={active === f ? 'selected' : ''}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <small>{String(items.length).padStart(2, '0')} PROJECTS</small>
        </div>

        <div className="portfolio-grid">
          {items.map(item => (
            <article
              className="work-card"
              key={item.id}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedItem(item); }}
              aria-label={`View ${item.title}`}
            >
              <div className="work-image">
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.category} UGC concept`}
                  style={{ objectPosition: item.position || 'center', objectFit: item.fit || 'cover' }}
                  loading="lazy"
                />
                <div className="image-view-overlay" aria-hidden="true">
                  <Maximize2 size={16} color="#ffffff" />
                </div>
                <span>{item.type}</span>
              </div>
              <p className="work-category">{item.category}</p>
              <h3>{item.title} <i>↗</i></h3>
              <p className="work-description">{item.description}</p>
            </article>
          ))}
        </div>

        <p className="disclaimer">Portfolio note: These are visual concept placeholders, not paid brand campaigns or client testimonials.</p>
      </div>

      {/* Lightbox / Modal Popup */}
      {selectedItem && (
        <div
          className="lightbox-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeModal}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  className="lightbox-nav prev"
                  onClick={showPrev}
                  aria-label="Previous item"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="lightbox-nav next"
                  onClick={showNext}
                  aria-label="Next item"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="lightbox-media-wrapper">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-footer">
              <div>
                <span className="work-category">{selectedItem.category} · {selectedItem.type}</span>
                <h3>{selectedItem.title}</h3>
                <p className="work-description">{selectedItem.description}</p>
              </div>
              <div className="lightbox-counter">
                {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
