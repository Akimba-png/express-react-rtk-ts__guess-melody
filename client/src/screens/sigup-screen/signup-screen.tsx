import { type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetGame } from '../../store/slices/game-process-slice/game-process-slice';
import { useAppDispatch } from '../../hooks/store-hooks';
import { AppRoute } from '../../constants/const';
import './signup-screen.style.css';
import { useForm } from 'react-hook-form';
import { RegData } from '../../models/user';
import { signup } from '../../store/thunk-actions/signup';
import { toastService } from '../../services/toast-service';

function SignupScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RegData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(signup(data)).unwrap();
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
      <p className="login__text">
        Хотите узнать свой результат? Зарегистрируйтесь!
      </p>
      <form
        onSubmit={onSubmit}
        className="login__form login__form--signup"
        action=""
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">
            Ваше имя
          </label>
          <input
            className="login__input"
            type="text"
            id="name"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className="login__error">
              Поле обязательно
            </span>
          )}
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="email"
            id="email"
            {...register('email', {
              required: true,
              pattern: /\w+@\w+/i,
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
            <span className="login__error">
              Минимум 3 символа
            </span>
          )}
        </p>
        <button className="login__button button" type="submit">
          Signup
        </button>
      </form>
      <Link
        className="login__button button"
        to={AppRoute.Login}
      >
        или войти
      </Link>
      <button onClick={handleReplayClick} className="replay replay--signup" type="button">
        Сыграть ещё раз
      </button>
    </section>
  );
}

export { SignupScreen };
