import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { executeQuery } from '../../../library/utils/fetch';
import { signIn } from '../../../library/redux/actions/auth';

const STATE_PHONE = 1;
const STATE_NUMBER = 2;

class RegisterNaver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sCrrState: STATE_PHONE,
      // sIsNext: false,
      // sIsValue: false,
      sIsNext: true,
      sIsValue: true,
    }
    this.authNumber = {};
    this.loginInfo = {};
  }

  handleClickNextButton = () => {
    // const { sIsNext, sCrrState } = this.state;
    // if ( !sIsNext ) return;
    // if ( sCrrState === STATE_NUMBER ) {
    //   this.props.history.push( '/main' );
    // } else {
    //   this.setState(prev => ({
    //     sCrrState: prev.sCrrState + 1,
    //     sIsNext: false,
    //   }));
    // }
    executeQuery({
      method: 'post',
      url: '/auth/login',
      data: this.loginInfo,
      success: ( res ) => {
        localStorage.setItem('token', res.token);
        this.props.signIn({
          isSuccessed: true,
          data: res,
        });
        this.props.history.push( '/main' );
      },
      fail: ( err, res ) => {

      }
    })
  }

  handleChangePhoneNumber = ( e ) => {
    const { value } = e.target;
    this.phoneValue = value;
    this.setState({
      sIsNext: value.length > 10,
    });
  }

  handleChangeCertified = ( e ) => {
    const { value, name } = e.target;
    if( name === 'auth1' ) {
      this.inputRef1.focus();
    }
    if( name === 'auth2' ) {
      this.inputRef2.focus();
    }
    if( name === 'auth3' ) {
      this.inputRef3.focus();
    }
    this.authNumber[name] = value;
    this.setState({
      sIsNext: this.authNumber['auth1'] && this.authNumber['auth2'] && this.authNumber['auth3'] && this.authNumber['auth4'],
    });
  }

  handleChangeLoginInfo = ( e ) => {
    if ( !e ) return;
    const { name, value } = e.target;
    this.loginInfo[name] = value;
  }

  handleRefreshClick = () => {
    this.authNumber = {};
    this.inputRef.value = '';
    this.inputRef1.value = '';
    this.inputRef2.value = '';
    this.inputRef3.value = '';
    this.setState({
      sIsNext: true,
    })
  }

  renderPhoneValidation = () => {
    const recommend_play_bg = '/assets/images/Auth/recommend_play_bg.png';
    return (
      <div className='join_wrap number' style={{background:`#02162c url(${recommend_play_bg}) no-repeat center center`, backgroundSize: `cover`}}>
        <div className='inner'>
          <div className='number_area'>
            <div className='number_tit'>
              <p className='start_tt'>시작해볼까요?</p>
              {/* <p className='start_t'>시작하기 위해 핸드폰번호를 입력해주세요. </p> */}
              <p className='start_t'>시작하기 위해 아이디와 비밀번호를 입력해주세요. </p>
            </div>
            {/* <div className='data_input'>
              <div>
                <select className='' name=''>
                  <option value=''>+82</option>
                </select>
              </div>
              <div className='phone_input'>
                <input type='number' onChange={this.handleChangePhoneNumber} name='mb_hp' className='input' />
              </div>
            </div> */}
            <div className='data_input'>
              <div className='phone_input'>
                <input type='text' name='userID' placeholder='아이디' onChange={this.handleChangeLoginInfo} className='input' />
              </div>
            </div>
            <div className='data_input'>
              <div className='phone_input'>
                <input type='password' name='password' placeholder='비밀번호' onChange={this.handleChangeLoginInfo} className='input' />
              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
  }

  renderNumberValidation = () => {
    return (
      <div className='join_wrap number'>
        <div className='inner'>
          <div className='authen'>
            <div className='authen_title'>
              <p className='authen_tt'>인증번호를 입력하세요.</p>
              <p>010-3802-2921로 4자리<br />인증번호를 보내드렸어요.</p>
            </div>  
            <div className='authen_input'>
              <div className='Certified'>
                <input type='text' className='input cer' placeholder='4' maxLength={1} name='auth1' ref={(node) => this.inputRef = node} onChange={this.handleChangeCertified}/>
                <input type='text' className='input cer' placeholder='4' maxLength={1} name='auth2' ref={(node) => this.inputRef1 = node} onChange={this.handleChangeCertified}/>
                <input type='text' className='input cer' placeholder='4' maxLength={1} name='auth3' ref={(node) => this.inputRef2 = node} onChange={this.handleChangeCertified}/>
                <input type='text' className='input cer' placeholder='4' maxLength={1} name='auth4' ref={(node) => this.inputRef3 = node} onChange={this.handleChangeCertified}/>
              </div>
              <p className='authen_input_no'>1분안에 번호를 받지 못했다면 아래 버튼을 클릭하여 다시 인증번호를 받아주세요.</p>
              <div className='join_btn'>
                <button type='button' className='btn' onClick={this.handleRefreshClick}>다시받기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { sCrrState, sIsNext, sIsValue } = this.state;
    const blueStyle = {
      background: '#62a8df',
      color: '#fff',
    };
    const grayStyle = {
      background: '#515151',
      color: '#fff',
    };
    return (
      <div className='container-page-register'>
        {sCrrState === STATE_PHONE && 
          this.renderPhoneValidation()
        }
        {sCrrState === STATE_NUMBER && 
          this.renderNumberValidation()
        }
        <div className='bottom_area'>
          <div style={sIsNext ? blueStyle : grayStyle} className='btn' disabled={!sIsValue} onClick={this.handleClickNextButton}>다음으로</div>
        </div>
      </div>
    );
  }
}

RegisterNaver.propTypes = {
};

RegisterNaver.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
    {
      signIn
    }
  )
)(RegisterNaver);