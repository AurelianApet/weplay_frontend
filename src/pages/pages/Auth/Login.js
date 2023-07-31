import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handlePushToRegister = () => {
    this.props.history.push( '/register' );
  }

  render() {
    return (
      <div className='container-page-login'>
        <img className='login-background' src='/assets/images/Auth/background.png' alt=''/>
        <div className='login-content'>
          <div className='register-button' onClick={this.handlePushToRegister}>Register</div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
};

Login.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(Login);