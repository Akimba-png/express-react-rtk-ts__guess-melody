import { ChangeEvent } from 'react';

type ArtistItemProps = {
  artist: string;
  url: string;
  onUserAnswer: (answer: string) => void;
};

function ArtistItem({
  artist,
  url,
  onUserAnswer,
}: ArtistItemProps): JSX.Element {
  return (
    <div className="artist">
      <input
        onChange={(
          evt: ChangeEvent<HTMLInputElement>
        ) => {
          evt.preventDefault();
          onUserAnswer(artist);
        }}
        className="artist__input visually-hidden"
        type="radio"
        name="answer"
        value={artist}
        id={artist}
      />
      <label className="artist__name" htmlFor={artist}>
        <img className="artist__picture" src={url} alt={artist} />
        {artist}
      </label>
    </div>
  );
}

export { ArtistItem };
