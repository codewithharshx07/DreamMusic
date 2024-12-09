import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { Song } from '../types/song';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }: PlayerProps) {
  const [progress, setProgress] = useState(0);

  if (!currentSong) return null;

  return (
    <div className="bg-red-950 p-6 rounded-2xl">
      <div className="aspect-square mb-4">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">{currentSong.title}</h3>
        <p className="text-sm text-zinc-400">{currentSong.artist}</p>
      </div>

      <div className="mb-6">
        <div className="h-1 bg-zinc-600 rounded-full">
          <div
            className="h-1 bg-red-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button className="text-zinc-200 hover:text-white">
          <Shuffle size={20} />
        </button>
        <button
          onClick={onPrevious}
          className="text-zinc-200 hover:text-white"
        >
          <SkipBack size={24} />
        </button>
        <button
          onClick={onPlayPause}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={onNext}
          className="text-zinc-200 hover:text-white"
        >
          <SkipForward size={24} />
        </button>
        <button className="text-zinc-200 hover:text-white">
          <Repeat size={20} />
        </button>
      </div>
    </div>
  );
}