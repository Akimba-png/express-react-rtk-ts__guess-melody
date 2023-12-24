import { withPlayer } from './../../hocks/with-player/with-player';
import { useUserAnswer } from '../../hooks/useUserAnswer';
import { ArtistItem } from '../artist-item/artist-item';
import { ArtistQuestion } from '../../models/data';

const TRACK_NUMBER = 1;

export type ArtistGameProps = {
  question: ArtistQuestion;
  render: (id: number, src: string) => JSX.Element;
};

function ArtistGame({render, question}: ArtistGameProps): JSX.Element {
  const [ userAnswerHandler ] = useUserAnswer(question.song.artist);
  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {render(TRACK_NUMBER, question.song.src)}
        </div>
      </div>
      <form className="game__artist">
        {
          question.answers.map(({artist, picture}, i) => {
            return (
              <ArtistItem
                artist={artist}
                url={picture}
                onUserAnswer={userAnswerHandler}
                key={picture + i}
              />
            );
          })
        }
      </form>
    </section>
  );
}

const ArtistGameWithPlayer = withPlayer(ArtistGame);
export { ArtistGameWithPlayer, ArtistGame };
