import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/store-hooks';
import {
  resetGame
} from '../../store/slices/game-process-slice/game-process-slice';
import { login } from '../../store/thunk-actions/login';
import { Credentials } from '../../models/user';
import { AppRoute } from '../../constants/const';
import './login-screen.style.css';
import { toastService } from '../../services/toast-service';

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<Credentials>();

  const onSubmit = handleSubmit(async (credentials: Credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
      reset();
      navigate(AppRoute.Game);
    } catch (error) {
      const e = error as string;
      toastService.showErrorToast(e);
    }
  });

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
      <form
        onSubmit={onSubmit}
        className="login__form"
        action=""
      >
        <p className="login__field">
          <label className="login__label" htmlFor="email">
            Логин
          </label>
          <input
            className="login__input"
            type="text"
            id="email"
            {...register('email', {
              required: true,
              pattern: /\w+@\w+/,
            })}
          />
          {errors.email && (
            <span className="login__error">Поле должно содежать @</span>
          )}
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login__input"
            type="text"
            id="password"
            {...register('password', {
              required: true,
              minLength: 3,
            })}
          />
          {errors.password && (
            <span className="login__error">Минимум 3 символа</span>
          )}
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
