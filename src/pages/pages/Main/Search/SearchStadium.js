import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class SearchStadium extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sImgSrc : [
				'/assets/images/Temp/main/img_pg1.png',
				'/assets/images/Temp/main/img_pg2.png',
				'/assets/images/Temp/main/img_pg3.png',
				'/assets/images/Temp/main/img_pg4.png',
      ],
    }
  }

  renderPlayGroundContainer = () => {
		const { sImgSrc } = this.state;
		return (
			<section className="recommend_playground">
				<div className="common_text">
					<h2 className="common_txt">경기장</h2>
				</div>
				<div className="playground_list_area">
				{
					_.map (sImgSrc, (item, index) => {
						return (
							<div key = {`${index} ${item}`} className="play_ground_list" onClick={this.handleClickPlayground}>
								<div className="play_ground_section left">
									<img src={item} alt="" />
								</div>
								<div className="play_ground_section">
									<div className="play_ground_bon">
										<p className="play_ground_txt">탄천 농구경기장 </p>
										<p className="play_ground_tit">경기도 성남시 중원구 상대원1동 </p>
										<div className="playground_icon">
											<div>
												<i className="icon"><img src={'assets/images/Temp/main/icon/area.png'}alt="" /></i>
												<span>면적</span>
												<span className="gray_tit">5252km</span>
											</div>
											<div>
												<i className="icon"><img src={'assets/images/Temp/main/icon/capacity.png'} alt="" /></i>
												<span>수용인원</span>
												<span className="gray_tit">55명</span>
											</div>
										</div>
									</div>
								</div>
								<div className="play_ground_section">
									<button type="button" className="favorites">
										<img src={'assets/images/Temp/main/icon/favorites.png'} alt="" />
									</button>
								</div>
							</div>
						)
					})
				}
					</div>
			</section>
		)
	}


  render() {
    return (
      <div>
        <div className="main_contents">
          <div className="bg_blue_wrap">
            <div className="cont_tit">
              <h2 className="txtl">경기장 검색</h2>
              <p>지역과 종목을 선택해 주세요.</p>
            </div>
            <div className="layer_box mt20">
              <div className="ct_section">
                <div className="input_div">
                  <div className="search">
                    <input type="text" className="input" placeholder="이름 검색" style={{background: `no-repeat, #fff`, backgroundSize: `23px`, backgroundPosition:`center right 16px`}}/>
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
                        <option value="">실내/실외</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            <div className="filter">
              <button type="buttom" className="filter_btn filter" onClick={this.handleSearchFilter} style={{background:`no-repeat 7px`, backgroundSize:`12px`}}>실내</button>
              <button type="buttom" className="filter_btn filter" onClick={this.handleSearchFilter} style={{background:`no-repeat 7px`, backgroundSize:`12px`}}>샤와장</button>
              <button type="buttom" className="filter_btn filter" onClick={this.handleSearchFilter} style={{background:`no-repeat 7px`, backgroundSize:`12px`}}>필터</button>
            </div>
          </div>
          { this.renderPlayGroundContainer() }
        </div>
      </div>
      );
  }
}

SearchStadium.propTypes = {
};

SearchStadium.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(SearchStadium);