// helper
import { PrivateRoute, NormalRoute, PublicRoute } from '../library/route_helper';

//Dashboard
import Dashboard from '../pages/pages/dashboard';

//Auth
import Register from '../pages/pages/Auth/Register';
import RegisterNaver from '../pages/pages/Auth/RegisterNaver';

import Main from '../pages/pages/Main';
import PickupCreate from '../pages/pages/Main/Pickup/Create'
import SearchTeam from './pages/Main/Search/SearchTeam';
import SearchPlayer from './pages/Main/Search/SearchPlayer';
import SearchStadium from './pages/Main/Search/SearchStadium';
import TeamCreate from './pages/TeamManager/Create';
import { HEADER_TYPE_SIMPLE, HEADER_TYPE_MAIN } from './components/Header';
TeamCreate

export const routes = [
  {
    pathname: '/dashboard',
    component: Dashboard,
    exact: true,
    wrapper: NormalRoute,
  },

  // Auth
  {
    pathname: '/register/numbers',
    component: RegisterNaver,
    exact: true,
    wrapper: NormalRoute,
    headerType: HEADER_TYPE_SIMPLE,
  },

  {
    pathname: '/register',
    component: Register,
    exact: true,
    wrapper: NormalRoute,
    title: '신청',
    headerType: HEADER_TYPE_SIMPLE,
  },

  // Main
  {
    pathname: '/main',
    component: Main,
    exact: true,
    wrapper: PrivateRoute,
    headerType: HEADER_TYPE_MAIN,
  },

  {
    pathname: '/pickup/create',
    component: PickupCreate,
    exact: true,
    wrapper: PrivateRoute,
  },

  {
    pathname: '/search/searchteam',
    component: SearchTeam,
    exact: true,
    wrapper: PrivateRoute,
    headerType: HEADER_TYPE_SIMPLE,
  },

  {
    pathname: '/search/searchplayer',
    component: SearchPlayer,
    exact: true,
    wrapper: PrivateRoute,
    headerType: HEADER_TYPE_SIMPLE,
  },

  {
    pathname: '/search/searchstadium',
    component: SearchStadium,
    exact: true,
    wrapper: PrivateRoute,
    headerType: HEADER_TYPE_SIMPLE,
  },

  {
    pathname: '/team/create',
    component: TeamCreate,
    exact: true,
    wrapper: PrivateRoute,
    headerType: HEADER_TYPE_SIMPLE,
    title:'팀 생성'
  },
];