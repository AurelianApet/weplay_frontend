import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';

// import Loading from '../pages/components/Loading';
// import BeerMenu       from '../pages/components/BeerMenu';
// import { getPageInfo } from './utils/permission';
import { appConfig } from '../appConfig';
import { HeaderWeplay } from '../pages/components/Header';

export const PrivateRoute = ({ component: InternalComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem('token');
      if(!token) {
        return (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location },
            }}
          />
        );
      } else {
        return (
          <div className='container-internal-pages'>
            <div className='container-internal-wrapper'>
              {rest.headerType &&
                <HeaderWeplay
                  title={rest.title}
                  handleOpenSideMenu={rest.handleOpenSideMenu}
                  type={rest.headerType}
                />
              }
              <InternalComponent {...props}/>
            </div>
          </div>
        )
      }
    }}
  />
);

export const PublicRoute = ({ component: InternalComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem('token');
      return !token ?
      <InternalComponent {...props} />
      :
      <Redirect
        to={{
          pathname: appConfig.startPageURL || '/',
          state: { from: props.location },
        }}
      />;
    }}
  />
);

export const NormalRoute = ({ component: InternalComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log(rest)
      return (
        <div className='container-internal-pages'>
          <div className='container-internal-wrapper'>
            {rest.headerType &&
              <HeaderWeplay
                title={rest.title}
                handleOpenSideMenu={rest.handleOpenSideMenu}
                type={rest.headerType}
              />
            }
            <InternalComponent {...props}/>
          </div>
        </div>
      );
    }}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

NormalRoute.propTypes = {
  component: PropTypes.any.isRequired,
};