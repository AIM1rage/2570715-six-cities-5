import {Navigate} from 'react-router-dom';
import {AppRoute} from '@/constants/app-routes.ts';
import {AuthorizationStatus} from '@/constants/auth-status.ts';
import {useAppSelector} from '@/hooks/use-app-selector.tsx';
import {getAuthorizationStatus} from '@/store/app-user/selectors.ts';

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login}/>;
}
