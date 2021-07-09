import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { connect } from 'react-redux'
import '../css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	getDartScore,
	getItemAward
} from '../../../../modules/lucky'



// import muiten from '../images/muiten.png';
import ReactResizeDetector from 'react-resize-detector'
import $ from 'jquery';
import 'bootstrap';

import icon_clock from '../images/icon-clock.png';
import line_timing from '../images/line-timing.png';
import btn_thoat from '../images/btn-thoat.png';
import phitieu from '../images/phitieu.png';
import dart_player from '../images/dart-player.png';
import dart_flight from '../images/dart-flight.gif';


const styles = {
	paper: {
		background: "#fff",
	},
};

var award_open=true;
var n=0;

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			offsetTuDo: 0,
			offsetCode: 0,
			offsetVinhDanh: 0,
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			userTurnSpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			activeCodeBonus:1,
			activeVinhDanh:1,
			activeTuDo:1,
			activeHistory:1,
			countVinhDanh:0,
			countHistory:0,
			countTuDo:0,
			countCodeBonus:0,
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listVinhDanh:[],
			listTuDo:[],
			listHistory:[],
			listCodeBonus:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:false,
			scoinCard:false,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			finished:false,
			hour_live:'00', 
			minute_live:'00', 
			second_live:'00',
			linkLiveStream:'',
			isLive:false,
			user:{},
			xacthuc:false,
			timeWaiting:0,
			dataItem:{},
			startSpin:false,
			len_auto:0,
			waiting:false,
			urlVideo:'',
			innerWidth:0
		};
	}
	componentWillMount(){
		// this.onResize();
		// window.addEventListener("resize", this.setScreenOrientation);
		// window.removeEventListener('scroll', this.handleScroll);
		// this.setState({innerWidth:window.innerWidth})
	}



	componentDidMount(){
		// const {img_width, img_height}=this.state;
		// var user = JSON.parse(localStorage.getItem("user"));

		// this.props.getLuckyInfo().then(()=>{
		// 	var data=this.props.dataLuckyInfo;
		// 	if(data!==undefined){
		// 		if(data.Status===0){
		// 			this.getStatus(data.Data)
		// 		}
		// 	}
		// })

		// this.props.getLuckyItems().then(()=>{
		// 	var data=this.props.dataLuckyItems;
		// 	if(data!==undefined){
		// 		if(data.Status===0){
		// 			this.setState({itemOfSpin: data.Data})
		// 		}
		// 	}
		// })



		// if (user !== null) {
		// 	this.setState({isLogin:true, user:user})
		// 	this.props.getDartScore(user.Token).then(()=>{
		// 		var data=this.props.dataUserSpin;
		// 		if(data!==undefined){
		// 			if(data.Status===0){
		// 				this.setState({turnsFree: data.Spins})
		// 			}
		// 		}

		// 	})
		// } 
		
		
		// window.addEventListener('scroll', this.handleScroll);
		var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
		var width = window.innerWidth;
		var height = window.innerHeight;

		canvas.width = width;
		canvas.height = height;


		var background = new Image();
		background.src = "http://i.imgur.com/yf6d9SX.jpg";

		background.onload = function(){
			ctx.drawImage(background,0,0);   
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.waiting !== nextProps.waiting){
			this.setState({waiting:nextProps.waiting})
			setTimeout(()=>{ 
				this.setState({waiting:false})
			}, 3000);
		}
	}
	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}
	setScreenOrientation=()=>{
		const {innerWidth}=this.state;
		if(Math.abs(innerWidth - window.innerWidth) >100){
			window.location.reload();
			this.setState({innerWidth:window.innerWidth})
		}
	}

	onResize=()=>{
		if (window.innerWidth <= 320) {
			this.setState({ width: 210, height: 235, img_width:170, img_height:170});
		}
		if (window.innerWidth > 320 && window.innerWidth <= 360) {
			this.setState({ width: 252, height: 282, img_width:200, img_height:200});
		}
		if (window.innerWidth > 360 && window.innerWidth <= 380) {
			this.setState({ width: 293, height: 330, img_width:235, img_height:235});
		}
		if (window.innerWidth > 380 && window.innerWidth <= 480) {
			this.setState({ width: 344, height: 383, img_width:275, img_height:275});
		}
		if (window.innerWidth > 480 && window.innerWidth <= 600) {
			this.setState({ width: 335, height: 375, img_width:267, img_height:267});
		}
		if (window.innerWidth > 600 && window.innerWidth <= 640) {
			this.setState({ width: 336, height: 376, img_width:270, img_height:270});
		}
		if (window.innerWidth > 640 && window.innerWidth <= 768) {
			this.setState({ width: 470, height: 525, img_width:375, img_height:375});
		}
		if (window.innerWidth > 768 && window.innerWidth < 780) {
			this.setState({ width: 504, height: 563, img_width:405, img_height:405});
		}

		if (window.innerWidth >= 780 && window.innerWidth <= 790) {
			this.setState({ width: 469, height: 524, img_width:375, img_height:375});
		}

		if (window.innerWidth > 790 && window.innerWidth <= 800) {
			this.setState({ width: 469, height: 522, img_width:372, img_height:372});
		}

		if (window.innerWidth > 800 && window.innerWidth <= 900) {
			this.setState({ width: 504, height: 563, img_width:405, img_height:405});
		}

		if (window.innerWidth > 900 && window.innerWidth < 1024) {
			this.setState({ width: 590, height: 653, img_width:470, img_height:470});
		}

		if (window.innerWidth >= 1024) {
			this.setState({ width: 586, height: 657, img_width:470, img_height:470});
		}
	}


	getStatus=(luckySpin)=>{
		var StartDate=luckySpin.StartDate;
		var EndDate=luckySpin.EndDate;
		var start=StartDate.substring(StartDate.indexOf("(") +1,StartDate.indexOf(")"));
		var end=EndDate.substring(EndDate.indexOf("(")+1,EndDate.indexOf(")"));
		console.log(start, end)
		var time=Date.now();

		// var distance_3day=start - 3 * 86400 * 1000;
		// var duration=end-time;

		if (time < start) {
			this.timeRemain(start)
			this.setState({ img_status: 'sapdienra', message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ img_status: 'sukiendangdienra'});
		}
		if (time > end) {
			this.setState({ img_status: 'ketthuc', message_status:"Sự kiện đã kết thúc."});
			// $('#myModal14').modal('show');
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		const {server_err}=this.state;
		if(!server_err){
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
			
			
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}else{
			$('#myModal12').modal('show');
		}
	}
	logoutAction = () => {
		this.logout();
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);

		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
	}

	logout=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		var header = {
			headers: {
				"Content-Type": "application/json",
				"token": user.Token,
			}
		}
		axios.get('https://api.splay.vn/luckywheel/luckywheel/user-signout/', header).then(function (response) {
			console.log(response)
		})
	}

	start=()=>{
	
	}

	btnStart=()=>{

	}

	startSpin=()=>{

	}
	



	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};



	getDetailData=()=>{
		const {auto}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getDartScore(user.Token).then(()=>{
			var data=this.props.dataUserSpin;
			if(data!==undefined){
				var turnsFree=data.Spins
				if(data.Status===0){
					if(turnsFree>0){
						if(auto){
							this.start();
						}
					}else{
						$('#myModal6').modal('show');
						clearInterval(this.state.intervalId);
					}
					this.setState({turnsFree:turnsFree})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Lỗi hệ thống. Vui lòng thử lại.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}

		})
	}

	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
				// _this.setState({hour_live: hour, minute_live: minute, second_live:second})
			}
		}, 1000);
	}

	timeWaitings=()=>{
		const current=this.state.timeWaiting;
		console.log(current)
		if(current>=0){
			var minute=Math.floor(((current%86400)%3600)/60) > 9 ? Math.floor(((current%86400)%3600)/60) : `0${Math.floor(((current%86400)%3600)/60)}`;
			var second=Math.ceil(((current%86400)%3600)%60) > 9 ? Math.ceil(((current%86400)%3600)%60) : `0${Math.ceil(((current%86400)%3600)%60)}`;
			this.setState({minute_live: minute, second_live:second, timeWaiting:current-1})
		}else{
			clearInterval(this.state.intervalWaiting);
		}
	}

	timeConverter=(time)=>{
		var start=time.substring(time.indexOf("(") +1,time.indexOf(")"));
		var a = new Date(+start);
		// var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var m=a.getMonth()+1
		var month =m > 9 ? m : `0${m}`;
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	  }



	getItem=(user, item)=>{
		this.props.getItemAward(user.Token, item.AwardId).then(()=>{
			// $('#Loading').modal('hide');
			var data=this.props.dataItemAward;
			award_open=true;
			if(data!==undefined){
				if(data.Status===0){
					// this.setState({listHistory:data.Data, countHistory:data.Totals})
					this.setState({dataItem:data.Data})
					$("#MoQua").modal('show');
				}else if(data.Status===1){
					$('#myModal11').modal('show');
					this.setState({message_error:data.Message})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}




	render() {
		const {user}=this.state;

		return (<div>
					<div class="bg-page-duatop_m position-relative">
						<div class="phitieu_m">
							<div class="img-phitieu_m"></div>
						</div>
						<div class="tongdiem_m">
							<h2 class="font-size-2vw_m text-uppercase font-weight-bold text-center mb-1 text-shadow_m">Tổng điểm</h2>
							<h4 class="font-size-2vw_m text-uppercase text-center text-shadow_m">699669</h4>
						</div>
						<div class="phongtudong_m font-size-2vw_m font-weight-bold text-uppercase text-shadow_m">
							<input type="checkbox" id="check1" name="option1" value="something" /> Phóng phi tiêu tự động
						</div>
						<div class="timing_m">
							<div class="media">
							<img src={icon_clock} class="align-self-center mt-n1" width="13%" alt="clock" />
							<div class="media-body">
								<img class="m-0 p-0 mt-n3" src={line_timing} width="90%" alt="Line" />
								<h6 class="text-yellow font-size-1vw_m mt-n1n pl-1 text-shadow_m">Còn: 2 ngày 10:22:11</h6>
							</div>
							</div>
						</div>
						<div class="account-name_m">
							<p class="font-size-1vw_m text-white mb-0 text-center">Đặng Lê Nguyên Vũ</p>
							<h2 class="font-size-1vw_m text-warning m-0 text-center"> VIP Kim Cương</h2>
						</div>
						<div class="btn-login_m">
							<img src={btn_thoat} width="100%" alt="" />
						</div>
						<div class="phitieu-status_m marquee_m">
							<div class="marquee_inner_m">            
								<span class="m-0 font-size-1vw_m font-weight-bold text-shadow_m pr-5">Số phi tiêu còn lại: <strong>9999</strong></span>		
								<span class="m-0 font-size-1vw_m font-weight-bold text-shadow_m pr-5">Nhanh tay giật giải IP12 trị giá 50 củ</span>	
							</div>    	
						</div>
						<div class="diemcaonhat_m">
							<h2 class="font-size-2vw_m text-uppercase font-weight-bold text-center mb-1 text-shadow_m">Điểm cao nhất</h2>
							<h4 class="font-size-2vw_m text-uppercase text-center text-shadow_m">699669 <br /><span class="font-size-1vw_m">NguyenLe</span></h4>
						</div>
					</div>
		</div>
		)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataLuckyInfo: state.lucky.dataLuckyInfo,
	dataLuckyItems:state.lucky.dataLuckyItems,
	dataInfoUser:state.lucky.dataInfoUser,
	dataUserSpin:state.lucky.dataUserSpin,
	dataItemAward:state.lucky.dataItemAward,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	getInfoUser,
	buyTurn,
	getItemAward,
	getHistoryTuDo,
	getTuDo,
	getCodeBonus,
	getLuckyInfo,
	getLuckyItems,
	userLogout,
	getDartScore
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)
