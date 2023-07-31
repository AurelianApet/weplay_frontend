import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { findFromArray } from '../../../library/utils/array';
import ModalImage from '../ModalImage';

class PubMenuItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sMenuKind: [],
    }
  }

  componentDidMount = () => {
    this.getMenuKind();
  }

  getMenuKind = () => {
    const { pMenuArray } = this.props;
    let menuKind = [];
    _.map (pMenuArray, (menu, index) => {
      const isSame = findFromArray(menuKind, 'kind', menu.kind);
      if (!isSame){
        menuKind.push({
          kind: menu.kind
        })
      }
    })
    this.setState({sMenuKind: menuKind})
  }

  render() {
    const { pMenuArray } = this.props;
    const { sMenuKind } = this.state;
    return (
      <div className='container-component-menu-item'>
        <div className = 'pub-menu-item-content'>
        {
          _.map( sMenuKind, (menuKind, kindIndex) => {
            return (
              <div key = {`kind ${kindIndex}`}>
                <div className = 'menu-kind-title'>{menuKind.kind}</div>
                {
                  _.map( pMenuArray, (menuItem, index) => {
                    if (_.get(menuItem, 'kind') === menuKind.kind) {
                      return (
                        <div key = {`menu ${index}`} className = 'menu-item-content'>
                          <div className = 'menu-item'>
                            <div className = 'menu-item-title'><span>{menuItem.foodName}</span></div>
                            <div className = 'menu-item-info'><span>{menuItem.content}</span></div>
                            <div className = 'menu-item-price'><span>{menuItem.price}</span></div>
                          </div>
                          <div className='menu-item-image'>
                          {
                            menuItem.image &&
                            <ModalImage
                              pContent={{src: menuItem.image}}
                              style={{
                                width: 140,
                                height: 140,
                              }}/>
                          }
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>    
            )
          })
        }
        </div>
        
      </div>
    );
  }
}

PubMenuItem.propTypes = {
  pMenuArray: PropTypes.array,
};

PubMenuItem.defaultProps = {
  pMenuArray: [],
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(PubMenuItem);