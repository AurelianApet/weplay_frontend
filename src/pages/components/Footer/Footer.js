import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    this.footerData = [
      {
        icon: '/assets/images/Temp/main/icon/icon_thome.png',
        title: '메인',
        route: '/',
      },
      {
        icon: '/assets/images/Temp/main/icon/icon_bplay.png',
        title: '경기',
        route: '/',
      },
      {
        icon: '/assets/images/Temp/main/icon/icon_plus.png',
        title: '',
        route: '/search/searchplayer',
      },
      {
        icon: '/assets/images/Temp/main/icon/icon_bteam.png',
        title: '팀',
        route: '/',
      },
      {
        icon: '/assets/images/Temp/main/icon/icon_bprofile.png',
        title: '프로필',
        route: '/',
      },
    ];
  }
  
  render() {
    return(
      <footer className="footer">
        <div className="inner">
          <div className="btton_bor">
          {
            _.map(this.footerData, (item, index) => {
              return (
                <div key = {`${item.icon} ${index} `}>
                  <Link to={item.route}>
                    <img src={item.icon} alt=""/>
                    <p className="btton_bor_tit">{item.title}</p>
                  </Link>
                </div>
              )
            })
          }
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
};

Footer.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
    }),
    {
      // signOut,
    }
  )
)(Footer);

