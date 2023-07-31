import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// import { confirmAlertMsg } from '../../../library/utils/confirmAlert';
import { appConfig } from '../../../appConfig'
import LANG from '../../../language';
import { pushNotification, NOTIFICATION_TYPE_ERROR } from '../../../library/utils/notification';

const interval = 500;

class ChonjiEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sIsShortkeyListCollapsed: false,
      sIsOpenHelp: false,
    };
    this.value = '';
    this.changed = false;
  }

  componentDidMount = () => {
    const { id, value, onChange } = this.props;
    const preData = value? value : "";
		document.addEventListener('mousedown', this.handleClickOutside);
    window.initChonjiEditor(id, preData, appConfig.apiUrl);
    this.interval = setInterval(() => {
      const currentValue = window.getValueFromId(id)
      if ( currentValue === '' || currentValue === '<br>') {
        window.initChonjiEditorFontsize(id, '11pt')
      }
      if (this.value !== currentValue) {
        if ( !this.changed ) {
          if ( currentValue !== "<p>&nbsp;</p>" ) {
            this.value = currentValue;
            onChange(this.value);
          } else {
            this.value = currentValue;
          }
          this.changed = true;
        } else {
          this.value = currentValue;
          onChange(this.value);
        }
      }
    }, interval);
  }

  componentWillReceiveProps = (newProps) => {
    // console.log(newProps.errorMessage, !!newProps.errorMessage)
    if (!!newProps.errorMessage) this.renderAlert(newProps.errorMessage);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    clearInterval(this.interval);
  }

  setWrapperRef = (node) => {
		this.wrapperRef = node;
  }
  
  handleClickOutside = (event) => {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ sIsOpenHelp: false,});
		}
	}

  handleClickShortkey = () => {
    const { sIsShortkeyListCollapsed } = this.state;
    this.setState({ sIsShortkeyListCollapsed: !sIsShortkeyListCollapsed, })
    // window.openEditorHelp(this.props.id)
  }

  handleClickHelp = () => {
    this.setState( prev => ({ sIsOpenHelp: !prev.sIsOpenHelp,}))
  }

  handleClickHelpClose = () => {
    this.setState({ sIsOpenHelp: false,});
  }

  renderAlert = (aMessage) => {
    pushNotification(NOTIFICATION_TYPE_ERROR, LANG('LIBRARY_NOTIFICATION_ERROR_DEFAULT') + aMessage)
  }

  render() {
    const { id, name, className } = this.props;
    const { sIsOpenHelp } = this.state;
    return (
      <div className={cn(className, "container-component-chonjiEditor")}>
        {sIsOpenHelp && 
          <div className="chonji-editor-help-container" ref={this.setWrapperRef}>
            <div className="chonji-editor-help">
              <button type="button" title={LANG('BASIC_CLOSE')} className="close-help-btn-small" onClick={this.handleClickHelpClose}><span>닫기</span></button>
              <h3><strong>도움말</strong></h3>
              <div className="box_help">
                <div>
                  <strong>도구띠</strong>
                  <p>ALT+F10 을 누르면 도구띠로 이동합니다. 다음 단추는 TAB 으로 이전 단추는 SHIFT+TAB 으로 이동 가능합니다. ENTER 를 누르면 해당 단추의 기능이 동작하고 글쓰기 령역으로 초점이 이동합니다. ESC 를 누르면 아무런 기능을 실행하지 않고 글쓰기 령역으로 초점이 이동합니다.</p>
                  <strong>빠져 나가기</strong>
                  <p>ALT+. 를 누르면 편집기 다음 요소로 ALT+, 를 누르면 편집기 이전 요소로 빠져나갈수 있습니다.</p>
                  <strong>명령어 단축건</strong>
                  <ul>
                    <li>CTRL+B <span>{LANG('COMP_EDITOR_FONT_STRONG')}</span></li>
                    <li>SHIFT+TAB <span>{LANG('COMP_EDITOR_OUTWRITE')}</span></li>
                    <li>CTRL+U <span>{LANG('COMP_EDITOR_FONT_UNDERLINE')}</span></li>
                    <li>CTRL+F <span>{LANG('COMP_EDITOR_FIND_WORD')}</span></li>
                    <li>CTRL+I <span>{LANG('COMP_EDITOR_FONT_ITALIC')}</span></li>
                    <li>CTRL+H <span>{LANG('COMP_EDITOR_CHANGE_WORD')}</span></li>
                    <li>CTRL+D <span>{LANG('COMP_EDITOR_FONT_CANCELLINE')}</span></li>
                    <li>CTRL+K <span>{LANG('COMP_EDITOR_LINK')}</span></li>
                    <li>TAB <span>{LANG('COMP_EDITOR_INWRITE')}</span></li>
                    <li>SHIFT+TAB <span>{LANG('COMP_EDITOR_OUTWRITE')}</span></li>
                    <li>CTRL+A <span>{LANG('COMP_EDITOR_SELECT_ALL')}</span></li>
                  </ul>
                </div>
              </div>
              <div className="close-help-btn-div">
                <button type="button" className="close-help-btn" onClick={this.handleClickHelpClose}><span>닫기</span></button>
              </div>
            </div>
          </div>
        }
        <div>
          {/* <button type="button" className="shortkey-list-button" onClick={this.handleClickShortkey} tabIndex="2"><i className="fa fa-keyboard-o" /></button> */}
          <button type="button" className="help-button" onClick={this.handleClickHelp} tabIndex="3"><i className="fa fa-question" /></button>
          <textarea 
            id={id? id : "wr_content"} 
            name={name? name : "wr_content"}
            className="smarteditor2" 
            // maxLength="65536"
            // value={value}
            onChange={this.handleTextareaChange}
          />
        </div>
        
      </div>
    )
  }
}

ChonjiEditor.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

ChonjiEditor.defaultProps = {
  id: "wr_content",
  name: "wr_content",
  className: "",
  onChange: () => {},
};

export default ChonjiEditor;