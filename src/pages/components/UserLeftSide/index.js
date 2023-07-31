import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

class UserLeftSide extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sUserType : 'normal_user',
			sStyle : 'leftsideButton secondcontentsbtn',
			sUserInfo: props.user || {},
		};
	}
	
	componentDidMount() {
		// console.log('UserLeftSide componentDidMount!');
	}

	componentWillReceiveProps( newProps ) {
		this.setState({
			sUserInfo: newProps.user || {},
		})
	}

	 handleLeftButton = (value, e) => {
		const childs = value.childs || [];
		const url = childs.length > 0? childs[0].url : value.url;
		if (value.title) {
			this.props.history.push(url);
		}
		//console.log('pageType : ' + pageType);
	 }

	render() {
		const { sStyle, sUserInfo } = this.state;
		const menus = _.get( this.props, 'menus.main' ) || [];
		const userName = sUserInfo.realName || '';
		const userImage = sUserInfo.image || '';
		return (
			<div className="container-page-userleftside">
				<div className="l-content">
					<aside>
						<div className="content1-3 flex">
							<div className="content1-3-1 flex">
								<div className="content-img">
									<img alt="truck" src={userImage || "/assets/images/users/admin_user.jpg"}/>
								</div>
								<div className="content-text3">
									<p>{`${userName} 님`}</p>
								</div>
							</div>
						</div>
						<div className="l-content">
						{
							_.map(menus, (value, index) => {
								return (
									<button key={index} className={sStyle} onClick={this.handleLeftButton.bind(this, value)}>{value.title}</button>
								)
							})
						}
						</div>
					</aside>
				</div>
			</div>
		);
	}
}

UserLeftSide.propTypes = {
};

UserLeftSide.defaultProps = {
};

export default compose(
	withRouter,
  connect(
    state => ({
			user: state.auth.user,
			menus: state.auth.menus,
    }),
  )
)(UserLeftSide);