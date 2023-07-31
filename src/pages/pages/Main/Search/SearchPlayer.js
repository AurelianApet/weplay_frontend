import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class SearchPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sImgSrc : [
				'/assets/images/Temp/contest/image/img_prof.png',
				'/assets/images/Temp/contest/image/img_prof.png',
				'/assets/images/Temp/contest/image/img_prof.png',
				'/assets/images/Temp/contest/image/img_prof.png',
				'/assets/images/Temp/contest/image/img_prof.png',
				'/assets/images/Temp/contest/image/img_prof.png',
      ],
    }
  }

  renderTeamWrapContainer = () => {
    const { sImgSrc } = this.state;
    return (
      <div className="team_wrap">
        <div className="common_text">
          <h2 className="common_txt">플레이어</h2>
          <div className="select_box">
            <select name="">
              <option value="">추천순</option>
            </select>
          </div>
        </div>
        <div className="team_list bg_no">
        {
          _.map( sImgSrc, (item, index) => {
            return (
              <div className="team_list_box">
                <div className="item_img">
                  <img src={item} alt=""/>
                </div>
                <div className="item_txt">
                  <span className="name">강동원</span>
                  <span>190cm, 90kg</span>
                  <p className="blue">엑스플로드</p>
                </div>
                <div className="item_btn">
                  <button type="buttom" className="brn yellow">PF</button>
                  <button type="buttom" className="brn blue">SG</button>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="main_contents">
          <div className="bg_blue_wrap">
            <div className="cont_tit">
              <h2 className="txtl">플레이어 검색</h2>
              <p>지역과 종목을 선택해 주세요.</p>
            </div>
            <div className="layer_box mt20">
              <div className="ct_section">
                  <div className="input_div">
                      <div className="search">
                          <input type="text" className="input" placeholder="이름/팀 검색" style={{background: `no-repeat, #fff`, backgroundSize: `23px`, fontWeight:'bold', backgroundPosition:`center right 16px`}}/>
                      </div>
                  </div>
              </div>
              <div className="ct_section cs02">
                <div className="input_div">
                  <div className="select">
                    <select name="" style={{background:`#fff  no-repeat right 16px center`, backgroundSize:`12px 7px`}}>
                      <option value="">지역</option>
                    </select>
                  </div>
                </div>
                  <div className="input_div">
                    <div className="select">
                      <select name="" style={{background:`#fff  no-repeat right 16px center`, backgroundSize:`12px 7px`}}>
                        <option value="">포지션</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            <div className="filter">
              <button type="buttom" className="filter_btn filter" onClick={this.handleSearchFilter} style={{background:`no-repeat 7px`, backgroundSize:`12px`}}>필터</button>
            </div>
          </div>
          {
            this.renderTeamWrapContainer()
          }  
        </div>
      </div>
      );
  }
}

SearchPlayer.propTypes = {
};

SearchPlayer.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(SearchPlayer);