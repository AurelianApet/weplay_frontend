import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sIndex : 0,
			sGameSrc: [
				'assets/images/Temp/main/img_game.png',
				'assets/images/Temp/main/img_game.png',
				'assets/images/Temp/main/img_game.png',
				'assets/images/Temp/main/img_game.png',
			],
			sGamePersonSrc: [
				'assets/images/Temp/main/img_alprof1.png',
				'assets/images/Temp/main/img_alprof2.png',
				'assets/images/Temp/main/img_alprof3.png'
			],
			sPlayerSrc: [
				{
					img: 'assets/images/Temp/main/img_player1.png',
					name: '홍길동',
				},
				{
					img: 'assets/images/Temp/main/img_player2.png',
					name: '이순신',
				},
				{
					img: 'assets/images/Temp/main/img_player3.png',
					name: '유관순',
				},
				{
					img: 'assets/images/Temp/main/img_player1.png',
					name: '홍길동',
				},
			],
			sPlaygroundSrc: [
				'assets/images/Temp/main/img_pg1.png',
				'assets/images/Temp/main/img_pg2.png',
				'assets/images/Temp/main/img_pg3.png',
				'assets/images/Temp/main/img_pg4.png',
			],
			sVowelSrc: [
				'assets/images/Temp/main/img_cont1.png',
				'assets/images/Temp/main/img_cont2.png',
				'assets/images/Temp/main/img_cont3.png',
				'assets/images/Temp/main/img_cont4.png',
			],
			sNoticeStr: [
				'히트맵 블라인드 테스트) 둘중에 누가 더 잘함?',
				'히트맵 블라인드 테스트) 둘중에 누가 더 잘함?',
				'래반도프스키의 행복한 눈물',
				'다양한 아이유 움짤들',
				'이승우 다시 돌아왔네',
			],
			sGameInfo: [
				{
					img: 'assets/images/Temp/main/img_cont1.png',
					content: '히트맵 블라인드 테스트',
				},
				{
					img: 'assets/images/Temp/main/img_cont2.png',
					content: '래반도프스키의 행복한 눈물',
				},
				{
					img: 'assets/images/Temp/main/img_cont3.png',
					content: '다양한 아이유 움짤들',
				},
				{
					img: 'assets/images/Temp/main/img_cont4.png',
					content: '이승우 다시 돌아왔네',
				},
			],
			sEventSrc: [
				'assets/images/Temp/main/img_event.png',
				'assets/images/Temp/main/img_event.png',
				'assets/images/Temp/main/img_event.png',
				'assets/images/Temp/main/img_event.png',
			]
		};
	}

	componentDidMount() {
	}

	/**
	 * handle functinos
	 **/

	/**
	 * render functions
	 **/

	handlePushSearchDetail = ( aUrl ) => {
		this.props.history.push(aUrl)
	}

	renderGamePlayContainer = () => {
		const { sGameSrc, sGamePersonSrc } = this.state;
		return (
			<section className="recommend_play">
				<div className="common_text">
					<h2 className="common_txt">추천경기</h2>
					<div className="more_view" onClick={this.handlePushSearchDetail.bind(this, 'search/searchteam')}>
						<span className="more_view_tit">모두보기</span>
						<span className="more_view_number">(30)</span>
					</div>
				</div>
				<div className="recommend_play_list_box">
					<div className="recommend_play_list">
						<div className="recommend_play_list_item">
						{
							_.map (sGameSrc, (item, index) => {
								return (
									<div key={`${index} ${item}`} className="recommend_play_section">
										<div className="section_inner">
											<div className="img">
												<img src={item} alt="img_game" />
											</div>
											<div className="score_box">
												<div className="grren_new">NEW</div>
												<div className="score">
													<i><img src={'assets/images/Temp/main/icon/icon_star.png'} alt="" /></i>
													<strong>4.5</strong>
												</div>
											</div>
										</div>
										<div className="section_txt">
											<div className="section_txt_data">
												<p className="section_data_title">DSB</p>
												<div className="person_img">
												{
													_.map (sGamePersonSrc, (personImgItem, imgIndex) => {
														return (
															<div key={`${imgIndex} ${personImgItem}`}>
																<img src={personImgItem} alt="" />
															</div>
														)
													})
												}
												</div>
											</div>
											<div className="info_section">
												<p className="txt_summary">경기도 성남시 분당구 탄천 경기장</p>
												<p className="date">7월 4일 12:00</p>
											</div>
										</div>
									</div>
								)
							})
						}
						</div>
					</div>
				</div>
			</section>
		)
	}

	renderPlayerContainer = () => {
		const { sPlayerSrc } = this.state;
		return (
			<section className="recommend_player">
				<div className="common_text">
					<h2 className="common_txt">추천 플레이어</h2>
					<div className="more_view" onClick={this.handlePushSearchDetail.bind(this, 'search/searchplayer')}>
						<span className="more_view_tit">모두보기</span>
						<span className="more_view_number">(30)</span>
					</div>
				</div>
				<div className="player_area">
					<div className="player_area_list">
						<div className="player_area_item">
						{
							_.map( sPlayerSrc, (playerItem, index) => {
								return (
									<div key = {`${playerItem.name} ${index}`} className="player_area_section" onClick={this.handleClickPlayer}>
										<div className="player_section_inner">
											<div className="img">
												<img src={playerItem.img} alt="" />
											</div>
										</div>
										<div className="player_section_txt">
											<p>Player</p>
											<strong className="name">{playerItem.name}</strong>
										</div>
									</div>
								)
							})
						}
						</div>
					</div>
				</div>
			</section>
		)
	}

	renderPlayGroundContainer = () => {
		const { sPlaygroundSrc } = this.state;
		return (
			<section className="recommend_playground">
				<div className="common_text">
					<h2 className="common_txt">추천 경기장</h2>
					<div className="more_view" onClick={this.handlePushSearchDetail.bind(this, 'search/searchstadium')}>
						<span className="more_view_tit">모두보기</span>
						<span className="more_view_number">(30)</span>
					</div>
				</div>
				<div className="playground_list_area">
				{
					_.map (sPlaygroundSrc, (item, index) => {
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

	renderVowelContainer = () => {
		const { sVowelSrc } = this.state;
		return (
			<section className="vowel">
				<div className="common_text">
					<h2 className="common_txt">꿀팁 모음</h2>
					<div className="more_view">
						<span className="more_view_tit">더보기</span>
					</div>
				</div>
				<div className="vowel_wrap">
				{
					_.map (sVowelSrc, (item, index) => {
						return (
							<div key = {`${item} ${index}`} className="vowel_div">
								<div className="vowel_div_img"><img src={item} alt="" /></div>
								<div className="vowel_div_tit">
									<p style={{color:"white"}}>히트맵 블라인드 테스트) 둘중에 누가 더 잘함?</p>
									<div className="vowel_div_data">
										<span>김경민</span>
										<span>20-08-25</span>
										<span>조회 0</span>
										<span>추천 2</span>
									</div>
								</div>
							</div>
						)
					})
				}
				</div>
			</section>
		)
	}

	renderNoticeContainer = () => {
		const { sNoticeStr } = this.state;
		return (
			<section className="communication_notice">
				<div className="common_text">
					<h2 className="common_txt">소통 게시판</h2>
					<div className="more_view">
						<span className="more_view_tit">더보기</span>
					</div>
				</div>
				<div className="communication_list">
				{
					_.map(sNoticeStr, (item, index) => {
						return (
							<div key={`${index} ${item}`} className="communication_div">
								<p style={{color:"white"}} className="txt">{item}</p>
								<div className="communication_title">
									<span>김경민</span>
									<span>20-08-25</span>
									<span>조회 0</span>
									<span>추천 2</span>
								</div>
							</div>
						)
					})
				}
				</div>
			</section>
		)
	}

	renderGameInfoContainer = () => {
		const { sGameInfo } = this.state;
		return (
			<section className="game_information">
				<div className="common_text">
					<h2 className="common_txt">경기 정보</h2>
					<div className="more_view">
						<span className="more_view_tit">더보기</span>
					</div>
				</div>
				<div className="game_infor_wrap">
				{
					_.map( sGameInfo, (item, index) => {
						return (
							<div key = {`${item} ${index}`} className="game_infor_div">
								<div className="img">
									<img src={item.img} alt="" />
								</div>
								<div className="game_infor_div_txt">
									<p style={{color:"white"}}>{item.content}</p>
									<div className="game_infor_div_data">
										<span>20-08-25</span>
										<span>김경민</span>
									</div>
								</div>
							</div>
						)
					})
				}
				</div>
			</section>
		)
	}

	renderCompetitionEventContainer = () => {
		const { sEventSrc } = this.state;
		return (
			<section className="competition_event">
				<div className="common_text">
					<h2 className="common_txt">경기 이벤트</h2>
					<div className="more_view" onClick={this.handleClickEventShow}>
						<span className="more_view_tit">더보기</span>
					</div>
				</div>
				<div className="comp_event_wrap">
				{
					_.map (sEventSrc, (item, index) => {
						return (
							<div key = {`${index} ${item}`} className="comp_event_div">
								<div className="img" onClick={this.handleClickEventShow}><img src={item} alt="" /></div>
								<div className="comp_event_div_txt">
									<p>스포츠 대회 모집</p>
									<span className="data">20-08-25까지</span>
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
      <div className="main_contents">
				<div className="main_sld">
					<div className="main_banner">
						<img src={'assets/images/Temp/main/main_banner.png'} alt="main_banner" />
					</div>
					<div className="main_banner_btn">
						<button type="button" onClick={this.handleClick}>대회 신청 {'>'}</button>
					</div>
				</div>
				{ this.renderGamePlayContainer() }
				{ this.renderPlayerContainer() }
				{ this.renderPlayGroundContainer() }
				{ this.renderVowelContainer() }
				{ this.renderNoticeContainer() }
				{ this.renderGameInfoContainer() }
				{ this.renderCompetitionEventContainer() }
				<Footer/>
      </div>
		);
	}
}

Main.propTypes = {
};

Main.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(Main);