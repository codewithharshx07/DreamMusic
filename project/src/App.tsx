import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Search } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { SongList } from './components/SongList';
import { songs as initialSongs } from './data/songs';
import { Song } from './types/song';
import type { DropResult } from 'react-beautiful-dnd';

function App() {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    if (currentSong) {
      if (sound) {
        sound.unload();
      }
      const newSound = new Howl({
        src: [currentSong.url],
        html5: true,
        onend: () => {
          handleNext();
        },
      });
      setSound(newSound);
      newSound.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      const nextSong = songs[(currentIndex + 1) % songs.length];
      setCurrentSong(nextSong);
    }
  };

  const handlePrevious = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
      setCurrentSong(previousSong);
    }
  };

  const handleReorder = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongs(items);
  };

  return (
    <div className="h-screen flex bg-zinc-900 text-zinc-200">
      <Sidebar />
      
      <main className="flex-1 flex">
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            <header className="flex items-center justify-between">
              <nav className="flex items-center gap-4">
                {['Music', 'Podcast', 'Live', 'Radio'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm font-semibold hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-0 outline-none placeholder-zinc-500"
                />
              </div>
            </header>

            <div className="mt-6">
              <div className="relative h-72 bg-gradient-to-b from-red-900 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center px-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Verified Artist</span>
                    </div>
                    <h1 className="text-5xl font-bold mt-2">Michael Jackson</h1>
                    <p className="text-sm mt-2">27,852,501 monthly listeners</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Popular</h2>
                <a href="#" className="text-sm text-zinc-400 hover:text-white">
                  See All
                </a>
              </div>

              <SongList
                songs={songs}
                currentSong={currentSong}
                onSongSelect={setCurrentSong}
                onReorder={handleReorder}
              />
            </div>
          </div>
        </div>

        <aside className="w-96 p-6">
          <Player
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;