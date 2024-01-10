import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store-hooks';
import {
  resetGame
} from '../../store/slices/game-process-slice/game-process-slice';
import { AppRoute } from '../../constants/const';
import './login-screen.style.css';

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
      <form className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">
            Логин
          </label>
          <input className="login__input" type="text" name="name" id="name" />
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
          Войти
        </button>
      </form>
      <Link
        className="login__button button"
        to={AppRoute.Signup}
      >
        или зарегистрироваться
      </Link>
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

export { LoginScreen };
