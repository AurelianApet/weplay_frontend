import React, { Component } from 'react';
import cn from 'classnames';
import { MODE_READ } from '../../APIForm';

export class APIFormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount = () => {
    // console.log(this.props.item, 'componentDidMount')
    // if (this.props.item.name === 'title') console.log('APIFormInput componentDidMount', this.value);
    const { onRef, defaultData } = this.props;
    onRef( this );
    this.value = defaultData || '';
    this.setData( this.props );
  }

  componentWillReceiveProps = ( newProps ) => {
    // console.log(this.props.item, 'componentWillReceiveProps')
    // if (this.props.item.name === 'title') console.log('APIFormInput componentWillReceiveProps', this.value);
    this.setData( newProps );
    if ( this.input && newProps.defaultData ) {
      this.input.value = newProps.defaultData || '';
    }
  }

  componentWillUnmount = () => {
    // console.log(this.props.item, 'componentWillUnmount')
    // if (this.props.item.name === 'title') console.log('APIFormInput componentWillUnmount', this.value);
    this.props.onRef( null );
  }

  setData = ( aProps ) => {
    // console.log(this.props.item, 'setData')
    // if (this.props.item.name === 'title') console.log('APIFormInput setData', this.value);
    const { item, defaultData } = aProps;
    if ( item.value ) {
      this.value = item.value;
    }
    let defaultDataString = defaultData;
    if ( typeof defaultData === 'object' ) {
      defaultDataString = item.data? item.data( defaultData ) : JSON.stringify( defaultData );
    }
    this.setState({
      sDefaultData: defaultDataString || '',
    })
    this.checkValidation();
  }

  checkValidation = () => {
    // console.log(this.props.item, 'checkValidation')
    // if (this.props.item.name === 'title') console.log('APIFormInput checkValidation', this.value);
    const { item, parent } = this.props;
    const validationResult = parent.checkItemValidate( this.value, item );
    this.setState({
      error: validationResult.error,
    });
  }

  getFocus = () => {
    // console.log(this.props.item, 'getFocus')
    // if (this.props.item.name === 'title') console.log('APIFormInput getFocus', this.value);
    const { item } = this.props;
    window.getElementFromId( `apiForm-input-${item.name}` ).focus();
  }

  handleInputChange = ( e ) => {
    // console.log(this.props.item, 'handleInputChange')
    // if (this.props.item.name === 'title') console.log('APIFormInput handleInputChange', this.value);
    this.value = e.target.value;
    this.checkValidation();
    this.props.handleChange();
  }
  
  render() {
    // console.log(this.props.item, 'render')
    // if (this.props.item.name === 'title') console.log('APIFormInput render', this.value);
    const { mode, item, index, isErrBorder, tabIndex } = this.props;
    const { error, sDefaultData } = this.state;
    if ( mode.mode !== MODE_READ ) {
      return (
        item.value?
          <input 
            key={`apiForm-input-${item.name}`}
            tabIndex={tabIndex}
            className={cn('apiForm-input', isErrBorder && !!error? 'apiform-error' : '')}
            value={item.value}
            placeholder={item.placeholder || ''}
            id={`apiForm-input-${item.name}`}
            name={item.name}
            onChange={this.handleInputChange.bind()}
          />
        :
          <input 
            ref={ref => this.input = ref}
            key={`apiForm-input-${item.name}`}
            tabIndex={tabIndex}
            className={cn('apiForm-input', isErrBorder && !!error? 'apiform-error' : '')}
            placeholder={item.placeholder || ''}
            id={`apiForm-input-${item.name}`}
            name={item.name}
            disabled={item.disabled || false}
            onChange={this.handleInputChange.bind()}
            defaultValue={sDefaultData || ''}
          />
      );
    } else {
      return (
        <div key={index} className='apiform-content-view-div'>
          {sDefaultData || ''}
        </div>
      );
    }
  }
}

APIFormInput.propTypes = {
  
};

APIFormInput.defaultProps = {
  
};

export default APIFormInput;