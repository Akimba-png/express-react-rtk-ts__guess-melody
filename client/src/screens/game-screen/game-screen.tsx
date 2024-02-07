import { Navigate } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';
import { useAppSelector } from './../../hooks/store-hooks';
import { GenreGameWithPlayer } from './../../components/genre-game/genre-game';
import { ArtistGameWithPlayer } from './../../components/artist-game/artist-game';
import { MistakeList } from '../../components/mistake-list/mistake-list';
import { AppRoute } from '../../constants/const';
import { GameBack } from '../../components/game-back/game-back';

function GameScreen(): JSX.Element {
  const { questions } = useAppSelector(state => state.gameData);
  const [ isLoading, isWin, isFail, step ] = useGame();

  if (isLoading) {
    return (<h1>loading</h1>);
  }

  if (!questions.length) {
    return (<h1>А вопросов-то и нет</h1>)
  }

  if (isWin) {
    return (
      <Navigate to={AppRoute.Success} />
    );
  }

  if (isFail) {
    return (
      <Navigate to={AppRoute.Fail} />
    );
  }

  const question = questions[step];

  const gameType = question.type === 'genre' ? 'game--genre' : 'game--artist';

  return (
    <section className={`game ${gameType}`}>
      <header className="game__header">
        <GameBack />
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>
        <MistakeList />
      </header>
      {
        question.type === 'artist' ? (
          <ArtistGameWithPlayer question={question}/>
        ) : (
          <GenreGameWithPlayer question={question} />
        )
      }
    </section>
  );
}

export { GameScreen };
