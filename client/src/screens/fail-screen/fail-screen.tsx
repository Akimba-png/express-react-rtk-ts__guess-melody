import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store-hooks';
import { AppRoute } from '../../constants/const';
import {
  resetGame
 } from '../../store/slices/game-process-slice/game-process-slice';
import { useCheckAuth } from '../../hooks/useCheckAuth';

function FailScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useCheckAuth();
  if (!isAuth) {
    return <Navigate to={AppRoute.Signup}/>
  }
  return (
    <section className="result">
      <div className="result__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">
        У вас закончились все попытки. Ничего, повезёт в следующий раз!
      </p>
      <button
        onClick={() => {
          dispatch(resetGame());
          navigate(AppRoute.Game);
        }}
        className="replay"
        type="button"
        >
          Попробовать ещё раз
      </button>
    </section>
  );
}

export { FailScreen };
