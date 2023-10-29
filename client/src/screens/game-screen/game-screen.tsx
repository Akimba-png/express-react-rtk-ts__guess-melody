import { useAppSelector } from './../../hooks/store-hooks';
import { GenreGame } from './../../components/genre-game/genre-game';
import { ArtistGame } from './../../components/artist-game/artist-game';
import { LoadingStatus } from '../../constants/const';
import { getQuestion } from '../../store/selectors';

function GameScreen(): JSX.Element {
  const { loadingStatus } = useAppSelector(state => state.gameData);
  const question = useAppSelector(getQuestion);

  if (loadingStatus === LoadingStatus.Pending) {
    return (<h1>loading</h1>);
  }

  const GameComponent = question.type === 'genre' ? GenreGame : ArtistGame;
  const gameType = question.type === 'genre' ? 'game--genre' : 'game--artist';

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
      <GameComponent />
    </section>
  );
}

export { GameScreen };
