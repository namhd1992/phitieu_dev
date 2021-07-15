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
	getMoreSessions,
	getCodeBonus,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	getDartScore,
	getItemAward
} from '../../../modules/lucky'
import {
	getData
} from '../../../modules/profile'

import btn_dangnhap from './images/btn-dangnhap.png';
import btn_dangxuat from './images/btn-dangxuat.png';
import btn_sanqua from './images/btn-sanqua.png';
import btn_duatop from './images/btn-duatop.png';
import btn_vinhdanhsanqua_active from './images/btn-vinhdanhsanqua-active.png';
import btn_vinhdanhsanqua from './images/btn-vinhdanhsanqua.png';
import btn_bxhduatop from './images/btn-bxhduatop.png';
import btn_bxhduatop_active from './images/btn-bxhduatop-active.png';
import btn_huongdanmuathescoin from './images/btn-huongdanmuathescoin.png';
import btn_nhanthongbaosukien from './images/btn-nhanthongbaosukien.png';
import btn_napgame from './images/btn-napgame.png';
import img_hotline from './images/img-hotline.png';
import logo_scoin from './images/logo_scoin.png';
import logo_scoinvip from './images/logo_scoinvip.png';
import logo_splay from './images/logo_splay.png';
import btn_tudo from './images/btn-tudo.png';
// import xiaomi_black from './images/xiaomi-black-shark-2.png';
import img_card10k from './images/img-card10k.png';
import img_card20k from './images/img-card20k.png';
import img_card50k from './images/img-card50k.png';
import img_card100k from './images/img-card100k.png';
import img_card200k from './images/img-card200k.png';
import img_card300k from './images/img-card300k.png';
import img_card500k from './images/img-card500k.png';
import img_card1000k from './images/img-card1000k.png';
import img_card2000k from './images/img-card2000k.png';
import img_card5000k from './images/img-card5000k.png';
import img_thescoinvoucher from './images/img-thescoinvoucher.png';

import img_dacochu from './images/img-dacochu.png';


import btn_phanthuong_active from './images/btn-phanthuong-active.png';
import btn_phanthuong from './images/btn-phanthuong.png';
import btn_lichsu from './images/btn-lichsu.png';
import btn_lichsu_active from './images/btn-lichsu-active.png';
import btn_activevip from './images/btn-activevip.png';
import vip_kimcuong from './images/vip-kimcuong.png';
import vip_bachkim from './images/vip-bachkim.png';
import vip_vang from './images/vip-vang.png';
import vip_bac from './images/vip-bac.png';
import vip_dong from './images/vip-dong.png';

