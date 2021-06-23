import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'
import './css/style_web.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	getDataUserSpin,
	getItemAward
} from '../../../modules/lucky'
import {
	getData
} from '../../../modules/profile'

import btn_dangnhap from './images/btn-dangnhap.png';
import btn_sanqua from './images/btn-sanqua.png';
import btn_duatop from './images/btn-duatop.png';
import btn_vinhdanhsanqua_active from './images/btn-vinhdanhsanqua-active.png';
import btn_bxhduatop from './images/btn-bxhduatop.png';
import btn_huongdanmuathescoin from './images/btn-huongdanmuathescoin.png';
import btn_nhanthongbaosukien from './images/btn-nhanthongbaosukien.png';
import btn_napgame from './images/btn-napgame.png';
import img_hotline from './images/img-hotline.png';
import logo_scoin from './images/logo_scoin.png';
import logo_scoinvip from './images/logo_scoinvip.png';
import logo_splay from './images/logo_splay.png';
import btn_tudo from './images/btn-tudo.png';
// import xiaomi_black from './images/xiaomi-black-shark-2.png';
import img_thescoin200k from './images/img-thescoin200k.png';
import img_thescoinvoucher from './images/img-thescoinvoucher.png';
import btn_phanthuong_active from './images/btn-phanthuong-active.png';
import btn_lichsu from './images/btn-lichsu.png';


