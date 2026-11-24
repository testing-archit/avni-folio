import React from 'react';
import Image from 'next/image';

export default function ProjectCover({ item, eager = false }) {
  return (
    <div className={`project-cover cover-${item.cover}`} aria-hidden="true">
      {item.image ? (
        <div className="cover-artwork">
          <Image src={item.image} alt="" width={1024} height={1024} sizes={eager ? '(max-width: 700px) 44vw, 505px' : '(max-width: 700px) 44vw, 280px'} loading={eager ? 'eager' : 'lazy'} />
        </div>
      ) : (
        <>
          <span className="cover-shape" />
          <span className="cover-type">
            {item.coverTitle.map((line) => <span key={line}>{line}</span>)}
          </span>
        </>
      )}
    </div>
  );
}
