import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export const CHART_BARLINE = 1;
export const CHART_PIE = 2;
export const CHART_SERIAL = 3;


global.gChartID = 0;

class NewChart extends Component {

  constructor(props) {
    super(props);
    global.gChartID++;
    this.state = {
      sIdName: this.getIdName( props.type ),
    }
  }

  componentDidMount() {
    this.chooseChart_init( this.props );
  }

  componentWillReceiveProps( newProps ) {
    // if(newProps.type !== CHART_DYNAMIC)
    //   this.chooseChart_init(newProps);
    this.chooseChart_init( newProps );
  }

  chooseChart_init = ( props ) => {
    const { data, title, theme, graphSetting } = props;
    const { sIdName } = this.state;
    let graph = [];
    let graphType = {};
    switch( props.type )
    {
      case CHART_PIE:
        window.onDidMount_pieChart_init(this.state.sIdName, props.data, theme, graphSetting);
        break;
      case CHART_SERIAL:
        graphType = graphSetting.graphType || {};
        _.map( graphType, ( typeItem, typeIndex ) => {
          if ( typeItem === 'column' ) {
            graph.push({
              balloonText: theme.hasBalloonText? "<span style='font-size:13px;'>[[category]]의 [[title]]:<b>[[value]]</b></span>" : "",
              title: typeIndex,
              type: "column",
              fillAlphas: 0.8,
              valueField: typeIndex
            })
          } else {
            graph.push({
              balloonText: theme.hasBalloonText? "<span style='font-size:13px;'>[[category]]의 [[title]]:<b>[[value]]</b></span>" : "",
              bullet: theme.bullet || 'round',
              bulletBorderAlpha: 1,
              bulletColor: theme.bulletColor || '#FFFFFF',
              useLineColorForBulletBorder: true,
              fillAlphas: 0,
              lineThickness: theme.lineThickness || 2,
              lineAlpha: theme.lineAlpha || 1,
              bulletSize: theme.bulletSize || 7,
              title: typeIndex,
              valueField: typeIndex
            })
          }
        });
        graphSetting.graph = graph;
        window.onDidMount_serialChart_init(this.state.sIdName, props.data, theme, graphSetting);
        break;
      case CHART_BARLINE:
        graphType = graphSetting.graphType || {};
        _.map( graphType, ( typeItem, typeIndex ) => {
          if ( typeItem === 'column' ) {
            graph.push({
              alphaField: 'alpha',
              balloonText: theme.hasBalloonText? "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>" : "",
              dashLengthField: 'dashLengthColumn',
              fillAlphas: 1,
              title: typeIndex,
              type: 'column',
              valueField: typeIndex
            });
          } else {
            graph.push({
              balloonText: theme.hasBalloonText? "<span style='font-size:13px;'>[[category]]의 [[title]]:<b>[[value]]</b> [[additional]]</span>" : "",
              bullet: theme.bullet || 'round',
              dashLengthField: 'dashLengthLine',
              lineThickness: theme.lineThickness || 3,
              bulletSize: theme.bulletSize || 7,
              bulletBorderAlpha: 1,
              bulletColor: theme.bulletColor || '#FFFFFF',
              useLineColorForBulletBorder: true,
              bulletBorderThickness: 3,
              fillAlphas: 0,
              lineAlpha: theme.lineAlpha || 1,
              title: typeIndex,
              valueField: typeIndex
          })
          }
        });
        graphSetting.graph = graph;
        window.onDidMount_barlineChart_init( sIdName, data, title, theme, graphSetting );
        break;
      default:
        break;
    }
  }
  
  getIdName = ( type ) => {
    let sIdName = 'default' + global.gChartID;
    switch(type)
    {
      case CHART_PIE:
        sIdName = 'pieChart' + global.gChartID;
        break;
      case CHART_BARLINE:
        sIdName = 'barAndLineChart' + global.gChartID;
        break;
      default:
        break;
    }
    return sIdName;
  }

  render() {
     const { sIdName } = this.state;
    return (
      <div className='chart-container'> 
        <div 
          className='chart-body' 
          id={sIdName} 
          style={{ height: '400px' }} 
        />
      </div>
    )
  }
}

NewChart.propTypes = {
  type: PropTypes.number.isRequired,
  data: PropTypes.array,
  graphSetting: PropTypes.object,
  title: PropTypes.object,
  theme: PropTypes.object,
};

NewChart.defaultProps = {
  title: {
    column: '',
    line: '',
    line2: '',
  },
  data: [],
  graphSetting: {},
  theme: {},

  // data: [{
  //   ... ... ...
  //   추가 field들
  //   dashLengthLine: 있으면 그라프가 dashline으로 나옴
  //   alpha: 그라프의 투명도
  //   additional: balloonTitle에 추가적으로 보여줄 문자
  // }]

  // graphSetting: {
  //   mainAxis: '',  // data배렬에서 x축에 해당한 fieldName. 기정으로 x.
  //   graphType: {filedName: type} // barChart의 경우-data의 fieldName의 그라프형태. 'column'이면 막대도표로, 'line'이면 선도표.
  //   valueAxis: '', pieChart의 경우
  // }

  // theme: {
  //   startDuration: 그라프가 전개되는 시간,
  
  //   barChart의 경우
  //   marginLeft, marginRight, marginTop, marginBottom,
  //   color: 글자들의 색갈,
  //   hasBalloonText: 그라프의 title유무 (serialChart의 경우 같음)
  //   bullet: 그라프의 점의 형태.  rount, square, ... (serialChart의 경우 같음),
  //   bulletSize: 그라프의 점의 크기 (serialChart의 경우 같음),
  //   lineAlpha: 그라프선의 투명도 (serialChart의 경우 같음),
  //   lineThickness: 선의 두께. 기정으로 3px (serialChart의 경우 같음)

  //   serialChart의 경우
  //   handDrawScatter: 그라프가 손으로 그린정도를 나타낸다.
  // }
};

export default NewChart;