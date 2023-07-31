import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class UserRightContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sRightContent : [
                // {
                //     src : '/assets/images/users/normaluser/heineken.png',
                //     title : '하이네캔',
                // },
                // {
                //     src : '/assets/images/users/normaluser/Kronenbourg_1664.png',
                //     title : '블랑',
                // },
                // {
                //     src : '/assets/images/users/normaluser/paulaner-MTA1MDY.jpg',
                //     title : '파울라너',
                // },
                // {
                //     src : '/assets/images/users/normaluser/zhwpflogo.jpg',
                //     title : '코젤',
                // },
                // {
                //     src : '/assets/images/users/normaluser/호가든_로고.png',
                //     title : '호가든',
                // }
            ]
		};
	}

	componentDidMount() {
		// console.log('UserRightContent componentDidMount!');
	}

	/**
	 * handle functinos
	 **/


	/**
	 * process functions
	 **/



	/**
	 * other functions
	 **/



	/**
	 * render functions
	 **/

	render() {
        const { sRightContent } = this.state;
		return (
			<div className="container-page-userrightcontent">
				<div id="r-content" className="commonBorder">
                    <div className="contents2">
                        <div className="content2-1">
                            <p>추천 맥주</p>
                        </div>
                        {
                            _.map (sRightContent, (content, index) => {
                                return (
                                    <div key = {index} className="content2-2-1 flex margin-top">
                                        <div className="content-img">
                                            <img alt="None" src={content.src}/>
                                        </div>
                                        <div className="content-text2">
                                            <p>{content.title}</p>
                                        </div>
                                    </div>
                                )
                                
                            })
                        }
                    </div>
                </div>
                <div id="r2-content" className="r-content secondcontents">
                    {/* <img alt="" src="/assets/images/users/normaluser/beer-contest.jpg"/> */}
                </div>
			</div>
		);
	}
}

UserRightContent.propTypes = {
};

UserRightContent.defaultProps = {
};

export default withRouter(UserRightContent);