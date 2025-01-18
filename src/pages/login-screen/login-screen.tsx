import Header from '@/components/header/header.tsx';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import {Link, Navigate} from 'react-router-dom';
import {AppRoute} from '@/constants/app-routes.ts';
import {FormEvent, useRef, useState} from 'react';
import {fetchFavoriteOffersAction, fetchOffersAction, loginAction} from '@/store/api-actions.ts';
import {validatePassword} from '@/utils/utils.ts';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {useAppDispatch} from '@/hooks/use-app-dispatch.tsx';
import {getAuthorizationStatus} from '@/store/app-user/selectors.ts';

export default function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const [validationError, setValidationError] = useState<string | undefined>(undefined);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setValidationError(() => {
      const error = validatePassword(passwordRef.current!.value);
      if (error === undefined && loginRef.current !== null && passwordRef.current !== null) {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        })).then(() => {
          dispatch(fetchOffersAction());
          dispatch(fetchFavoriteOffersAction());
        });
      }

      return error;
    });
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root}/>;
  }

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {validationError && <div style={{color: 'red', marginBottom: '24px'}}>{validationError}</div>}
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>);
}
