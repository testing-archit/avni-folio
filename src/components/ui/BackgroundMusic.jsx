'use client';

import { useRef, useState } from 'react';
import { Music2, Pause } from 'lucide-react';

export default function BackgroundMusic() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  async function toggle() {
    const track = audio.current;
    if (!track.paused) {
      track.pause();
      return;
    }
    setFailed(false);
    track.volume = 0.45;
    try {
      await track.play();
    } catch {
      setFailed(true);
    }
  }

  return (
    <div className="music-control">
      <button type="button" className="icon-button" aria-label={playing ? 'Pause background music' : 'Play background music'} title={playing ? 'Pause music' : 'Play music'} onClick={toggle}>
        {playing ? <Pause size={18} aria-hidden="true" /> : <Music2 size={18} aria-hidden="true" />}
      </button>
      <audio ref={audio} src="/media/studio-keys.m4a" loop preload="none" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setFailed(true); }} />
      {failed && <span className="music-error" role="status">Music couldn’t play. Tap to retry.</span>}
    </div>
  );
}
