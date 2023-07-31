import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Login from '../Auth/Login';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handlePushUrl = ( aUrl ) => {
    this.props.history.push( aUrl || '' );
  }

  render() {
    const logo_weplay ='/assets/images/Auth/logo_weplay.png';
    const logo_face ='/assets/images/Auth/logo_face.png';
    const logo_naver ='/assets/images/Auth/logo_navar.png';
    const logo_kakao ='/assets/images/Auth/logo_kakao.png';
    return (
      <div className='container-page-dashboard'>
        <div className="wrap flex_wrap">
          <div className="join_wrap main flex_container ">
            <div className="inner">
              <div className="join_cont">
                <div className="logo">
                  <img src={logo_weplay} alt="logo_weplay" />
                </div>
                <div className="join_title">
                  <p className="join_txt">언제 어디서나</p>
                  <p className="join_tit">내가 원할때</p>
                </div>
                <div className="login_botton">
                  <div className="login">
                    <button type="button" className="never" onClick={this.handlePushUrl.bind( this, '/register/numbers' )} style={{background:`#32b24a url(${logo_naver}) no-repeat 26px`, backgroundSize:`16px`}}>네이버로 시작하기</button>
                    <button type="button" className="facebook" onClick={this.handlePushUrl.bind( this, '/register/numbers' )} style={{background:`#455e99 url(${logo_face}) no-repeat 26px`, backgroundSize:`9px`}}>페이스북으로 시작하기</button>
                    <button type="button" className="kakao" onClick={this.handlePushUrl.bind( this, '/register/numbers' )} style={{background:`#ffe600 url(${logo_kakao}) no-repeat 23px 13px`, color:`#392020`, backgroundSize:`18px`}}>카카오톡으로 시작하기</button>
                  </div>
                  <p className="already" onClick={this.handlePushUrl.bind( this, '/register' )}>Register</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
};

Dashboard.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(Dashboard);