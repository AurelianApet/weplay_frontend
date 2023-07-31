import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalImage extends Component {
  handleModalVisible = () => {
    const { pContent } = this.props;
    if ( pContent.src ) {
      window.ModalImageOpen(this);
    }
  }

  handleModalClose = (e) => {
    if (e){
     e.stopPropagation(); 
    }
    window.ModalImageClose();
  }

  render() {
    const { pContent, style } = this.props;
    const src = pContent.src || '/assets/images/beerTable/no_image.png';
    const alt = pContent.alt || '';
    return (
      <div className="modal-image-container">
        <img id="srcImage" src={src} alt={alt} style={style} onClick={this.handleModalVisible}/>
        {pContent.src &&
          <div id="modalImage" className="modal-image-special" onClick={this.handleModalClose}>
            <img id="spreadImage" className="modal-image-special-content" src={src} alt={alt} onClick={(e)=>{e.stopPropagation()}}/>
            <div id="caption" />
          </div>
        }
      </div>
    );
  }
}

ModalImage.propTypes = {
  pContent: PropTypes.object,
  style: PropTypes.object,
};

ModalImage.defaultProps = {
  pContent: {
    src: '',
    alt: '',
  },
  style: {},
};

export default ModalImage;
