import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as Constants from '../../../constant';

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sIsOpenSideMenu: false,
    }
  }

  componentDidMount = () => {
    this.props.onRef( this );
  }

  componentWillUnmount = () => {
    this.props.onRef( null );
  }

  pHandleOpenSideMenu = () => {
    this.setState({
      sIsOpenSideMenu: true,
    })
  }

  handleSideAction = ( aSort ) => {
    if ( aSort === 'closemenu' ) {
      this.setState({
        sIsOpenSideMenu: false,
      })
    };
  };

  handleClickSideBtn = ( aLink ) => {
    this.props.history.push( aLink );
    this.handleSideAction( 'closemenu' );
  }

  render() {
    const { sIsOpenSideMenu } = this.state;
    const img_prof = "/assets/images/Header/img_prof.png";
    const icon_cash = "/assets/images/Header/icon_cash.png";
    const icon_message = "/assets/images/Header/icon_message.png";
    const icon_score = "/assets/images/Header/icon_score.png";
    const icon_rank = "/assets/images/Header/icon_rank.png";
    const icon_event = "/assets/images/Header/icon_event.png";
    const icon_change = "/assets/images/Header/icon_change.png";
    const icon_team = "/assets/images/Header/icon_team.png";
    const icon_play = "/assets/images/Header/icon_play.png";
    const icon_medal = "/assets/images/Header/icon_medal.png";
    const icon_apply = "/assets/images/Header/icon_apply.png";
    const icon_faq = "/assets/images/Header/icon_faq.png";
    const icon_service = "/assets/images/Header/icon_service.png";
    const icon_share = "/assets/images/Header/icon_share.png";
    const icon_exit = "/assets/images/Header/icon_exit.png";

    const myTeam = false;

    return (
      <div className='container-component-side-menu'>
        <AnimatePresence>
          {sIsOpenSideMenu && (
            <motion.div className="allmenu" key="sidemenu" initial="before" animate="in" exit="out" variants={Constants.pageVariants_side} transition={Constants.pageTransition_side}>
              <div className="close">
                <button type="button" className="close_btn" onClick={this.handleSideAction.bind( this, 'closemenu' )}><img src={icon_exit} alt="" /></button>
              </div>
                <div className="top_nav_top">
                  <div className="information">
                    <div className="infor_img" onClick={this.handleSideAction.bind( this, 'closemenu' )}><Link to="/mypage/editMyProfile"><img src={img_prof} alt="" /></Link></div>
                    <div className="infor_txt">
                      <div>
                        <span className="name">강동원</span>
                        {myTeam ? <span type="button" className="generating" onClick={this.handleClickSideBtn.bind( this, '/team/create' )}>{myTeam}</span> : <span type="button" className="generating" onClick={this.handleClickSideBtn.bind( this, '/team/create' )}>팀 생성하기</span>}
                      </div>
                      <div>
                        <span className="level">LV.4</span>
                        <div className="level_bor">
                          <p className="level_bor_level"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="allmenu_nav">
                    <div className="nav_list">
                      <div className="nav_list_img">
                        <img src={icon_cash} alt="" />
                      </div>
                      <p className="nav_list_tit">나의 캐시</p>
                    </div>
                    <div className="nav_list" onClick={this.handleClickSideBtn.bind( this, '/message/messageList' )}>
                      <div className="nav_list_img">
                        <img src={icon_message} alt="" />
                      </div>
                      <p className="nav_list_tit">메세지</p>
                    </div>
                    <div className="nav_list">
                      <div className="nav_list_img">
                        <img src={icon_score} alt="" />
                      </div>
                      <p className="nav_list_tit">내점수</p>
                    </div>
                    <div className="nav_list" onClick={this.handleClickSideBtn.bind( this, '/ranking/rankingPage' )}>
                      <div className="nav_list_img">
                        <img src={icon_rank} alt="" />
                      </div>
                      <p className="nav_list_tit">랭킹</p>
                    </div>
                    <div className="nav_list" onClick={this.handleClickSideBtn.bind( this, '/starplay/request' )}>
                      <div className="nav_list_img">
                        <img src={icon_event} alt="" />
                      </div>
                      <p className="nav_list_tit">스타플레이</p>
                    </div>
                    <div className="nav_list" onClick={this.handleClickSideBtn.bind( this, '/play/eventSelection' )}>
                      <div className="nav_list_img">
                        <img src={icon_change} alt="" />
                      </div>
                      <p className="nav_list_tit">종목변경</p>
                    </div>
                  </div>
                </div>
                <div className="top_nav_depth">
                  <div className="depth">
                    <div className="depth01 on">
                      <img src={icon_team} alt="" />
                      <span onClick={this.handleClickSideBtn.bind( this, '/team/teamDetail')}>팀</span>
                      {myTeam ? <button type="button" className="gener" onClick={this.handleClickSideBtn.bind( this, '/team/teamDetail' )}>{myTeam}</button> : <button type="button" className="gener" onClick={this.handleClickSideBtn.bind( this, '/mypage/createTeam' )}>팀 생성하기</button>}
                    </div>
                    <div className="depth01">
                      <img src={icon_play} alt="" /><span onClick={this.handleClickSideBtn.bind( this, '/mypage/myHistory' )}>경기</span>
                    </div>
                    <div className="depth01">
                      <img src={icon_medal} alt="" /><span onClick={this.handleClickSideBtn.bind( this, '/contest/contestList' )}>대회</span>
                    </div>
                    <div className="depth01">
                      <img src={icon_apply} alt="" /><span>신청</span>
                    </div>
                    <div className="depth01">
                      <img src={icon_faq} alt="" /><span>FAQ</span>
                    </div>
                    <div className="depth01">
                      <img src={icon_service} alt="" /><span>이용방법</span>
                    </div>
                    <div className="depth01">
                      <img src={icon_share} alt="" /><span>공유</span>
                    </div>
                  </div>
                </div>
            </motion.div>
          )}
          {sIsOpenSideMenu && (<motion.div className="allmenu_bg" initial="before" animate="in" exit="out" variants={Constants.pageVariants_sidemenu_bg} transition={Constants.pageTransition_side}></motion.div>)}
        </AnimatePresence>
      </div>
    );
  }
}

SideMenu.propTypes = {
  onRef: PropTypes.func,
};

SideMenu.defaultProps = {
  onRef: () => {},
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(SideMenu);