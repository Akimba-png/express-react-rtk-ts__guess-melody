import { type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  resetGame
} from '../../store/slices/game-process-slice/game-process-slice';
import { useAppDispatch } from '../../hooks/store-hooks';
import { AppRoute } from '../../constants/const';
import './signup-screen.style.css';

function SignupScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleReplayClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(resetGame());
    navigate(AppRoute.Game);
  };
  return (
    <section className="login">
      <div className="login__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"
        />
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Зарегистрируйтесь!</p>
      <form className="login__form login__form--signup" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">
            Ваше имя
          </label>
          <input className="login__input" type="text" name="name" id="name" />
          <span className="login__error">Неверный логин</span>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input className="login__input" type="email" name="email" id="email" />
          <span className="login__error">Неверный email</span>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login__input"
            type="text"
            name="password"
            id="password"
          />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">
          Sigup
        </button>
      </form>
      <button
        onClick={handleReplayClick}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

export { SignupScreen };
