import React from 'react'
import PropTypes from 'prop-types'
import Ultilities from '../../Ultilities/global'
import axios from 'axios'
import moment from 'moment'
import {
	getInfoUser
} from '../../modules/lucky'

import {
	setStatusServer
} from '../../modules/server'

import {
	changeTitle
} from '../../modules/global'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import '../styles/menuAppbar.css'

class MenuAppBar extends React.Component {

	state = {
		auth: false,
		top: false,
		left: false,
		bottom: false,
		right: false,
		user: null,
	}
	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)

			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);

		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
	}

	componentDidMount() {
		var {dispatch}=this.props;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (this.props.pathname === "/game") {
			this.props.changeTitle("Danh Sách Game");
		}
		if (this.props.pathname === "/auction") {
			this.props.changeTitle("Shop");
		}
		if (this.props.pathname === "/giftcode") {
			this.props.changeTitle("Giftcode");
		}
		if (this.props.pathname === "/lucky") {
			this.props.changeTitle("May Mắn");
		}
		if (localStorage.getItem("user") != null) {
			var now = moment(new Date()); //todays date
			var end = moment(user.expired); // another date
			var duration = moment.duration(end.diff(now));
			var millisecond = Math.floor(duration.asMilliseconds()) + 86400000;
			if (millisecond > 0) {
				_this.props.getInfoUser(user.Token).then(function () {
					console.log(_this.props.dataInfoUser)
					// if (_this.props.dataInfoUser.Status === 1) {
					// 	_this.logoutAction();
					// }
				});
				this.setState({
					auth: true,
					user: JSON.parse(localStorage.getItem("user")),
				});
			} else {
				this.logoutAction();
			}
		} else {
			this.setState({ auth: false });
			var code = Ultilities.parse_query_string("code", window.location.href);
			var fb_mess = Ultilities.parse_query_string("fbmessid", window.location.href);
			var currentPath=localStorage.getItem("currentPath");
			if (code != null) {
				if (fb_mess === null) {
					var url = Ultilities.base_url() + "darts/user-signin/";
					var header = {
						headers: {
							"Content-Type": "application/text",
							"auth-code": code,
						}
					}
					axios.get(url, header).then(function (response) {
						console.log(response)
						var user_save = response.data;
						user_save.expired = new Date();
						localStorage.setItem("user", JSON.stringify(user_save));
						_this.setState({ user: response.data.data });
						window.location.replace(`${window.location.protocol}//${window.location.host}${currentPath}`);
						// _this.props.getData(user_save.access_token, user_save.scoinAccessToken).then(function () {
						// 	window.location.replace(`${window.location.protocol}//${window.location.host}`);
						// });
					}).catch(function (error) {
						_this.props.setStatusServer();
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						_this.setState({ auth: false });
					})
				} else {
					var url = Ultilities.base_url() + "darts/user-signin/";
					var header = {
						headers: {
							"Content-Type": "application/text",
							"auth-code": code,
						}
					}

					axios.get(url, header).then(function (response) {
						var user_save = response.data.data;
						user_save.expired = new Date();
						localStorage.setItem("user", JSON.stringify(user_save));
						_this.setState({ user: response.data.data });
						_this.props.getInfoUser(user_save.access_token).then(function () {
							var newurl = "https://splay.vn:3003/userinfo";
							axios.post(newurl, { account: _this.props.data.accountNumber, messid: fb_mess }).then(function (response1) {
								console.log(response1);
								// window.location.replace(`${window.location.protocol}//${window.location.host}/loginwidget1`);
							});
						});
					}).catch(function (error) {
						_this.props.setStatusServer();
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						_this.setState({ auth: false });
					})
				}
			}
		}
	}


	render() {
		// const { classes } = this.props;
		
		return (
			<div></div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	dataInfoUser:state.lucky.dataInfoUser,
	waiting: state.profile.waiting,
	title: state.global.title,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getInfoUser,
	changeTitle,
	setStatusServer
}, dispatch)

// MenuAppBar.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuAppBar));