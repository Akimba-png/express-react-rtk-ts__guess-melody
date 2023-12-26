import { withPlayer } from './../../hocks/with-player/with-player';
import { useGenreAnswer } from '../../hooks/useGenreAnwer';
import { GenreQuestion } from '../../models/data';
import { GameItem } from '../game-item/game-item';

type GenreGameProps = {
  question: GenreQuestion;
  render: (id: number, src: string) => JSX.Element;
};

function GenreGame({ question, render }: GenreGameProps): JSX.Element {
  const [answerHandler, submitHandler] = useGenreAnswer(
    question.genre,
    question.answers
  );
  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form className="game__tracks">
        {question.answers.map((answer, i) => {
          const key = answer.src + i;
          return (
            <GameItem
              key={key}
              genre={answer.genre}
              index={i}
              renderPlayer={() => render(i, answer.src)}
              onChange={() => answerHandler(i)}
            />
          );
        })}
        <button
          onClick={submitHandler}
          className="game__submit button"
          type="button"
        >
          Ответить
        </button>
      </form>
    </section>
  );
}

const GenreGameWithPlayer = withPlayer(GenreGame);
export { GenreGameWithPlayer, GenreGame };
