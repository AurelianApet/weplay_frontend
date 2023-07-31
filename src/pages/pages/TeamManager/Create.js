import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import APIForm, { TYPE_CUSTOM, TYPE_INPUT, MODE_CREATE, TYPE_RADIO, ERROR_BORDER} from '../../components/APIForm'
import { TYPE_TEXTAREA } from '../../components/ComponentArray';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';
import FileUploadPublic from '../../components/FileUploadPublic';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sChecked: [],
      sLogoUrl: '',
      sImageUrl: '',
      sIsSuccess: false,
    }
    this.columns= [
      [{
        name: 'name',
        type: TYPE_INPUT,
        title: {
          string: '팀명'
        },
        placeholder: '팀명을 입력해주세요.',
        valid: {
          required: {
              isRequired: true,
          },
        },
      }],
      [{
        name: 'subName',
        type: TYPE_INPUT,
        title: {
          string: '팀부제'
        },
        placeholder: '팀명을 입력해주세요.'
      }],
      [{
        name: 'schedule',
        type: TYPE_CUSTOM,
        title: {
            string: '정규게임일정',
        },
        customRender: this.renderWeekSchedule
      }],
      [{
        name: 'requestItems',
        type: TYPE_INPUT,
        title: {
          string: '매칭요청사항'
        },
        placeholder: '대관비지원, 음료지원여부를 알려주세요.'
      }],
      [{
        name: 'uniformColor',
        type: TYPE_INPUT,
        title: {
          string: '유니폼 색상'
        },
        placeholder: '색상을 입력해주세요.'
      }],
      [{
        name: 'content',
        type: TYPE_TEXTAREA,
        title: {
          string: '간략한 소개'
        },
        placeholder: '운영시간을 입력해주세요.'
      }],
      [{
        name: 'courtName',
        type: TYPE_INPUT,
        title: {
          string: '경기장명'
        },
        placeholder: '경기장명을 입력해주세요.',
        valid: {
          required: {
              isRequired: true,
          },
        },
      }],
      [{
        name: 'courtAddress',
        type: TYPE_INPUT,
        title: {
          string: '경기장주소'
        },
        placeholder: '주소를 입력해주세요.'
      }],
      [{
        name: 'courtAddressDetail',
        type: TYPE_INPUT,
        placeholder: '상세주소를 입력해주세요.'
      }],
      [{
        name: 'logo',
        type: TYPE_CUSTOM,
        title: {
          string: '로고 사진'
        },
        customRender: this.renderLogoPhoto
      }],
      [{
        name: 'image',
        type: TYPE_CUSTOM,
        title: {
          string: '팀 프로필 사진'
        },
        customRender: this.renderTeamProfile
      }],
      [{
        name: 'recommended',
        type: TYPE_RADIO,
        title: {
          string: '추천팀노출'
        },
        value: [
          {value: 'true', title: '노출'},
          {value: 'false', title: '노출안됨'}
        ],
        defaultValue: 'false',
        valid: {
          required: {
              isRequired: true,
          },
        },
      }],
      [{
        name: 'challenged',
        type: TYPE_RADIO,
        title: {
          string: '도전허용'
        },
        value: [
          {value: 'true', title: '허용'},
          {value: 'false', title: '허용안됨'}
        ],
        defaultValue: 'false',
        valid: {
          required: {
              isRequired: true,
          },
        },
      }],
    ];
    this.weekName = [
      {
        title: '일',
        value: 'sunday',
      },
      {
        title: '월',
        value: 'money',
      },
      {
        title: '화',
        value: 'tuesday',
      },
      {
        title: '수',
        value: 'wednesday',
      },
      {
        title: '목',
        value: 'thursday',
      },
      {
        title: '금',
        value: 'friday',
      },
      {
        title: '토',
        value: 'saturday',
      },
    ];
    this.timeTable = {};
  }

  handleLogoUrl = ( aParent, aFiles ) => {
    const url = _.get( aFiles, '[0].url' ) || '';
		aParent.handleElementOnChange(url)

    this.setState({ sLogoUrl: url })
	}

  handleProfileImgUrl = ( aParent, aFiles ) => {
    const url = _.get( aFiles, '[0].url' ) || '';
		aParent.handleElementOnChange(url)

    this.setState({ sImageUrl: url })
	}

  handleMaskedInputChange = ( aParent, aIndex, aId, e ) => {
    if (e) {
      if (!this.timeTable[aIndex]) {
        this.timeTable[aIndex] = {
          startTime: '',
          endTime: '',
        };
      }
      if (aId === 'startTime') {
        this.timeTable[aIndex].startTime = e.target.value;
      } else {
        this.timeTable[aIndex].endTime = e.target.value;
      }
      console.log('timetable', this.timeTable);
      aParent.handleElementOnChange({
        day: aIndex,
        startTime: this.timeTable[aIndex].startTime,
        endTime: this.timeTable[aIndex].endTime,
      });
    }
  }

  handleCheckedWeek = (aIndex) => {
    let { sChecked } = this.state;
    const crrCheck = sChecked[aIndex] || false;
    sChecked[aIndex] = !crrCheck;
    this.setState({sChecked})
  }

  processSuccess = () => {
    this.setState({ sIsSuccess: true })
  }

  handleSubmit = () => {
    this.apiForm.handleSubmitForm();
  }

  renderLogoBtn = ( funcHandleClick ) => {
    const { sLogoUrl } = this.state;
		return (
			<div className="file-logo-container">
        <input className="logo-url" value={sLogoUrl} readOnly placeholder="로고 사진을 입력해주세요."/>
        <i className="fa fa-plus logo-img-btn"  onClick={funcHandleClick} />
      </div>
		);
  }

  renderLogoPhoto = (item, defaultData, mode, error, index, tabIndex, parent) => {
    return (
      <FileUploadPublic
        pMaxFileCount={1}
        pIsCustomCallback={true}
        pFileFilter={/^(image\/bmp|image\/gif|image\/jpg|image\/jpeg|image\/png)$/i}
        pButtonCustomRender={this.renderLogoBtn}
        pHandleUploadDone={this.handleLogoUrl.bind(this, parent)}
      />
    )
  }

  renderProfileBtn = ( funcHandleClick ) => {
    const { sImageUrl } = this.state;
		return (
			<div className="file-logo-container">
        <input className="logo-url" value={sImageUrl} readOnly placeholder="팀 프로필 사진을 입력해주세요."/>
        <i className="fa fa-plus logo-img-btn"  onClick={funcHandleClick} />
      </div>
		);
  }

  renderTeamProfile = (item, defaultData, mode, error, index, tabIndex, parent) => {
    return (
      <FileUploadPublic
        pMaxFileCount={1}
        pIsCustomCallback={true}
        pFileFilter={/^(image\/bmp|image\/gif|image\/jpg|image\/jpeg|image\/png)$/i}
        pButtonCustomRender={this.renderProfileBtn}
        pHandleUploadDone={this.handleProfileImgUrl.bind(this, parent)}
      />
    )
  }

  renderWeekSchedule = (item, defaultData, mode, error, index, tabIndex, parent) => {
    const { sChecked } = this.state;
    const mask = [/\d/, /\d/, ':', /\d/, /\d/];
    return (
      <div className="schedule_layout">
        <div className="week-btn-group">
        {
          _.map(this.weekName, (weekItem, weekIndex) => {
            return (
              <div 
                key = {`${weekItem.title} ${weekIndex}`} 
                className={cn('btn_check', sChecked[weekIndex] ? 'btn_checked' : '')}
                onClick={this.handleCheckedWeek.bind(this, weekIndex)}
              >
              {weekItem.title}
              </div>
            )
          })
        }
        </div>
        <div>
          {
            _.map(this.weekName, (weekItem, weekIndex) => {
              return (
                <div 
                  key = {`${weekItem.title} ${weekIndex}`} 
                >
                {
                  sChecked[weekIndex] &&
                  <div className="schedule_time">
                    <span>{weekItem.title}</span>
                    <MaskedInput
                      onChange={this.handleMaskedInputChange.bind(this, parent, weekIndex, 'startTime')}
                      className="start-time-masked-input"
                      mask = {mask}
                    />
                    <span> ~ </span>
                    <MaskedInput
                      className="end-time-masked-input"
                      onChange={this.handleMaskedInputChange.bind(this, parent, weekIndex, 'endTime')}
                      mask = {mask}
                    />
                  </div>
                }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  renderSuccessContainer = () => {
    return (
      <div className="team-create-success-container">
        <img src="/assets/images/Temp/team/image/complete.png"/>
        <span className="team-create-title">팀 생성 완료</span>
        <textarea className="team-create-content"></textarea>
        <div className="join_btn">
          <button type="text" className="btn" onClick={this.handleProfile} >확인</button>
        </div>
      </div>
    )
  }

  render() {
    const { sIsSuccess } = this.state;
    const userId = _.get(this.props, 'user._id')
    return (
      <div className='container-page-create'>
        <div className="main_contents">
        {
          !sIsSuccess &&
          <div className="inner">
              <div className="cont_tit">
                  <h2>팀 생성</h2>
                  <p className="txtc">Create team</p>
              </div>
              <div className="layer_box">
              {
                <APIForm
                  onRef={(ref) => {this.apiForm = ref}}
                  pMode={{
										mode: MODE_CREATE,
                  }}
                  pFormInfo={this.columns}
                  pAPIInfo={{
                    create: {
                      queries: [{
                        method: 'post',
                        url: '/team/create',
                        data: ( formData ) => {
                          formData.captain = userId;
                          formData.challenged === 'true' ? true : false;
                          formData.recommended === 'true' ? true : false;
                          return formData;
                        }
                      }],
                      callback: ( res, func ) => {
                        this.processSuccess();
                      },
                    },
                  }}
                  pThemeInfo={{
										error: {
                      errorStyle: ERROR_BORDER,
                      showAll: true,
                      errColor: '#ff6400',
                      // showTime: 3,
										}
                  }}
                />
              }
              </div>
              <div className="join_btn">
                  <button type="text" className="btn" onClick={this.handleSubmit} >등록하기</button>
              </div>
          </div>
        }
        {
          sIsSuccess &&
          this.renderSuccessContainer()
        }
        </div>
      </div>
    );
  }
}

Create.propTypes = {
};

Create.defaultProps = {
};

export default compose(
  withRouter,
  connect(
    state => ({
      user: state.auth.user,
    }),
  )
)(Create);