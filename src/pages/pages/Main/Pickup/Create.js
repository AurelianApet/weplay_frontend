import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className="contents">
          <div className="inner">
            <div className="cont_tit">
              <h2>호스트 신청하기</h2>
              <p className="txtc">host application</p>
            </div>
            <div className="layer_box">
              <div className="ct_section">
                <div className="input_div">
                  <p className="section_tt">팀명</p>
                  <div className="search">
                      <input type="text" className="input" placeholder="팀명을 입력해주세요." style={{background: `no-repeat, #fff`, backgroundSize: `23px`, backgroundPosition:`center right 16px`}}/>
                  </div>
                </div>
              </div>
              <div className="ct_section">
                <div className="input_div">
                  <p className="section_tt">사업자 번호</p>
                  <div className="search">
                    <input type="text" className="input" placeholder="사업자 번호를 등록해주세요." style={{background: `no-repeat, #fff`, backgroundSize: `23px`, backgroundPosition:`center right 16px`}}/>
                  </div>
                </div>
              </div>
              <div className="ct_section">
                <div className="input_div">
                  <p className="section_tt">대표자 연락처</p>
                  <div>
                    <input type="text" className="input"/>
                  </div>
                </div>
              </div>
              <div className="ct_section">
                <div className="input_div">
                  <p className="section_tt">주소</p>
                  <div>
                    <input type="text" className="input" placeholder="주소를 입력해주세요."/>
                  </div>
                </div>
              </div>
              <div className="ct_section">
                <div className="input_div">
                  <p className="section_tt">운영 시간</p>
                  <div>
                    <input type="text" className="input" placeholder="운영 시간을 입력해주세요."/>
                  </div>
                </div>
              </div>
              <div className="ct_section">
                <div className="input_div">
                  <p className="section_tt">체육관 정보</p>
                  <div>
                    <textarea name="name" className="textarea" placeholder="정보를 입력해주세요.(코트 가로, 세로 크기, 바닥 재질등)"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="join_btn btns">
              <button type="button" className="btn" onClick={this.handlePhotoSelect}>+사진등록</button>
            </div>
          </div>
        </div>
        {/* <NextButton onClick={() => history.push('/pickup/register')}/> */}
      </div>
      );
  }
}

Create.propTypes = {
};

Create.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(Create);