import nem_phi_tieu from './images/nem-phi-tieu.png';
import huy_nem_tieu from './images/huy-nem-tieu.png';
import khu_vuc_1 from './images/khu-vuc-1.png';
import khu_vuc_2 from './images/khu-vuc-2.png';
import khu_vuc_3 from './images/khu-vuc-3.png';
import vong_tron_ngoai from './images/vong-tron-ngoai.png';
import vong_tron_trong from './images/vong-tron-trong.png';
import voucher_scoin from './images/voucher-scoin.png';
import nap_ngan_hang from './images/nap-ngan-hang.png';
import ck_ngan_hang from './images/ck-ngan-hang.png';
import topup_scoin from './images/topup-scoin.png';
import the_scoin from './images/the-scoin.png';
import nap_voucher_scoin from './images/nap-voucher-scoin.png';



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
			itemOfSpin:[],
			luckySpin:{},
			isLogin:false,
			activeVinhDanh:1,
			activeTuDo:1,
			activeHistory:1,
			countVinhDanh:0,
			countHistory:0,
			countTuDo:0,
			dataVinhDanh:[],
			dataTuDo:[],
			listVinhDanh:[],
			listTuDo:[],
			listHistory:[],
			width:0,
			numberPage:3,
			height:0,
			img_width:0,
			img_height:0,
			inputValue: '',
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			finished:false,
			user:{},
			dataItem:{},
			waiting:false,
			innerWidth:0,
			type:1, 
			tab_tudo: true,
			listSesstions:[]
		};
	}
	componentWillMount(){
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth})
	}



	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));

		this.getVinhDanh(1,1);


		if (user !== null) {
			this.setState({isLogin:true, user:user})
		} 

		this.getMoreSessions();
		
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
	}
	setScreenOrientation=()=>{
		const {innerWidth}=this.state;
		if(Math.abs(innerWidth - window.innerWidth) >100){
			window.location.reload();
			this.setState({innerWidth:window.innerWidth})
		}
	}


	getMoreSessions=()=>{
		this.props.getMoreSessions().then(()=>{
			var data=this.props.dataSesions;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({listSesstions:data.Data})
				}else if(data.Status===2){
					this.setState({msg:'Chưa load được dữ liệu'})
					$('#myModal11').modal('show');
				}else if(data.Status===3){
					this.logoutAction();
				}else{
					console.log("Lỗi")
				}
			}
		})
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

	getVinhDanh=(type, pageNumber)=>{
		const {limit}=this.state;
		var offsetVinhDanh=(pageNumber-1)*limit;
		this.setState({type:type, listVinhDanh:[], countVinhDanh:0}, ()=>{
			this.props.getVinhDanh(limit, offsetVinhDanh, type).then(()=>{
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
		})
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
				$('#Modaltudo').modal('show');
			}else{
				$('#activeVip').modal('show');
			}
		}else {
			$('#Modaldangnhap').modal('show');
		}
	}

	showModalGiaiThuong=()=>{
		this.getMoreSessions();
		$('#Modalgiaithuong').modal('show');
	}

	showModalHuongDan=()=>{
		$('#Modalhuongdan').modal('show');
	}

	getDataTuDo=(user)=>{
		const {limit, activeTuDo}=this.state;
		var offsetTuDo=(activeTuDo-1)*limit;
		// $('#Loading').modal('show');
		this.setState({tab_tudo: true})
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
		this.setState({tab_tudo: false})
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
			this.getDataTuDo(user)
		})
	}

	handlePageChangeHistory=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeHistory: pageNumber},()=>{
			this.getHistory(user)
		})
	}


	handlePageChangeVinhDanh=(type, pageNumber)=> {
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getVinhDanh(type, pageNumber)
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

	dangNhap=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			$('#activeVip').modal('show');
		}else {
			$('#Modaldangnhap').modal('show');
		}
	}

	showTooltip=()=>{
		$('[data-toggle="tooltip"]').tooltip();
	}

	getTypeGiaiThuong=(type)=>{
		if(type===1){
			return "Giải thưởng săn quà"
		}else if(type===2){
			return "Giải thưởng đua top"
		}
	}

	getImgItem=(item)=>{
		var obj;
		switch (item) {
			case "ScoinCard10K":
				obj=img_card10k;
				break;
			case "ScoinCard20K":
				obj=img_card20k;
				break;
			case "ScoinCard50K":
				obj=img_card50k;
				break;
			case "ScoinCard100K":
				obj=img_card100k;
				break;
			case "ScoinCard200K":
				obj=img_card200k;
				break;
			case "ScoinCard300K":
				obj=img_card300k;
				break;
			case "ScoinCard500K":
				obj=img_card500k;
				break;
			case "ScoinCard1000K":
				obj=img_card1000k
				break;
			case "ScoinCard2000K":
				obj=img_card2000k
				break;
			case "ScoinCard5000K":
				obj=img_card5000k;
				break;
			case "TopupScoin50K":
				obj=logo_scoin;
				break;
			case "ScoinVoucher10K":
				obj=img_thescoinvoucher;
				break;
			case "BankTransferVoucher20K":
				obj=img_thescoinvoucher;
				break;
			default:
				obj=logo_scoin;
				break;
		}
		return obj;
	}

	timeModalGiaiThuowng=(time)=>{
		var start=time.substring(time.indexOf("(") +1,time.indexOf(")"));
		var times=(start-Date.now())/1000;
		var s='0h : 0m :0s';
		if(times>0){
			var day=Math.floor(times/86400) > 9 ? Math.floor(times/86400) : `0${Math.floor(times/86400)}`;
			var hour=Math.floor((times%86400)/3600) > 9 ? Math.floor((times%86400)/3600) : `0${Math.floor((times%86400)/3600)}`;
			var minute=Math.floor(((times%86400)%3600)/60) > 9 ? Math.floor(((times%86400)%3600)/60) : `0${Math.floor(((times%86400)%3600)/60)}`;
			var second=Math.ceil(((times%86400)%3600)%60) > 9 ? Math.ceil(((times%86400)%3600)%60) : `0${Math.ceil(((times%86400)%3600)%60)}`;
			s =`${hour}h : ${minute}m : ${second}s` ;
		}
		return s;
	}

	render() {
		const {tab_tudo ,type,numberPage, isLogin,message_error,dataItem,listSesstions,
			waiting, activeTuDo, activeHistory, activeVinhDanh, limit, countTuDo, countHistory, countVinhDanh, listHistory, listTuDo, listVinhDanh, user}=this.state;
		return (<div>	
					<div class="container-fluid page position-relative">
						{(isLogin)?(<div class="login d-flex flex-row-reverse">
							<div class="align-self-center">
								<a title="Đăng nhập" onClick={this.logoutAction} style={{cursor:'pointer'}}><img src={btn_dangxuat} alt="" width="100" /></a>
							</div>
							<div class="text-center align-self-center pr-1">
								<p class="font-size-16 text-white mb-0">{user.Username}</p>
								{(user.VipLevel===1)?(<h2 class="font-size-14 text-warning m-0">VIP Đồng <img src={vip_dong} alt="VIP Đồng" width="16" /></h2>):(<div></div>)}
								{(user.VipLevel===2)?(<h2 class="font-size-14 text-warning m-0">VIP Bạc <img src={vip_bac} alt="VIP Bạc" width="16" /></h2>):(<div></div>)}
								{(user.VipLevel===3)?(<h2 class="font-size-14 text-warning m-0">VIP Vàng <img src={vip_vang} alt="VIP Vàng" width="16" /></h2>):(<div></div>)}
								{(user.VipLevel===4)?(<h2 class="font-size-14 text-warning m-0">VIP Bạch kim <img src={vip_bachkim} alt="VIP Bạch kim" width="16" /></h2>):(<div></div>)}
							</div>
						</div>):(<div class="login d-flex flex-row-reverse">
							<div class="align-self-center">
								<a title="Đăng nhập" onClick={this.loginAction} style={{cursor:'pointer'}}><img src={btn_dangnhap} alt="" width="100" /></a>
							</div>
						</div>)}
						
						<div class="bg-top position-relative">
							<div class="bg-bottom">
								{(isLogin)?(<div class="btn-s position-relative">
									{(user.VipLevel>0)?(<div><Link to="/sanqua">
										<a style={{cursor:'pointer'}}><img src={btn_sanqua} width="200px" hspace="10" /></a>
									</Link>
									<Link to="/duatop">
										<a style={{cursor:'pointer'}}><img src={btn_duatop} width="200px" hspace="10" /></a>
									</Link></div>):(<div><a title="Săn quà" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_sanqua} width="200" hspace="10" /></a>
               							<a title="Đua TOP" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_duatop} width="200" hspace="10" /></a></div>)}
									
								</div>):(
								<div class="btn-s position-relative">
									 	<a title="Săn quà" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_sanqua} width="200" hspace="10" /></a>
               							<a title="Đua TOP" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_duatop} width="200" hspace="10" /></a>
								</div>
								)}
								
								<div class="bxh position-relative mx-auto">
									<ul class="nav nav-pills nav-justified" role="tablist">
										<li class="nav-item">
											<a class="nav-link btn-vinhdanh p-0" onClick={()=>this.getVinhDanh(1,1)}><img src={type===1?btn_vinhdanhsanqua_active:btn_vinhdanhsanqua} width="340" hspace="5" id="image-1" /></a>
										</li>
										<li class="nav-item">
											<a class="nav-link btn-bxhduatop p-0" onClick={()=>this.getVinhDanh(2,1)}><img src={type==2?btn_bxhduatop_active:btn_bxhduatop} width="340" hspace="5" id="image-2" /></a>
										</li>
									</ul>
									
									<div class="tab-content bg-bxh">
										<div id="home" class="tab-pane active pt-3 pb-3 px-3" style={{minHeight:520}}>
											<table class="table table-borderless text-center font-size-16 mb-0 text-red" style={{tableLayout: "fixed", borderCollapse: "collapse", lineHeight: "35px"}}>
												<thead>
													<tr class="bg-border-bottom">
														<th class="p-1 bg-border-right w-33">Tài khoản</th>
														<th class="p-1 bg-border-right w-33">Giải thưởng</th>
														<th class="p-1 w-33">Thời gian trúng</th>
													</tr>
												</thead>
												<tbody>

													{listVinhDanh.map((obj, key) => (
														<tr key={key} class="bg-border-bottom">
															<td className="p-0 bg-border-right w-33">{obj.Username}</td>
															<td class="p-0 bg-border-right w-33" onMouseOver={this.showTooltip} ><span data-toggle="tooltip" data-placement="bottom" title={obj.AwardName}>{obj.AwardName}</span></td>
															<td className="p-0 w-33 w-33">{this.timeConverter(obj.RewardTime)}</td>
														</tr>
													))}
												</tbody>
											</table>
											<div className="pagination justify-content-center pag-custom">
												<Pagination
													activePage={activeVinhDanh}
													itemsCountPerPage={10}
													totalItemsCount={countVinhDanh}
													pageRangeDisplayed={numberPage}
													lastPageText={'Trang cuối'}
													firstPageText={'Trang đầu'}
													itemClass={"page-item"}
													linkClass={"page-link"}
													onChange={(v) => this.handlePageChangeVinhDanh(type,v)}
												/>
											</div> 
										</div>        
									</div>
								</div>
								<div class="btn-h position-relative">
									<a href="https://daily.scoin.vn/huong-dan-mua-the/" title="Hướng dẫn mua thẻ scoin" target="_blank"><img src={btn_huongdanmuathescoin} width="340" hspace="10" /></a>
									<a href="https://www.facebook.com/scoinvtcmobile" title="Nhận thông báo sự kiện" target="_blank"><img src={btn_nhanthongbaosukien} width="340" hspace="10" /></a>
								</div>
								<div class="btn-h position-relative mt-2">
									<a href="https://scoin.vn/nap-game" title="Nạp game" target="_blank"><img src={btn_napgame} width="150" hspace="100" /></a>
									<a href="Tel:19001104" title="Hot line"><img src={img_hotline} width="300" hspace="40" /></a>
								</div>
								<div class="btn-h position-relative mt-2">
									<a href="https://scoin.vn/" title="Scoin" target="_blank"><img src={logo_scoin} width="150" hspace="30" /></a>
									<a href="https://vip.scoin.vn/" title="Scoin VIP" target="_blank"><img src={logo_scoinvip} width="150" hspace="30" /></a>
									<a title="Splay"><img src={logo_splay} width="150" hspace="30" /></a>
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
									<a href="https://vip.scoin.vn/" title="Active VIP" target="_blank"><p class="mb-0 menu-link link-first"></p></a>
									<a title="Hướng dẫn chơi" onClick={this.showModalHuongDan}><p class="mb-0 menu-link"></p></a>
									<a title="Giải thưởng" onClick={this.showModalGiaiThuong}><p class="mb-0 menu-link"></p></a>
									<a href="#" title="Lịch sử giao dịch"><p class="mb-0 menu-link"></p></a>
								</div>
								<div class="menu-right"><a  title="Tủ đồ" onClick={this.showModalTuDo} style={{cursor:'pointer'}}><img src={btn_tudo} width="100%" alt="" /></a></div>
							</div>
						</div> 
					</div>


			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="Modaldangnhap">
				<div class="modal-dialog modal-dangnhap">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">Bạn vẫn chưa đăng nhập</h2>
						<p class="text-center"><a title="Đăng nhập" onClick={this.loginAction}><img src={btn_dangnhap} width="30%" alt="" /></a></p>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo lỗi--> */}
			<div className="modal fade" id="myModal11">
				<div class="modal-dialog modal-dangnhap">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">{message_error}</h2>
					</div>

					</div>
				</div>
			</div>

			
			{/* <!-- The Modal Thông báo activeVip--> */}

			<div class="modal fade" id="activeVip">
				<div class="modal-dialog modal-dangnhap">
					<div class="modal-content bg-transparent border-0">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body border-0">
						<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">Bạn cần active tài khoản VIP để chơi.</h2>
						<p class="text-center"><a href="https://vip.scoin.vn" target="_blank"><img src={btn_activevip} width="120" alt="Active VIP" /></a></p>
					</div>

					</div>
				</div>
			</div>


			{/* <!-- The Modal Giai thuong--> */}
			<div class="modal fade" id="Modalgiaithuong">
				<div class="modal-dialog modal-giaithuong modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

						<div class="modal-header border-0 p-0">
							<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body border-0 py-0 my-4 px-4 ml-2 ">   
							{listSesstions.map((obj, key) => (
								<div class="row mx-0 mb-1 border-giaithuong-e position-relative" key={key}>
									<div class="col-12 text-center text-brown pt-1">
										<h2 class="font-size-16 font-weight-bold text-uppercase mb-0">{this.getTypeGiaiThuong(obj.SessionType)}</h2>
										{(obj.Status===0)?(<p class="font-size-16 mb-0">Còn: {this.timeModalGiaiThuowng(obj.StartTime)}</p>):(<div></div>)}
										{(obj.Status===1)?(<p class="font-size-16 mb-0 text-yellow text-blink"><span class="spinner-grow text-yellow" style={{width: ".8rem", height: ".8rem"}}></span> Đang diễn ra ... </p>):(<div></div>)}
										{(obj.Status===2)?( <p class="font-size-16 mb-0 text-danger">Đã kết thúc</p>):(<div></div>)}
										
									</div>

									{obj.Awards.map((v, j) => (
										<div class="col-4 text-center" key={j}>
											<p class="m-0"><img src={this.getImgItem(v.Name)} alt="" width="60%" /></p>
											<p class="font-size-16 text-yellow">{v.Description}</p>
										</div>
									))}

									{(obj.Status===2)?(<img class="img-dacochu" src={img_dacochu} alt="" width="30%" />):(<div></div>)}
									
								</div>
							))}

							
						</div>
					</div>
				</div>
			</div>


			{/* <!-- The Modal Tu do--> */}
			<div class="modal fade" id="Modaltudo">
				<div class="modal-dialog modal-dialog-md modal-tudo">
					<div class="modal-content bg-transparent border-0">
						<div class="modal-header border-0 p-0 text-dark">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>

						<div class="modal-body border-0 py-0 mt-4 mb-0 px-4 scroll-modal-body">

							<ul class="nav nav-pills nav-justified mx-auto">
								<li class="nav-item">
									<a class="nav-link py-0" onClick={()=>this.getDataTuDo(user)}><img src={tab_tudo ? btn_phanthuong_active: btn_phanthuong}  width={160} hspace="5" id="image-3" /></a>
								</li>
								<li class="nav-item">
									<a class="nav-link py-0" onClick={()=>this.getHistory(user)}><img src={tab_tudo ? btn_lichsu : btn_lichsu_active} width={160} hspace="5" id="image-4" /></a>
								</li>
							</ul>        

							<div class="tab-content">
								<div class="tab-pane active">
									{(tab_tudo)?(<div><table class="table table-borderless text-center font-size-14 mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "170%"}}>
										<thead>
										<tr class="bg-border-bottom">
											<th class="p-1 bg-border-right w-25 valign-middle">Phần thưởng</th>
											<th class="p-1 bg-border-right w-25 valign-middle">Nội dung</th>
											<th class="p-1 bg-border-right w-25 valign-middle">Thời gian trúng</th>
											<th class="p-1 w-25 valign-middle">Mở quà</th>
										</tr>
										</thead>
										<tbody>
											{listTuDo.map((obj, key) => (
												
													<tr key={key} class="bg-border-bottom">
														<td className="p-1 bg-border-right w-33 valign-middle" onMouseOver={this.showTooltip} ><span data-toggle="tooltip" data-placement="bottom" title={obj.AwardName}></span>{obj.AwardName}</td>
														<td className="p-1 bg-border-right w-33 valign-middle" onMouseOver={this.showTooltip} ><span data-toggle="tooltip" data-placement="bottom" title={obj.AwardName}></span>{obj.AwardName}</td>
														<td className="p-0 bg-border-right w-25 valign-middle">{this.timeConverter(obj.RewardTime)}</td>
														{(obj.AwardName.indexOf("Thêm")===0)?(<td class="p-1 w-auto valign-middle">Mở</td>):(<td class="p-1 w-auto valign-middle"><a class="text-primary"  style={{cursor:'pointer'}} onClick={()=>this.getItem(user, obj)}>Mở</a></td>)}
														
													</tr>
												))}				
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom mt-1">
									<Pagination
										activePage={activeTuDo}
										itemsCountPerPage={limit}
										totalItemsCount={countTuDo}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeTuDo(v)}
									/>
								</div> 
								</div>):(<div><table class="table table-borderless text-center font-size-14 mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "170%"}}>
										<thead>
										<tr class="bg-border-bottom">
											<th class="p-1 bg-border-right w-33 valign-middle">Phần thưởng</th>
											<th class="p-1 bg-border-right w-33 valign-middle">Nội dung</th>
											<th class="p-1 bg-border-right w-33 valign-middle">Thời gian trúng</th>
										</tr>
										</thead>
										<tbody>
											{listHistory.map((obj, key) => (
												
													<tr key={key} class="bg-border-bottom">
														<td className="p-1 bg-border-right w-33 valign-middle" onMouseOver={this.showTooltip} ><span data-toggle="tooltip" data-placement="bottom" title={obj.AwardName}></span>{obj.AwardName}</td>
														<td className="p-1 bg-border-right w-33 valign-middle" onMouseOver={this.showTooltip} ><span data-toggle="tooltip" data-placement="bottom" title={obj.AwardDisplay}></span>{obj.AwardDisplay}</td>
														<td className="p-1 bg-border-right w-33 valign-middle">{this.timeConverter(obj.RewardTime)}</td>
													</tr>
												))}				
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom">
									<Pagination
										activePage={activeHistory}
										itemsCountPerPage={limit}
										totalItemsCount={countHistory}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeHistory(v)}
									/>
								</div>
								</div> )}
									
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			{/* <!-- The Modal Huong Dan--> */}
			<div class="modal fade" id="Modalhuongdan">
				<div class="modal-dialog modal-giaithuong modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body order-0 py-0 my-4 px-4 ml-2 scroll-modal-body">
						<h4 class="font-size-16 font-weight-bold">1. Cách thức tham gia</h4>
						<dl class="font-size-16">
							<dt>- Đối tượng tham gia:</dt>
							<dd> &bull; Toàn bộ khách hàng đã active tài khoản khách hàng VIP.</dd>
							<dd> &bull; Nếu chưa là khách hàng VIP, bạn vui lòng thực hiện active và trở thành VIP <a class="text-primary" href="https://vip.scoin.vn/" title="Active VIP" target="_blank">tại đây</a></dd>
							<dt>- Cách thức tham gia:</dt>
							<dd> &bull; Trong thời gian diễn ra sự kiện, với mỗi lần nạp ingame/nạp ví scoin bằng thẻ scoin và chuyển khoản ngân hàng thành công, tài khoản sẽ nhận được phi tiêu để tham gia game, số phi tiêu được quy định như sau: </dd>
							<dd> 
								<table class="table table-bordered table-hover mx-auto" style={{width: "90%"}}>
									<thead>
									<tr>
										<th class="p-1">Số tiền nạp thẻ Scoin</th>
										<th class="p-1">Số phi tiêu nhận</th>

									</tr>
									</thead>
									<tbody>
									<tr>
										<td class="p-1">10k</td>
										<td class="p-1">1</td>
									</tr>
									<tr>
										<td class="p-1">20k</td>
										<td class="p-1">2</td>
									</tr>
									<tr>
										<td class="p-1">50k</td>
										<td class="p-1">5</td>
									</tr>
									<tr>
										<td class="p-1">100k</td>
										<td class="p-1">10</td>
									</tr>
									<tr>
										<td class="p-1">200k</td>
										<td class="p-1">20</td>
									</tr>
									<tr>
										<td class="p-1">300k</td>
										<td class="p-1">30</td>
									</tr>
									<tr>
										<td class="p-1">500k</td>
										<td class="p-1">50</td>
									</tr>
									<tr>
										<td class="p-1">1000k</td>
										<td class="p-1">100</td>
									</tr>
									<tr>
										<td class="p-1">2000k</td>
										<td class="p-1">200</td>
									</tr>
									<tr>
										<td class="p-1">5000k</td>
										<td class="p-1">500</td>
									</tr>
									</tbody>
								</table>
								<table class="table table-bordered table-hover mx-auto" style={{width: "90%"}}>
									<thead>
									<tr>
										<th class="p-1">Số tiền nạp chuyển khoản ngân hàng </th>
										<th class="p-1">Số phi tiêu nhận</th>

									</tr>
									</thead>
									<tbody>
									<tr>
										<td class="p-1">&lt; 10k</td>
										<td class="p-1">0</td>
									</tr>
									<tr>
										<td class="p-1">10k &lt; nạp &lt; 50k</td>
										<td class="p-1">3</td>
									</tr>
									<tr>
										<td class="p-1">50k &lt; nạp &lt; 100k</td>
										<td class="p-1">8</td>
									</tr>
									<tr>
										<td class="p-1">100k &lt; nạp &lt; 500k</td>
										<td class="p-1">35</td>
									</tr>
									<tr>
										<td class="p-1">500k &lt; nạp &lt; 1000k</td>
										<td class="p-1">60</td>
									</tr>
									<tr>
										<td class="p-1">1000k &lt; nạp &lt; 2000k</td>
										<td class="p-1">120</td>
									</tr>
									<tr>
										<td class="p-1">2000k &lt; nạp &lt; 5000k</td>
										<td class="p-1">250</td>
									</tr>                      
									</tbody>
								</table>
							</dd>            
							<dd> - Sau khi nhận được Phi tiêu, khách hàng truy cập trang sự kiện, chọn chế độ chơi Săn quà hoặc Đua top để chơi.</dd>
							<dd> - Khách hàng sử dụng chuột (chơi trên PC) hoặc vuốt màn hình (chơi trên điện thoại) để ném phi tiêu vào bảng</dd>
							<dd> <img src={nem_phi_tieu} class="img-fluid" alt="" /></dd>
							<dd> <img src={huy_nem_tieu} class="img-fluid" alt="" /></dd>
							<dd> - Vị trí phi tiêu tương ứng với số điểm người chơi nhận được như sau:</dd>
							<dd> <img src={khu_vuc_1} class="img-fluid" alt="" /></dd>
							<dd> <img src={khu_vuc_2} class="img-fluid" alt="" /></dd>
							<dd> <img src={khu_vuc_3} class="img-fluid" alt="" /></dd>
							<dd> <img src={vong_tron_ngoai} class="img-fluid" alt="" /></dd>
							<dd> <img src={vong_tron_trong} class="img-fluid" alt="" /></dd>
						</dl> 
						<h4 class="font-size-16 font-weight-bold">2. Săn quà</h4>
						<dl class="font-size-16">
							<dd>- Thời gian của phiên <strong>Săn quà</strong> diễn ra trong 1 ngày và giải thưởng của phiên đó được cập nhật liên tục tại <a href="#Modalgiaithuong" title="Giải thưởng" data-toggle="modal" data-dismiss="modal">Giải thưởng</a></dd>
							<dd>- Trong thời gian diễn ra Phiên săn quà, người chơi chọn Chế độ <strong>Săn quà</strong> tại Trang chủ để tham gia.</dd>
							<dd>- Mỗi tài khoản có số điểm mặc định ban đầu là <strong>501 điểm</strong>.</dd>
							<dd>- Người chơi sử dụng số Phi tiêu mình có để ném vào bảng, số điểm nhận được sau mỗi lần ném sẽ được trừ dần vào số điểm 501 ban đầu.</dd>
							<dd>- Trong thời gian quy định, tài khoản nào đưa được tổng điểm về 0 sớm nhất sẽ là người thắng cuộc và nhận được giải thưởng của phiên chơi đó, đồng thời phiên chơi sẽ kết thúc, tất cả các tài khoản còn lại sẽ được tiếp tục tham gia ở Phiên săn quà tiếp theo.</dd>
							<dd>- Trường hợp có nhiều tài khoản cùng đưa được điểm về 0 tại cùng thời điểm, giải thưởng sẽ được chia đều cho các tài khoản.</dd>
							<dd>- Trường hợp trong thời gian quy định, không có người chơi nào đưa được điểm về 0, người thắng cuộc là người có số điểm còn lại ít nhất.</dd>           
						</dl>
						<h4 class="font-size-16 font-weight-bold">3. Đua TOP</h4>
						<dl class="font-size-16">
							<dd>- Trong thời gian diễn ra Phiên Đua top, người chơi chọn Chế độ <strong>Đua top</strong> tại Trang chủ để tham gia.</dd>
							<dd>- Mỗi tài khoản có số điểm mặc định ban đầu là <strong>0 điểm</strong>.</dd>
							<dd>- Người chơi sử dụng số Phi tiêu mình có để ném vào bảng, số điểm nhận được sau mỗi lần ném sẽ được cộng dồn vào tổng điểm đang có.</dd>
							<dd>- Kết thúc Phiên Đua top, tài khoản có tổng điểm cao nhất sẽ là người thắng cuộc và nhận được giải thưởng.</dd>
							<dd>- Trường hợp nhiều người chơi có tổng điểm cao nhất bằng nhau, người thắng cuộc là người có số lượt ném Phi tiêu nhiều nhất.</dd>
							<dd>- Trường hợp nhiều người chơi có tổng điểm cao nhất bằng nhau và số lượt ném phi tiêu bằng nhau, giải thưởng được chia đều cho các tài khoản.</dd>         
						</dl>
						<h4 class="font-size-16 font-weight-bold">4. Hướng dẫn sử dụng giải thưởng</h4>
						<dl class="font-size-16">
							<dt>- Voucher Scoin:</dt>
							<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn giải thưởng <strong>Thẻ voucher Scoin</strong> và click <span class="text-primary">Mở</span>.</dd>
							<dd> <img src={voucher_scoin} class="img-fluid" alt="" /></dd>
							<dd> &bull; Copy mã Thẻ và số serial của thẻ:</dd>
							<dd> &bull; Truy cập <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , chọn Nạp game/Điền Tên tài khoản và server/ Chọn phương thức nạp Thẻ cào/ Chọn loại thẻ Scoin và điền mã Thẻ và số serial đã copy ở trên.</dd>
							<dd> <img src={nap_voucher_scoin} class="img-fluid" alt="" /></dd>
							<dd class="font-italic">* Lưu ý: Giải thưởng thẻ voucher có hiệu lực trong vòng 1 tháng kể từ thời điểm kết thúc sự kiện. Hết thời gian kể trên, giải thưởng không còn giá trị.</dd>
							<dt>- Voucher chuyển khoản ngân hàng:</dt>
							<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn giải thưởng <strong>Thẻ voucher chuyển khoản ngân hàng</strong> và click <span class="text-primary">Mở</span>.</dd>
							<dd> <img src={voucher_scoin} class="img-fluid" alt="" /></dd>
							<dd> &bull; Ấn <strong>“Nạp ngay”</strong></dd>
							<dd> &bull; Truy cập <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , chọn Phương thức nạp Ngân hàng</dd>
							<dd> <img src={nap_ngan_hang} class="img-fluid" alt="" /></dd>
							<dd> &bull; Copy <strong>Nội dung chuyển khoản</strong> và paste vào mục <strong>Nội dung</strong> khi bạn thực hiện chuyển khoản vào tài khoản VTC Mobile, số tiền trong voucher sẽ được cộng trực tiếp vào ví sau khi bạn chuyển khoản thành công.</dd>
							<dd> <img src={ck_ngan_hang} class="img-fluid" alt="" /></dd>
							<dd class="font-italic">* Lưu ý: Giải thưởng thẻ voucher có hiệu lực trong vòng 1 tháng kể từ thời điểm kết thúc sự kiện. Hết thời gian kể trên, giải thưởng không còn giá trị.</dd>
							<dt>- Topup 50k:</dt>
							<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn giải thưởng <strong>Topup Scoin</strong> và click <span class="text-primary">Mở</span>.</dd>
							<dd> <img src={topup_scoin} class="img-fluid" alt="" /></dd>
							<dd> &bull; Scoin được tự động cộng vào Ví Scoin của tài khoản </dd>
							<dt>- Thẻ Scoin:</dt>
							<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn <strong>giải thưởng Thẻ Scoin</strong> và click <span class="text-primary">Mở</span>.</dd>
							<dd> <img src={the_scoin} class="img-fluid" alt="" /></dd>
							<dd> &bull; Copy mã Thẻ và số serial của thẻ:</dd>
							<dd> &bull; Truy cập <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , chọn Nạp game/Điền Tên tài khoản và server/ Chọn phương thức nạp Thẻ cào/ Chọn loại thẻ Scoin và điền mã Thẻ và số serial đã copy ở trên.</dd>
							<dd> <img src={nap_voucher_scoin} class="img-fluid" alt="" /></dd>

						</dl> 
						
					</div>
					{/* <!--End Modal body --> */}
					</div>
				</div>			
			</div>


				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataSesions: state.lucky.dataSesions,
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
	getMoreSessions,
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
	getDartScore
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)
