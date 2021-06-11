import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { connect } from 'react-redux'
import './css/style.css';
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
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './images/muivongquay.png'

import backtotop from './images/backtotop.png'
import sukiendangdienra from './images/btn-sukiendangdienra.png'
import livestream from './images/btn_livestream.png'
import sapdienra from './images/btn-sapdienra.png'
import ketthuc from './images/btn-ketthuc.png'
import logo from './images/logo.png';
import thamgiangay from './images/btn-thamgiangay.gif';
import iphone_11_pro_max from './images/iphone-11-pro-max.png';
import vqmm_p2 from './images/vqmm-p2.png';
import btn_quay_p2 from './images/btn-quay-p2.png';
import honda from './images/honda.png';
import iphone_xs from './images/iphone-xs.png';
// import xiaomi_black from './images/xiaomi-black-shark-2.png';
import icon_bangvinhdanh from './images/icon-bangvinhdanh.png';
import logo_splay from './images/logo_splay.png';
import logo_scoin from './images/logo_scoin.png';
import img_phanthuong from './images/img-phanthuong.png';
import btn_close from './images/btn-close.png';
import img_card10k from './images/img-card10k.png';
import img_card50k from './images/img-card50k.png';
import img_card100k from './images/img-card100k.png';
import img_card500k from './images/img-card500k.png';
import img_thele from './images/img-thele.png';
import img_tudo from './images/img-tudo.png';
import img_maduthuong from './images/img-maduthuong.png';
import img_thongbao from './images/img-thongbao.png';
import img_livestream from './images/img-livestream.png';
import img_giaithuong from './images/img-giaithuong.png';
import img_moqua from './images/img-moqua.png';
import loading from './images/loading.gif';
import giai_dac_biet from './images/giai-dac-biet.jpg';
import logo_final from './images/logo_final.png';
import vip_bachkim from './images/vip-bachkim.png';
import vip_vang from './images/vip-vang.png';
import vip_bac from './images/vip-bac.png';
import vip_dong from './images/vip-dong.png';

