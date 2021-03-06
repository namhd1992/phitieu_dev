import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import Ultilities from '../../../Ultilities/global'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'
import './css/style.css';
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
} from '../../../modules/profile';


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
import btn_nap_scoin from './images/btn-nap-scoin.png';
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
		this.onResize();
		var user = JSON.parse(localStorage.getItem("user"));
		window.addEventListener("resize", this.setScreenOrientation);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth})
		if(user!==null){
			if(user.Gifts>0){
				this.setState({content:	`C?? <b>${user.Gifts}</b> m??n qu?? ch??a m???`})
				setTimeout(()=>{
					$('.popover-visible-trigger').popover('hide').off('click'); 
				}, 10000);
				
			}
		}
	}



	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		$('.popover-visible-trigger').popover('show').off('click'); 
		// var update29=localStorage.getItem("update29");
		// if(update29===null){
		// 	$('#Modalbanner').modal('show');
		// }
		// localStorage.setItem("update29", true);
		$('#Modalbanner').modal('show');
		
		this.getVinhDanh(1,1);


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

		// var isfb=this.isFacebookApp();
		// if (isfb) {
		// 	$('#Modalfbview').modal('show');
		// }else{
		// 	$('#Modalbanner').modal('show');
		// }

		
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


	isFacebookApp=()=> {
		var ua = navigator.userAgent || navigator.vendor || window.opera;
		return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
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
					console.log("L???i")
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
						this.setState({message_error:'Kh??ng l???y ???????c d??? li???u b???ng vinh danh.'})
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
				console.log("Tr??nh duy???t kh??ng h??? tr??? localStorage");
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

	// showModalGiaiThuong=()=>{
	// 	this.getMoreSessions();
	// 	$('#Modalgiaithuong').modal('show');
	// }

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
					this.setState({message_error:'Ch??a t???i ???????c d??? li???u. Vui l??ng th??? l???i'}, ()=>{
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
					this.setState({message_error:'Ch??a t???i ???????c d??? li???u. Vui l??ng th??? l???i'})
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
					this.setState({message_error:data.Message}, ()=>{
						$('#myModal11').modal('show');
					})
				}else if(data.Status===3){
					this.logoutAction();
				}else{
					this.setState({message_error:'Ch??a t???i ???????c d??? li???u. Vui l??ng th??? l???i'}, ()=>{
						$('#myModal11').modal('show');
					})
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
			return "Gi???i th?????ng s??n qu??"
		}else if(type===2){
			return "Gi???i th?????ng ??ua top"
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
		var s = hour + ':' + min + ':' + sec + " ng??y " + date + '/' + month + '/' + year ;
		return s;
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
						this.setState({rollup:true, message_rollup: data.Message, type_action:'??i???m danh', showRollup:false}, ()=>{
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
						this.setState({rollup:true, message_rollup: data.Message, type_action:'Chuy???n ti??u'}, ()=>{
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
		const {message_sanqua_empty, listSanqua,showRollup, type_action, dataInfoDonate, rollup, message_rollup, content,tab_1, tab_2, tab_3, tab_4,tab_5,tab_tudo ,type,numberPage, isLogin,message_error,dataItem,listSesstions,
			waiting, activeTuDo, activeHistory, activeVinhDanh, limit, countTuDo, countHistory, countVinhDanh, listHistory, listTuDo, listVinhDanh, user}=this.state;
		const { classes } = this.props;
		return (<div>
					<div class="container page_m position-relative">

						{(isLogin)?(<div class="d-flex flex-row-reverse">
							<div class="align-self-center">
								<a title="????ng nh???p" onClick={this.logoutAction} style={{cursor:'pointer'}}><img src={btn_dangxuat} alt="" width="100" /></a>
							</div>
							<div class="text-center align-self-center pr-1">
								<p class="font-size-16 text-white mb-0">{user.Username}</p>
								{(user.VipLevel===1)?(<h2 class="font-size-14 text-warning m-0">VIP ?????ng <img src={vip_dong} alt="VIP ?????ng" width="16" /></h2>):(<div></div>)}
								{(user.VipLevel===2)?(<h2 class="font-size-14 text-warning m-0">VIP B???c <img src={vip_bac} alt="VIP B???c" width="16" /></h2>):(<div></div>)}
								{(user.VipLevel===3)?(<h2 class="font-size-14 text-warning m-0">VIP V??ng <img src={vip_vang} alt="VIP V??ng" width="16" /></h2>):(<div></div>)}
								{(user.VipLevel===4)?(<h2 class="font-size-14 text-warning m-0">VIP B???ch kim <img src={vip_bachkim} alt="VIP B???ch kim" width="16" /></h2>):(<div></div>)}
							</div>
						</div>):(<div class="d-flex flex-row-reverse">
							<div class="align-self-center">
								<a title="????ng nh???p" onClick={this.loginAction} style={{cursor:'pointer'}}><img src={btn_dangnhap} alt="" width="100" /></a>
							</div>
						</div>)}


						<div class="bg-top_m position-relative">
							<div class="bg-bottom_m">

								{(isLogin)?(<div class="btn-s_m position-relative">
									{(user.VipLevel>0)?(<div>
										<a style={{cursor:'pointer'}} onClick={this.getListSanQua}><img src={btn_sanqua} width="30%" hspace="10" /></a>

										<a href="/duatop" style={{cursor:'pointer'}}><img src={btn_duatop} width="30%" hspace="10" /></a>
									</div>):(<div><a title="S??n qu??" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_sanqua} width="30%" hspace="10" /></a>
               							<a title="??ua TOP" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_duatop} width="30%" hspace="10" /></a></div>)}
									
								</div>):(
								<div class="btn-s_m position-relative">
									 	<a title="S??n qu??" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_sanqua} width="30%" hspace="10" /></a>
               							<a title="??ua TOP" style={{cursor:'pointer'}} onClick={this.dangNhap}><img src={btn_duatop} width="30%" hspace="10" /></a>
								</div>
								)}


								<div class="bxh_m position-relative">
									<ul class="nav nav-pills_m nav-justified" role="tablist">
										<li class="nav-item">
											<a class="nav-link_m btn-vinhdanh_m p-0" onClick={()=>this.getVinhDanh(1,1)}><img src={type===1?btn_vinhdanhsanqua_active:btn_vinhdanhsanqua} width="95%" hspace="5" id="image-1" /></a>
										</li>
										<li class="nav-item">
											<a class="nav-link_m btn-bxhduatop_m p-0" onClick={()=>this.getVinhDanh(2,1)}><img src={type==2?btn_bxhduatop_active:btn_bxhduatop} width="95%" hspace="5" id="image-2" /></a>
										</li>
									</ul>
									
									<div class="tab-content bg-bxh_m">
										<div id="home" class="tab-pane active pt-3vw_m pb-3">
											<table class="table table-borderless text-center font-size-3vw_m mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "150%"}}>
												<thead>
												<tr class="bg-border-bottom_m">
													<th class="p-1 bg-border-right_m w-33">T??i kho???n</th>
													<th class="p-1 bg-border-right_m w-33">Gi???i th?????ng</th>
													<th class="p-1 w-33">Th???i gian tr??ng</th>
												</tr>
												</thead>
												<tbody>
													{listVinhDanh.map((obj, key) => (
														<tr key={key} class="bg-border-bottom_m">
															<td className="p-0 bg-border-right_m w-33">{obj.Username}</td>
															<td class="p-0 bg-border-right_m w-33" onMouseOver={this.showTooltip} ><span data-toggle="tooltip" data-placement="bottom" title={obj.AwardName}>{obj.AwardName}</span></td>
															<td className="p-0 w-33 w-33">{this.timeConverter(obj.RewardTime)}</td>
														</tr>
													))}
												</tbody>
											</table>
											<div className="pagination justify-content-center pag-custom_m font-size-3vw_m" >
												<Pagination
													activePage={activeVinhDanh}
													itemsCountPerPage={10}
													totalItemsCount={countVinhDanh}
													pageRangeDisplayed={numberPage}
													lastPageText={'Trang cu???i'}
													firstPageText={'Trang ?????u'}
													itemClass={"page-item_m"}
													linkClass={"page-link_m"}
													onChange={(v) => this.handlePageChangeVinhDanh(type,v)}
												/>
											</div> 
										</div>             
									</div>
								</div>
								<div class="btn-h_m position-relative">
									<a href="https://daily.scoin.vn/huong-dan-mua-the/" title="H?????ng d???n mua th??? scoin" target="_blank"><img src={btn_huongdanmuathescoin} width="40%" hspace="10" /></a>
									<a href="https://www.facebook.com/scoinvtcmobile" title="Nh???n th??ng b??o s??? ki???n" target="_blank"><img src={btn_nhanthongbaosukien} width="40%" hspace="10" /></a>
								</div>
								<div class="btn-h_m position-relative mt-2">
									<a href="https://scoin.vn/nap-game" title="N???p game" target="_blank"><img src={btn_napgame} width="20%" hspace="11%" /></a>
									<a href="Tel:19001104" title="Hot line"><img src={img_hotline} width="40%" hspace="10" /></a>
								</div>
								<div class="btn-h_m position-relative mt-2">
									<a href="https://scoin.vn/" title="Scoin" target="_blank"><img src={logo_scoin} width="20%" hspace="10" /></a>
									<a href="https://vip.scoin.vn" title="Scoin VIP" target="_blank"><img src={logo_scoinvip} width="20%" hspace="10" /></a>
									<a title="Splay"><img src={logo_splay} width="20%" hspace="10" /></a>
								</div>
								<div class="btn-h_m position-relative mt-2 pb-2 font-size-3vw_m text-white-50">
									<p class="text-center">
										H??? th???ng ph??t h??nh game VTC Mobile
										<br></br>
										Copyright &copy;2021 VTC Mobile. All rights reserved
									</p>
									<p class="text-center mb-0 pb-1">
										C??ng ty C??? Ph???n VTC D???ch V??? Di ?????ng <br></br>
										T???ng 11, T??a nh?? VTC Online, s??? 18 Tam Trinh, Hai B?? Tr??ng, H?? N???i <br></br>
										S??T : (84-4).39877470 | Email : vtcmobile@vtc.vn <br></br>
										Ng?????i ch???u tr??ch nhi???m qu???n l?? n???i dung: ??ng Nguy???n Vi???t Quang Minh <br></br>
										T???ng ????i h??? tr??? 1900 1104
									</p>
								</div>
								{(showRollup) ? (<div class="alert alert-info alert-diemdanh_m p-1 m-0">
									<span class="text-blink"><a title="??i???m danh" data-toggle="modal" onClick={this.rollup}>??i???m danh <strong>+ 5 phi ti??u</strong>.</a></span>
								</div>):(<div></div>)}
								
								<div class="menu-left_m">
									<a href="https://vip.scoin.vn" title="Active VIP" target="_blank"><p class="mb-0 menu-link_m link-first_m"></p></a>
									<a title="H?????ng d???n ch??i" onClick={this.showModalHuongDan} style={{cursor:'pointer'}}><p class="mb-0 menu-link_m"></p></a>
									<a title="Gi???i th?????ng" onClick={this.showModalGiaiThuong} style={{cursor:'pointer'}}><p class="mb-0 menu-link_m"></p></a>
									<a title="Chuy???n phi ti??u" onClick={this.showModalChuyenTieu}><p class="mb-0 menu-link_m"></p></a>
								</div>
								<div class="menu-right_m popover-visible-trigger" data-toggle="popover" data-placement="top" data-content={content} data-html="true"><a title="T??? ?????" data-toggle="modal" onClick={this.showModalTuDo}><img src={btn_tudo} width="100%" alt="" /></a></div>
								
							</div>
						</div>
					
					</div>


			{/* <!-- The Modal Th??ng b??o ????ng nh???p--> */}
			<div className="modal fade" id="Modaldangnhap">
				<div class="modal-dialog modal-dangnhap_m">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<h2 class="font-size-3vw_m font-weight-bold text-uppercase text-center">B???n v???n ch??a ????ng nh???p</h2>
						<p class="text-center"><a title="????ng nh???p" onClick={this.loginAction}><img src={btn_dangnhap} width="30%" alt="" /></a></p>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Th??ng b??o active Vip--> */}
			<div className="modal fade" id="activeVip">
				<div class="modal-dialog modal-dangnhap_m">
					<div class="modal-content bg-transparent border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0">
						<h2 class="font-size-3vw_m font-weight-bold text-uppercase text-center">B???n c???n active t??i kho???n VIP ????? ch??i.</h2>
						<p class="text-center"><a href="https://vip.scoin.vn" target="_blank"><img src={btn_activevip} width="120" alt="Active VIP" /></a></p>
					</div>

					</div>
				</div>
			</div>

						{/* <!-- The Modal Th??ng b??o l???i--> */}
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


			{/* <!-- The Modal Giai thuong--> */}
			<div class="modal fade" id="Modalgiaithuong">
				<div class="modal-dialog modal-giaithuong_m modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

						<div class="modal-header border-0 p-0">
							<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body border-0 py-0 my-2 px-3 scroll-modal-body_m">
							{listSesstions.map((obj, key) => (      	
								<div class="row mx-0 mb-1 border-giaithuong-e_m position-relative d-flex justify-content-center " key={key}>
									<div class="col-12 text-center text-brown pt-1">
										<h2 class="font-size-3vw_m font-weight-bold text-uppercase mb-0">{this.getTypeGiaiThuong(obj.SessionType)}</h2>
										{(obj.Status===0)?(<p class="font-size-3vw_m">C??n: {this.timeModalGiaiThuowng(obj.StartTime)}</p>):(<div></div>)}
										{(obj.Status===1)?(<p class="font-size-3vw_m mb-0 text-yellow text-blink"><span class="spinner-grow text-yellow" style={{width: ".8rem", height: ".8rem"}}></span> ??ang di???n ra ... </p>):(<div></div>)}
										{(obj.Status===2)?( <p class="font-size-3vw_m text-danger">???? k???t th??c {this.timeEnd(obj.EndTime)}</p>):(<div></div>)}
									</div>

									{obj.Awards.map((v, j) => (
										<div class="col-4 text-center" key={j}>
											<p class="m-0"><img src={this.getImgItem(v.Name)} alt="" width="60%" /></p>
											<p class="font-size-3vw_m text-phanthuong_m text-yellow">{v.Description}</p>
										</div>
									))}

									{(obj.Status===2)?(<img class="img-dacochu_m" src={img_dacochu} alt="" width="40%" />):(<div></div>)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>


			{/* <!-- The Modal Tu do--> */}
			<div class="modal fade" id="Modaltudo">
				<div class="modal-dialog modal-tudo_m  modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">
						<div class="modal-header border-0 p-0 text-dark">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>

						<div class="modal-body border-0 py-0 mb-0 mt-2 px-3 scroll-modal-body_m">
							<ul class="nav nav-pills_m nav-justified mx-auto">
								<li class="nav-item">
									<a class="nav-link_m py-0" onClick={()=>this.getDataTuDo(user)}><img src={tab_tudo ? btn_phanthuong_active: btn_phanthuong} width="60%" hspace="5" id="image-3" /></a>
								</li>
								<li class="nav-item">
									<a class="nav-link_m py-0" onClick={()=>this.getHistory(user)}><img src={tab_tudo ? btn_lichsu : btn_lichsu_active} width="60%" hspace="5" id="image-4" /></a>
								</li>
							</ul>   
							<div class="tab-content">
								<div class="tab-pane active">
									{(tab_tudo)?(<div><table class="table table-borderless text-center font-size-14 mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "170%"}}>
										<thead>
										<tr class="bg-border-bottom_m">
											<th class="p-1 bg-border-right w-25 valign-middle">Ph???n th?????ng</th>
											<th class="p-1 bg-border-right w-25 valign-middle">N???i dung</th>
											<th class="p-1 bg-border-right w-25 valign-middle">Th???i gian tr??ng</th>
											<th class="p-1 w-25 valign-middle">M??? qu??</th>
										</tr>
										</thead>
										<tbody>
											{listTuDo.map((obj, key) => (
												
													<tr key={key} class="bg-border-bottom_m">
														<td class="p-0 bg-border-right w-25 valign-middle text-tudo_m">{obj.AwardName}</td>
                    									<td class="p-0 bg-border-right w-25 valign-middle text-tudo_m">{obj.AwardDisplay}</td>
														<td className="p-0 bg-border-right w-25 valign-middle text-tudo_m">{this.timeConverter(obj.RewardTime)}</td>
														{(obj.Status===1)?(<td class="p-1 w-auto valign-middle"><a class="text-primary"  style={{cursor:'pointer'}} onClick={()=>this.getItem(user, obj)}>M??? qu??</a></td>):(<td class="p-1 w-auto valign-middle position-relative"><a class="text-primary"  style={{cursor:'pointer'}} onClick={()=>this.getItem(user, obj)}>M??? qu??</a><span class="badge badge-pill badge-danger position-absolute noti-tudo_m">!</span></td>)}
														
													</tr>
												))}				
										</tbody>
									</table>
									<div className="pagination justify-content-center mt-1 pag-custom_m font-size-3vw_m">
									<Pagination
										activePage={activeTuDo}
										itemsCountPerPage={limit}
										totalItemsCount={countTuDo}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cu???i'}
										firstPageText={'Trang ?????u'}
										itemClass={"page-item_m"}
										linkClass={"page-link_m"}
										onChange={(v) => this.handlePageChangeTuDo(v)}
									/>
								</div> 
								</div>):(<div><table class="table table-borderless text-center font-size-14 mb-0" style={{tableLayout: "fixed", borderCollapse: "collapse;", lineHeight: "170%"}}>
										<thead>
										<tr class="bg-border-bottom_m">
											<th class="p-1 bg-border-right w-33 valign-middle">Ph???n th?????ng</th>
											<th class="p-1 bg-border-right w-33 valign-middle">N???i dung</th>
											<th class="p-1 bg-border-right w-33 valign-middle">Th???i gian tr??ng</th>
										</tr>
										</thead>
										<tbody>
											{listHistory.map((obj, key) => (
												
													<tr key={key} class="bg-border-bottom_m">
														<td class="p-0 bg-border-right valign-middle text-tudo_m">{obj.AwardName}</td>
                    									<td class="p-0 bg-border-right valign-middle text-tudo_m">{obj.AwardDisplay}</td>
														<td className="p-0 valign-middle text-tudo_m">{this.timeConverter(obj.RewardTime)}</td>
													</tr>
												))}				
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom_m font-size-3vw_m">
									<Pagination
										activePage={activeHistory}
										itemsCountPerPage={limit}
										totalItemsCount={countHistory}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cu???i'}
										firstPageText={'Trang ?????u'}
										itemClass={"page-item_m"}
										linkClass={"page-link_m"}
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
				<div class="modal-dialog modal-huongdan_m modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body border-0 py-0 mb-2 mt-3 px-3 scroll-modal-body_m">
						<ul class="nav nav-pills justify-content-around">
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab1}><img id="image-5" src={tab_1 ? tab_cachthucthamgia_active : tab_cachthucthamgia} width="130"  alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab2}><img id="image-6" src={tab_2 ? tab_hdsanqua_active : tab_hdsanqua} width="130" alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab3}><img id="image-7" src={tab_3 ? tab_hdduatop_active : tab_hdduatop} width="130" alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab4}><img id="image-8" src={tab_4 ? tab_hdsdgiaithuong_active : tab_hdsdgiaithuong} width="130" alt="" /></a>
							</li>
							<li class="nav-item">
								<a class="nav-link p-1" onClick={this.tab5}><img id="image-8" src={tab_5 ? tab_appfb_active : tab_appfb} width="130" alt="" /></a>
							</li>
						</ul>
							
							{/* <!-- Tab panes --> */}
							<div class="tab-content">
								{/* <!-- Tab hd1 --> */}
							<div class={tab_1 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd1">
								<h4 class="font-size-3vw_m font-weight-bold">1. C??ch th???c tham gia</h4>
								<dl class="font-size-3vw_m">
									<dt>- ?????i t?????ng tham gia:</dt>
									<dd> &bull; To??n b??? kh??ch h??ng ???? active t??i kho???n kh??ch h??ng VIP.</dd>
									<dd> &bull; N???u ch??a l?? kh??ch h??ng VIP, b???n vui l??ng th???c hi???n active v?? tr??? th??nh VIP <a class="text-primary" href="https://vip.scoin.vn/" title="Active VIP" target="_blank">t???i ????y</a></dd>
									<dt>- C??ch th???c tham gia:</dt>
									<dd> &bull; Trong th???i gian di???n ra s??? ki???n, v???i m???i l???n n???p ingame/n???p v?? scoin b???ng th??? scoin v?? chuy???n kho???n ng??n h??ng th??nh c??ng, t??i kho???n s??? nh???n ???????c phi ti??u ????? tham gia game, s??? phi ti??u ???????c quy ?????nh nh?? sau: </dd>
									<dd> 
										<table class="table table-bordered table-hover mx-auto" style={{width: "90%"}}>
											<thead>
											<tr>
												<th class="p-1">S??? ti???n n???p th??? Scoin</th>
												<th class="p-1">S??? phi ti??u nh???n</th>
						
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
												<th class="p-1">S??? ti???n n???p chuy???n kho???n ng??n h??ng </th>
												<th class="p-1">S??? phi ti??u nh???n</th>
						
											</tr>
											</thead>
											<tbody>
											<tr>
												<td class="p-1">&lt; 10k</td>
												<td class="p-1">0</td>
											</tr>
											<tr>
												<td class="p-1">10k &lt; n???p &lt; 50k</td>
												<td class="p-1">3</td>
											</tr>
											<tr>
												<td class="p-1">50k &lt; n???p &lt; 100k</td>
												<td class="p-1">8</td>
											</tr>
											<tr>
												<td class="p-1">100k &lt; n???p &lt; 500k</td>
												<td class="p-1">35</td>
											</tr>
											<tr>
												<td class="p-1">500k &lt; n???p &lt; 1000k</td>
												<td class="p-1">60</td>
											</tr>
											<tr>
												<td class="p-1">1000k &lt; n???p &lt; 2000k</td>
												<td class="p-1">120</td>
											</tr>
											<tr>
												<td class="p-1">2000k &lt; n???p &lt; 5000k</td>
												<td class="p-1">250</td>
											</tr>                      
											</tbody>
										</table>
									</dd>            
									<dd> - Sau khi nh???n ???????c Phi ti??u, kh??ch h??ng ch???n ch??? ????? <strong>S??N QU??</strong> ho???c <strong>??UA TOP</strong> ????? ch??i.</dd>
									<dd> <img src={btn_sanqua_duatop} class="img-fluid" alt="" /></dd>
									<dd> -Kh??ch h??ng s??? d???ng chu???t (ch??i tr??n PC) ho???c vu???t m??n h??nh (ch??i tr??n ??i???n tho???i) ????? n??m phi ti??u v??o b???ng</dd>
									<dd> <img src={nem_phi_tieu} class="img-fluid" alt="" /></dd>
									<dd> <img src={huy_nem_tieu} class="img-fluid" alt="" /></dd>
									<dd> - Ng?????i ch??i nh???n ???????c s??? <strong>??I???M</strong> t????ng ???ng v???i <strong>V??? TR??</strong> phi ti??u t???i b???ng nh?? sau: (khu v???c t?? v??ng)</dd>
									<dd> <img src={khu_vuc_1} class="img-fluid" alt="" /></dd>
									<dd> <img src={khu_vuc_2} class="img-fluid" alt="" /></dd>
									<dd> <img src={khu_vuc_3} class="img-fluid" alt="" /></dd>
									<dd> <img src={vong_tron_ngoai} class="img-fluid" alt="" /></dd>
									<dd> <img src={vong_tron_trong} class="img-fluid" alt="" /></dd>
								</dl>          
							</div>
							{/* <!-- End Tab hd1 -->
							<!-- Begin Tab hd2 --> */}
							<div class={tab_2 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd2">
								<h4 class="font-size-3vw_m font-weight-bold">2. S??n qu??</h4>
								<dl class="font-size-3vw_m">
									<dd>- M???i ng??y s??? c?? nhi???u Phi??n <strong>S??N QU??</strong> ???????c di???n ra, ng?????i ch??i click Tab <strong>GI???I TH?????NG</strong> ????? xem th???i gian di???n ra phi??n ti???p theo v?? gi???i th?????ng c???a phi??n ????.</dd>
									<dd> <img src={tab_giaithuong} class="img-fluid d-block mx-auto" alt="" /></dd>                 
									<dd>- Trong th???i gian di???n ra Phi??n s??n qu??, ng?????i ch??i ch???n Ch??? ????? <strong>S??N QU??</strong> t???i Trang ch??? ????? tham gia:</dd>
									<dd> <img src={che_do_sanqua} width="350" class="img-fluid d-block mx-auto" alt="" /></dd>  
									<dd>- T???i m???i Phi??n S??n qu??, s??? ??i???m m???c ?????nh ban ?????u c???a m???i ng?????i ch??i ???????c quy ?????nh c??? th??? (V?? d???: 501/5010/???)</dd>
               						<dd>- Ng?????i ch??i s??? d???ng s??? Phi ti??u m??nh c?? ????? n??m v??o b???ng, ??i???m nh???n ???????c sau m???i l???n n??m s??? ???????c TR??? d???n v??o t???ng ??i???m ban ?????u.</dd>
									<dd>- Trong th???i gian quy ?????nh, ng?????i ch??i n??o ????a ???????c t???ng ??i???m <strong>V??? 0 S???M NH???T</strong> s??? l?? ng?????i <strong>TH???NG</strong> cu???c v?? nh???n ???????c gi???i th?????ng c???a phi??n S??n qu??, ?????ng th???i phi??n ch??i ???? k???t th??c.</dd>
									<dd>- Tr?????ng h???p kh??ng c?? ng?????i ch??i n??o ????a ???????c ??i???m v??? 0, gi???i th?????ng s??? ???????c b???o l??u v?? c???ng d???n v??o Phi??n ch??i ti???p theo.</dd>
									{/* <dd>- Tr?????ng h???p c?? nhi???u t??i kho???n c??ng ????a ???????c ??i???m v??? 0 (ho???c c??ng c?? s??? ??i???m ??t nh???t b???ng nhau), ng?????i th???ng cu???c l?? ng?????i ????a ???????c ??i???m v??? 0 (ho???c ??i???m v??? s??? th???p nh???t) trong th???i gian s???m nh???t.</dd> */}
									<dd><em>- L??u ??: Tr?????ng h???p ph??t sinh tranh ch???p, khi???u n???i li??n quan ?????n ch????ng tr??nh, C??ng ty VTC Mobile s??? tr???c ti???p gi???i quy???t v?? quy???t ?????nh c???a VTC Mobile l?? k???t qu??? cu???i c??ng. M???i tr?????ng h???p gian l???n ho???c kh??ng trung th???c s??? b??? x??? l?? theo ph??p lu???t.</em></dd>
									<dd><em>- ?????i v???i kh??ch h??ng ch??i tr??n ??i???n tho???i Iphone: ????? tr???i nghi???m game ???????c t???t nh???t, h??y t???t c??c trang ??ang m??? tr??n tr??nh duy???t safari/chrome tr?????c khi ch??i.</em></dd>           
								</dl>	
							</div>
							{/* <!-- End Tab hd2 -->
							<!-- Begin Tab hd3 --> */}
							<div class={tab_3 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd3">
								<h4 class="font-size-3vw_m font-weight-bold">3. ??ua TOP</h4>
								<dl class="font-size-3vw_m">
									<dd>- Trong th???i gian di???n ra Phi??n ??ua top, ng?????i ch??i ch???n Ch??? ????? <strong>??ua TOP</strong> t???i Trang ch??? ????? tham gia: </dd>
									<dd> <img src={che_do_duatop} class="img-fluid" alt="" /></dd>  
									<dd>- M???i t??i kho???n c?? s??? ??i???m m???c ?????nh ban ?????u l?? <strong>0 ??i???m</strong>.</dd>
									<dd>- Ng?????i ch??i s??? d???ng s??? Phi ti??u m??nh c?? ????? n??m v??o b???ng, s??? ??i???m nh???n ???????c sau m???i l???n n??m s??? ???????c <strong>C???NG</strong> d???n v??o t???ng ??i???m ??ang c??.</dd>
									<dd>- K???t th??c Phi??n ??ua top, t??i kho???n c?? t???ng ??i???m <strong>CAO</strong> nh???t s??? l?? ng?????i <strong>TH???NG</strong> cu???c v?? nh???n ???????c gi???i th?????ng.</dd>
									<dd>- Tr?????ng h???p nhi???u ng?????i ch??i c?? t???ng ??i???m cao nh???t b???ng nhau, ng?????i th???ng cu???c l?? ng?????i ?????t ???????c s??? ??i???m cao nh???t trong th???i gian s???m nh???t.</dd>
									<dd><em>- L??u ??: Trong tr?????ng h???p ph??t sinh tranh ch???p, khi???u n???i li??n quan ?????n ch????ng tr??nh, C??ng ty VTC Mobile s??? tr???c ti???p gi???i quy???t v?? quy???t ?????nh c???a VTC Mobile l?? k???t qu??? cu???i c??ng. M???i tr?????ng h???p gian l???n ho???c kh??ng trung th???c s??? b??? x??? l?? theo ph??p lu???t.</em></dd>       
									<dd><em>- ?????i v???i kh??ch h??ng ch??i tr??n ??i???n tho???i Iphone: ????? tr???i nghi???m game ???????c t???t nh???t, h??y t???t c??c trang ??ang m??? tr??n tr??nh duy???t safari/chrome tr?????c khi ch??i.</em></dd>   
								</dl>
							</div>
							{/* <!-- End Tab hd3 -->
							<!-- Begin Tab hd4 --> */}
							<div class={tab_4 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd4">
								<h4 class="font-size-3vw_m font-weight-bold">4. H?????ng d???n s??? d???ng gi???i th?????ng</h4>
								<dl class="font-size-3vw_m">
									<dt>- Voucher Scoin:</dt>
									<dd> &bull; Kh??ch h??ng truy c???p <strong>T??? ?????</strong>, ch???n <strong>Ph???n th?????ng</strong>, ch???n gi???i th?????ng <strong>Th??? Scoin voucher</strong> v?? click <span class="text-primary">M???</span>.</dd>
									<dd> <img src={voucher_scoin} class="img-fluid" alt="" /></dd>
									<dd> &bull; Copy <strong>M?? CODE</strong> v?? s??? <strong>SERIAL</strong>: </dd>
									<dd> <img src={scoin_voucher_10k} class="img-fluid" alt="" /></dd>
									<dd> &bull; Truy c???p <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , ch???n N???P GAME =&gt; ??i???n T??n t??i kho???n v?? server =&gt; Ch???n ph????ng th???c n???p Th??? c??o =&gt; Ch???n lo???i th??? Scoin =&gt; ??i???n M?? CODE v?? s??? SERIAL ???? copy ??? tr??n.</dd>
									<dd> <img src={nap_voucher_scoin} class="img-fluid" alt="" /></dd>
									<dd class="font-italic mark">* L??u ??: Gi???i th?????ng th??? voucher c?? hi???u l???c trong v??ng 1 th??ng k??? t??? th???i ??i???m k???t th??c s??? ki???n. H???t th???i gian k??? tr??n, gi???i th?????ng kh??ng c??n gi?? tr???.</dd>
									<dt>- Voucher chuy???n kho???n ng??n h??ng:</dt>
									<dd> &bull; Kh??ch h??ng truy c???p <strong>T??? ?????</strong>, ch???n <strong>Ph???n th?????ng</strong>, ch???n gi???i th?????ng <strong>Th??? voucher chuy???n kho???n ng??n h??ng</strong> v?? click <span class="text-primary">M???</span>.</dd>
									<dd> <img src={voucher_scoin_banktranfer} class="img-fluid" alt="" /></dd>
									<dd> &bull; ???n <strong>???N???p ngay???</strong></dd>
									<dd> &bull; Truy c???p <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , ch???n Ph????ng th???c n???p Ng??n h??ng</dd>
									<dd> <img src={nap_ngan_hang} class="img-fluid" alt="" /></dd>
									<dd> &bull; Copy <strong>N???i dung chuy???n kho???n</strong> v?? paste v??o m???c <strong>N???i dung</strong> khi b???n th???c hi???n chuy???n kho???n v??o t??i kho???n VTC Mobile, s??? ti???n trong voucher s??? ???????c c???ng tr???c ti???p v??o V?? sau khi b???n chuy???n kho???n th??nh c??ng.</dd>
									<dd> <img src={ck_ngan_hang} class="img-fluid" alt="" /></dd>
									<dd class="font-italic mark">* L??u ??: Gi???i th?????ng th??? voucher c?? hi???u l???c trong v??ng 1 th??ng k??? t??? th???i ??i???m k???t th??c s??? ki???n. H???t th???i gian k??? tr??n, gi???i th?????ng kh??ng c??n gi?? tr???.</dd>
									<dt>- Topup 50k:</dt>
									<dd> &bull; Kh??ch h??ng truy c???p <strong>T??? ?????</strong>, ch???n <strong>Ph???n th?????ng</strong>, ch???n gi???i th?????ng <strong>Topup Scoin</strong> v?? click <span class="text-primary">M???</span>.</dd>
									<dd> <img src={topup_scoin} class="img-fluid" alt="" /></dd>
									<dd> &bull; Scoin ???????c t??? ?????ng c???ng v??o V?? Scoin c???a t??i kho???n </dd>
									<dt>- Th??? Scoin:</dt>
									<dd> &bull; Kh??ch h??ng truy c???p <strong>T??? ?????</strong>, ch???n <strong>Ph???n th?????ng</strong>, ch???n <strong>gi???i th?????ng Th??? Scoin</strong> v?? click <span class="text-primary">M???</span>.</dd>
									<dd> <img src={the_scoin} class="img-fluid" alt="" /></dd>
									<dd> &bull; Copy <strong>M?? CODE</strong> v?? <strong>SERIAL</strong>: </dd>
									<dd> <img src={scoin_10k} class="img-fluid" alt="" /></dd>
									<dd> &bull; Truy c???p <a href="https://scoin.vn/" title="Scoin.vn" target="_blank">https://scoin.vn/</a> , ch???n N???p game/??i???n T??n t??i kho???n v?? server/ Ch???n ph????ng th???c n???p Th??? c??o/ Ch???n lo???i th??? Scoin v?? ??i???n m?? Th??? v?? s??? serial ???? copy ??? tr??n.</dd>
									<dd> <img src={nap_voucher_scoin} class="img-fluid" alt="" /></dd>
						
								</dl> 
							</div>
							{/* <!-- Begin Tab hd5 --> */}
							<div class={tab_5 ? "tab-pane container mt-3 active" : "tab-pane container mt-3 fade"} id="hd5">
								<h4 class="font-size-3vw_m font-weight-bold">5. H?????ng d???n m??? link game Phi ti??u t??? Facebook c???a ??i???n tho???i</h4>
								<dl class="font-size-3vw_m">
									<dd>- ????? tr???i nghi???m game ???????c t???t nh???t, Kh??ch h??ng l??u ?? s??? d???ng tr??nh duy???t <strong>SAFARI</strong> (?????i v???i ??i???n tho???i Iphone) ho???c <strong>CHROME</strong> (?????i v???i ??i???n tho???i Android) ????? m??? link game <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> </dd>
									<dd> V???i nh???ng kh??ch h??ng m??? link <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> t??? Facebook c???a ??i???n tho???i, h??y th???c hi???n theo h?????ng d???n d?????i ????y.</dd>
									<dt>1.	?????i v???i ??i???n tho???i Iphone: </dt>
									<dd><strong>B?????c 1</strong>: ???n v??o ???????ng link <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> t??? b??i vi???t t???i fanpage Scoin (ho???c b??i vi???t b???t k??? tr??n Facebook)</dd>
									<dd> <img src={fb_i1} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 2:</strong> ???n v??o d???u ba ch???m t???i g??c ph???i</dd>
									<dd> <img src={fb_i2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 3</strong>: Ch???n <strong>M??? TRONG TR??NH DUY???T</strong> ho???c <strong>OPEN IN SAFARI</strong> , link game s??? ???????c m??? b???ng tr??nh duy???t SAFARI c???a Iphone</dd>
									<dd> <img src={fb_i3_i4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 4</strong>: M??? kh??a t??? ?????ng xoay m??n h??nh v?? tr???i nghi???m game</dd>
									<dd> <img src={fb_i5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dt>2. ?????i v???i ??i???n tho???i Android: </dt>
									<dd><strong>B?????c 1:</strong> ???n v??o ???????ng link  <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a> t??? b??i vi???t t???i fanpage Scoin (ho???c b??i vi???t b???t k??? tr??n Facebook)</dd>
									<dd> <img src={fb_a1}  width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 2</strong>: ???n v??o d???u ba ch???m t???i g??c ph???i</dd>
									<dd> <img src={fb_a2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 3</strong>: Ch???n <strong>M??? TRONG TR??NH DUY???T</strong> ho???c <strong>OPEN IN BROWSER</strong>, link game s??? ???????c m??? b???ng tr??nh duy???t m???c ?????nh c???a ??i???n tho???i</dd>
									<dd> <img src={fb_a3_a4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 4</strong>: M??? kh??a t??? ?????ng xoay m??n h??nh v?? tr???i nghi???m game</dd>
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

			{/* <!-- The Modal M??? qu??--> */}
			<div class="modal fade" id="Modalmoqua">
				<div class="modal-dialog modal-moqua_m">
					<div class="modal-content bg-transparent border-0">

					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					

					<div class="modal-body border-0">
						<div class="mx-auto font-size-14" style={{width: "90%"}}>
						{(dataItem.Type==='TopupScoin')?(<p style={{textAlign:'center', fontSize:20, color:'green'}}>{dataItem.Message}</p>):(<div></div>)}
							{(dataItem.Type==='Darts')?(<p style={{textAlign:'center', fontSize:20, color:'green'}}>{dataItem.Message}</p>):(<div></div>)}
							{(dataItem.Type==='ScoinCard')?(<div class="card-body p-0 text-center">
								<p class="card-text mb-3 font-size-18 font-weight-bold text-shadow">Th??? Scoin m???nh gi??: <br /> {dataItem.Amount ? this.numberWithCommas(dataItem.Amount) : 0} vn??</p>
								<table class="table table-borderless">
									<tbody>
									<tr class="border-bottom">
										<td class="p-1">M?? code:</td>
										<td class="p-1">{dataItem.Code}</td>
									</tr>
									<tr class="border-bottom">
										<td class="p-1">Serial:</td>
										<td class="p-1">{dataItem.Serial}</td>
									</tr>
									</tbody>
								</table>
								<p class="card-text text-secondary">H???n s??? d???ng: {dataItem.Expires}</p>
								<p class="card-text"></p>
							</div>):(<div></div>)}

							{(dataItem.Type==='ScoinVoucher')?(<div class="card-body p-0 text-center">
								<p class="card-text mb-3 font-size-18 font-weight-bold text-shadow">Th??? ScoinVoucher m???nh gi??: <br /> {dataItem.Amount ? this.numberWithCommas(dataItem.Amount) : 0} vn??</p>
								<table class="table table-borderless">
									<tbody>
									<tr class="border-bottom">
										<td class="p-1">M?? code:</td>
										<td class="p-1">{dataItem.Code}</td>
									</tr>
									<tr class="border-bottom">
										<td class="p-1">Serial:</td>
										<td class="p-1">{dataItem.Serial}</td>
									</tr>
									</tbody>
								</table>
								<p class="card-text text-secondary">Ng??y b???t ?????u: {dataItem.StartDate} <br />Ng??y k???t th??c: {dataItem.EndDate}</p>
								<p class="card-text"></p>
							</div>):(<div></div>)}
							
						</div>
					</div>

					</div>
				</div>
			</div>


			{/* <!-- The Modal M??? qu?? Voucher--> */}
			<div class="modal fade" id="Modalmoquavoucher">
				<div class="modal-dialog modal-moqua_m">
					<div class="modal-content bg-transparent border-0">

					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					

					<div class="modal-body border-0">
						<div class="mx-auto font-size-14" style={{width: "90%"}}>
							<div class="card-body p-0 text-center">
								<p class="card-text mb-3 font-size-14 font-weight-bold text-shadow">T??i kho???n <span class="text-dark">{dataItem.AccountName}</span> nh???n ???????c th??? Scoin Voucher 20K khi n???p Scoin qua Chuy???n kho???n Ng??n h??ng. </p>
								<table class="table table-borderless mb-2">
									<tbody>
									<tr class="border-bottom">
										<td class="p-1 font-size-14">B???n h??y n???p Scoin ????? nh???n khuy???n m???i nh??!</td>
									</tr>
									<tr class="border-bottom">
										<td class="p-1 text-secondary">H???n s??? d???ng: {dataItem.ExpiredDate}</td>

									</tr>
									</tbody>
								</table>
								<p class="text-center"><a href="https://scoin.vn/nap-tien#9" title="N???p Scoin" target="_blank"><img src={btn_nap_scoin} width="80" hspace="10" alt="" /></a></p>
							</div>
						</div>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal banner b???o tr??--> */}
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

			{/* <!-- The Modal Th??ng b??o thay ?????i th??? l???--> */}
			<div class="modal fade" id="Modalthele">
				<div class="modal-dialog modal-dangnhap_m">
					<div class="modal-content bg-transparent border-0">
					{/* <!-- Modal Header --> */}
					<div class="modal-header border-0 p-0 m-0" style={{zIndex: 99999}}>
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>
					{/* <!-- Modal body --> */}
					<div class="modal-body border-0 mt-n4">
						<h2 class="font-size-3vw_m pt-4 font-weight-bold text-uppercase text-center">??i???u ch???nh th??? l??? S??n qu?? k??? t??? 8h 8/8/2021</h2>
						<p class="font-size-3vw_m mb-0 text-center">-  Ng?????i ch??i chi???n th???ng <strong>PH???I</strong> l?? ng?????i ????a t???ng ??i???m <strong>V??? 0 S???M NH???T</strong>.</p>
						<p class="font-size-3vw_m mb-0 text-center">-  N???u kh??ng c?? ng?????i ch??i n??o ????a ???????c ??i???m v??? 0, gi???i th?????ng ???????c b???o l??u v?? c???ng d???n v??o Phi??n ch??i ti???p theo.</p>
						<p class="text-center"><a href="/sanqua" title="?????ng ?? v??o S??n Qu??"><img class="mt-2" src={btn_dongy} width="25%" alt="S??n Qu??" /></a></p>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Huong Dan m??? phi ti??u t??? fb view--> */}
			<div class="modal fade" id="Modalfbview">
				<div class="modal-dialog modal-huongdan_m modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

						<div class="modal-header border-0 p-0">
							<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body border-0 py-0 mb-2 mt-2 px-3 scroll-modal-body_m">
							<div class="container mt-2">
								<h4 class="font-size-3vw_m font-weight-bold">H?????ng d???n m??? link game Phi ti??u t??? Facebook c???a ??i???n tho???i</h4>
								<dl class="font-size-3vw_m">                
									<dd> Kh??ch h??ng l??u ?? s??? d???ng tr??nh duy???t <strong>SAFARI</strong> (?????i v???i ??i???n tho???i Iphone) ho???c <strong>CHROME</strong> (?????i v???i ??i???n tho???i Android) ????? m??? link game <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a></dd>
									<dt>1.	?????i v???i ??i???n tho???i Iphone: </dt>                
									<dd><strong>B?????c 1:</strong> ???n v??o d???u ba ch???m t???i g??c ph???i</dd>
									<dd> <img src={fb_i2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 2</strong>: Ch???n <strong>M??? TRONG TR??NH DUY???T</strong> ho???c <strong>OPEN IN SAFARI</strong> , link game s??? ???????c m??? b???ng tr??nh duy???t SAFARI c???a Iphone</dd>
									<dd> <img src={fb_i3_i4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 3</strong>: M??? kh??a t??? ?????ng xoay m??n h??nh v?? tr???i nghi???m game</dd>
									<dd> <img src={fb_i5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dt>2. ?????i v???i ??i???n tho???i Android: </dt>                
									<dd><strong>B?????c 1</strong>: ???n v??o d???u ba ch???m t???i g??c ph???i</dd>
									<dd> <img src={fb_a2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 2</strong>: Ch???n <strong>M??? TRONG TR??NH DUY???T</strong> ho???c <strong>OPEN IN BROWSER</strong>, link game s??? ???????c m??? b???ng tr??nh duy???t m???c ?????nh c???a ??i???n tho???i</dd>
									<dd> <img src={fb_a3_a4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									<dd><strong>B?????c 3</strong>: M??? kh??a t??? ?????ng xoay m??n h??nh v?? tr???i nghi???m game</dd>
									<dd> <img src={fb_a5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
									
								</dl> 
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Chuy???n phi ti??u--> */}
			<div class="modal fade" id="Modalchuyenphitieu">
				<div class="modal-dialog modal-tangtieu_m">
					<div class="modal-content bg-transparent border-0">


					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>


					<div class="modal-body border-0 font-size-14">
						<form class="p-2">
							<div class="form-group mb-1">
								<label class="mb-1 font-weight-bold">T??I KHO???N: {dataInfoDonate.Username}</label>
								<button type="button" class="btn btn-block mb-1 py-1 btn-number-phitieu">{dataInfoDonate.Darts} phi ti??u</button>
								<input id="username" type="text" class="form-control form-control-sm mb-1 font-size-14" placeholder="T??n t??i kho???n ng?????i nh???n" height="40px"></input>
								<input id="numberDart" type="text" class="form-control form-control-sm mb-1 font-size-14" placeholder="S??? phi ti??u" height="40px"></input>
								<p class="font-italic mb-2">(S??? phi ti??u t???i ??a c?? th??? chuy???n: <strong>{dataInfoDonate.Darts} phi ti??u</strong>)</p>
							</div>

							<div class="form-row">
								<div class="col">
								<input id="code" type="text" class="form-control form-control-sm font-size-14" placeholder="M?? x??c nh???n" name="c" height="40px"></input>
								</div>
								<div class="col pt-1">
								<span class="mark font-italic">{dataInfoDonate.ConfirmCode}</span>
								</div>
							</div>

							<a title="X??c nh???n" data-toggle="modal"><img src={btn_xac_nhan} width="100" class="d-block mx-auto mt-2" alt="" onClick={this.comfirmDonate} /></a>
						</form> 
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal ??i???m danh th??nh c??ng--> */}
			<div class="modal fade" id="Modalddthanhcong">
				<div class="modal-dialog modal-sm">
					<div class="modal-content border-0">

					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body border-0 pt-0 text-center">
						{(rollup)?(<p class="text-info font-size-18 mb-2"><img src={icon_success} width="24" class="" alt="" /> {type_action} th??nh c??ng</p>):(
							<p class="text-info font-size-18 mb-2">Th??ng B??o</p>
						)}
						
						<p class="text-red font-size-18">{message_rollup}</p>
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Chon Room--> */}
			<div class="modal fade" id="Modalchonroom">
				<div class="modal-dialog modal-chonroom_m modal-dialog-scrollable">
					<div class="modal-content bg-transparent border-0">

					<div class="modal-header border-0 p-0">
						<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body border-0 py-0 mb-2 mt-2 px-3 scroll-modal-body_m">
						{listSanqua.map((obj, key) => (

							<a title="Ch??i ngay" key={key} onClick={()=>this.playSanqua(obj)}>    	
								<div class="mx-0 mb-1 session-chonroom_m d-flex position-relative">
									<div class="scr-c_m font-size-3vw_m text-uppercase text-warning-50">
										<img src={icon_scoin} width="24" alt="" /> <span class="pl-1">T???ng ??i???m: {obj.PointRule}</span>
									</div>
									<div class="scr-status-open_m font-size-3vw_m">
										<p class="pt-5px pl-2 text-white">??ang di???n ra</p>
									</div>
									<div class="scr-info_m font-size-3vw_m text-white">
										<p class="font-italic_m mb-0 pb-3px">B???t ?????u: {this.timeEnd(obj.StartTime)}</p>
										<p class="text-uppercase mb-0">Gi???i th?????ng: {this.showGiaithuong(obj.Awards)}</p>
									</div>
									<div class="scr-playnow_m font-size-3vw_m text-uppercase text-warning">
										Ch??i Ngay
									</div>
								</div>
							</a>
						))}			
						
						
						
						
						
					</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal ??i???m danh th??nh c??ng--> */}
			<div class="modal fade" id="ModalListEmpty">
				<div class="modal-dialog modal-sm">
					<div class="modal-content border-0">
					<div class="modal-header border-0 p-0 text-dark">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body border-0 pt-0 text-center">
						<p class="text-info font-size-18 mb-2">Th??ng B??o</p>
						<div class="text-red font-size-18" dangerouslySetInnerHTML={{__html: 'Hi???n kh??ng c?? phi??n ch??i S??n Qu?? n??o ??ang ch???y. </br>B???n vui l??ng v??o m???c Trang Ch??? -> Gi???i Th?????ng ????? xem l???ch ch???y c??c phi??n s???p t???i nh??!'}}></div>
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
	dataLuckyInfo: state.lucky.dataLuckyInfo,
	dataSesions: state.lucky.dataSesions,
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
	pickCard,
	getInfoUser,
	getMoreSessions,
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
