import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import { compose } from 'redux';


class Card extends Component {
  constructor(props) {
    super(props);
    const { pIsOpen } = this.props;
    this.state = {
      sIsOpen: pIsOpen,
    }
  }

  handleCollapse = () =>{
    const { sIsOpen } = this.state;
    this.setState({
      sIsOpen: !sIsOpen,
    })
  }

  render() {
    const { pTitle, pIcon, pClassName, children } = this.props;
    const { sIsOpen } = this.state;

    const { location: { pathname } } = this.props;
    
    let catagoryClassName = '';
    if (pathname.indexOf('/teaching-admin') !== -1) {
      catagoryClassName = '-admin';
    }
    if (pathname.indexOf('/teaching-support') !== -1) {
      catagoryClassName = '-support';
    }
    if (pathname.indexOf('/teaching-evaluation') !== -1) {
      catagoryClassName = '-evaluation';
    }

    return (
      <div clasaname={pClassName}>
        <div className={cn("puit-card-header", `puit-card-header${catagoryClassName}`)}>
          <i className={`fa fa-${pIcon}`} />
          <span className="puit-card-title">{pTitle}</span>
          <div className="collapse-button-div" onClick={this.handleCollapse}>
            <i className={cn("fa", sIsOpen? "fa-chevron-up" : "fa-chevron-down")} />
          </div>
        </div>
        <div className={cn("puit-card-body", `puit-card-body${catagoryClassName}`, sIsOpen? "puit-card-body-opened" : "puit-card-body-closed")} >
          <div className="puit-card-body-container">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  pTitle: PropTypes.string,
  pClassName: PropTypes.string,
  pIcon: PropTypes.string,
  pIsOpen: PropTypes.bool,
  children: PropTypes.node,
};

Card.defaultProps = {
  pClassName: '',
  pTitle: '',
  pIcon: '',
  pIsOpen: true,
};

export default compose(
  withRouter,
)(Card);
