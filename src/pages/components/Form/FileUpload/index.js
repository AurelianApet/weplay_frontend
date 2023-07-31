import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { appConfig } from '../../../../appConfig';
import { pushNotification, NOTIFICATION_TYPE_ERROR } from '../../../../library/utils/notification';
import LANG from '../../../../language';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.formData = null;
  }

  componentDidMount() {
    const { url, pMaxFileCount, pFileFilter, hasThumbnail } = this.props;
    window.onDidMount_dropzone_init(appConfig.apiUrl + url, this.handleUpload, this.handleOnChange, pMaxFileCount, pFileFilter, hasThumbnail);
  }

  componentWillReceiveProps = (newProps) => {
    // console.log(newProps.errorMessage, !!newProps.errorMessage)
    if (!!newProps.errorMessage) this.renderAlert(newProps.errorMessage);
  }

  processSubmit = (formData) => {
    this.formData = formData;
    window.onSubmit_dropzone(this.props.handleUploadDone, formData);
  }

  clearFiles = () => {
    window.clear_dropzone();
  }

  handleOnChange = ( aFiles )  => {
    const { onChange } = this.props;
    onChange(aFiles);
  }

  handleUpload = (isSuccess, files, response) => {
    if(!isSuccess) {
      if (this.formData) {
        pushNotification(NOTIFICATION_TYPE_ERROR, LANG('COMP_FORM_FILEUPLOAD_UPLOAD_ERROR') + response.toString());
        this.props.handleUploadDone([], this.formData);
      }
    } else {
      this.props.handleUploadDone(response.uploaded, this.formData);
    }
  }

  renderAlert = (aMessage) => {
    pushNotification(NOTIFICATION_TYPE_ERROR, LANG('LIBRARY_NOTIFICATION_ERROR_DEFAULT') + aMessage)
  }

  render() {
    const { className, hasThumbnail } = this.props;
    const max_file_size = (appConfig.fileMaxSizeMB * 1024 * 1024).toString(); // to bytes
    return (
      <div className={className}>
        <div id="dropzone-preview-template" className="hidden">
          <div className="dz-preview dz-file-preview">
            <div className="dz-filename"><span data-dz-name></span></div>
            <div><img data-dz-thumbnail alt=""/></div>
            <div className="dz-size" data-dz-size></div>
            <div className="progress progress-small progress-striped active">
              <div className="progress-bar progress-bar-success" data-dz-uploadprogress></div>
            </div>
            <div className="dz-success-mark"><span></span></div>
            <div className="dz-error-mark"><span></span></div>
            <div className="dz-error-message"><span data-dz-errormessage></span></div>
          </div>
        </div>
        <input type="hidden" name="max_file_size" value={max_file_size} />
        <div
          className={cn("dropzone center", hasThumbnail? "" : "noThumbnail")}
          data-force-fallback="false"
          data-max-filesize-bytes={max_file_size}
          data-accepted-files=""
          data-default-message={LANG('COMP_FILEUPLOAD_DATA_DEFAULT_MSG')}
          data-fallback-message={LANG('COMP_FILEUPLOAD_DATA_FALLBACK_MSG')}
          data-fallback-text=""
          data-file-too-big={LANG('COMP_FILEUPLOAD_DATA_FILE_TOO_BIG')}
          data-invalid-file-type={LANG('COMP_FILEUPLOAD_DATA_INVALID_FILE_TYPE')}
          data-response-error={LANG('COMP_FILEUPLOAD_DATA_RESPONSE_ERROR')}
          data-cancel-upload={LANG('COMP_FILEUPLOAD_DATA_CANCEL_UPLOAD')}
          data-cancel-upload-confirmation={LANG('COMP_FILEUPLOAD_DATA_CANCEL_UPLOAD_CONFIRMATION')}
          data-remove-file={LANG('COMP_FILEUPLOAD_DATA_REMOVE_FILE')}
          data-max-files-exceeded={LANG('COMP_FILEUPLOAD_DATA_MAX_FILES_EXCEED')}
          data-dropzone-not-supported={LANG('COMP_FILEUPLOAD_DATA_NOT_SUPPORTED')}
          data-dropzone_multiple_files_too_big={LANG('COMP_FILEUPLOAD_DATA_MULTIPLE_FILES_TOO_BIG')}
        >
          <i className="fa fa-cloud-upload fa-3x dropzone-uploadicon"></i><br/>
          <span className="bigger-150 grey">{LANG('COMP_FILEUPLOAD_TEXT')}{appConfig.fileMaxSizeMB}MB)</span>
          <div id="dropzone-previews-box" className="dz dropzone-previews dz-max-files-reached"></div>
        </div>
        <div className="fallback">
          <input id="ufile[]" name="ufile[]" type="file" size="1" />
        </div>
        {/* <div className="error">{errorMessage}</div> */}
      </div>
    );
  }
}

FileUpload.propTypes = {
  hasThumbnail: PropTypes.bool,
  handleUploadDone: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,  
  className: PropTypes.string,
  url: PropTypes.string,
  pMaxFileCount: PropTypes.number,
  pFileFilter: PropTypes.object,
};

FileUpload.defaultProps = {
  hasThumbnail: true,
  errorMessage: '',
  className: '',
  url: '/files/upload',
  onChange: () => {},
  pMaxFileCount: null,
  pFileFilter: null,
};

export default FileUpload;
