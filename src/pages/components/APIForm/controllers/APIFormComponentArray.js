import React, { Component } from 'react';
import ComponentArray from '../../ComponentArray';
import { MODE_READ } from '../../APIForm';
import cn from 'classnames'

export class APIFormComponentArray extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount = () => {
    const { onRef, defaultData } = this.props;
    onRef( this );
    this.value = defaultData || [];
    this.setData( this.props );
  }

  componentWillReceiveProps = ( newProps ) => {
    // if (this.props.item.name === 'title') console.log('APIFormInput componentWillReceiveProps', this.value);
    this.setData( newProps );
    if ( this.value && newProps.defaultData ) {
      this.value = newProps.defaultData || [];
    }
  }

  componentWillUnmount = () => {
    this.props.onRef( null );
  }

  setData = ( aProps ) => {
    // if (this.props.item.name === 'title') console.log('APIFormInput setData', this.value);
    const { item, defaultData } = aProps;
    if ( item.value ) {
      this.value = item.value;
    }
    this.setState({
      sDefaultData: defaultData || [],
    })
    this.checkValidation();
  }

  checkValidation = () => {
    // if (this.props.item.name === 'title') console.log('APIFormInput checkValidation', this.value);
    const { item, parent } = this.props;
    const validationResult = parent.checkItemValidate( this.value, item );
    this.setState({
      error: validationResult.error,
    });
  }

  getFocus = () => {
    // if (this.props.item.name === 'title') console.log('APIFormInput getFocus', this.value);
    const { item } = this.props;
    window.getElementFromId( `apiForm-component-array-${item.name}` ).focus();
  }

  handleChange = ( aValues ) => {
    this.value = aValues;
    this.checkValidation();
    this.props.handleChange();
  }
  
  render() {
    const { mode, item, index, tabIndex, isErrBorder } = this.props;
    const { error, sDefaultData } = this.state;
    // console.log('APIForm component array rendered');
    return (
      <ComponentArray
        key={mode.mode === MODE_READ? index : `apiForm-component-array-${item.name}`}
        pPrimaryKey={item.arrayInfo.primaryKey}
        id={`apiForm-component-array-${item.name}`}
        tabIndex={tabIndex}
        className={cn( mode.mode === MODE_READ? 'apiform-content-view-div' : '', isErrBorder && !!error? 'apiform-error' : '' )}
        mode={mode.mode}
        arrayInfo={item.arrayInfo}
        defaultData={sDefaultData}
        onChange={this.handleChange.bind()}
      />
    );
  }
}

APIFormComponentArray.propTypes = {
  
};

APIFormComponentArray.defaultProps = {
  
};

export default APIFormComponentArray;