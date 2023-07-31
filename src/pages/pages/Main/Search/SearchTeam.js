import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class SearchTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sImgSrc : [
				'/assets/images/Temp/search/image/img_fpic1.png',
				'/assets/images/Temp/search/image/img_fpic2.png',
				'/assets/images/Temp/search/image/img_fpic3.png',
      ],
    }
  }

  renderPlayerListContainer = () => {
    const { sImgSrc } = this.state;
    return (
      <div className="team_wrap">
        <div className="common_text">
          <h2 className="common_txt">경기장</h2>
          <div className="select_box">
            <select name="">
              <option value="">추천순</option>
            </select>
          </div>
        </div>
        <div className="team_wrap_list">
        {
          _.map ( sImgSrc, (item, index) => {
            return (
              <div key = {`${item} ${index}`} className="team_wrap_list_box">
                <div className="list_box_top">
                  <div className="img">
                    <img src={item} alt=""/>
                  </div>
                  <div className="score_box">
                    <div className="grren_new">NEW</div>
                    <div className="score">
                      <i><img src={'/assets/images/Temp/search/icon/icon_star.png'} alt=""/></i>
                      <strong>4.5</strong>
                    </div>
                  </div>
                </div>
                <div className="list_box_bottom">
                  <div className="data_w">
                    <p className="title">DSB</p>
                    <div className="data_w_img">
                      <div><img src={'/assets/images/Temp/search/image/img_alprof1.png'} alt=""/></div>
                      <div><img src={'/assets/images/Temp/search/image/img_alprof2.png'} alt=""/></div>
                      <div><img src={'/assets/images/Temp/search/image/img_alprof3.png'} alt=""/></div>
                    </div>
                  </div>
                  <div className="data_info">
                      <p className="data_title">경기도 성남시 분당구 탄천 경기장</p>
                      <p className="date">7월 4일 12:00</p>
                  </div>
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
              <h2 className="txtl">팀 검색</h2>
              <p>지역과 종목을 선택해 주세요.</p>
            </div>
            <div className="layer_box mt20">
              <div className="ct_section">
                  <div className="input_div">
                      <div className="search">
                          <input type="text" className="input" placeholder="팀 이름을 입력해주세요." style={{background: `no-repeat, #fff`, backgroundSize: `23px`, backgroundPosition:`center right 16px`}}/>
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
                        <option value="">종목</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            <div className="filter">
              <button type="buttom" className="filter_btn filter" onClick={this.handleSearchFilter} style={{background:`no-repeat 7px`, backgroundSize:`12px`}}>필터</button>
            </div>
          </div>
          { this.renderPlayerListContainer() }
        </div>
      </div>
      );
  }
}

SearchTeam.propTypes = {
};

SearchTeam.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(SearchTeam);