// import muiten from './images/muiten.png';
import ReactResizeDetector from 'react-resize-detector'
import spin from './images/spin.gif';
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
			img_status: sukiendangdienra,
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
		
		
		let theWheel = new Wheel({
			'numSegments'       : 12,         // Specify number of segments.
			'outerRadius'       : 150,       // Set outer radius so wheel fits inside the background.
			'drawMode'          : 'image',   // drawMode must be set to image.
			'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
			'textFontSize'      : 12,        // Set text options as desired.
			'textOrientation'   : 'curved',
			'textDirection'     : 'reversed',
			'textAlignment'     : 'outer',
			'textMargin'        : 5,
			'textFontFamily'    : 'monospace',
			'textStrokeStyle'   : 'black',
			'textLineWidth'     : 2,
			'responsive'   : true,
			'textFillStyle'     : 'white',
			'animation' :                 
			{
				'type'     : 'spinToStop',
				'duration' : 5,    
				'spins'    : 10,    
				'callbackFinished' : this.completeRotation
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;   
			theWheel.draw();                    
		}
		loadedImg.width=img_width;
		loadedImg.height=img_height;
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
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
			this.setState({ img_status: sapdienra, message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ img_status: sukiendangdienra});
		}
		if (time > end) {
			this.setState({ img_status: ketthuc, message_status:"Sự kiện đã kết thúc."});
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
		const {turnsFree, itemOfSpin, isSpin, closeAuto, auto}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		// var user = 'nambv';
		if (user !== null) {
			if(user.VipLevel!==0){
				if(turnsFree>0){
					// $('#Loading').modal('show');
					this.props.pickCard(user.Token).then(()=>{
						// $('#Loading').modal('hide');
						var data=this.props.dataPick;
						console.log(data)
						var list=this.state.data_auto;
						if(data!==undefined){
							if(data.Status ===0){
								var id=data.Data.AwardId;
								var pos=0
								pos = itemOfSpin.map(function(e) { return e.Id; }).indexOf(id);
								list.unshift(data.Data.AwardName);
								var len_auto=list.length;
								
								this.resetWheel();
								if(!isSpin && closeAuto){
									this.startSpin(pos+1);
								}	
								this.setState({itemBonus: data.Data, data_auto: list, len_auto:len_auto, closeAuto:true});
							}else if(data.Status ===2){
								if(auto){
									clearInterval(this.state.intervalId);
									this.setState({ isSpin:false, closeAuto:false});
									$('#myModal9').modal('hide');
								}
								$('#matluot').modal('show');
								var urlVideo="https://www.youtube.com/embed/"+data.Data.VideoId+"?autoplay=1&mute=1"
								var intervalWaiting = setInterval(this.timeWaitings, 1000);
								this.setState({message_error:data.Message, timeWaiting:data.WaitingSeconds, startSpin:false, urlVideo:urlVideo, intervalWaiting:intervalWaiting})
								
							}else{
								$('#myModal11').modal('show');
								this.setState({message_error:data.Message, startSpin:false})
							}
						}else{
							$('#myModal12').modal('show');
							this.setState({server_err:true, startSpin:false})
						}
					})
					
				}else{
					$('#myModal6').modal('show');
				}
			}else{
				this.setState({startSpin:false},()=>{
					$('#activeVip').modal('show');
				})
			}
		} else {
			$('#myModal5').modal('show');
		}
		
	}

	btnStart=()=>{
		const {wheelSpinning}=this.state;
		if(!wheelSpinning){
			this.setState({data_auto:[], closeAuto:true, startSpin:true},()=>{
				this.start();
			})
		}	
		// this.startSpin(5)
	}

	startSpin=(segmentNumber)=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		if (wheelSpinning == false) {
			let stopAt = theWheel.getRandomForSegment(segmentNumber);
			theWheel.animation.stopAngle = stopAt;
			theWheel.startAnimation();
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	

	resetWheel=()=>{
		const { theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 10; 
		theWheel.rotationAngle = 0;   
		theWheel.draw();              
		this.setState({wheelSpinning: false});    
	}

	completeRotation=()=>{
		const {auto, turnsFree, theWheel, itemBonus}=this.state;
		if(auto){
			var intervalId = setInterval(this.autoRotation, 2000);
			$('#myModal9').modal('show');
   			this.setState({intervalId: intervalId, isSpin: true, closeAuto:false, wheelSpinning: false, startSpin:false});
			
		}else{
			if(itemBonus.AwardId===4){
				$('#myModal11').modal('show');
				this.setState({message_error: 'Bạn đã quay vào ô mất lượt.'});		
			}else if(itemBonus.AwardId===11){
				$('#myModal11').modal('show');
				this.setState({message_error: 'Chúc bạn may mắn lần sau.'});
			}else{
				$('#myModal4').modal('show');
			}
			this.setState({isSpin: false, closeAuto:true, wheelSpinning: false, startSpin:false});
			this.getDetailData()
		}
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


	autoRotation=()=>{
		const {turnsFree}=this.state;
		if(turnsFree>0){
			this.getDetailData();
		}else{
			clearInterval(this.state.intervalId);
		}
	}


	getDetailData=()=>{
		const {auto}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.getVinhDanh(1);
		this.props.getDataUserSpin(user.Token).then(()=>{
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

	// showPopup=()=>{
	// 	const {itemBonus, turnsFree}=this.state;

	// 	setTimeout(()=>{
	// 		$('#myModal4').modal('hide');
	// 		if(turnsFree>0){
	// 			this.start()
	// 		}
	// 	},2000)
	// 	if(itemBonus.keyName!=="matluot"){
	// 		$('#myModal4').modal('show');
	// 	}
	// }

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

	// timeWaitings=(time)=>{
	// 	var minute=Math.floor(time/60) > 9 ? Math.floor(time/60) : `0${Math.floor(time/60)}`;
	// 	var second=Math.ceil(time%60) > 9 ? Math.ceil(time%60) : `0${Math.ceil(time%60)}`;
	// 	this.setState({minute_live: minute, second_live:second})
	// }

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


	closeMatLuot=()=>{
		clearInterval(this.state.intervalWaiting);
		$('#matluot').modal('hide'); 
	}
	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
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

	showModalCodeBonus=()=>{
		const {luckySpin, offsetCode, limit}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getCodeBonus(user.Token, luckySpin.id, 'LUCKY_NUMBER').then(()=>{
				var data=this.props.dataCodeBonus;
				if(data!==undefined){
					if(data.status==='01'){
						console.log(data.data)
						this.setState({dataCodeBonus:data.data, countCodeBonus:data.data.length, listCodeBonus: data.data.slice(0,5), noti_mdt:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal3').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		clearInterval(this.state.intervalId);
		this.setState({ isSpin:false, closeAuto:false});
		$('#myModal9').modal('hide');
	}

	hideModalCodeBonus=()=>{
		$('#myModal3').modal('hide');
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

	// hideModalCode=()=>{
	// 	$('#myModal7').modal('hide');
	// }


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

	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getVinhDanh(pageNumber)
		})
		// const {dataVinhDanh}=this.state;
		// var newPosition=(pageNumber-1)*10
		// this.setState({activeVinhDanh: pageNumber, listVinhDanh: dataVinhDanh.slice(newPosition, newPosition+10)});
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

	findCode=(evt)=>{
		var value=evt.target.value
		// this.setState({
		// 	inputValue: evt.target.value
		//   });
		const {dataCodeBonus}=this.state;
		var data=dataCodeBonus.filter(v=>v.description.indexOf(value)!==-1)
		this.setState({countCodeBonus:data.length, listCodeBonus:data.slice(0,5)})
	}


	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}

	numberWithCommas=(x)=> {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render() {
		const {xacthuc,urlVideo,timeWaiting, scoinCard,height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second,len_auto, code,numberPage, img_status, message_status, data_auto,message_error,linkLiveStream,dataItem,startSpin,
			waiting, activeTuDo, activeHistory, activeCodeBonus, activeVinhDanh, limit, countCodeBonus, countTuDo, countHistory, countVinhDanh, listHistory, listCodeBonus, listTuDo, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, hour_live, minute_live, second_live, isLive, user}=this.state;
		const { classes } = this.props;
		const notification_mdt=noti_mdt?(<span className="badge badge-pill badge-danger position-absolute noti-mdt">!</span>):(<span></span>);
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div className="container-fluid page1">
				<div className="content-inner-p1">
					<h1 className="logo-p1" id="logo"><img src={logo} alt="Logo" width="500" className="img-fluid" /></h1>
					<div className="container">
						<div className="timer-p1 float-right">
							<img src={img_status} alt="Sự kiện đang diễn ra" width="298" className="img-fluid" />
							<div className="table-responsive">
							<table className="table table-borderless text-white">
								<tr>
									<td className="cell-timer-p1 display-5 text-center">{day}</td>
									<td className="cell-timer-p1 display-5 text-center">{hour}</td>
									<td className="cell-timer-p1 display-5 text-center">{minute}</td>
									<td className="cell-timer-p1 display-5 text-center">{second}</td>
								</tr>
								<tr>
									<td align="center" className="p-0 h6">Ngày</td>
									<td align="center" className="p-0 h6">Giờ</td>
									<td align="center" className="p-0 h6">Phút</td>
									<td align="center" className="p-0 h6">Giây</td>
								</tr>
							</table>
							
							</div>
						</div> 
					</div>
					<p className="btn-thamgiangay"><a href="#logo-p2" title="Tham gia ngay"><img src={thamgiangay} alt="Tham gia ngay" width="200" className="img-fluid" /></a></p>
					<div className="position-absolute-p1">
						<ul className="nav flex-column menu-left-p1">
							<li className="pt-6"><a href="https://vip.scoin.vn/" title="Active ViP" target="_blank">Active ViP</a></li>
							{/* <li className="pt-6"><a href="http://sandbox.scoin.vn/nap-vao-game?GameId=330287" title="Nạp Scoin" target="_blank">Nạp Game</a></li> */}
							<li className="pt-5b"><a href="#" title="Thể lệ" onClick={this.showModalRules}>Thể lệ</a></li>
							<li className="pt-5b"><a href="#" title="Phần thưởng" onClick={this.showModalBonus}>Phần thưởng</a></li>
							<li className="pt-5a"><a href="#bvd" title="Vinh danh">Vinh danh</a></li>
						</ul>
					</div>
				</div>
			</div>
			{/* End p1 */}

			<div id="p2" className="container-fluid page2">
				<div className="container content-inner-p2">
					<h1 id="logo-p2" className="logo-p2"><img src={logo} alt="Logo" width="400" className="img-fluid" /></h1>
					<div className="vqmm">
							<canvas style={{}} id="canvas" width={width} height={height} data-responsiveMinWidth="10" data-responsiveMargin="40"  data-responsiveScaleHeight="true">		
							</canvas>
							{/* <canvas style={{marginTop:-(height+15), padding:0}} id="new_canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">
								
							</canvas> */}
						{/* <img src={vqmm_p2} alt="Vòng quay may mắn" className="img-fluid"/>     */}
					</div>
					<div className="btn-logout text-center">
						{(isLogin)?(<div><p className="p-0 m-0">Xin chào {user.Username}</p>
						<div>
							{(user.VipLevel===1)?(<a href="http://vip.scoin.vn" title="VIP Đồng" target="_blank">VIP Đồng <img src={vip_dong} alt="VIP Đồng" width="16" /></a>):(<div></div>)}
							{(user.VipLevel===2)?(<a href="http://vip.scoin.vn" title="VIP Bạc" target="_blank">VIP Bạc <img src={vip_bac} alt="VIP Bạc" width="16" /></a>):(<div></div>)}
							{(user.VipLevel===3)?(<a href="http://vip.scoin.vn" title="VIP Vàng" target="_blank">VIP Vàng <img src={vip_vang} alt="VIP Vàng" width="16" /></a>):(<div></div>)}
							{(user.VipLevel===4)?(<a href="http://vip.scoin.vn" title="VIP bạch kim" target="_blank">VIP Bạch kim <img src={vip_bachkim} alt="VIP Bạch kim" width="16" /></a>):(<div></div>)}
						</div>
						<h5 onClick={this.logoutAction}><a style={{cursor:'pointer'}} title="Đăng xuất">Đăng xuất</a></h5></div>):(<h5 onClick={this.loginAction}><a style={{cursor:'pointer'}} title="Đăng nhập" >Đăng nhập</a></h5>)}
						
					</div>
					<div className="btn-quay">
						<h5 className="text-center">Còn: {turnsFree} lượt &nbsp;</h5>
						{(startSpin)?(<a style={{cursor:'pointer'}}><img src={btn_quay_p2} alt="" className="img-fluid hv" /></a>):(
							<a style={{cursor:'pointer'}} onClick={this.btnStart}><img src={btn_quay_p2} alt="" className="img-fluid hv" /></a>
						)}
						
						<div className="custom-control custom-checkbox">
							<input type="checkbox" className="custom-control-input" id="customCheck" name="autospin" />
							<label className="custom-control-label" for="customCheck" onClick={this.handleChange}>Chọn quay tự động</label>
						</div>
					</div>   
				</div>
				
				<div className="menu-right">
					<ul className="nav flex-column">
						<li className="pt-6"><a style={{color:"#fff", cursor:'pointer'}} title="Tủ đồ" onClick={this.showModalTuDo}>Tủ đồ</a>{notification_tudo}</li>
					</ul>
				</div>
			</div>
			{/* End p2 */}

			<div className="container jumbotron">
				<h2 id="bvd" className="d-block btn-ketqua mt-5"><img src={icon_bangvinhdanh} alt="icon" />Bảng vinh danh</h2>
				<div className="table-responsive giaithuong-pc">
					<table className="table table-borderless tbl-bvd mx-auto text-center">
						<thead>
						<tr className="text-uppercase title-bvd">
							<th></th>
							<th>Tên</th>
							<th>Phần thưởng</th>
							<th>Thời gian trúng</th>
						</tr>
						</thead>
						<tbody className="top-12">
						<tr>
							<td></td>
							<td>*******</td>
							<td>iPhone 12 Pro Max 256GB</td>
							<td>*******</td>
						</tr>
						</tbody>
					</table>
					<table className="table table-bordered tbl-bvd mx-auto text-center">            
						<tbody className="top100">
							{listVinhDanh.map((obj, key) => (
								<tr key={key}>
									<td className="border-right-0">{obj.Username}</td>
									<td className="border-left-0 border-right-0">{obj.AwardName}</td>
									<td className="border-left-0">{this.timeConverter(obj.SpinTime)}</td>
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
							onChange={(v) => this.handlePageChangeVinhDanh(v)}
						/>
					</div> 
				</div>
				<div className="giaithuong-mobile text-center">
					<table class="table table-borderless mx-auto">
						<thead>
						<tr class="badge-warning border">
							<th>
								<p class="mb-0">Tên: <span class="h4 text-danger">*******</span></p>
								<p class="mb-0">Giải thưởng: <span class="h4 text-danger">iPhone 12 Pro Max 256GB</span></p>
								<p class="mb-0">Thời gian trúng: <span class="h4 text-danger">*******</span></p>
							</th>
						</tr>
						</thead>
					</table>
					<table class="table table-bordered mx-auto">            
						<tbody>
							{listVinhDanh.map((obj, key) => (
								<tr key={key}>
									<td>
									<p class="mb-3">Tên: <span class="h5">{obj.Username}</span></p>
									<p class="mb-3">Giải thưởng: {obj.AwardName}</p>
									<p class="mb-0">Thời gian trúng: {this.timeConverter(obj.SpinTime)}</p>
									</td>
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
							onChange={(v) => this.handlePageChangeVinhDanh(v)}
						/>
					</div> 
				</div>
				<div className="w-100 justify-content-center text-center pt-5">
					<ul className="nav nav-pills nav-justified">
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://daily.scoin.vn/huong-dan-mua-the/" title="Hướng dẫn mua thẻ scoin" target="_blank">Hướng dẫn mua thẻ scoin</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://www.facebook.com/scoinvtcmobile/" title="Nhận thông báo sk" target="_blank">Nhận thông báo sk</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://scoin.vn/nap-game" title="Nạp scoin" target="_blank">Nạp Game</a>
						{/* <a className="nav-link btn-dv text-uppercase text-nowrap" href="http://sandbox.scoin.vn/nap-vao-game?GameId=330287" title="Nạp scoin" target="_blank">Nạp Game</a> */}
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="tel:19001104" title="Hotline hỗ trợ">HOT LINE: 19001104</a>
						</li>
					</ul>
				</div>
			</div>
			{/* {(isLive)?(<div className="button-bt">
				<button type="button" className="btn fixed-bottom btn-dv btn-block" onClick={this.showPopupLiveStream}><h5 className="glow mb-0"><img src={spin} width="24" className="pr-1" alt=""/> Xem livestream so Mã dự thưởng tại đây sau: {hour_live}giờ&nbsp;&nbsp;{minute_live}phút&nbsp;&nbsp;{second_live}giây </h5></button>
			</div>):(<div></div>)} */}
			


			<div className="container-fluid footer">
				<p className="text-center"><img src={logo_splay} width="100" alt="" /><a href="https://scoin.vn/"> <img src={logo_scoin} width="120" hspace="10" alt="" /></a><a href="https://vip.scoin.vn/"><img src={logo_final} width="150" hspace="10" alt="" /></a></p>
				<p className="text-center"><span className="text-uppercase">CÔNG TY CỔ PHẦN VTC DỊCH VỤ DI ĐỘNG</span> <br />VTC Mobile - Thành viên của Tổng Công ty Truyền thông đa phương tiện Việt Nam VTC <br /> Tầng 11, tòa nhà VTC Online, số 18 Tam Trinh, phường Minh Khai, quận Hai Bà Trưng, Hà Nội.
<br />Tel: (84-4).39877470 <br />Fax: (84-4).39877210<br /> <a href="mailto:vtcmobile@vtc.vn">vtcmobile@vtc.vn</a>
	</p>
			</div>

			{/* The Modal Phần thưởng */}
			<div className="modal fade" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_phanthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body w-100">
						<img src={img_giaithuong} class="w-100" />
					</div>
					</div>
				</div>
			</div>

			{/* The Modal Thể lệ */}
			<div className="modal fade" id="myModal1">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thele} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body">
						<h3 class="text-red">I. Đối tượng tham gia</h3>
						<p class="text-thele pl-3"> &bull; Toàn bộ khách hàng đã active tài khoản khách hàng VIP. <br />
						&bull;  Nếu chưa là khách hàng VIP, bạn vui lòng thực hiện active và trở thành VIP <code><a href="https://vip.scoin.vn" title="Đăng ký" target="_blank" class="text-primary">tại đây</a></code>.</p>
						<h3 class="text-red">II. Thời gian diễn ra</h3>
						<p class="text-thele pl-3">&bull; Sự kiện được diễn ra từ ngày 15/04/2021 đến hết ngày 14/05/2021.</p>
						<h3 class="text-red">III. Cách thức tham gia sự kiện</h3>
						<p class="text-thele pt-3 pl-3"> &bull; Bước 1:  Truy cập link: <a href="https://vqmm.splay.vn" title="https://vqmm.splay.vn">https://vqmm.splay.vn</a>, đăng nhập bằng tài khoản Scoin để nhận được số lượt quay miễn phí tương ứng với cấp VIP của bạn. Cụ thể như sau:</p>
						<div class="table-responsive">
							<table class="table table-bordered text-center text-thele">
								<thead>
								<tr>
									<th>STT</th>
									<th>Cấp VIP</th>
									<th>Số lượt quay/ngày</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>1</td>
									<td>VIP Đồng</td>
									<td>5</td>
								</tr>
								<tr>
									<td>2</td>
									<td>VIP Bạc</td>
									<td>10</td>
								</tr>
								<tr>
									<td>3</td>
									<td>VIP Vàng</td>
									<td>15</td>
								</tr>
								<tr>
									<td>4</td>
									<td>VIP Bạch kim</td>
									<td>20</td>
								</tr>
								<tr>
									<td colspan="3" class="font-italic small text-danger">* Lưu ý: Các lượt quay không được cộng dồn sang ngày kế tiếp.</td>
								
								</tr>                 
								</tbody>
							</table>
						</div>
						<p class="text-thele pt-3 pl-3"> &bull; Bước 2: Tại Trang sự kiện, bạn click nút <mark>Quay</mark> hoặc <mark>Chọn quay tự động</mark> để tham gia chơi.</p>
						<h3 class="text-red">IV. Giải thưởng</h3>
						<p class="text-thele pl-3">Tham gia Vòng quay may mắn VIP, Khách hàng có cơ hội nhận được giải thưởng hấp dẫn gồm:</p>
						<p class="text-thele pl-3"> &bull; Iphone 12 Pro max 256Gb.<br></br>
				&bull; Thẻ Scoin các mệnh giá 10k, 20k, 50k, 100k, 200k, 500k, 1 triệu, 2 triệu, 5 triệu.<br></br>
				&bull; Nạp trực tiếp 50k Scoin vào tài khoản người chơi.<br></br>
				&bull; Thẻ voucher: gồm thẻ voucher scoin hoặc thẻ voucher chuyển khoản ngân hàng, khách hàng có thể sử dụng để nhận khuyến mại trong những lần nạp thẻ tiếp theo.<br />
				&bull; Hộp quà đặc biệt: là 1 phần quà bí mật dành tặng Khách hàng.
				</p>
				<p class="text-thele pl-3 font-italic mark">* Lưu ý: <br />

				&bull; Các giải thưởng được lưu lại trong Tủ đồ, Khách hàng click vào Tủ đồ để xem lại và sử dụng. <br />
				&bull; Giải thưởng thẻ voucher có hiệu lực trong vòng 1 tháng kể từ thời điểm kết thúc sự kiện. Hết thời gian kể trên, giải thưởng không còn giá trị. <br />
				&bull; Toàn bộ giải thưởng không được quy đổi thành tiền mặt.</p>


						<h3 class="text-red">V. Các quy định khác</h3>
						<p class="text-thele pl-3"> &bull; Công ty cổ phần VTC Dịch vụ di động sẽ thực hiện trao thưởng cho khách hàng chậm nhất sau 15 ngày làm việc kể từ khi kết thúc sự kiện.</p>
						<p class="text-thele pl-3">&bull; Đối với các khách hàng trúng giải: theo khoản 6, điều 3, chương 1 của Luật thuế thu nhập cá nhân, những người may mắn trúng giải thưởng hiện vật có giá trị kinh tế cao có nghĩa vụ nộp thuế theo quy định của Nhà nước. Thông tin chi tiết xem <code><a href="http://vanban.chinhphu.vn/portal/page/portal/chinhphu/hethongvanban?class_id=1&_page=1&mode=detail&document_id=51258" title="tại đây" target="_blank" class="text-primary">tại đây</a></code>.<br></br>
				&bull; Trong trường hợp phát sinh tranh chấp, khiếu nại liên quan đến chương trình, Công ty cổ phần VTC Dịch vụ di động sẽ trực tiếp giải quyết và quyết định của Công ty cổ phần VTC Dịch vụ di động là kết quả cuối cùng. Mọi trường hợp gian lận hoặc không trung thực sẽ bị xử lý theo pháp luật.


				</p>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Tủ đồ */}
			<div className="modal fade" id="myModal2" style={{zIndex:10001}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_tudo} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<ul class="nav nav-pills nav-justified w-50 mx-auto">
							<li class="nav-item">
								<a class="nav-link active text-red" data-toggle="pill" href="#phanthuong" onClick={()=>this.getDataTuDo(user)}>Phần thưởng</a>
							</li>
							<li class="nav-item">
								<a class="nav-link text-red" data-toggle="pill" href="#lichsu" onClick={()=>this.getHistory(user)}>Lịch sử</a>
							</li>
						</ul>
						<div class="tab-content">        
							<div class="tab-pane container active" id="phanthuong">
								<div class="table-responsive mt-2">
									<table class="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
										<thead>
										<tr class="text-uppercase lead">
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Phần thưởng</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Mở quà</th>
										</tr>
										</thead>            
										<tbody class="popup-tudo">
											{listTuDo.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{obj.AwardName}</td>
													<td className="border-left-0 border-right-0">{obj.AwardSpecific}</td>
													<td className="border-left-0 border-right-0">{this.timeConverter(obj.SpinTime)}</td>
													{(obj.AwardSpecific.indexOf("Thêm")===0)?(<td class="border-left-0 text-secondary">Mở</td>):(<td class="border-left-0"><a class="text-primary"  style={{cursor:'pointer'}} onClick={()=>this.getItem(user, obj)}>Mở</a></td>)}
													
												</tr>
											))}
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom">
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
								</div>
							</div>
							<div class="tab-pane container fade" id="lichsu">
								<div class="table-responsive mt-2">
									<table class="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
										<thead>
										<tr class="text-uppercase lead">
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">STT</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Kết Quả</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời Gian</th>
										</tr>
										</thead>            
										<tbody class="popup-tudo">
											{listHistory.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{key+1 + (activeHistory-1)*10}</td>
													<td className="border-left-0 border-right-0">{obj.AwardName}</td>
													<td className="border-left-0">{this.timeConverter(obj.SpinTime)}</td>
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
								</div>
							</div>
							
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Mở Quà--> */}
			<div class="modal fade" id="MoQua" style={{zIndex:10015}}>
				<div class="modal-dialog modal-sm">
					<div class="modal-content popup-phanthuong">

					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><img src={img_moqua} alt="" /></h4>
						<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>
					<div class="modal-body">
						<div class="table-responsive mt-2">              
							{(dataItem.Type==='TopupScoin')?(<p style={{textAlign:'center', fontSize:20, color:'green'}}>{dataItem.Message}</p>):(<div></div>)}
							{(dataItem.Type==='AddSpin')?(<p style={{textAlign:'center', fontSize:20, color:'green'}}>{dataItem.Message}</p>):(<div></div>)}
							{(dataItem.Type==='ScoinCard')?(<div class="card bg-light mx-auto" style={{width:300}}>
								<div class="card-body text-center">
								<p class="card-text text-primary mb-3 h4">Thẻ Scoin mệnh giá: <br /> {dataItem.Amount ? this.numberWithCommas(dataItem.Amount) : 0} vnđ</p>
								<p class="card-text border-bottom text-dark mb-3 h5">Mã code: {dataItem.Code}</p>
								<p class="card-text border-bottom text-dark mb-3 h5">Serial: {dataItem.Serial}</p>
								<p class="card-text text-secondary">Hết hạn: {dataItem.Expires}</p>
								<p class="card-text"></p>
								</div>
							</div>):(<div></div>)}
							{(dataItem.Type==='ScoinVoucher')?(<div class="card bg-light mx-auto" style={{width:300}}>
								<div class="card-body text-center">
								<p class="card-text text-primary mb-3 h4">Thẻ ScoinVoucher mệnh giá: <br /> {dataItem.Amount ? this.numberWithCommas(dataItem.Amount) : 0} vnđ</p>
								<p class="card-text border-bottom text-dark mb-3 h5">Mã code: {dataItem.Code}</p>
								<p class="card-text border-bottom text-dark mb-3 h5">Serial: {dataItem.Serial}</p>
								<p class="card-text text-secondary">Ngày bắt đầu: {dataItem.StartDate} <br />Ngày kết thúc: {dataItem.EndDate}</p>
								<p class="card-text"></p>
								</div>
							</div>):(<div></div>)}
							{(dataItem.Type==='Giftcode')?(<div class="card bg-light mx-auto" style={{width:300}}>
								<div class="card-body text-center">
								<p class="card-text text-primary mb-3 h4">Mã code: {dataItem.Code}</p>
								<p class="card-text border-bottom text-dark mb-3 h5">Tên game: {dataItem.Description}</p>
								<p class="card-text border-bottom text-dark mb-3 h5">Mô tả: {dataItem.GameName}</p>
								<p class="card-text text-secondary">Hết hạn: {dataItem.ExpiredDate}</p>
								<p class="card-text"></p>
								</div>
							</div>):(<div></div>)}
							{(dataItem.Type==='BankTransferVoucher')?(<div class="card bg-light mx-auto" style={{width:300}}>
								<div class="card-body text-center">
								<p class="card-text mb-3 text-primary h4">Tài khoản <span class="text-danger">{dataItem.AccountName}</span> nhận được Scoin Voucher 20K khi nạp Scoin qua Chuyển khoản Ngân hàng. </p>
                    			<p class="card-text border-bottom text-dark mb-3 h5">Bạn hãy nạp Scoin để nhận khuyến mại nhé!</p>
								<p class="card-text text-secondary">Hết hạn: {dataItem.ExpiredDate}</p>
								<div class="modal-footer justify-content-center">
									<a href="https://scoin.vn/nap-tien#9" type="button" class="btn btn-danger" target="_blank">Nạp ngay</a>
								</div>
								</div>
							</div>):(<div></div>)}
							{(dataItem.Type==='SpecialAward')?(<div class="modal-body mx-auto text-center">
									<img src={giai_dac_biet} class="img-fluid" />
							</div>):(<div></div>)}
							
						</div>       
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Mã dự thưởng */}
			<div className="modal fade" id="myModal3" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_maduthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">Tìm kiếm</span>
								</div>
								<input type="text" className="form-control" placeholder="Nhập mã dự thưởng" onChange={e => this.findCode(e)}/>
							</div>
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Mã</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
								{listCodeBonus.map((obj, key) => (
									<tr key={key}>
										<td className="border-right-0">{obj.description}</td>
										<td className="border-left-0 border-right-0">{obj.itemName}</td>
										<td className="border-left-0">{obj.date}</td>
									</tr>
								))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeCodeBonus}
									itemsCountPerPage={5}
									totalItemsCount={countCodeBonus}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeCodeBonus(v)}
								/>
							</div> 
							<p className="text-thele">Lưu ý: Tài khoản Scoin của quý khách cần phải xác thực số ĐT để nhận thông báo trong trường hợp trúng giải. <code><a style={{fontSize:18}} href=" https://scoin.vn/doi-sdt" title="Xác thực ngay" target="_blank">Xác thực ngay</a></code> </p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Thông báo chúc mừng */}
			<div className="modal" id="myModal4">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

					{/* <!-- Modal body --> */}
						<div className="modal-body bg-chucmung justify-content-center">
							<div className="card">
								<div className="card-body content-chucmung mx-auto">
									<div>
										<div>
											<div className="text-chucmung text-center" style={{marginTop:70}}>
												<span>Bạn vừa nhận được <span style={{color:'red'}}>{itemBonus.AwardName}</span></span>
											</div>
											<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được chuyển vào Tủ đồ sự kiện) <br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalTuDo}>Xem phần thưởng</label></p>
										</div>
									
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal5">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Xin vui lòng đăng nhập!</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.loginAction}>Đăng nhập</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo hết lượt--> */}
			<div className="modal fade" id="myModal6" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Bạn đã hết lượt quay ngày hôm nay!</h5>
							{/* <p className="text-thele lead text-center">Hãy nạp Scoin để nhận thêm lượt chơi Vòng quay tháng 10.</p> */}
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>Nạp Game</button> */}
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}>Nạp Game</button> */}
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal8">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
							{(xacthuc)?(<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.xacThuc('https://scoin.vn/cap-nhat-sdt')}>Xác Thực</button>):(<div></div>)}
							
						</div>       
					</div>

					</div>
				</div>
			</div>


			<div className="modal fade" id="myModal9" data-keyboard="false" data-backdrop="static" style={{zIndex:10000}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button className="close" onClick={this.closePopupAuto}><img src={btn_close} alt="Đóng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h3 className="text-purple text-center">Kết quả quay tự động</h3>
							<ol className="list-group list-group-flush">
								{data_auto.map((obj, key) => (
									<li className="list-group-item" key={key}>{len_auto-key}. {obj}</li>
								))}
							</ol> 
							
							<p className="text-thele">Vào <code><label onClick={this.showModalTuDo}>Tủ đồ</label></code> để xem chi tiết.</p>
							<p className="text-thele text-center"><code>Đang quay tự động <span className="spinner-grow spinner-grow-sm"></span></code></p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal10">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h5 class="text-center">Bạn sẽ nhận được lượt chơi miễn phí khi nạp thẻ Scoin vào game của VTC Mobile.</h5>
							<table className="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
									<tr>
										<th colspan="4">Nạp thẻ Scoin vào game</th>                    
									</tr>
									<tr>
										<th>STT</th>
										<th>Mệnh giá thẻ Scoin (VNĐ)</th>
										<th>Số lượt quay chuẩn</th>
										<th>Số lượt quay (đã cộng)</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>50.000</td>
										<td>1</td>
										<td></td>
									</tr>
									<tr>
										<td>2</td>
										<td>100.000</td>
										<td>2</td>
										<td></td>
									</tr>
									<tr>
										<td>3</td>
										<td>200.000</td>
										<td>4</td>
										<td></td>
									</tr>
									<tr>
										<td>4</td>
										<td>300.000</td>
										<td>6</td>
										<td></td>
									</tr>
									<tr>
										<td>5</td>
										<td>500.000</td>
										<td>10</td>
										<td></td>
									</tr>
									<tr>
										<td>6</td>
										<td>1.000.000</td>
										<td>22</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>7</td>
										<td>2.000.000</td>
										<td>44</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>8</td>
										<td>5.000.000</td>
										<td>120</td>
										<td>20%</td>
									</tr>
								</tbody>
							</table> 
							<div class="btn-logout position-relative w-25 mx-auto text-center left-0 top-0">
								<h5 class="text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}><a>Nạp</a></h5>
								{/* <h5 class="text-center" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}><a>Nạp</a></h5> */}
							</div>             
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>Nạp</button> */}
						</div>
						
					</div>

					</div>
				</div>
				</div>

				<div className="modal fade" id="myModal11" style={{zIndex:10010}}>
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">{message_error}</h5>
							</div>       
						</div>

						</div>
					</div>
				</div>

				

				{/* <div className="modal fade" id="matluot">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">{message_error}</h5>
								<h5 className="text-thele lead text-center">Thời gian còn lại: {minute_live} : {second_live}</h5>
							</div>       
						</div>
						</div>
					</div>
				</div> */}

				<div class="modal fade" data-backdrop="static" id="matluot">
					<div class="modal-dialog">
						<div class="modal-content popup-phanthuong">

						<div class="modal-header border-bottom-0">
							<h4 class="modal-title w-100 text-center"><img src="images/img-thongbao.png" alt="" /></h4>
						</div>
						<div class="modal-body mx-auto w-100 pt-0">         
							<div align="center" class="embed-responsive embed-responsive-16by9">           
								<iframe src={urlVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>              
							</div> 
							<h5 class="text-thele lead text-center text-danger mt-3">Bạn vừa quay vào ô Mất lượt!</h5>
							<p class="text-center text-secondary">Bạn còn <span class="text-primary h5">{minute_live} : {second_live}</span> nữa để có thể quay tiếp. Vui lòng chờ…</p>  
							<a type="button"class="btn btn-xacnhan text-white btn-block text-center py-2" onClick={this.closeMatLuot}>Đóng</a>
							{/* {(timeWaiting===-1)?(<a type="button"class="btn btn-xacnhan text-white btn-block text-center py-2" onClick={this.closeMatLuot}>Đóng</a>):(<div></div>)} */}
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal12" style={{zIndex: 10010}}>
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
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
				</div>

				<div className="modal fade" id="myModal14">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_livestream} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						<div className="modal-body">
								<div className="facebook-responsive">
									<iframe src={linkLiveStream} width="560" height="315" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
								</div>     
						</div>

						</div>
					</div>
				</div>

				{/* <!-- The Modal Thêm lượt quay--> */}
				<div class="modal fade" id="themluot">
					<div class="modal-dialog">
						<div class="modal-content popup-phanthuong">
						<div class="modal-header border-bottom-0">
							<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						<div class="modal-body">
							<div class="table-responsive mt-2">
								<h5 class="text-center">Bạn sẽ nhận được lượt chơi miễn phí hằng ngày khi là khách hàng VIP của VTC Mobile.</h5>
								<table class="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
									<thead>
									<tr>
										<th>STT</th>
										<th>Cấp VIP</th>
										<th>Số lượt quay/ngày</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>VIP Đồng</td>
										<td>5</td>
									</tr>
									<tr>
										<td>2</td>
										<td>VIP Bạc</td>
										<td>10</td>
									</tr>
									<tr>
										<td>3</td>
										<td>VIP Vàng</td>
										<td>15</td>
									</tr>
									<tr>
										<td>4</td>
										<td>VIP Bạch kim</td>
										<td>20</td>
									</tr>                  
									</tbody>
								</table>
							</div>
							
						</div>

						</div>
					</div>
				</div>

				{/* <!-- The Modal Thông báo Active tk VIP--> */}
				<div class="modal fade" id="activeVip">
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
				</div>
			

				{/* <!-- The Modal Loading--> */}
				{(waiting)?(<div class="modal fade show modal-backdrop" style={{zIndex: 10015, display: "block", paddingRight: 4}} aria-modal="true" role="dialog">
					<div class="modal-dialog d-flex justify-content-center align-items-center h-75">
						<img src={loading} width="32" />
					</div>
				</div>):(<div class="modal fade" id="Loading" style={{zIndex: 10015, display: "none"}} aria-hidden="true">
					<div class="modal-dialog d-flex justify-content-center align-items-center h-75">
						<img src={loading} width="32" />
					</div>
				</div>)}
				
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
