import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { executeQuery } from '../../../library/utils/fetch';
import Checkbox from '../../components/Form/Checkbox';

const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sPassedAgreement: false,
      sAgreed: false,
      sPosition: {},
    }
    this.userInfo = {};
  }

  handleClickAgree = () => {
    this.setState( prev => ({
      sAgreed: !prev.sAgreed,
    }))
  }

  handleClickNextButton = () => {
    const { sAgreed } = this.state;
    if ( !sAgreed ) return;
    this.setState({
      sPassedAgreement: true,
    })
  }

  handleChangeInfo = ( e ) => {
    if ( !e ) return;
    const { value, name } = e.target;
    this.userInfo[name] = value;
  }

  handleChangePosition = ( aName, aValue ) => {
    let { sPosition } = this.state;
    sPosition[aName] = aValue;
    this.setState({
      sPosition,
    })
  }

  handleSaveUserInfo = () => {
    const { sPosition } = this.state;
    this.userInfo.position = [];
    _.map( POSITIONS, ( positionItem, positionIndex ) => {
      if ( sPosition[positionItem] ) {
        this.userInfo.position.push( positionItem );
      }
    });
    executeQuery({
      method: 'post',
      url: '/auth/register',
      data: {
        ...this.userInfo,
        height: this.userInfo.height? Number( this.userInfo.height.substr( 0, this.userInfo.height.length - 2 ) ) : 0,
        weight: this.userInfo.weight? Number( this.userInfo.weight.substr( 0, this.userInfo.weight.length - 2 ) ) : 0,
      },
      success: ( res ) => {
        this.props.history.push( '/dashboard' );
      },
      fail: ( err, res ) => {

      }
    })
  }

  renderRegisterAgreement = () => {
    const { sAgreed } = this.state;
    const blueStyle = {
      background: '#62a8df',
      color: '#fff',
    };
    const grayStyle = {
      background: '#515151',
      color: '#fff',
    };
    const icon_nck = '/assets/images/Auth/icon_nck.png';
    const icon_ck = 'assets/images/Auth/icon_ck.png';
    return (
      <div className="join_wrap number">
        <div className="inner">
          <div className="authen">
              <div className="authen_title">
                <p className="authen_tt">거의 다 됐어요.</p>
                <p>
                  개인정보 처리 동의서입니다.<br />
                  동의하시면 동의 버튼을 눌러주세요.<br />
                  단, 거부하시 경우 서비스 이용에 제한이<br />
                  있을 수 있습니다.
                </p>
              </div>
              <div className="authen_input">
              <div className="terms_box">
                <p>Ⅰ. 개인정보의 수집 및 이용 동의서</p>
                <p>
                  - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용
                  하며, 하기 목적 이외의 용도로는 사용되지 않습니다.
                </p>
                <p>① 개인정보 수집 항목 및 수집·이용 목적</p>
                <p>가) 수집 항목 (필수항목)</p>
                <p>
                  - 성명(국문), 주민등록번호, 주소, 전화번호(자택,
                  휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,
                  외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동,
                  타 장학금 수혜현황, 요식업 종사 현황 등 지원
                  신청서에 기재된 정보 또는 신청자가 제공한 정보
                </p>
              </div>
              <div className="join_btn btns">
                <button type="text" className="btn no_agree"><i><img src={icon_nck} alt="" /></i>비동의</button>
                <button type="text" className="btn agree" onClick={this.handleClickAgree}><i><img src={sAgreed ? icon_ck : icon_nck} alt="" /></i>동의</button>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom_area'>
          <div style={sAgreed ? blueStyle : grayStyle} className='btn' onClick={this.handleClickNextButton}>다음으로</div>
        </div>
      </div>
    );
  }

  renderCheckBox = ( aPosition, aIndex ) => {
    const { sPosition } = this.state;
    return (
      <Checkbox
        key={`${aPosition}-${aIndex}`}
        id={`${aPosition}-${aIndex}`}
        label={aPosition}
        onChange={this.handleChangePosition.bind( this, aPosition )}
        isChecked={sPosition[aPosition]}
      />
    )
  }

  renderRegisterContainer = () => {
    const img_alprof1 = '/assets/images/Auth/img_alprof1.png';
    const icon_camera = '/assets/images/Auth/icon_camera.png';
    const icon_down = '/assets/images/Auth/icon_down';
    const heightMask = createNumberMask({
      prefix: '',
      suffix: 'cm',
			allowDecimal: true,
			decimalLimit: 1,
			includeThousandsSeparator: false,
    });
    const weightMask = createNumberMask({
      prefix: '',
      suffix: 'kg',
			allowDecimal: true,
			decimalLimit: 1,
			includeThousandsSeparator: false,
		});

    return (
      <div className="contents">
        <div className="inner">
          <div className="cont_tit">
            <h2>내 정보 입력</h2>
          </div>
          <div className="Photo_Change">
            <div className="Photo" onClick={() => {}}>
              <img src={img_alprof1} alt="" />
              <div className="Photo_click">
                  <button type="button" className="Photo_click_btn" style={{background:`rgba(255,255,255,0.8) url(${icon_camera}) no-repeat center center`,backgroundSize: `20px`}}></button>
                </div>
            </div>
          </div>
          <div className="layer_box">

            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">아이디</p>
                <div>
                  <input type="text" name='userID' className="input" placeholder="" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>
            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">비밀번호</p>
                <div>
                  <input type="password" name='password' className="input" placeholder="" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>

            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">이름</p>
                <div>
                  <input type="text" name='realName' className="input" placeholder="김코치" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>
            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">전화번호</p>
                <div>
                  <input type="number" name='phoneNumber' className="input" valuplaceholdere="010-1234-5647" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>
            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">이메일</p>
                <div>
                  <input type="email" name='email' className="input" placeholder="weplay@weplay.com" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>
            <div className="ct_section cs02">
              <div className="input_div">
                <p className="section_tt">키</p>
                <div className="select">
                  {/* <select name="" style={{background:`#fff url(${icon_down}) no-repeat right 16px center`, backgroundSize:`12px 7px`}}>
                    <option value="">170cm</option>
                  </select> */}
                  <MaskedInput
                    name='height'
                    mask={heightMask}
                    placeholder='170cm'
                    onChange={this.handleChangeInfo}
                    style={{background:`#fff url(${icon_down}) no-repeat right 16px center`, backgroundSize:`12px 7px`}}
                  />
                </div>
              </div>
              <div className="input_div">
                <p className="section_tt">몸무게</p>
                <div className="select">
                  {/* <select name="" style={{background:`#fff url(${icon_down}) no-repeat right 16px center`, backgroundSize:`12px 7px`}}>
                    <option value="">49kg</option>
                  </select> */}
                  <MaskedInput
                    name='weight'
                    mask={weightMask}
                    placeholder='49kg'
                    onChange={this.handleChangeInfo}
                    style={{background:`#fff url(${icon_down}) no-repeat right 16px center`, backgroundSize:`12px 7px`}}
                  />
                </div>
              </div>
            </div>
            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">선호지역을 선택해주세요</p>
                <div className="search">
                  <input type="text" name="region" className="input" placeholder="서울 강남구" onChange={this.handleChangeInfo} />
                </div>
              </div>
            </div>
            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">나의 농구 레벨을 선택해주세요</p>
                <div className="search">
                  <input type="text" name="level" className="input" placeholder="Lv. 3" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>

            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">나의 포지션을 선택해주세요</p>
                <div className="search position_search">
                  {_.map( POSITIONS, ( positionItem, positionIndex ) => {
                    return this.renderCheckBox( positionItem, positionIndex );
                  })}
                </div>
              </div>
            </div>
            <div className="ct_section">
              <div className="input_div">
                <p className="section_tt">나의 한마디</p>
                <div className="search">
                  <input type="text" name="content" className="input" placeholder="Lv. 3" onChange={this.handleChangeInfo}/>
                </div>
              </div>
            </div>
          </div>
          <div className="join_btn">
              <button type="button" className="btn" onClick={this.handleSaveUserInfo}>수정하기</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { sPassedAgreement } = this.state;
    return (
      <div className='container-page-register'>
        {sPassedAgreement? 
          this.renderRegisterContainer()
          :
          this.renderRegisterAgreement()
        }
      </div>
    );
  }
}

Register.propTypes = {
};

Register.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(Register);