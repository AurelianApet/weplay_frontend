import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import _                            from 'lodash';
import { withRouter }               from 'react-router-dom';
import { compose }                  from 'redux';
import { connect }                  from 'react-redux';

import { HEADER_TYPE_MAIN, HEADER_TYPE_SIMPLE } from './index';

export class HeaderWeplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    // console.log('HeaderWeplay componentDidMount', this.props)
  }

  handleSlideMenu = () => {
    this.props.handleOpenSideMenu();
  }

  handlePushBack = () => {
    this.props.history.goBack();
  }

  handlePushToPage = ( aUrl ) => {
    this.props.history.push( aUrl || '' );
  }

  renderMainHeader = () => {
    const logo_weplay = '/assets/images/Header/logo_weplay.png';
    const mubar = 'assets/images/Header/mubar.png';
    return (
      <header className="header">
        <div className="header_nav">
          <h1 className="logo" onClick={this.handlePushToPage.bind( this, '/' )}><img src={logo_weplay} alt="" /></h1>
          <button className="search" type="button" style={{color:'#fff'}} onClick={this.handlePushToPage.bind( this, '/search/searchInput' )}>
            검색
            {/* <img src={icon_sh} alt="" /> */}
            </button>
          <button className="menu" type="button" onClick={this.handleSlideMenu}><img src={mubar} alt="" /></button>
        </div>
      </header>
    );
  }

  renderSimpleHeader = () => {
    const { title } = this.props;
    const icon_back = '/assets/images/Header/icon_back.png';
    const mubar = 'assets/images/Header/mubar.png';
    return (
      <div className="action_bar">
        <h1 className="action_tit">{title || ''}</h1>
        <button type="button" className="btn_back" onClick={this.handlePushBack}><img className="btn_back_img" src={icon_back} alt=""/></button>
        <button type="button" className="menu" onClick={this.handleSlideMenu}><img src={mubar} alt="" /></button>
      </div>        
    )
  }

    // render function
  render() {
    const { type } = this.props;
    if( type === HEADER_TYPE_MAIN ) {
      return this.renderMainHeader();
    } else if ( type === HEADER_TYPE_SIMPLE ) {
      return this.renderSimpleHeader();
    } else {
      return null;
    }
  }
}

HeaderWeplay.propTypes = {
  type: PropTypes.number,
  handleOpenSideMenu: PropTypes.func,
};

HeaderWeplay.defaultProps = {
  type: HEADER_TYPE_MAIN,
  handleOpenSideMenu: () => {},
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
		// {
		// 	signOut
		// }
  )
)(HeaderWeplay);