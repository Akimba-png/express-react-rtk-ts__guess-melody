import { useAppSelector } from './../../hooks/store-hooks';
import { GenreGame } from './../../components/genre-game/genre-game';
import { ArtistGame } from './../../components/artist-game/artist-game';
import { LoadingStatus } from '../../constants/const';

function GameScreen(): JSX.Element {
  const { questions, loadingStatus } = useAppSelector(state => state.gameData);

  const GameComponent = 'genre' === 'genre' ? GenreGame : ArtistGame;
  const gameType = 'genre' === 'genre' ? 'game--genre' : 'game--artist';

  return (
    <section className={`game ${gameType}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>
        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>
      { loadingStatus === LoadingStatus.Pending && <h1>Loading</h1> }
      { !!questions.length && <GameComponent />}

    </section>
  );
}

export { GameScreen };
