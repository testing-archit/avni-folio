'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export default function ProjectGallery({ project, images }) {
  const dialog = useRef(null);
  const previewButton = useRef(null);
  const [active, setActive] = useState(0);

  function move(offset) {
    setActive((index) => (index + offset + images.length) % images.length);
  }

  function showImage(index, event) {
    previewButton.current = event.currentTarget;
    setActive(index);
    dialog.current.showModal();
  }

  function handleKeyDown(event) {
    if (images.length < 2) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  }

  return (
    <section className="project-gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title">Project artwork</h2>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button className="gallery-tile" key={image} type="button" onClick={(event) => showImage(index, event)} aria-label={`Enlarge ${project.title} artwork${images.length > 1 ? ` ${index + 1}` : ''}`}>
            <img src={image} alt={`${project.title} artwork`} loading="lazy" />
            <span className="icon-button"><ZoomIn size={19} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialog}
        aria-label={`${project.title} artwork preview`}
        onClose={() => previewButton.current?.focus()}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}
        onKeyDown={handleKeyDown}
      >
        <div className="gallery-dialog-body">
          <button type="button" className="icon-button gallery-close" onClick={() => dialog.current.close()} aria-label="Close artwork preview" autoFocus><X size={21} aria-hidden="true" /></button>
          <img src={images[active]} alt={`${project.title} artwork${images.length > 1 ? ` ${active + 1}` : ''}`} />
          {images.length > 1 && (
            <div className="gallery-controls">
              <button type="button" className="icon-button" onClick={() => move(-1)} aria-label="Previous artwork"><ChevronLeft aria-hidden="true" /></button>
              <span aria-live="polite">{active + 1} / {images.length}</span>
              <button type="button" className="icon-button" onClick={() => move(1)} aria-label="Next artwork"><ChevronRight aria-hidden="true" /></button>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
