import React, { Component } from 'react';
import cn from 'classnames';
// import md5 from 'md5';
import { MODE_READ } from '../../APIForm';

export class APIFormPasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount = () => {
    const { onRef, defaultData } = this.props;
    onRef( this );
    this.value = defaultData || '';
    this.setData( this.props );
  }

  componentWillReceiveProps = ( newProps ) => {
    this.setData( newProps );
  }

  componentWillUnmount = () => {
    this.props.onRef( null );
  }

  setData = ( aProps ) => {
    // const { item } = aProps;
    // this.value = !!this.value && item.isPlain? md5( this.value ) : this.value;
    this.checkValidation();
  }

  checkValidation = () => {
    const { item, parent } = this.props;
    const validationResult = parent.checkItemValidate( this.value, item );
    this.setState({
      error: validationResult.error,
    });
  }

  getFocus = () => {
    const { item } = this.props;
    window.getElementFromId( `apiForm-password-input-${item.name}` ).focus();
  }

  handleInputChange = ( e ) => {
    // const { item } = this.props;
    // this.value = item.isPlain? e.target.value : md5( e.target.value );
    this.value = e.target.value;
    this.checkValidation();
    this.props.handleChange();
  }
  
  render() {
    const { mode, item, defaultData, index, isErrBorder, tabIndex } = this.props;
    const { error } = this.state;
    if ( mode.mode !== MODE_READ ) {
      return (
        <input 
          key={`apiForm-password-input-${item.name}`}
          tabIndex={tabIndex}
          className={cn('apiForm-password-input', isErrBorder && !!error? 'apiform-error' : '')}
          id={`apiForm-password-input-${item.name}`}
          name={item.name}
          placeholder={item.placeholder ||''}
          onChange={this.handleInputChange.bind()}
          defaultValue={defaultData || ''}
          type='password'
        />
      );
    } else {
      return (
        <div key={index} className='apiform-content-view-div'>
          {defaultData || ''}
        </div>
      );
    }
  }
}

APIFormPasswordInput.propTypes = {
  
};

APIFormPasswordInput.defaultProps = {
  
};

export default APIFormPasswordInput;