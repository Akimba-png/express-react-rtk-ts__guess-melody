import { type MouseEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './../../hooks/store-hooks';
import { resetGame } from '../../store/slices/game-process-slice/game-process-slice';
import { AppRoute } from '../../constants/const';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { logout } from '../../store/thunk-actions/logout';
import { toastService } from '../../services/toast-service';
import './success-screen.style.css';

function SuccessScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { step, errorCount } = useAppSelector((state) => state.gameProcess);
  const handleLogoutClick = async (evt: MouseEvent) => {
    evt.preventDefault();
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      const e = error as string;
      toastService.showErrorToast(e);
    }
  };
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
        <a
          onClick={handleLogoutClick}
          className="result-logout__link result-logout__link--exit"
        >
          Выход
        </a>
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
        Вы ответили правильно на {step - errorCount} вопросов
        и совершили {errorCount} ошибки
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
