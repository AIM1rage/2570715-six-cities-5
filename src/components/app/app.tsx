import MainScreen from '@/pages/main-screen/main-screen.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginScreen from '@/pages/login-screen/login-screen.tsx';
import OfferScreen from '@/pages/offer-screen/offer-screen.tsx';
import PrivateRoute from '@/components/private-route/private-route.tsx';
import FavoritesScreen from '@/pages/favorites-screen/favorites-screen.tsx';
import {AppRoute} from '@/constants/app-routes.ts';
import NotFoundScreen from '@/pages/not-found-screen/not-found-screen.tsx';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen/>}/>
          <Route path={AppRoute.Login} element={<LoginScreen/>}/>
          <Route path={AppRoute.Offer}>
            <Route index element={<OfferScreen/>}/>
            <Route path=':id' element={<OfferScreen/>}/>
          </Route>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <FavoritesScreen/>
            </PrivateRoute>
          }
          />
        </Route>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>);
}
