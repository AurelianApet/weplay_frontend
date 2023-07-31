import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class BeerFilterSort extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sSortDirection: 'asc',
      sFilterArray: []
    };
    this.filterWord = {}
    this.sortValue = ''
  }

  componentDidMount() {
    this.getFilterData(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getFilterData(newProps);
  }

  getFilterData = ( aProps ) => {
    const { pFilterArray } = aProps;
    const filterArray = [];
    _.map(pFilterArray, (filterItem, filterIndex) => {
      const itemArray = [];
      _.map(filterItem.values, (item, index) => {
        if (typeof item !== 'object') {
          itemArray.push({value: item, title: item});
        } else {
          itemArray.push(item);
        }
      })
      filterArray.push({title: filterItem.title, fieldName: filterItem.fieldName, values: itemArray})
    })
    this.setState({sFilterArray: filterArray})
  }

  handleFilter = (fieldItem, e) => {
    if (!e){
      return;
    }
    let optionValue = '';
    _.map(fieldItem.values, (item, index) => {
      if (item.value === Number(e.target.value)) {
        optionValue = _.get(item, 'option') || '';
      }
    })
    _.set(this.filterWord, fieldItem.fieldName, e.target.value);
    this.setState( this.filterWord );
    this.handleFilterArray( optionValue );
  }

  handleSort = (e) => {
    if (!e) {
      return;
    }
    this.sortValue = e.target.value;
    this.handleDataSort();
  }

  handleSortDirection = () => {
    const {sSortDirection} = this.state;
    let aSortIcon = sSortDirection === 'asc' ? 'desc' : 'asc';
    this.setState({
      sSortDirection: aSortIcon
    }, () => {
      this.handleDataSort();
    })
  }

  handleDataSort = () => {
    const {sSortDirection} = this.state;
    const { pData, pHandleDataArray } = this.props;
    let aDataSortArray = [];
    if (this.sortValue === 'noSort') {
      aDataSortArray = pData;
    }else {
      aDataSortArray = _.orderBy( pData, [this.sortValue], [sSortDirection]);
    }
    pHandleDataArray(aDataSortArray);
  }

  handleFilterArray = ( filterOption ) => {
    const { pData, pHandleDataArray } = this.props;
    let aDataFilterArray = [];
    _.map(pData, (dataItem, itemIndex) => {
      let visible = true;
      _.map(this.filterWord, (filterItem, filterIndex) => {
        if (filterItem !== 'all' && filterItem) {
          console.log(filterItem, filterOption)
          visible = visible && (filterOption === 'st' ? _.get(dataItem, filterIndex) < filterItem
                                : filterOption === 'ste' ? _.get(dataItem, filterIndex) <= filterItem
                                : filterOption === 'lt' ? _.get(dataItem, filterIndex) > filterItem
                                : filterOption === 'lte' ? _.get(dataItem, filterIndex) >= filterItem
                                : _.get(dataItem, filterIndex) === filterItem)
        }
      });
      if (visible) {
        aDataFilterArray.push(dataItem);
      }
    })
    pHandleDataArray(aDataFilterArray);
  }

  renderFilterForm = () => {
    const {sFilterArray} = this.state;
    return (
      <div className = 'filter-body'>
        {
          _.map(sFilterArray, (filterItem, itemIndex) => {
            return (
              <div 
                key = {`${filterItem.title} ${filterItem.fieldName}`} 
                className='filter-item'
              >
                {
                  filterItem.title && 
                  <span className='filter-title'>
                    {`${filterItem.title}: `}
                  </span>
                }
                <select onChange = {this.handleFilter.bind(this, filterItem)}>
                  <option value = 'all' >All</option>
                  {
                    _.map(filterItem.values, (filter, index) => {
                      return (
                        <option key = {`${filter.value} ${index}`} value = {filter.value} >{filter.title}</option>
                      )
                    })
                  }
                </select>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  renderSortForm = () => {
    const { sSortDirection } = this.state;
    const { pSortArray } = this.props;
    return (
      <div className = 'sort-body'>
        <div className = 'sort-option-title'><span>{'정렬:'}</span></div>
        <select onChange = {this.handleSort}>
          <option value = 'noSort'>표준</option>
          {
            _.map(pSortArray, (sortItem, index) => {
              return (
                <option key = {`${sortItem.fieldName}-${index}-fliter`} value = {sortItem.fieldName} >{sortItem.title}</option>
              )
            })
          }
        </select>
        <div className = 'sort-direction' onClick = {this.handleSortDirection}>
          <i className = {`fa fa-sort-${sSortDirection}`}></i>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className = 'container-beer-filter-sort-body'>
        {this.renderFilterForm()}
        {this.renderSortForm()}
      </div>
    );
  }
}

BeerFilterSort.propTypes = {
  pData: PropTypes.array,
  pSortArray: PropTypes.array,
  pFilterArray: PropTypes.array,
  pHandleDataArray: PropTypes.func,
};

BeerFilterSort.defaultProps = {
  pData: [],
  pSortArray: [],
  pFilterArray: [],
  pHandleDataArray: () => {},
};

export default BeerFilterSort