import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Song } from '../types/song';
import { Play } from 'lucide-react';
import clsx from 'clsx';

interface SongListProps {
  songs: Song[];
  currentSong: Song | null;
  onSongSelect: (song: Song) => void;
  onReorder: (result: DropResult) => void;
}

export function SongList({ songs, currentSong, onSongSelect, onReorder }: SongListProps) {
  return (
    <DragDropContext onDragEnd={onReorder}>
      <Droppable droppableId="songs" type="SONG">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-6"
          >
            <div className="grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 px-6 py-2 text-zinc-400 text-sm">
              <div>#</div>
              <div>TITLE</div>
              <div>PLAYING</div>
              <div>TIME</div>
              <div>ALBUM</div>
            </div>

            {songs.map((song, index) => (
              <Draggable 
                key={song.id} 
                draggableId={String(song.id)} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={clsx(
                      'grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 px-6 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer',
                      currentSong?.id === song.id && 'bg-red-950',
                      snapshot.isDragging && 'opacity-50'
                    )}
                    onClick={() => onSongSelect(song)}
                  >
                    <div className="flex items-center justify-center">
                      {currentSong?.id === song.id ? (
                        <Play size={16} className="text-red-500" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <p className="font-semibold text-white">{song.title}</p>
                        <p className="text-sm text-zinc-400">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {song.plays.toLocaleString()}
                    </div>
                    <div className="flex items-center">{song.duration}</div>
                    <div className="flex items-center">{song.album}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}