import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import RateViewer from '../RateViewer';
import ModalImage from '../ModalImage';

class BeerItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handlePushToDetail = () => {
    const { pData } = this.props;
    this.props.history.push( `/common/beers/detail/${pData._id}` );
  }

  render() {
    const { pData } = this.props;
    const beerImg = pData.image || '';
    const pubs = pData.pubs || [];
    const reviews = pData.reviews || [];
    let rate = 0;
    _.map( reviews, ( reviewItem, reviewIndex ) => {
      rate += Number( reviewItem.marks ) || 0;
    });
    if ( reviews.length !== 0 ) {
      rate = rate / reviews.length;
      rate = Math.round( rate * 100 ) / 100;
    }
    return (
      <div className='container-component-beer-item'>
        <div className='beer-item-image'>
          <ModalImage
            pContent={{src: beerImg}}
            style={{
              width: 120,
              height: 120,
            }}/>
        </div>
        <div className='beer-detail-container'>
          <div className='beer-detail-item beer-name' onClick={this.handlePushToDetail}>{pData.name || ''}</div>
          {/* <div className='beer-detail-item'>{`양조장 : ${_.get( pData, 'breweryId.name' ) || ''}`}</div> */}
          <div className='beer-detail-item'>{`${pData.country || ''} / ${pData.style || ''} / ${pData.alcohol || ''}도 / IBU : ${pData.ibu || ''}`}</div>
        </div>
        <div className='beer-detail-container beer-detail-second-container'>
          <div className='beer-detail-item beer-like'>
            <RateViewer
              value={rate}
              // color='yellow'
            />
            <div className='beer-like-item'>{`평점 ${rate}`}</div>
            <div className='beer-like-item'>{`리뷰 ${reviews.length}`}</div>
          </div>
          <div className='beer-detail-item'>{`판매매장 : ${pubs.length}`}</div>
        </div>
      </div>
    );
  }
}

BeerItem.propTypes = {
  pData: PropTypes.object,
};

BeerItem.defaultProps = {
  pData: {},
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(BeerItem);