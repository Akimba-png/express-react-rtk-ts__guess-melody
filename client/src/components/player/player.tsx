import { useRef, useEffect, useState } from 'react';
import cn from 'classnames';

type PlayerProps = {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
};

function Player({
  isPlaying,
  onPlayButtonClick,
}: PlayerProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  const audioLoadHandler = () => setIsLoading(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (!isLoading) {
      audio.addEventListener('loadeddata', audioLoadHandler);
    }
    return () => audio.removeEventListener('loadeddata', audioLoadHandler);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isLoading && isPlaying) {
      audio.play();
      return;
    }
    audio.pause();
  }, [isLoading, isPlaying]);

  return (
    <>
      <button
        onClick={onPlayButtonClick}
        className={cn(
          "track__button",
          {"track__button--play": isPlaying}
        )}
        type="button">
      </button>
      <div className="track__status">
        <audio
          ref={audioRef}
          src="https://13.design.pages.academy/static/music/Tubby.mp3"
        ></audio>
      </div>
    </>
  );
}

export { Player };
