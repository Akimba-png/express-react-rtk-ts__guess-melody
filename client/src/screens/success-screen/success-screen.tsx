import { type MouseEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './../../hooks/store-hooks';
import { resetGame } from '../../store/slices/game-process-slice/game-process-slice';
import { AppRoute } from '../../constants/const';
import { useCheckAuth } from '../../hooks/useCheckAuth';

function SuccessScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { step, errorCount } = useAppSelector((state) => state.gameProcess);
  const handlePlayAgainClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(resetGame());
    navigate(AppRoute.Game);
  };
  const { isAuth } = useCheckAuth();
  if (!isAuth) {
    return <Navigate to={AppRoute.Signup}/>
  }
  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link className="result-logout__link" to={AppRoute.Main}>
          Выход
        </Link>
      </div>
      <div className="result__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        Вы ответили правильно на {step} вопросов и совершили {errorCount} ошибки
      </p>
      <button
        className="replay"
        type="button"
        onClick={handlePlayAgainClick}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

export { SuccessScreen };