// import muiten from './images/muiten.png';
import ReactResizeDetector from 'react-resize-detector'
// import spin from './images/spin.gif';
import $ from 'jquery';
import 'bootstrap';

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
			stop:true,
			auto: false,
			itemOfSpin:[],
			luckySpin:{},
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
			listVinhDanh:[],
			listTuDo:[],
			listHistory:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:false,
			inputValue: '',
			img_status: "sukiendangdienra",
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
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth})
	}



	componentDidMount(){
		const {img_width, img_height}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));

		this.props.getLuckyInfo().then(()=>{
			var data=this.props.dataLuckyInfo;
			if(data!==undefined){
				if(data.Status===0){
					this.getStatus(data.Data)
				}
			}
		})

		this.props.getLuckyItems().then(()=>{
			var data=this.props.dataLuckyItems;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({itemOfSpin: data.Data})
				}
			}
		})

		this.getVinhDanh(1);


		if (user !== null) {
			this.setState({isLogin:true, user:user})
			this.props.getDataUserSpin(user.Token).then(()=>{
				var data=this.props.dataUserSpin;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({turnsFree: data.Spins})
					}
				}

			})
		} 
		
		window.addEventListener('scroll', this.handleScroll);
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

	getVinhDanh=(pageNumber)=>{
		const {limit}=this.state;
		var offsetVinhDanh=(pageNumber-1)*limit;
		this.props.getVinhDanh(limit, offsetVinhDanh).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				if(data.Status===0){
					var listVinhDanh=data.Data;
					console.log(listVinhDanh)
					this.setState({listVinhDanh:data.Data, countVinhDanh:data.Totals})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Không lấy được dữ liệu bảng vinh danh.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
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
			this.setState({ img_status: "sapdienra", message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ img_status: "sukiendangdienra"});
		}
		if (time > end) {
			this.setState({ img_status: "ketthuc", message_status:"Sự kiện đã kết thúc."});
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




	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


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


	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			if(user.VipLevel!==0){
				this.getDataTuDo(user);
				$('#myModal4').modal('hide');
			}else{
				$('#activeVip').modal('show');
			}
		}else {
			$('#myModal5').modal('show');
		}
	}

	getDataTuDo=(user)=>{
		const {limit, activeTuDo}=this.state;
		var offsetTuDo=(activeTuDo-1)*limit;
		// $('#Loading').modal('show');
		this.props.getTuDo(user.Token, limit, offsetTuDo).then(()=>{
			// $('#Loading').modal('hide');
			var data=this.props.dataTuDo;
			if(data!==undefined){
				if(data.Status===0){
					$('#myModal2').modal('show');
					this.setState({listTuDo:data.Data, countTuDo:data.Totals, noti_tudo:false})
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

	getHistory=(user)=>{
		const {limit, activeHistory}=this.state;
		var offsetHistory=(activeHistory-1)*limit;
		// $('#Loading').modal('show');
		this.props.getHistoryTuDo(user.Token, limit, offsetHistory).then(()=>{
			// $('#Loading').modal('hide');
			var data=this.props.dataHistoryTuDo;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({listHistory:data.Data, countHistory:data.Totals})
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

	hideModalTuDo=()=>{
		$('#myModal2').modal('hide');
	}

	closePopupAuto=()=>{
		clearInterval(this.state.intervalId);
		this.setState({ isSpin:false, closeAuto:false});
		$('#myModal9').modal('hide');
	}

	showModalDetailBonus=()=>{
		$('#myModal4').modal('show');
	}

	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}



	handlePageChangeTuDo=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeTuDo: pageNumber},()=>{
			this.getDataTuDo(user, pageNumber)
		})
	}

	handlePageChangeHistory=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeHistory: pageNumber},()=>{
			this.getHistory(user, pageNumber)
		})
	}


	handlePageChangeVinhDanh=(pageNumber)=> {
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getVinhDanh(pageNumber)
		})

	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	xacThuc=(url)=> {
		localStorage.removeItem("user");
		document.location.reload(true);
		$('#myModal8').modal('hide');
		window.open(url, '_blank').focus();
	}



	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}

	numberWithCommas=(x)=> {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	sanqua=()=>{

	}

	render() {
		const {xacthuc,urlVideo,timeWaiting,height, width, auto, isLogin, day, hour, minute, second,len_auto, code, img_status, message_status, data_auto,message_error,dataItem,startSpin,
			waiting, activeTuDo, activeHistory, activeCodeBonus, activeVinhDanh, limit, countCodeBonus, countTuDo, countHistory, countVinhDanh, listHistory, listTuDo, listVinhDanh,itemBonus, turnsFree, hour_live, minute_live, second_live, isLive, user}=this.state;
		const { classes } = this.props;
		return (<div>	
					<div class="container-fluid page position-relative">
						<div class="login d-flex flex-row-reverse">
							<div class="align-self-center">
								<a href="#Modaldangnhap" title="Đăng nhập" data-toggle="modal"><img src={btn_dangnhap} alt="" width="100" /></a>
							</div>
							<div class="text-center align-self-center pr-1">
								<p class="font-size-16 text-white mb-0">Đặng Lê</p>
								<h2 class="font-size-14 text-warning m-0">VIP Kim Cương</h2>
							</div>
						</div>
						<div class="bg-top position-relative">
							<div class="bg-bottom">
								<div class="btn-s position-relative">
									<Link to="/sanqua">
										<a><img src={btn_sanqua} width="30%" hspace="10" /></a>
									</Link>
									<Link to="/duatop">
										<a><img src={btn_duatop} width="30%" hspace="10" /></a>
									</Link>
								</div>
								<div class="bxh position-relative mx-auto">
									<ul class="nav nav-pills nav-justified" role="tablist">
										<li class="nav-item">
										<a class="nav-link btn-vinhdanh active p-0" data-toggle="pill" href="#home"><img src={btn_vinhdanhsanqua_active} width="340" hspace="5" id="image-1" /></a>
										</li>
										<li class="nav-item">
										<a class="nav-link btn-bxhduatop p-0" data-toggle="pill" href="#menu1"><img src={btn_bxhduatop} width="340" hspace="5" id="image-2" /></a>
										</li>
									</ul>
									
									<div class="tab-content bg-bxh">
										<div id="home" class="tab-pane active pt-3 pb-3 px-3">
										<table class="table table-borderless text-center font-size-16 mb-0 text-red" style={{tableLayout: "fixed", borderCollapse: "collapse", lineHeight: "39px"}}>
											<thead>
											<tr class="bg-border-bottom">
												<th class="p-1 bg-border-right w-33">Tài khoản</th>
												<th class="p-1 bg-border-right w-33">Giải thưởng</th>
												<th class="p-1 w-33">Thời gian trúng</th>
											</tr>
											</thead>
											<tbody>
											<tr class="bg-border-bottom">
												<td class="p-0 bg-border-right w-33">John</td>
												<td class="p-0 bg-border-right w-33">Gói quà bạch kim Gói quà bạch kim Gói quà bạch kim Gói quà bạch kim</td>
												<td class="p-0 w-33 w-33">12:24:58 19/05/2021</td>
											</tr>
											
											</tbody>
										</table>
										</div>
										<div id="menu1" class="tab-pane fade pt-3 pb-3">
										<table class="table table-borderless text-center font-size-16 mb-0 text-red" style={{tableLayout: "fixed", borderCollapse: "collapse", lineHeight: "39px"}}>
											<thead>
											<tr class="bg-border-bottom">
												<th class="p-1 bg-border-right w-33">Tài khoản</th>
												<th class="p-1 bg-border-right w-33">Giải thưởng</th>
												<th class="p-1 w-33">Thời gian trúng</th>
											</tr>
											</thead>
											<tbody>
											<tr class="bg-border-bottom">
												<td class="p-0 bg-border-right w-33">John</td>
												<td class="p-0 bg-border-right w-33">Gói quà bạch kim Gói quà bạch kim</td>
												<td class="p-0 w-33 w-33">12:24:58 19/05/2021</td>
											</tr>
											
											</tbody>
										</table>
										</div>                
									</div>
								</div>
								<div class="btn-h position-relative">
									<a href="#" title="Hướng dẫn mua thẻ scoin" target="_blank"><img src={btn_huongdanmuathescoin} width="340" hspace="10" /></a>
									<a href="#" title="Nhận thông báo sự kiện"><img src="images/btn-nhanthongbaosukien.png" width="340" hspace="10" /></a>
								</div>
								<div class="btn-h position-relative mt-2">
									<a href="#" title="Nạp game" target="_blank"><img src={btn_napgame} width="150" hspace="100" /></a>
									<a href="Tel:19001104" title="Hot line"><img src={img_hotline} width="300" hspace="40" /></a>
								</div>
								<div class="btn-h position-relative mt-2">
									<a href="#" title="Scoin" target="_blank"><img src={logo_scoin} width="150" hspace="30" /></a>
									<a href="#" title="Scoin VIP" target="_blank"><img src={logo_scoinvip} width="150" hspace="30" /></a>
									<a href="#" title="Splay"><img src={logo_splay} width="150" hspace="30" /></a>
								</div>
								<div class="btn-h position-relative mt-2 pb-2 font-size-16 text-white-50">
									<p class="text-center">
										Hệ thống phát hành game VTC Mobile
										<br></br>
										Copyright &copy;2021 VTC Mobile. All rights reserved
									</p>
									<p class="text-center mb-0 pb-1">
										Công ty Cổ Phần VTC Dịch Vụ Di Động <br></br>
										Tầng 11, Tòa nhà VTC Online, số 18 Tam Trinh, Hai Bà Trưng, Hà Nội <br></br>
										SĐT : (84-4).39877470 | Email : vtcmobile@vtc.vn <br></br>
										Người chịu trách nhiệm quản lý nội dung: Ông Nguyễn Ngọc Bảo <br></br>
										Tổng đài hỗ trợ 1900 1104
									</p>
								</div>
								<div class="menu-left">
									<a href="#" title="Active VIP" target="_blank"><p class="mb-0 menu-link link-first"></p></a>
									<a href="#" title="Hướng dẫn chơi"><p class="mb-0 menu-link"></p></a>
									<a href="#Modalgiaithuong" title="Giải thưởng" data-toggle="modal"><p class="mb-0 menu-link"></p></a>
									<a href="#" title="Lịch sử giao dịch"><p class="mb-0 menu-link"></p></a>
								</div>
								<div class="menu-right"><a href="#Modaltudo" title="Tủ đồ" data-toggle="modal"><img src={btn_tudo} width="100%" alt="" /></a></div>
							</div>
						</div> 
					</div>


			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal5">
				<div class="modal-dialog modal-dangnhap">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<h2 class="font-size-3vw font-weight-bold text-uppercase text-center">Bạn vẫn chưa đăng nhập</h2>
						<p class="text-center"><a title="Đăng nhập" onClick={this.loginAction}><img src={btn_dangnhap} width="30%" alt="" /></a></p>
					</div>

					</div>
				</div>
			</div>


			{/* <!-- The Modal Giai thuong--> */}
			<div class="modal fade" id="Modalgiaithuong">
				<div class="modal-dialog modal-dangnhap modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0 py-0 my-2 px-3 scroll-modal-body">      	
						<div class="row mx-0 mb-1 border-giaithuong-e">
							<div class="col-12 text-center text-brown pt-1">
								<h2 class="font-size-3vw font-weight-bold text-uppercase mb-0">Giải thưởng săn quà</h2>
								<p class="font-size-3vw mb-0 text-yellow text-blink"><span class="spinner-grow text-yellow" style={{width: ".8rem", height: ".8rem"}}></span> Đang diễn ra ... </p>
							</div>
							<div class="col-4 text-center">
								<p class="m-0"><img src={logo_scoin} alt="" width="60%" /></p>
								<p class="font-size-3vw text-phanthuong text-yellow">Topup Scoin 50k</p>
							</div>
							<div class="col-4 text-center">
								<p class="m-0"><img src={img_thescoin200k} alt="" width="60%" /></p>
								<p class="font-size-3vw text-phanthuong text-yellow">Thẻ Scoin 200k</p>
							</div>
							<div class="col-4 text-center">
								<p class="m-0"><img src={img_thescoinvoucher} alt="" width="60%" /></p>
								<p class="font-size-3vw text-phanthuong text-yellow">Thẻ Scoin Voucher 10k</p>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>


			{/* <!-- The Modal Tu do--> */}
			<div class="modal fade" id="Modaltudo">
				<div class="modal-dialog modal-tudo">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body border-0 py-0 my-0 px-3 scroll-modal-body">
						{/* <!-- Nav pills --> */}
						<ul class="nav nav-pills nav-justified mx-auto">
						<li class="nav-item">
							<a class="nav-link py-0 active" data-toggle="pill" href="#tabphanthuong"><img src={btn_phanthuong_active} width="100%" hspace="5" id="image-3" /></a>
						</li>
						<li class="nav-item">
							<a class="nav-link py-0" data-toggle="pill" href="#tablichsu"><img src={btn_lichsu} width="100%" hspace="5" id="image-4" /></a>
						</li>

						</ul>        
						{/* <!-- Tab panes --> */}
						<div class="tab-content">
							<div class="tab-pane active" id="tabphanthuong">
								<table class="table table-borderless text-center font-size-3vw mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "170%"}}>
									<thead>
									<tr class="bg-border-bottom">
										<th class="p-1 bg-border-right w-25 valign-middle">Phần thưởng</th>
										<th class="p-1 bg-border-right w-25 valign-middle">Nội dung</th>
										<th class="p-1 bg-border-right w-25 valign-middle">Thời gian trúng</th>
										<th class="p-1 w-25 valign-middle">Mở quà</th>
									</tr>
									</thead>
									<tbody>
									<tr class="bg-border-bottom">
										<td class="p-0 bg-border-right w-25 valign-middle">John</td>
										<td class="p-0 bg-border-right w-25 valign-middle">Gói quà bạch kim Gói quà bạch kim</td>
										<td class="p-0 bg-border-right w-25 valign-middle">12:24:58 19/05/2021</td>
										<td class="p-1 w-25 valign-middle"><a href="#" title="Mở quà">Mở quà</a></td>
									</tr>
									
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom mt-1">
									<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
									<li class="page-item"><a class="page-link" href="#">1</a></li>
									<li class="page-item active"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item"><a class="page-link" href="#">...</a></li>
									<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
								</ul>
							</div>
							{/* <!--End tabphanthuong --> */}
							<div class="tab-pane fade" id="tablichsu">
								<table class="table table-borderless text-center font-size-3vw mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "170%"}}>
									<thead>
									<tr class="bg-border-bottom">
										<th class="p-1 bg-border-right w-25 valign-middle">Phần thưởng</th>
										<th class="p-1 bg-border-right w-25 valign-middle">Nội dung</th>
										<th class="p-1 bg-border-right w-25 valign-middle">Thời gian trúng</th>
										<th class="p-1 w-25 valign-middle">Mở quà</th>
									</tr>
									</thead>
									<tbody>
									<tr class="bg-border-bottom">
										<td class="p-0 bg-border-right w-25 valign-middle">John</td>
										<td class="p-0 bg-border-right w-25 valign-middle">Gói quà bạch kim Gói quà bạch kim</td>
										<td class="p-0 bg-border-right w-25 valign-middle">12:24:58 19/05/2021</td>
										<td class="p-1 w-25 valign-middle"><a href="#" title="Mở quà">Mở quà</a></td>
									</tr>
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom mt-1">
									<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
									<li class="page-item"><a class="page-link" href="#">1</a></li>
									<li class="page-item active"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item"><a class="page-link" href="#">...</a></li>
									<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
								</ul>
							</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>


			{/* <!-- Thông báo --> */}

			{/* <div className="modal fade" id="myModal11" style={{zIndex:10010}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_error}</h5>
						</div>       
					</div>

					</div>
				</div>
			</div> */}

				
			{/* <!-- Thông báo bảo trì --> */}
			{/* <div className="modal fade" id="myModal12" style={{zIndex: 10010}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Thông báo bảo trì!</h5>
							<h5 className="text-thele lead text-center">Chức năng này đang được nâng cấp để tối ưu. Vui lòng quay lại sau 10 phút.</h5>
							<h5 className="text-thele lead text-center">Xin lỗi vì sự bất tiện này</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closeServerErr}>Xác nhận</button>
						</div>       
					</div>

					</div>
				</div>
			</div> */}

			{/* <!-- The Modal Thông báo Active tk VIP--> */}
			{/* <div class="modal fade" id="activeVip">
				<div class="modal-dialog">
					<div class="modal-content popup-phanthuong">
						<div class="modal-header border-bottom-0">
							<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>
						<div class="modal-body">
							<div class="table-responsive mt-2">              
								<h5 class="text-thele lead text-center">Tài khoản của bạn chưa phải là Vip. Hãy kích hoạt tài khoản Vip để chơi.</h5>
								<a href="https://vip.scoin.vn" type="button" target="_blank" class="btn btn-xacnhan text-white btn-block text-center py-4">Trang chủ VIP</a>
							</div>       
						</div>

					</div>
				</div>
			</div> */}
			
				
				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
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
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	userLogout,
	getDataUserSpin
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)
