import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import Ultilities from '../../../Ultilities/global'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'
import './css/style_web.css';
import {
	pickCard,
	getTuDo,
	getHistoryTuDo,
	getMoreSessions,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	gds,
	getItemAward,
	getRollup,
	getDonate,
	getInfoDonate,
	checkRollup,
	getListSanQua
} from '../../../modules/lucky'
import {
	getData
} from '../../../modules/profile'


import banner_thongbao_off from './images/banner-thongbao-off.png';
import icon_scoin from './images/icon-scoin.png';
import btn_xac_nhan from './images/btn-xac-nhan.png';
import icon_success from './images/icon-success.png';
import fb_a1 from './images/fb-a1.jpg';
import fb_a2 from './images/fb-a2.jpg';
import fb_a3_a4 from './images/fb-a3-a4.jpg';
import fb_a5 from './images/fb-a5.png';
import fb_i1 from './images/fb-i1.jpg';
import fb_i2 from './images/fb-i2.jpg';
import fb_i3_i4 from './images/fb-i3-i4.jpg';
import fb_i5 from './images/fb-i5.jpg';
import tab_appfb from './images/tab-appfb.png';
import tab_appfb_active from './images/tab-appfb-active.png';

import btn_dongy from './images/btn-dongy.png';
import banner_baotri from './images/banner-baotri.png';
import tab_cachthucthamgia_active from './images/tab-cachthucthamgia-active.png';
import tab_cachthucthamgia from './images/tab-cachthucthamgia.png';
import tab_hdsanqua_active from './images/tab-hdsanqua-active.png';
import tab_hdsanqua from './images/tab-hdsanqua.png';
import tab_hdduatop_active from './images/tab-hdduatop-active.png';
import tab_hdduatop from './images/tab-hdduatop.png';
import tab_hdsdgiaithuong_active from './images/tab-hdsdgiaithuong-active.png';
import tab_hdsdgiaithuong from './images/tab-hdsdgiaithuong.png';

