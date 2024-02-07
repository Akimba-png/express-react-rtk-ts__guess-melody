import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store-hooks';
import { resetGame } from '../../store/slices/game-process-slice/game-process-slice';
import { AppRoute } from '../../constants/const';

function GameBack(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGameBack = () => {
    dispatch(resetGame());
    navigate(AppRoute.Main);
  };
  return (
    <a
      onClick={ handleGameBack }
      className="game__back"
      href="#"
    >
      <span className="visually-hidden">Сыграть ещё раз</span>
      <img
        className="game__logo"
        src="img/melody-logo-ginger.png"
        alt="Угадай мелодию"
      />
    </a>
  );
}

export { GameBack };
