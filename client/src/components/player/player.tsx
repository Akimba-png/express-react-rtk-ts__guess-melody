import { useRef, useEffect, useState } from 'react';
import cn from 'classnames';

type PlayerProps = {
  src: string;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
};

function Player({
  src,
  isPlaying,
  onPlayButtonClick,
}: PlayerProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ isLoaded, setIsLoaded ] = useState<boolean>(false);

  const audioLoadHandler = () => setIsLoaded(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (!isLoaded) {
      audio.addEventListener('loadeddata', audioLoadHandler);
    }
    return () => audio.removeEventListener('loadeddata', audioLoadHandler);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isLoaded && isPlaying) {
      audio.play();
      return;
    }
    audio.pause();
  }, [isLoaded, isPlaying]);

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
          src={src}
          data-testid="audio"
        ></audio>
      </div>
    </>
  );
}

export { Player };
