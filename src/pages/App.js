import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import _ from 'lodash';
import {
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import NotificationSystem from 'react-notification-system';

import { routes } from './route';
import { signOut, loginWithToken } from '../library/redux/actions/auth';
import { appConfig } from '../appConfig';
import { processErrorResponse } from '../library/utils/notification';

import '../assets/styles/App.scss';
import SideMenu from './components/Header/SideMenu';

global.notificationSystem = null;

export class ParentRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.idleTimer = null;
    this.prevPathname = '';
  }

  // eslint-disable-next-line
  onIdle = (e) => {
    localStorage.getItem('token') && this.props.signOut();
  }

  componentDidMount() {
    if (appConfig.isDev) {
      // restore token
      if(localStorage.getItem('token')) {
        this.props.loginWithToken({
          success: (res) => {
            localStorage.setItem('token', res.token);
          },
          fail: (res) => {
            processErrorResponse(res, this.props.history, true);
          }
        });
      }
    } else {
      this.props.signOut();
    }
  } 

  handleOpenSideMenu = () => {
    if ( this.sideMenu ) {
      this.sideMenu.pHandleOpenSideMenu();
    }
  }

  render() {
    const { location: { pathname } } = this.props;
    const token = localStorage.getItem('token');
    return (
      <IdleTimer
        ref={(ref) => { this.idleTimer = ref; }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={1000 * 60 * 60} // 1 hour
      >
        <SideMenu
          onRef={( node ) => {this.sideMenu = node}}
        />
        <div className="App bg-light">
          <NotificationSystem ref={(item) => { global.notificationSystem = item; }} />
          <div className={cn('container-body')}>
            <Switch>
              {routes.map((route, index) => (
                <route.wrapper
                  component={route.component}
                  key={index}
                  path={route.pathname}
                  exact={route.exact || false}
                  auth={this.props.auth}
                  headerType={route.headerType}
                  title={route.title}
                  handleOpenSideMenu={this.handleOpenSideMenu}
                />
              ))}
              <Redirect to={token? '/main' : appConfig.startPageURL || '/'} />
            </Switch>
          </div>
        </div>
      </IdleTimer>
    );
  }
}

ParentRoute.propTypes = {
  signOut: PropTypes.func.isRequired,
  loginWithToken: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  connect(
    state => ({
      auth: state.auth,
    }),
    {
      signOut,
      loginWithToken,
    }
  )
)(ParentRoute);