import scoin_10k from './images/scoin-10k.png';
import voucher_scoin_banktranfer from './images/voucher-scoin-banktranfer.png';
import scoin_voucher_10k from './images/scoin-voucher-10k.png';
import che_do_duatop from './images/che-do-duatop.png';
import che_do_sanqua from './images/che-do-sanqua.png';
import tab_giaithuong from './images/tab-giaithuong.png';
import btn_sanqua_duatop from './images/btn-sanqua-duatop.png';
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
import btn_nap_scoin from './images/btn-nap-scoin.png';
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
			listSesstions:[],
			tab_1:true,
			tab_2:false,
			tab_3:false,
			tab_4:false,
			tab_5:false,
			content:'',
			rollup:true,
			message_rollup:'',
			dataInfoDonate:{},
			type_action:'',
			showRollup:false,
			listSanqua:[],
			message_sanqua_empty:''
		};
	}
	componentWillMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth});
		if(user!==null){
			if(user.Gifts>0){
				this.setState({content:	`Có <b>${user.Gifts}</b> món quà chưa mở`})
				setTimeout(()=>{
					$('.popover-visible-trigger').popover('hide').off('click'); 
				}, 10000);
				
			}
		}
	}



	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		// var update29=localStorage.getItem("update29");
		// if(update29===null){
		// 	$('#Modalbanner').modal('show');
		// }
		$('#Modalbanner').modal('show');

		// localStorage.setItem("update29", true);
		

		this.getVinhDanh(1,1);
		$('.popover-visible-trigger').popover('show').off('click'); 


		if (user !== null) {
			this.setState({isLogin:true, user:user})
		} 

		if (user !== null) {
			this.props.checkRollup(user.Token).then(()=>{
				var data=this.props.dataCheckRollup;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({showRollup: true})
					}else{
						this.setState({showRollup: false})
					}
				}
			})
		}else {
			this.setState({showRollup: true})
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
	}
	setScreenOrientation=()=>{
		const {innerWidth}=this.state;
		if(Math.abs(innerWidth - window.innerWidth) >100){
			window.location.reload();
			this.setState({innerWidth:window.innerWidth})
		}
	}


	showModalGiaiThuong=()=>{
		this.props.getMoreSessions().then(()=>{
			var data=this.props.dataSesions;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({listSesstions:data.Data}, ()=>{
						$('#Modalgiaithuong').modal('show');
					})
				}else if(data.Status===2){
					this.setState({message_error:data.Message}, ()=>{
						$('#myModal11').modal('show');
					})
				}else if(data.Status===3){
					this.logoutAction();
				}else{
					console.log("Lỗi")
				}
			}
		})
	}

	showModalChuyenTieu=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		document.getElementById("code").value="";
		document.getElementById("username").value="";
		document.getElementById("numberDart").value="";
		if (user !== null) {
			this.props.getInfoDonate(user.Token).then(()=>{
				var data=this.props.dataInfoDonate;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({dataInfoDonate:data.Data}, ()=>{
							$('#Modalchuyenphitieu').modal('show');
						})
					}
				}
			})
		}else {
			$('#Modaldangnhap').modal('show');
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

	getVinhDanh=(type, pageNumber)=>{
		const {limit}=this.state;
		var offsetVinhDanh=(pageNumber-1)*limit;
		this.setState({type:type, listVinhDanh:[], countVinhDanh:0}, ()=>{
			this.props.getVinhDanh(limit, offsetVinhDanh, type).then(()=>{
				var data=this.props.dataVinhDanh;
				if(data!==undefined){
					if(data.Status===0){
						var listVinhDanh=data.Data;
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
		axios.get(Ultilities.base_url() +'darts/user-signout/', header).then(function (response) {
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
		var hour = a.getHours() > 9 ? a.getHours() : `0${a.getHours()}`;
		var min = a.getMinutes() > 9 ? a.getMinutes() : `0${a.getMinutes()}`;
		var sec = a.getSeconds() > 9 ? a.getSeconds() : `0${a.getSeconds()}`;
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
					this.setState({listTuDo:data.Data, countTuDo:data.Totals, noti_tudo:false})
				}else if(data.Status===3){
					this.logoutAction();
				}else{
				
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'}, ()=>{
						$('#myModal11').modal('show');
					})
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
				}else if(data.Status===3){
					this.logoutAction();
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
					this.getDataTuDo(user)
					// this.setState({listHistory:data.Data, countHistory:data.Totals})
					if(data.Data.Type ==='BankTransferVoucher'){
						this.setState({dataItem:data.Data},()=>{
							$("#Modalmoquavoucher").modal('show');
						})
					}else{
						this.setState({dataItem:data.Data},()=>{
							$("#Modalmoqua").modal('show');
						})
					}
					
				}else if(data.Status===1){
					$('#myModal11').modal('show');
					this.setState({message_error:data.Message})
				}else if(data.Status===3){
					this.logoutAction();
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
		$('#Modalthele').modal('show');
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

	timeEnd=(time)=>{
		var start=time.substring(time.indexOf("(") +1,time.indexOf(")"));
		var a = new Date(+start);
		// var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var m=a.getMonth()+1
		var month =m > 9 ? m : `0${m}`;
		var date = a.getDate();
		var hour = a.getHours() > 9 ? a.getHours() : `0${a.getHours()}`;
		var min = a.getMinutes() > 9 ? a.getMinutes() : `0${a.getMinutes()}`;
		var sec = a.getSeconds() > 9 ? a.getSeconds() : `0${a.getSeconds()}`;
		var s = hour + ':' + min + ':' + sec + " ngày " + date + '/' + month + '/' + year ;
		return s;
	}


	numberWithCommas=(x)=> {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	tab1=()=>{
		this.setState({tab_1:true, tab_2:false, tab_3:false, tab_4:false, tab_5:false})
	}

	tab2=()=>{
		this.setState({tab_1:false, tab_2:true, tab_3:false, tab_4:false, tab_5:false})
	}

	tab3=()=>{
		this.setState({tab_1:false, tab_2:false, tab_3:true, tab_4:false, tab_5:false})
	}

	tab4=()=>{
		this.setState({tab_1:false, tab_2:false, tab_3:false, tab_4:true, tab_5:false})
	}

	tab5=()=>{
		this.setState({tab_1:false, tab_2:false, tab_3:false, tab_4:false, tab_5:true})
	}

	rollup=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRollup(user.Token).then(()=>{
				var data=this.props.dataRollup;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({rollup:true, message_rollup: data.Message, type_action:'Điểm danh', showRollup:false}, ()=>{
							$('#Modalddthanhcong').modal('show');
						})
					}else if(data.Status===1){
						this.setState({rollup:false, message_rollup: data.Message}, ()=>{
							$('#Modalddthanhcong').modal('show');
						})
					}
				}
			})
		}else {
			$('#Modaldangnhap').modal('show');
		}

	}

	comfirmDonate=()=>{
		var code=document.getElementById('code').value;
		var username=document.getElementById('username').value;
		var numberDart=document.getElementById('numberDart').value;

		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getDonate(user.Token, username, numberDart, code).then(()=>{
				var data=this.props.dataDonate;
				console.log(data)
				if(data!==undefined){
					if(data.Status===0){
						this.setState({rollup:true, message_rollup: data.Message, type_action:'Chuyển tiêu'}, ()=>{
							$('#Modalchuyenphitieu').modal('hide');
							$('#Modalddthanhcong').modal('show');
						})
					}else{
						this.setState({rollup:false, message_rollup: data.Message}, ()=>{
							$('#Modalchuyenphitieu').modal('hide');
							$('#Modalddthanhcong').modal('show');
						})
					}
				}
			})
		}else {
			$('#Modaldangnhap').modal('show');
		}
	}


	getListSanQua=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getListSanQua(user.Token).then(()=>{
				var data=this.props.dataSanqua;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({listSanqua:data.Data}, ()=>{
							$('#Modalchonroom').modal('show');
						})
					}else{
						this.setState({message_sanqua_empty:data.Message}, ()=>{
							$('#ModalListEmpty').modal('show');
						})
					}
				}
			})
		}else {
			$('#Modaldangnhap').modal('show');
		}
	}

	showGiaithuong=(data)=>{
		var n=data.length;
		var items=''
		for (let i = 0; i < n; i++) {
			if(i < n-1){
				items=data[i].Description + ' + ' +items
			}else{
				items=items + ' ' + data[i].Description
			}
			
		}
		return items;
	}

	playSanqua=(obj)=>{
		localStorage.setItem("obj", JSON.stringify(obj));
		window.location.replace('/sanqua')
	}

	render() {
		const {message_sanqua_empty, listSanqua, showRollup,type_action, dataInfoDonate, rollup, message_rollup, content, warning_tudo,tab_1, tab_2, tab_3, tab_4,tab_5, tab_tudo ,type,numberPage, isLogin,message_error,dataItem,listSesstions,
			waiting, activeTuDo, activeHistory, activeVinhDanh, limit, countTuDo, countHistory, countVinhDanh, listHistory, listTuDo, listVinhDanh, user}=this.state;
		return (<div>	
					<div class="container-fluid page position-relative">
						{/* <div id="tooltip" style={{width:400, height:40}}></div> */}
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
									{(user.VipLevel>0)?(<div>
										<a style={{cursor:'pointer'}} onClick={this.getListSanQua}><img src={btn_sanqua} width="200px" hspace="10" /></a>
									
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
										Người chịu trách nhiệm quản lý nội dung: Ông Nguyễn Viết Quang Minh <br></br>
										Tổng đài hỗ trợ 1900 1104
									</p>
								</div>
								{(showRollup)?(<div class="alert alert-info alert-diemdanh p-1 m-0">
									<span class="text-blink" style={{cursor:'pointer'}}><a onClick={this.rollup} title="Điểm danh" data-toggle="modal" >Điểm danh <strong>+ 5 phi tiêu</strong>.</a></span>
								</div>):(<div></div>)}
								
								<div class="menu-left">
									<a href="https://vip.scoin.vn/" title="Active VIP" target="_blank"><p class="mb-0 menu-link link-first"></p></a>
									<a title="Hướng dẫn chơi" onClick={this.showModalHuongDan} style={{cursor:'pointer'}}><p class="mb-0 menu-link"></p></a>
									<a title="Giải thưởng" onClick={this.showModalGiaiThuong} style={{cursor:'pointer'}}><p class="mb-0 menu-link"></p></a>
									<a onClick={this.showModalChuyenTieu} title="Tặng phi tiêu" style={{cursor:'pointer'}}><p class="mb-0 menu-link"></p></a>
								</div>
								<div class="menu-right popover-visible-trigger" data-toggle="popover" data-placement="top" data-content={content} data-html="true"><a  title="Tủ đồ" onClick={this.showModalTuDo} style={{cursor:'pointer'}}><img src={btn_tudo} width="100%" alt="" /></a></div>
									
								
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
			<div className="modal fade" id="myModal11" style={{zIndex:99999}}>
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
								<div class="row mx-0 mb-1 border-giaithuong-e position-relative d-flex justify-content-center" key={key}>
									<div class="col-12 text-center text-brown pt-1">
										<h2 class="font-size-16 font-weight-bold text-uppercase mb-0">{this.getTypeGiaiThuong(obj.SessionType)}</h2>
										{(obj.Status===0)?(<p class="font-size-16 mb-0">Còn: {this.timeModalGiaiThuowng(obj.StartTime)}</p>):(<div></div>)}
										{(obj.Status===1)?(<p class="font-size-16 mb-0 text-yellow text-blink"><span class="spinner-grow text-yellow" style={{width: ".8rem", height: ".8rem"}}></span> Đang diễn ra ... </p>):(<div></div>)}
										{(obj.Status===2)?( <p class="font-size-16 mb-0 text-danger">Đã kết thúc {this.timeEnd(obj.EndTime)}</p>):(<div></div>)}
										
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
				<div class="modal-dialog modal-dialog-md modal-tudo modal-dialog-scrollable">
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
														<td class="p-0 bg-border-right w-25 valign-middle">{obj.AwardName}</td>
                    									<td class="p-0 bg-border-right w-25 valign-middle">{obj.AwardDisplay}</td>
														<td className="p-0 bg-border-right w-25 valign-middle">{this.timeConverter(obj.RewardTime)}</td>
														{(obj.Status===1)?(<td class="p-1 w-auto valign-middle"><a class="text-primary"  style={{cursor:'pointer'}} onClick={()=>this.getItem(user, obj)}>Mở quà</a></td>):(<td class="p-1 w-auto valign-middle position-relative"><a class="text-primary"  style={{cursor:'pointer'}} onClick={()=>this.getItem(user, obj)}>Mở quà</a><span class="badge badge-pill badge-danger position-absolute noti-tudo">!</span></td>)}
														
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
														<td class="p-1 bg-border-right valign-middle">{obj.AwardName}</td>
                    									<td class="p-1 bg-border-right valign-middle">{obj.AwardDisplay}</td>
														<td class="p-1  valign-middle">{this.timeConverter(obj.RewardTime)}</td>
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
				<div class="modal-dialog modal-huongdan modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body order-0 py-0 mt-4 mb-5 px-4 ml-2 scroll-modal-body">
						<ul class="nav nav-pills justify-content-around">
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab1}><img id="image-5" src={tab_1 ? tab_cachthucthamgia_active : tab_cachthucthamgia} width="120"  alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab2}><img id="image-6" src={tab_2 ? tab_hdsanqua_active : tab_hdsanqua} width="120" alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab3}><img id="image-7" src={tab_3 ? tab_hdduatop_active : tab_hdduatop} width="120" alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab4}><img id="image-8" src={tab_4 ? tab_hdsdgiaithuong_active : tab_hdsdgiaithuong} width="120" alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab5}><img id="image-8" src={tab_5 ? tab_appfb_active : tab_appfb} width="120" alt="" /></a>
							</li>
						</ul>
						
						{/* <!-- Tab panes --> */}
						<div class="tab-content">
							{/* <!-- Tab hd1 --> */}
						<div class={tab_1 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd1">
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
								<dd> - Sau khi nhận được Phi tiêu, khách hàng chọn chế độ <strong>SĂN QUÀ</strong> hoặc <strong>ĐUA TOP</strong> để chơi.</dd>
								<dd> <img src={btn_sanqua_duatop} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> -Khách hàng sử dụng chuột (chơi trên PC) hoặc vuốt màn hình (chơi trên điện thoại) để ném phi tiêu vào bảng</dd>
								<dd> <img src={nem_phi_tieu} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> <img src={huy_nem_tieu} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> - Người chơi nhận được số <strong>ĐIỂM</strong> tương ứng với <strong>VỊ TRÍ</strong> phi tiêu tại bảng như sau: (khu vực tô vàng)</dd>
								<dd> <img src={khu_vuc_1} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> <img src={khu_vuc_2} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> <img src={khu_vuc_3} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> <img src={vong_tron_ngoai} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> <img src={vong_tron_trong} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
							</dl>          
						</div>
						{/* <!-- End Tab hd1 -->
						<!-- Begin Tab hd2 --> */}
						<div class={tab_2 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd2">
							<h4 class="font-size-16 font-weight-bold">2. Săn quà</h4>
							<dl class="font-size-16">
								<dd>- Mỗi ngày sẽ có nhiều Phiên <strong>SĂN QUÀ</strong> được diễn ra, người chơi click Tab <strong>GIẢI THƯỞNG</strong> để xem thời gian diễn ra phiên tiếp theo và giải thưởng của phiên đó.</dd>
								<dd> <img src={tab_giaithuong} class="img-fluid d-block mx-auto" alt="" /></dd>                 
								<dd>- Trong thời gian diễn ra Phiên săn quà, người chơi chọn Chế độ <strong>SĂN QUÀ</strong> tại Trang chủ để tham gia:</dd>
								<dd> <img src={che_do_sanqua} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>  
								<dd>- Tại mỗi Phiên Săn quà, số điểm mặc định ban đầu của mỗi người chơi được quy định cụ thể (Ví dụ: 501/5010/…)</dd>
                				<dd>- Người chơi sử dụng số Phi tiêu mình có để ném vào bảng, điểm nhận được sau mỗi lần ném sẽ được TRỪ dần vào tổng điểm ban đầu.</dd>
								<dd>- Trong thời gian quy định, người chơi nào đưa được tổng điểm <strong>VỀ 0 SỚM NHẤT</strong> sẽ là người <strong>THẮNG</strong> cuộc và nhận được giải thưởng của phiên Săn quà, đồng thời phiên chơi đó kết thúc.</dd>
								<dd>- Trường hợp không có người chơi nào đưa được điểm về 0, giải thưởng sẽ được bảo lưu và cộng dồn vào Phiên chơi tiếp theo.</dd>
								{/* <dd>- Trường hợp có nhiều tài khoản cùng đưa được điểm về 0 (hoặc cùng có số điểm ít nhất bằng nhau), người thắng cuộc là người đưa được điểm về 0 (hoặc điểm về số thấp nhất) trong thời gian sớm nhất.</dd> */}
								<dd><em>- Lưu ý: Trường hợp phát sinh tranh chấp, khiếu nại liên quan đến chương trình, Công ty VTC Mobile sẽ trực tiếp giải quyết và quyết định của VTC Mobile là kết quả cuối cùng. Mọi trường hợp gian lận hoặc không trung thực sẽ bị xử lý theo pháp luật.</em></dd>
								<dd><em>- Đối với khách hàng chơi trên điện thoại Iphone: để trải nghiệm game được tốt nhất, hãy tắt các trang đang mở trên trình duyệt safari/chrome trước khi chơi.</em></dd>         
							</dl>	
						</div>
						{/* <!-- End Tab hd2 -->
						<!-- Begin Tab hd3 --> */}
						<div class={tab_3 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd3">
							<h4 class="font-size-16 font-weight-bold">3. Đua TOP</h4>
							<dl class="font-size-16">
								<dd>- Trong thời gian diễn ra Phiên Đua top, người chơi chọn Chế độ <strong>Đua TOP</strong> tại Trang chủ để tham gia: </dd>
								<dd> <img src={che_do_duatop} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>  
								<dd>- Mỗi tài khoản có số điểm mặc định ban đầu là <strong>0 điểm</strong>.</dd>
								<dd>- Người chơi sử dụng số Phi tiêu mình có để ném vào bảng, số điểm nhận được sau mỗi lần ném sẽ được <strong>CỘNG</strong> dồn vào tổng điểm đang có.</dd>
								<dd>- Kết thúc Phiên Đua top, tài khoản có tổng điểm <strong>CAO</strong> nhất sẽ là người <strong>THẮNG</strong> cuộc và nhận được giải thưởng.</dd>
								<dd>- Trường hợp nhiều người chơi có tổng điểm cao nhất bằng nhau, người thắng cuộc là người đạt được số điểm cao nhất trong thời gian sớm nhất.</dd>
								<dd><em>- Lưu ý: Trong trường hợp phát sinh tranh chấp, khiếu nại liên quan đến chương trình, Công ty VTC Mobile sẽ trực tiếp giải quyết và quyết định của VTC Mobile là kết quả cuối cùng. Mọi trường hợp gian lận hoặc không trung thực sẽ bị xử lý theo pháp luật.</em></dd>       
								<dd><em>- Đối với khách hàng chơi trên điện thoại Iphone: để trải nghiệm game được tốt nhất, hãy tắt các trang đang mở trên trình duyệt safari/chrome trước khi chơi.</em></dd>   
							</dl>
						</div>
						{/* <!-- End Tab hd3 -->
						<!-- Begin Tab hd4 --> */}
						<div class={tab_4 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd4">
							<h4 class="font-size-16 font-weight-bold">4. Hướng dẫn sử dụng giải thưởng</h4>
							<dl class="font-size-16">
								<dt>- Voucher Scoin:</dt>
								<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn giải thưởng <strong>Thẻ Scoin voucher</strong> và click <span class="text-primary">Mở</span>.</dd>
								<dd> <img src={voucher_scoin} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Copy <strong>MÃ CODE</strong> và số <strong>SERIAL</strong>: </dd>
								<dd> <img src={scoin_voucher_10k} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Truy cập <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , chọn NẠP GAME =&gt; Điền Tên tài khoản và server =&gt; Chọn phương thức nạp Thẻ cào =&gt; Chọn loại thẻ Scoin =&gt; Điền MÃ CODE và số SERIAL đã copy ở trên.</dd>
								<dd> <img src={nap_voucher_scoin} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd class="font-italic mark">* Lưu ý: Giải thưởng thẻ voucher có hiệu lực trong vòng 1 tháng kể từ thời điểm kết thúc sự kiện. Hết thời gian kể trên, giải thưởng không còn giá trị.</dd>
								<dt>- Voucher chuyển khoản ngân hàng:</dt>
								<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn giải thưởng <strong>Thẻ voucher chuyển khoản ngân hàng</strong> và click <span class="text-primary">Mở</span>.</dd>
								<dd> <img src={voucher_scoin_banktranfer} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Ấn <strong>“Nạp ngay”</strong></dd>
								<dd> &bull; Truy cập <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , chọn Phương thức nạp Ngân hàng</dd>
								<dd> <img src={nap_ngan_hang} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Copy <strong>Nội dung chuyển khoản</strong> và paste vào mục <strong>Nội dung</strong> khi bạn thực hiện chuyển khoản vào tài khoản VTC Mobile, số tiền trong voucher sẽ được cộng trực tiếp vào Ví sau khi bạn chuyển khoản thành công.</dd>
								<dd> <img src={ck_ngan_hang} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd class="font-italic mark">* Lưu ý: Giải thưởng thẻ voucher có hiệu lực trong vòng 1 tháng kể từ thời điểm kết thúc sự kiện. Hết thời gian kể trên, giải thưởng không còn giá trị.</dd>
								<dt>- Topup 50k:</dt>
								<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn giải thưởng <strong>Topup Scoin</strong> và click <span class="text-primary">Mở</span>.</dd>
								<dd> <img src={topup_scoin} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Scoin được tự động cộng vào Ví Scoin của tài khoản </dd>
								<dt>- Thẻ Scoin:</dt>
								<dd> &bull; Khách hàng truy cập <strong>Tủ đồ</strong>, chọn <strong>Phần thưởng</strong>, chọn <strong>giải thưởng Thẻ Scoin</strong> và click <span class="text-primary">Mở</span>.</dd>
								<dd> <img src={the_scoin} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Copy <strong>MÃ CODE</strong> và <strong>SERIAL</strong>: </dd>
								<dd> <img src={scoin_10k} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd> &bull; Truy cập <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , chọn Nạp game/Điền Tên tài khoản và server/ Chọn phương thức nạp Thẻ cào/ Chọn loại thẻ Scoin và điền mã Thẻ và số serial đã copy ở trên.</dd>
								<dd> <img src={nap_voucher_scoin} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>
					
							</dl> 
						</div>

						{/* <!-- Begin Tab hd5 --> */}
						<div class={tab_5 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd5">
							<h4 class="font-size-16 font-weight-bold">5. Hướng dẫn mở link game Phi tiêu từ Facebook của điện thoại</h4>
							<dl class="font-size-16">
								<dd>- Để trải nghiệm game được tốt nhất, Khách hàng lưu ý sử dụng trình duyệt <strong>SAFARI</strong> (đối với điện thoại Iphone) hoặc <strong>CHROME</strong> (đối với điện thoại Android) để mở link game <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> </dd>
								<dd> Với những khách hàng mở link <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> từ Facebook của điện thoại, hãy thực hiện theo hướng dẫn dưới đây.</dd>
								<dt>1.	Đối với điện thoại Iphone: </dt>
								<dd><strong>Bước 1</strong>: Ấn vào đường link <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> từ bài viết tại fanpage Scoin (hoặc bài viết bất kỳ trên Facebook)</dd>
								<dd> <img src={fb_i1} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd><strong>Bước 2:</strong> Ấn vào dấu ba chấm tại góc phải</dd>
								<dd> <img src={fb_i2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd><strong>Bước 3</strong>: Chọn <strong>MỞ TRONG TRÌNH DUYỆT</strong> hoặc <strong>OPEN IN SAFARI</strong> , link game sẽ được mở bằng trình duyệt SAFARI của Iphone</dd>
								<dd> <img src={fb_i3_i4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd><strong>Bước 4</strong>: Mở khóa tự động xoay màn hình và trải nghiệm game</dd>
								<dd> <img src={fb_i5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dt>2. Đối với điện thoại Android: </dt>
								<dd><strong>Bước 1:</strong> Ấn vào đường link  <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> từ bài viết tại fanpage Scoin (hoặc bài viết bất kỳ trên Facebook)</dd>
								<dd> <img src={fb_a1} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd><strong>Bước 2</strong>: Ấn vào dấu ba chấm tại góc phải</dd>
								<dd> <img src={fb_a2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd><strong>Bước 3</strong>: Chọn <strong>MỞ TRONG TRÌNH DUYỆT</strong> hoặc <strong>OPEN IN BROWSER</strong>, link game sẽ được mở bằng trình duyệt mặc định của điện thoại</dd>
								<dd> <img src={fb_a3_a4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								<dd><strong>Bước 4</strong>: Mở khóa tự động xoay màn hình và trải nghiệm game</dd>
								<dd> <img src={fb_a5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
								
							</dl> 
						</div>
						{/* <!-- End Tab hd4 --> */}
						</div>
						
					</div>
					{/* <!--End Modal body --> */}
					</div>
				</div>			
			</div>

			{/* <!-- The Modal Mở quà--> */}
			<div class="modal fade" id="Modalmoqua">
				<div class="modal-dialog modal-moqua">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<div class="mx-auto mt-4 font-size-16" style={{width: "90%"}}>
							{(dataItem.Type==='TopupScoin')?(<p style={{textAlign:'center', fontSize:20, color:'green'}}>{dataItem.Message}</p>):(<div></div>)}
							{(dataItem.Type==='Darts')?(<p style={{textAlign:'center', fontSize:20, color:'green'}}>{dataItem.Message}</p>):(<div></div>)}
							{(dataItem.Type==='ScoinCard')?(<div class="card-body text-center">
								<p class="card-text mb-4 h6 font-weight-bold text-shadow">Thẻ Scoin mệnh giá: <br /> {dataItem.Amount ? this.numberWithCommas(dataItem.Amount) : 0} vnđ</p>
								<table class="table table-borderless">
									<tbody>
									<tr class="border-bottom">
										<td class="p-1">Mã code:</td>
										<td class="p-1">{dataItem.Code}</td>
									</tr>
									<tr class="border-bottom">
										<td class="p-1">Serial:</td>
										<td class="p-1">{dataItem.Serial}</td>
									</tr>
									</tbody>
								</table>
								<p class="card-text text-secondary">Hạn sử dụng: {dataItem.Expires}</p>
								<p class="card-text"></p>
							</div>):(<div></div>)}

							{(dataItem.Type==='ScoinVoucher')?(<div class="card-body text-center">
								<p class="card-text mb-4 h6 font-weight-bold text-shadow">Thẻ ScoinVoucher mệnh giá: <br /> {dataItem.Amount ? this.numberWithCommas(dataItem.Amount) : 0} vnđ</p>
								<table class="table table-borderless">
									<tbody>
									<tr class="border-bottom">
										<td class="p-1">Mã code:</td>
										<td class="p-1">{dataItem.Code}</td>
									</tr>
									<tr class="border-bottom">
										<td class="p-1">Serial:</td>
										<td class="p-1">{dataItem.Serial}</td>
									</tr>
									</tbody>
								</table>
								<p class="card-text text-secondary">Ngày bắt đầu: {dataItem.StartDate} <br />Ngày kết thúc: {dataItem.EndDate}</p>
								<p class="card-text"></p>
							</div>):(<div></div>)}
						</div>
					</div>

					</div>
				</div>
			</div>


			{/* <!-- The Modal Mở quà Voucher--> */}
			<div class="modal fade" id="Modalmoquavoucher">
				<div class="modal-dialog modal-moqua">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<div class="mx-auto mt-2 font-size-16" style={{width: "90%"}}>
							<div class="card-body text-center">
								<p class="card-text mb-4 font-size-18 font-weight-bold text-shadow">Tài khoản <span class="text-dark">{dataItem.AccountName}</span> nhận được thẻ Scoin Voucher 20K khi nạp Scoin qua Chuyển khoản Ngân hàng. </p>
								<table class="table table-borderless">
									<tbody>
									<tr class="border-bottom">
										<td class="p-1 font-size-18">Bạn hãy nạp Scoin để nhận khuyến mại nhé!</td>
									</tr>
									<tr class="border-bottom">
										<td class="p-1 text-secondary">Hạn sử dụng: {dataItem.ExpiredDate}</td>

									</tr>
									</tbody>
								</table>
								<p class="text-center"><a href="https://scoin.vn/nap-tien#9" title="Nạp Scoin" target="_blank"><img src={btn_nap_scoin} width="100" hspace="10" alt="" /></a></p>
							</div>
						</div>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal banner bảo trì--> */}
			<div class="modal fade" id="Modalbanner">
				<div class="modal-dialog">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 m-0" style={{zIndex:99999}}>
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0 p-0 mt-n4">
						<img src={banner_thongbao_off} width="100%" alt="" />
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo thay đổi thể lệ--> */}
			<div class="modal fade" id="Modalthele">
				<div class="modal-dialog modal-dangnhap">
					<div class="modal-content bg-transparent border-0">
					{/* <!-- Modal Header --> */}
					<div class="modal-header border-0 p-0 m-0" style={{zIndex:99999}}>
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					{/* <!-- Modal body --> */}
					<div class="modal-body border-0 mt-n4">
						<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">Điều chỉnh thể lệ Săn quà kể từ 8h 8/8/2021</h2>
						<p class="font-size-16 mb-0 text-center">-  Người chơi chiến thắng <strong>PHẢI</strong> là người đưa tổng điểm <strong>VỀ 0 SỚM NHẤT</strong>.</p>
						<p class="font-size-16 mb-0 text-center">-  Nếu không có người chơi nào đưa được điểm về 0, giải thưởng được bảo lưu và cộng dồn vào Phiên chơi tiếp theo.</p>
						<p class="text-center"><a href="/sanqua" title="Đồng ý vào Săn Quà"><img class="mt-2" src={btn_dongy} width="120" alt="Săn Quà" /></a></p>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Điểm danh thành công--> */}
			<div class="modal fade" id="Modalddthanhcong">
				<div class="modal-dialog modal-sm">
					<div class="modal-content border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0 pt-0 text-center">
						{(rollup)?(<p class="text-info font-size-18 mb-2"><img src={icon_success} width="24" class="" alt="" /> {type_action} thành công</p>):(
							<p class="text-info font-size-18 mb-2">Thông Báo</p>
						)}
						
						<p class="text-red font-size-18">{message_rollup}</p>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Chuyển phi tiêu--> */}
			<div class="modal fade" id="Modalchuyenphitieu">
				<div class="modal-dialog modal-tangtieu">
					<div class="modal-content bg-transparent border-0">

					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body border-0 font-size-14">
						<form class="p-2">
							<div class="form-group mb-1">
								<label class="mb-1 font-weight-bold">TÀI KHOẢN: {dataInfoDonate.Username}</label>
								<button type="button" class="btn btn-block mb-1 py-1 btn-number-phitieu">{dataInfoDonate.Darts} phi tiêu</button>
								<input id="username" type="text" class="form-control form-control-sm mb-1 font-size-14" placeholder="Tên tài khoản người nhận" height="40px"></input>
								<input id="numberDart" type="number" class="form-control form-control-sm mb-1 font-size-14" placeholder="Số phi tiêu" height="40px"></input>
								<p class="font-italic mb-2">(Số phi tiêu tối đa có thể chuyển: <strong>{dataInfoDonate.Darts} phi tiêu</strong>)</p>
							</div>

							<div class="form-row">
								<div class="col">
								<input id="code" type="text" class="form-control form-control-sm font-size-14" placeholder="Mã xác nhận" name="c" height="40px"></input>
								</div>
								<div class="col pt-1">
								<span class="mark font-italic">{dataInfoDonate.ConfirmCode}</span>
								</div>
							</div>

							<a title="Xác nhận" ><img src={btn_xac_nhan} width="100" class="d-block mx-auto mt-2" alt=""  onClick={this.comfirmDonate} style={{cursor:'pointer'}}/></a>
						</form> 
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Chon Room--> */}
			<div class="modal fade" id="Modalchonroom">
				<div class="modal-dialog modal-chonroom modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

						<div class="modal-header border-0 p-0">
							<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body border-0 py-0 mt-4 mb-5 px-4 ml-2 scroll-modal-body">
							{listSanqua.map((obj, key) => (
												
								<a class="text-decoration-none" title="Chơi ngay" key={key} onClick={()=>this.playSanqua(obj)} style={{cursor:"pointer"}}>    	
									<div class="mx-0 mb-1 session-chonroom d-flex position-relative">
										<div class="scr-c font-size-14 text-uppercase text-warning-50">
											<img src={icon_scoin} width="32" alt="" /> <span class="pl-1">Tổng điểm: {obj.PointRule}</span>
										</div>
										<div class="scr-status-open font-size-14">
											<p class="pt-5px pl-2 text-white">Đang diễn ra</p>
										</div>
										<div class="scr-info font-size-14 text-white">
											<p class="font-italic mb-0 pb-1">Bắt đầu: {this.timeEnd(obj.StartTime)}</p>
											<p class="text-uppercase mb-0">Giải thưởng: {this.showGiaithuong(obj.Awards)}</p>
										</div>
										<div class="scr-playnow font-size-14 text-uppercase text-warning">
											Chơi Ngay
										</div>
									</div>
								</a>
							))}			
							
						</div>
					</div>
				</div>
			</div>


			{/* <!-- The Modal Điểm danh thành công--> */}
			<div class="modal fade" id="ModalListEmpty">
				<div class="modal-dialog modal-sm">
					<div class="modal-content border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0 pt-0 text-center">
						<p class="text-info font-size-18 mb-2">Thông Báo</p>
						
						<div class="text-red font-size-18" dangerouslySetInnerHTML={{__html: 'Hiện không có phiên Săn Quà.</br> Bạn vào mục Trang Chủ -> Giải Thưởng để xem thông tin phiên kế tiếp nhé!'}}></div>
					</div>

					</div>
				</div>
			</div>


				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataSanqua: state.lucky.dataSanqua,
	dataCheckRollup: state.lucky.dataCheckRollup,
	dataRollup: state.lucky.dataRollup,
	dataInfoDonate: state.lucky.dataInfoDonate,
	dataDonate: state.lucky.dataDonate,
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
	getMoreSessions,
	pickCard,
	getInfoUser,
	getItemAward,
	getHistoryTuDo,
	getData,
	getTuDo,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	userLogout,
	gds,
	getRollup,
	getDonate,
	getInfoDonate,
	checkRollup,
	getListSanQua
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)
