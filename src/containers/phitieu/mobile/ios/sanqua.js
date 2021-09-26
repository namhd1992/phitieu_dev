import React from 'react'
import { bindActionCreators } from 'redux'
import axios from 'axios';
// import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
import { connect } from 'react-redux';
import Ultilities from '../../../../Ultilities/global';
import '../css/style.css';
import {
	getMoreSessions,
	pickCard,
	getTuDo,
	getHistoryTuDo,
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	gds,
	getItemAward,
	getLuckyInfoSanQua
} from '../../../../modules/lucky'

import km_dttq from '../images/ads/km-dttq.jpg';
import fb_a1 from '../images/fb-a1.jpg';
import fb_a2 from '../images/fb-a2.jpg';
import fb_a3_a4 from '../images/fb-a3-a4.jpg';
import fb_a5 from '../images/fb-a5.png';
import fb_i1 from '../images/fb-i1.jpg';
import fb_i2 from '../images/fb-i2.jpg';
import fb_i3_i4 from '../images/fb-i3-i4.jpg';
import fb_i5 from '../images/fb-i5.jpg';

import icon_clock from '../images/icon-clock.png';
import line_timing from '../images/bg-line-timing.png';
import btn_fullscreen from '../images/btn-fullscreen.png';
import phitieu from '../images/phitieu.png';
import dart_player from '../images/dart-player.png';
import img_checkbox_none from '../images/img-checkbox-none.png';
import img_checkbox_checked from '../images/img-checkbox-checked.png';
import btn_thoat from '../images/btn-thoat.png';
import btn_duatop from '../images/btn-duatop.png';
import rotate from '../images/rotate.png';

import bg_page_sanqua from '../images/bg-page-sanqua.png';
import btn_nap_scoin from '../images/btn-nap-scoin.png';



import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

var startX=370, endX=587, startY=170, endY=387;
var Dart_Center_X=478;
var Dart_Center_Y=280;
var SEGMENTS = [4, 9, 57, 67, 99, 108];


var img_w=960;
var img_h=450;
var st_touch={};
var n=0;
var SEGMENT_COUNT = 20;
var width = window.innerWidth;
var height = window.innerHeight;
var curFrame = 0;
var frameCount = 13; 
var spriteWidth = 364; 
var spriteHeight = 120; 
var widthFrame = spriteWidth/frameCount; 
var heightFrame = spriteHeight; 
var srcX=0; 
var srcY=0; 


var SEGMENT_NAMES = ['50','25','value','tripple','value','double','out'];
var SCORE_VALUES = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6];

var segmentIndex = 0; // index vysece
var segmentType = 0;  // typ policka
var segment = 0;
var width_bgImg=0;

var totalScore = 0;
var time=0;
var darted=0;



class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			offsetVinhDanh: 0,
			isAll:true,
			stop:true,
			auto: false,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			width:0,
			height:0,
			code:false,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			hour_live:'00', 
			minute_live:'00', 
			second_live:'00',
			user:{},
			timeWaiting:0,
			dataItem:{},
			startSpin:false,
			len_auto:0,
			waiting:false,
			innerWidth:0,
			innerHeight:0,
			image: null, 
			stage:{},
			layer:{},
			darthVaderImg:{},
			dartFlightImg:{},
			checkboxImg:{},
			uncheckboxImg:{},
			exitImg:{},
			auto_play:false,
			orientation:'',
			dartPositionY:0,
			timing:"10%",
			score_text:{},
			text_warning:{},
			data:{},
			points_sanqua:0,
			countDart:0,
			sessionId:0,
			listTop:[],
			isPlay:true,
			msg:'',
			isChangetab:false,
			horizontal:false,
			bgGameImg:{},
			rect_timing:{},
			username:{}, 
			vip_level:{}, 
			tg_conlai: {}, 
			txt_points:{},
			list_top_user:[],
			none_multi:false,
			awardsContent:"",
			duatop:false,
			isLoading:true,
			code_key:'',
			delta:0,
			isVideo:false
		};
	}
	componentWillMount(){
		var obj=localStorage.getItem("obj")
		if(obj===null){
			window.location.replace("/")
		}
		var user = JSON.parse(localStorage.getItem("user"));
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.addEventListener("visibilitychange", this.visibilityChange);
		window.removeEventListener('scroll', this.handleScroll);

		if(user===null){
			window.location.replace("/")
		}

		if(window.innerWidth < window.innerHeight){
			this.setState({horizontal: false})
		}else{
			this.setState({horizontal: true})
		}
		var delta=window.innerWidth/img_w;
		startX=startX*delta;
		endX=endX*delta;
		startY=startY*delta;
		endY=endY*delta;
		Dart_Center_X=Dart_Center_X*delta;
		Dart_Center_Y=Dart_Center_Y*delta;
		SEGMENTS=SEGMENTS.map(v => {
			return v*delta
		})
		darted=0;
		time=0;

		this.setState({delta:delta, innerHeight:window.innerHeight, innerWidth:window.innerWidth})
	}




	componentDidMount(){
		const {horizontal}=this.state;
		var deltal_img=img_w/img_h;
		var deltal_device=width/height;
		var bg_x=0, bg_y=0;
		var list_top_user=[];
		var user = JSON.parse(localStorage.getItem("user"));

		// var number=Math.floor(Math.random() * 2);
		// var isVideo=number===1 ? true : false;
		// this.setState({isVideo:isVideo},()=>{
		// 	$('#myModalads').modal('show');
		// })
		var isfb=this.isFacebookApp();
		if (isfb) {
			$('#Modalfbview').modal('show');
		}

		bg_x=width;
		bg_y=height*deltal_device/deltal_img;
		width_bgImg=bg_y;
		
		if(horizontal){
			var stage = new Konva.Stage({
				container: 'canvas',
				width: width,
				height: height,
			});

			var layer = new Konva.Layer();

			var stage_checkbox = new Konva.Stage({
				container: 'div_checkbox',
				width: 50,
				height: 30,
			});
			var layer_checkbox = new Konva.Layer();
	
			var stage_exit = new Konva.Stage({
				container: 'div_exit',
				width: 105,
				height: 42,
			});
			var layer_exit = new Konva.Layer();

	
			this.setState({stage:stage, layer:layer})
			var _this=this

			var imageObj = new Image();
			imageObj.onload = function () {
				var darthVaderImg = new Konva.Image({
					image: imageObj,
					x: 0,
					y: 0,
					width: 28,
					height: 120,
					draggable: true,
					visible:false
					});
			
					layer.add(darthVaderImg);
					stage.add(layer);
					_this.setState({darthVaderImg:darthVaderImg})
			};
			imageObj.src = phitieu;

			
			var bggame = new Image();
			bggame.onload = function () {
				var bgGameImg = new Konva.Image({
					image: bggame,
					x: 0,
					y: 0,
					width: bg_x,
					height: bg_y,
					});
			
					layer.add(bgGameImg);
					bgGameImg.setZIndex(0)
					_this.setState({bgGameImg:bgGameImg})
			};
			bggame.src = bg_page_sanqua;

			
			var timing = new Image();
			timing.onload = function () {
				var timingImg = new Konva.Image({
					image: timing,
					x: bg_x*0.37,
					y: 5,
					width: 25,
					height: 25,
					});
					
					layer.add(timingImg);
					timingImg.setZIndex(1)
					_this.setState({timingImg:timingImg})
			};
			timing.src = icon_clock;

			var bg_timing = new Image();
			bg_timing.onload = function () {
				var rect_bg_timing = new Konva.Image({
					image: bg_timing,
					x: bg_x*0.41,
					y: 5,
					width: 110,
					height: 6,
					});
					
					layer.add(rect_bg_timing);
					rect_bg_timing.setZIndex(1)
					_this.setState({rect_bg_timing:rect_bg_timing})
			};
			bg_timing.src = line_timing;


			var rect_timing = new Konva.Rect({
				x: bg_x*0.41,
				y: 5,
				width: 110,
				height: 6,
				fill: 'yellow',
				shadowBlur: 10,
				cornerRadius: 10,
			});

			var username = new Konva.Text({
				x: bg_x*0.65,
				y: 5,
				text:user.Username,
				fontSize: 13,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 150,
				align: 'center',
			 });


			 var vip_level = new Konva.Text({
				x: bg_x*0.65,
				y: 20,
				text:this.getLevelUser(user),
				fontSize: 12,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 150,
				align: 'center',
			 });

			var tg_conlai = new Konva.Text({
				x: bg_x*0.40,
				y: bg_y*0.02,
				text:"Còn: 0h : 0p : 0s",
				fontSize: 14,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 10,
				align: 'left',
			 });

			 var tieuconlai = new Konva.Text({
				x: bg_x*0.34,
				y: bg_y*0.14,
				text:"Số phi tiêu còn lại: 0",
				fontSize: 14,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 250,
				padding: 10,
				align: 'center',
			 });

			//  var giaithuong = new Konva.Text({
			// 	x: bg_x*0.35,
			// 	y: bg_y*0.15,
			// 	text:"Nhanh tay giật giải IP12 trị giá 50 củ",
			// 	fontSize: 14,
			// 	fontFamily: 'Calibri',
			// 	fill: 'yellow',
			// 	width: 380,
			// 	padding: 10,
			// 	align: 'left',
			//  });



			var auto_text = new Konva.Text({
				x: 35,
				y: bg_y*0.90,
				text: "PHÓNG TIÊU TỰ ĐỘNG",
				fontSize: 15,
				fontStyle:"bold",
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				align: 'left',
			});

			var tong_diem = new Konva.Text({
				x: bg_x*0.1,
				y: bg_y*0.55,
				text: "TỔNG ĐIỂM",
				fontSize: 15,
				fontStyle:"bold",
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});
			

			var txt_points = new Konva.Text({
				x: bg_x*0.1,
				y: bg_y*0.65,
				text: "0000",
				fontSize: 16,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 110,
				padding: 10,
				align: 'center',
			});

			var ds_top = new Konva.Text({
				x: bg_x*0.71,
				y: bg_y*0.27,
				text:"DANH SÁCH TOP",
				fontSize: 15,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});


			var top_1 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.36,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_2 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.41,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_3 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.46,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_4 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.51,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_5 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.56,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_6 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.61,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_7 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.66,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});


			var top_8 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.71,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_9 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.76,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			var top_10 = new Konva.Text({
				x: bg_x*0.705,
				y: bg_y*0.81,
				text:"",
				fontSize: 11,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 300,
				padding: 20,
				align: 'left',
			});

			// layer.add(giaithuong)
			layer.add(tieuconlai)
			layer.add(rect_timing);
			layer.add(username);
			layer.add(vip_level);
			layer.add(tg_conlai);
			layer.add(auto_text);
			layer.add(tong_diem);
			layer.add(txt_points);
			layer.add(ds_top);
			layer.add(top_1);
			layer.add(top_2);
			layer.add(top_3);
			layer.add(top_4);
			layer.add(top_5);
			layer.add(top_6);
			layer.add(top_7);
			layer.add(top_8);
			layer.add(top_9);
			layer.add(top_10);
			list_top_user.push(top_1, top_2, top_3, top_4, top_5, top_6, top_7, top_8, top_9, top_10)

			stage.add(layer);
			this.setState({tieuconlai:tieuconlai,rect_timing:rect_timing, username:username, vip_level:vip_level, tg_conlai: tg_conlai, txt_points:txt_points, list_top_user:list_top_user},()=>{
				this.getLuckyInfo();
			})

			this.getMoreSessions();
		


			
			var checkbox = new Image();
			checkbox.onload = function () {
				var checkboxImg = new Konva.Image({
					image: checkbox,
					x: 0,
					y: 3,
					width: 18,
					height: 18,
					});
			
					layer_checkbox.add(checkboxImg);
					stage_checkbox.add(layer_checkbox);
					_this.setState({checkboxImg:checkboxImg})
			};
			checkbox.src = img_checkbox_none;

			var uncheckbox = new Image();
			uncheckbox.onload = function () {
				var uncheckboxImg = new Konva.Image({
					image: uncheckbox,
					x: 0,
					y: 3,
					width: 18,
					height: 18,
					visible:false
				});
		
				layer_checkbox.add(uncheckboxImg);
				stage_checkbox.add(layer_checkbox);
				_this.setState({uncheckboxImg:uncheckboxImg})
			};
			uncheckbox.src = img_checkbox_checked;

			var btnExit = new Image();
			btnExit.onload = function () {
				var exitImg = new Konva.Image({
					image: btnExit,
					x: 0,
					y: 0,
					width: 90,
					height: 35
				});
		
				layer_exit.add(exitImg);
				stage_exit.add(layer_exit);
				_this.setState({exitImg:exitImg})
			};
			btnExit.src = btn_thoat;


			var btnFullScreen = new Image();
			btnFullScreen.onload = function () {
				var FullImg = new Konva.Image({
					image: btnFullScreen,
					x: 0,
					y: 0,
					width: 140,
					height: 45
				});
		
				_this.setState({FullImg:FullImg})
			};
			btnFullScreen.src = btn_fullscreen;

		}


		
		this.setState({user:user})

		
		// window.addEventListener('scroll', this.handleScroll);
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

	
	isFacebookApp=()=> {
		var ua = navigator.userAgent || navigator.vendor || window.opera;
		return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
	}

	getLuckyInfo=()=>{
		const {tieuconlai, username, txt_points, list_top_user}=this.state;
		var obj=JSON.parse(localStorage.getItem("obj"))
		var user = JSON.parse(localStorage.getItem("user"));
		if(user!==null){
			this.props.getLuckyInfoSanQua(obj.SessionType, obj.SessionId, user.Token).then(()=>{
				var data=this.props.dataLuckySanqua;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({data:data.Data,code_key:data.Data.Code, countDart: data.Data.AddInfo.Darts, points_sanqua: data.Data.AddInfo.Points,isLoading:true, listTop:data.Data.AddInfo.TopUsers, sessionId: data.Data.SessionId, awardsContent: data.Data.Awards})
						
						username.text(user.Username)
						this.getLevelUser(user)
						tieuconlai.text(`Số phi tiêu còn lại: ${data.Data.AddInfo.Darts}`)
						txt_points.text(data.Data.AddInfo.Points)
						var list_top=data.Data.AddInfo.TopUsers;
						for (let i = 0; i < list_top.length; i++) {
							list_top_user[i].text(this.formatText(list_top[i]))
						}
						this.getStatus(data.Data)
					}else if(data.Status===2){
						this.setState({msg:'Hiện tại phiên chơi đã kết thúc. Mời bạn sang tham gia Đua TOP.'})
						$('#Modalnone').modal('show');
					}else if(data.Status===3){
						this.logoutAction();
					}else{
						console.log("Lỗi")
					}
				}
			})
		}else{
			window.location.replace("/")
		}
		
		
	}

	getMoreSessions=()=>{
		this.props.getMoreSessions().then(()=>{
			var data=this.props.dataSesions;
			if(data!==undefined){
				if(data.Status===0){
					var list=data.Data.filter( i => i.SessionType===2 );
					console.log(list)
					var pos = list.map(function(e) { return e.Status; }).indexOf(1);
					if(pos!==-1){
						this.setState({duatop:true})
					}else{
						this.setState({msg:"Phiên chơi đã kết thúc!"})
					}
				}else if(data.Status===3){
					this.logoutAction();
				}else{
					console.log("Lỗi")
				}
			}
		})
	}

	checkoutCanvas=()=>{
		const {stage, darthVaderImg}=this.state;
		if(JSON.stringify(darthVaderImg) !== '{}'){
			darthVaderImg.hide();
		}
	}
	
	getLevelUser=(user)=>{
		var txt=''
		switch(user.VipLevel) {
			case 1:
				txt="VIP Đồng";
				  break;
			case 2:
				txt="VIP Bạc";
				  break;
			case 3:
				txt="VIP Vàng";
				break;
			case 4:
				txt="VIP Bạch kim";
				  break;
			default:
				txt="VIP Đồng"
		}
		return txt;
	}

	formatText=(data)=>{
		var name=data.Username + ' '.repeat(5+ (14-data.Username.length)*2)
		var str=name+data.Points;
		return str;

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

	visibilityChange=()=>{
		if (document.hidden){
			this.setState({isChangetab:true})
		} else {
			this.setState({isChangetab:false})
		}
		
	}

	setScreenOrientation=()=>{
		const {innerHeight}=this.state;
		if(Math.abs(innerHeight - window.innerHeight) >20){
			window.location.reload();
			this.setState({innerHeight:window.innerHeight})
		}
		// this.toggleFullScreen() 
	}

	onResize=()=>{
	
	}


	// toggleFullScreen=()=> {
	// 	console.log(document.fullscreenElement)
	// 	if (!document.fullscreenElement) {
	// 		document.documentElement.requestFullscreen().catch(err => {
	// 			console.log("error")
	// 		  });
	// 	} else {
	// 	  if (document.exitFullscreen) {
	// 		document.exitFullscreen();
	// 	  }
	// 	}
	//   }

	toggleFullScreen() {
		console.log('AAAAAAAAAAAAA', document.fullscreenElement)
		var elem = document.getElementById("game");
		if (elem.requestFullscreen) {
			elem.requestFullscreen().catch(err => {
				console.log("error")
			});
		} else if (elem.webkitRequestFullscreen) { /* Safari */
			elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).catch(err => {
				console.log("error")
			});
		} else if (elem.msRequestFullscreen) { /* IE11 */
			elem.msRequestFullscreen().catch(err => {
				console.log("error")
			});
		}
	  }


	  getStatus=(luckySpin)=>{
		const {rect_timing}=this.state;
		var StartDate=luckySpin.StartTime;
		var EndDate=luckySpin.EndTime;
		var start=StartDate.substring(StartDate.indexOf("(") +1,StartDate.indexOf(")"));
		var end=EndDate.substring(EndDate.indexOf("(")+1,EndDate.indexOf(")"));
		var time=Date.now();

		var n=end-start;
		var m=end-time;
		var timing=m/n * 110;
		rect_timing.width(timing)
		this.setState({timing: timing+"%"})
		this.timeRemain(end)
	}

	getRandomInt=(min, max)=> {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}



	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};



	getDetailData=()=>{
		
	}

	timeRemain=(times)=>{
		const {tg_conlai}=this.state;
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
				var txt_time= day>0 ? `${day} ngày ${hour}h:${minute}m:${second}s` : `${hour}h:${minute}m:${second}s`
				tg_conlai.text(`Còn: ${txt_time}`);
				// _this.setState({hour_live: hour, minute_live: minute, second_live:second})
			}
		}, 1000); 
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

	touchStart=(e)=>{
		// console.log("touchStart",e.touches)
		const {stage, layer, dartFlightImg, score_text, text_warning, darthVaderImg}=this.state;
		var _this=this;
		// clearTimeout(st_touch);
		if(JSON.stringify(dartFlightImg) !== '{}'){
			dartFlightImg.remove();
		}

		if(JSON.stringify(score_text) !== '{}'){
			score_text.remove();
		}

		if(JSON.stringify(text_warning) !== '{}'){
			text_warning.remove();
		}

		if(e.touches.length===1){
			var touchPos = stage.getPointerPosition();
			var x= touchPos.x-widthFrame/2;
			var y= touchPos.y-heightFrame/2;
			darthVaderImg.x(x);
			darthVaderImg.y(y);
			darthVaderImg.show();
			this.setState({dartPositionY:touchPos.y, none_multi:true})
		}else{
			this.setState({none_multi:false})
		}
		
	}
	
	touchEnd=(e)=>{
		// console.log("touchEnd", e.touches)
		const {tieuconlai, txt_points, list_top_user, awardsContent,  stage, darthVaderImg, dartPositionY, none_multi, countDart,  sessionId, auto_play, code_key, delta}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this=this;
		var arr=[];
		var a=Date.now();
		var isPlay=true;
		if(darted>0){
			if(a-time>1000){
				isPlay=true;
			}else{
				isPlay=false;
			}
		}

		if(none_multi){
			if(isPlay){
				if(countDart>0){
					var touchPos = stage.getPointerPosition();
					var x=touchPos.x;
					var y=touchPos.y;
					curFrame=0;
					n=0;
					// if(dartPositionY >y){
						
					// 	// arr=this.getDealtal(touchPos.x, touchPos.y)
					// 	// this.draw(touchPos.x, arr[0], touchPos.y, arr[1])
					// 	// this.fd(touchPos.x + arr[0] -1, touchPos.y-heightFrame/2 + 4 + arr[1])
					// }else{
					// 	this.showTextWarning()
					// 	// alert("vuốt lên để phi tiêu")
					// }
					this.props.gds(1,sessionId, user.Token, code_key, "iosl", x, y, 54, delta).then(()=>{
						var data=this.props.dataUserSpin;
						if(data.Status===0){

							this.draw(x, data.TargetX - x, y, data.TargetY - y)

							if(data.Darts===0){
								$('#ThongBao').modal('show');
							}

							if(data.Points===0){
								if(auto_play){
									clearInterval(this.state.intervalId);
								}
								$('#myModalchucmung').modal('show');
							}

							
							setTimeout(()=>{
								tieuconlai.text(awardsContent)
							}, 5000);
							setTimeout(()=>{
								this.showScore(data.Score);
								tieuconlai.text(`Số phi tiêu còn lại: ${data.Darts}`);
								txt_points.text(data.Points)
								var list_top=data.TopList;
								for (let i = 0; i < list_top.length; i++) {
									list_top_user[i].text(this.formatText(list_top[i]))
								}
								this.setState({countDart: data.Darts, points_sanqua: data.Points, listTop:data.TopList})
							}, 400);

							darted=+1;
							time=Date.now();
							
						}else if(data.Status===2){
							this.setState({listTop:data.Data,isLoading:false, duatop:false, msg:'Phiên chơi đã kết thúc!'}, ()=>{
								$('#Modalnone').modal('show');
							})
							
						}else if(data.Status===3){
							this.logoutAction();
						}else if(data.Status===4){
							// this.setState({msg_err:data.Message}, ()=>{
							// 	$('#Error').modal('show');
							// })
							this.showTextWarning("Bạn ném tiêu quá nhanh, hãy chậm lại chút!", 150);
						}else if(data.Status===5){
							this.setState({msg_err:'Có lỗi xảy ra!'}, ()=>{
								$('#Error').modal('show');
							})
						}
					})
				}else{
					$('#ThongBao').modal('show');
				}
			}else{
				this.showTextWarning("Bạn ném tiêu quá nhanh, hãy chậm lại chút!", 150);
			}
		}
		
		
		darthVaderImg.hide();
		// st_touch=setTimeout(()=>{
		// 	_this.setState({isPlay:true})
		// }, 1000);
	}

	touchMove=(e)=>{
		// console.log("touchMove",e.touches)
		const {darthVaderImg, none_multi}=this.state;

		if(none_multi){
			if(JSON.stringify(darthVaderImg) !== '{}'){
				var touchPos = e.touches[0];
				var x= touchPos.clientX-widthFrame/2;
				var y= touchPos.clientY-heightFrame/2;
				darthVaderImg.x(x);
				darthVaderImg.y(y);
			}
		}
		
	}
	updateFrame=()=>{
		srcX=curFrame*widthFrame;
		srcY=0;
		curFrame=++curFrame;
	}


	draw=(x,deltalX, y, deltalY)=>{
		var _this=this;
		

		var newX=x + deltalX/12*n;
		var newY=y + deltalY/12*n;
		// console.log("newX:", newX, "newY:",newY)
		const {stage, layer}=this.state;
		var touchPos = stage.getPointerPosition();
		this.updateFrame();
		var dartFlight = new Image();
		dartFlight.onload = function () {
			var dartFlightImg = new Konva.Image({
				image: dartFlight,
				x: newX - widthFrame/2,
				y: newY - heightFrame/2,
				width: widthFrame,
				height: heightFrame,
				// visible:false
				});
			// console.log(dartFlightImg)
			dartFlightImg.crop({x:srcX, y:srcY, width: widthFrame, height: heightFrame})
			layer.add(dartFlightImg);
			stage.add(layer);

			if(curFrame <= 12){
				setTimeout(()=>{
					// dartFlightImg.remove(); 
					n=n+1
					_this.draw(x,deltalX,y,deltalY) 
					
				}, 30);
				setTimeout(()=>{
					dartFlightImg.remove(); 
				}, 60);
			}
			
			_this.setState({dartFlightImg:dartFlightImg})
		};
		dartFlight.src = dart_player;
	}


	

	check_auto=()=>{
		const {checkboxImg, uncheckboxImg, auto_play}=this.state;
		this.setState({auto_play:!auto_play},()=>{
			if(this.state.auto_play){
				checkboxImg.hide();
				uncheckboxImg.show();
				var intervalId = setInterval(this.autoPlay, 2000);
				this.setState({intervalId:intervalId})
				
			}else{
				checkboxImg.show();
				uncheckboxImg.hide();
				clearInterval(this.state.intervalId);
			}
		})
	}

	autoPlay=()=>{
		const {tieuconlai, txt_points, list_top_user,auto_play,  awardsContent,dartFlightImg, isChangetab, countDart,  sessionId, code_key, delta}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		curFrame=0;
		if(countDart>0){
			if(JSON.stringify(dartFlightImg) !== '{}'){
				dartFlightImg.remove();
			}

			this.props.gds(1,sessionId, user.Token, code_key, "iosl", 0, 0, 0, delta).then(()=>{
				var data=this.props.dataUserSpin;
				if(data.Status===0){
					if(!isChangetab){
						this.draw(data.TargetX,0,data.TargetY+54,0);
					}
					
					if(data.Darts===0){
						$('#ThongBao').modal('show');
					}

					if(data.Points===0){
						$('#myModalchucmung').modal('show');
						if(auto_play){
							clearInterval(this.state.intervalId);
						}
						
					}

					setTimeout(()=>{
						tieuconlai.text(awardsContent)
					}, 5000);
					setTimeout(()=>{
						this.showScore(data.Score);
						tieuconlai.text(`Số phi tiêu còn lại: ${data.Darts}`);
						txt_points.text(data.Points)
						var list_top=data.TopList;
						for (let i = 0; i < list_top.length; i++) {
							list_top_user[i].text(this.formatText(list_top[i]))
						}
						this.setState({countDart: data.Darts, points_sanqua: data.Points, listTop:data.TopList})
					}, 400);
					
				}else if(data.Status===2){
					this.setState({listTop:data.Data,isLoading:false, duatop:false, msg:'Phiên chơi đã kết thúc!'}, ()=>{
						$('#Modalnone').modal('show');
					})
					
				}else if(data.Status===3){
					this.logoutAction();
				}else if(data.Status===5){
					this.setState({msg_err:'Có lỗi xảy ra!'}, ()=>{
						$('#Error').modal('show');
					})
				}
			})
		}else{
			$('#ThongBao').modal('show');
		}
	}


	exit=()=>{
		window.location.replace("/")
	}


	showScore=(totalScore)=>{
		
		var score=totalScore>9?totalScore:'0'+totalScore;
		const {layer, stage}=this.state;
		var newH=stage.height() / 2;
		var size=25;
	
		var score_text = new Konva.Text({
			x: stage.width() / 2 -15,
			y: stage.height() / 2,
			text: score,
			fontSize: size,
			fontFamily: 'Calibri',
			text: score,
			fill: 'yellow',
			fontStyle:'bold',
			stroke:'black',
			strokeWidth: 1.5,
			text: score,
		});

		var inter=setInterval(()=>{	
			newH=newH-1;
			size=size+0.1;
			score_text.fontSize(size)
			score_text.y(newH);
		}, 20);

		layer.add(score_text)
		stage.add(layer)
		setTimeout(()=>{ 
			score_text.remove();
			clearInterval(inter)
		}, 1000);

		
		this.setState({score_text:score_text})
	}


	showTextWarning=(content, with_content)=>{
		const {layer, stage}=this.state;
	
		var text_warning = new Konva.Text({
			x: stage.width() / 2 -with_content,
			y: stage.height() / 2,
			text: content,
			fontSize: 25,
			fontFamily: 'Calibri',
			text: content,
			fill: 'yellow',
			fontStyle:'bold',
			stroke:'black',
			strokeWidth: 1,
			text: content,
			width:300,
			align: 'center'
		});


		layer.add(text_warning)
		stage.add(layer)
		setTimeout(()=>{ 
			text_warning.remove();
		}, 1000);

		
		this.setState({text_warning:text_warning})
	}

	render() {

		const {msg, horizontal, auto_play, listTop, duatop, isLoading, msg_err, isVideo}=this.state;

		if(!horizontal){
			return (
				<div>
					<img src={rotate} width="100%" alt="" />
					{/* <!-- The Modal Huong Dan mở phi tiêu từ fb view--> */}
					<div class="modal fade" id="Modalfbview">
							<div class="modal-dialog modal-huongdan_m modal-dialog-scrollable">
								<div class="modal-content bg-transparent border-0">

									<div class="modal-header border-0 p-0">
										<button type="button" class="close text-dark" data-dismiss="modal">&times;</button>
									</div>
									<div class="modal-body border-0 py-0 mb-2 mt-2 px-3 scroll-modal-body_m">
										<div class="container mt-2">
											<h4 class="font-size-3vw_m font-weight-bold">Hướng dẫn mở link game Phi tiêu từ Facebook của điện thoại</h4>
											<dl class="font-size-3vw_m">                
												<dd> Khách hàng lưu ý sử dụng trình duyệt <strong>SAFARI</strong> (đối với điện thoại Iphone) hoặc <strong>CHROME</strong> (đối với điện thoại Android) để mở link game <a href="https://phitieu.splay.vn/" title="">https://phitieu.splay.vn/</a></dd>
												<dt>1.	Đối với điện thoại Iphone: </dt>                
												<dd><strong>Bước 1:</strong> Ấn vào dấu ba chấm tại góc phải</dd>
												<dd> <img src={fb_i2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
												<dd><strong>Bước 2</strong>: Chọn <strong>MỞ TRONG TRÌNH DUYỆT</strong> hoặc <strong>OPEN IN SAFARI</strong> , link game sẽ được mở bằng trình duyệt SAFARI của Iphone</dd>
												<dd> <img src={fb_i3_i4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
												<dd><strong>Bước 3</strong>: Mở khóa tự động xoay màn hình và trải nghiệm game</dd>
												<dd> <img src={fb_i5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
												<dt>2. Đối với điện thoại Android: </dt>                
												<dd><strong>Bước 1</strong>: Ấn vào dấu ba chấm tại góc phải</dd>
												<dd> <img src={fb_a2} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
												<dd><strong>Bước 2</strong>: Chọn <strong>MỞ TRONG TRÌNH DUYỆT</strong> hoặc <strong>OPEN IN BROWSER</strong>, link game sẽ được mở bằng trình duyệt mặc định của điện thoại</dd>
												<dd> <img src={fb_a3_a4} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
												<dd><strong>Bước 3</strong>: Mở khóa tự động xoay màn hình và trải nghiệm game</dd>
												<dd> <img src={fb_a5} width="250" class="img-fluid d-block mx-auto" alt="" /></dd>
												
											</dl> 
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			)
		}

		return (
				<div id="game" style={{backgroundColor:'black'}}>
						{(auto_play)?(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999, backgroundColor:'black'}}></div>):(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999, backgroundColor:'black'}} onTouchStart={(e) =>this.touchStart(e)} onTouchEnd={(e)=>this.touchEnd(e)} onTouchMove={(e)=>this.touchMove(e)}></div>)}
						<div id="div_checkbox" style={{position:'absolute', top:width_bgImg*0.88, left:"1%", zIndex:999999}} onTouchStart={this.check_auto}></div>
						<div id="div_exit" style={{position:'absolute', top:0, left:"87%", zIndex:999999}} onTouchStart={this.exit}></div>

						<div class="modal fade" id="Modalnone" data-keyboard="false" data-backdrop="static" style={{zIndex:9999999}}>
							<div class="modal-dialog modal-dangnhap">
								<div class="modal-content bg-transparent border-0">

								<div class="modal-body border-0">
									{(duatop)?(<div class="modal-body border-0">
										<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">{msg}</h2>
										<p class="text-center pt-1"> <a href="duatop"><img src={btn_duatop} width="120" alt="Active VIP" /></a></p>
									</div>):(<div class="modal-body border-0">
										<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">{msg}</h2>
										{(!isLoading)?(<h2 class="font-size-16 font-weight-bold text-uppercase text-center">Giải này đã thuộc về tài khoản <span class="text-shadow">{listTop[0].Username}</span></h2>):(<div></div>)}
										
										<p class="text-center"> <a href="/"><img src={btn_thoat} width="120" alt="Active VIP" /></a></p>
									</div>)}
								</div>

								</div>
							</div>
						</div>

						<div class="modal fade" id="Error" data-keyboard="false" data-backdrop="static" style={{zIndex:9999999}}>
							<div class="modal-dialog modal-dangnhap">
								<div class="modal-content bg-transparent border-0">
									<div class="modal-header border-0 p-0 text-dark">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
									</div>
									<div class="modal-body border-0">
										<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">{msg_err}</h2>
									</div>
								</div>
							</div>
						</div>

											
						{/* <!-- The Modal Thông báo--> */}
						<div class="modal fade" id="ThongBao" data-keyboard="false" data-backdrop="static" style={{zIndex:9999999}}>
							<div class="modal-dialog modal-dangnhap">
								<div class="modal-content bg-transparent border-0">

								<div class="modal-body border-0">
									<h2 class="pt-5 font-weight-bold text-uppercase text-center" style={{fontSize:14}}>Bạn đã hết Phi Tiêu.</h2>
									<p class="pt-1 font-weight-bold text-uppercase text-center" style={{fontSize:13}}> Vui lòng nạp thêm Scoin để nhận Phi Tiêu và tiếp tục chơi.</p>
									<p class="text-center"><a href="https://scoin.vn/" title="Nạp Scoin" target="_blank"><img src={btn_nap_scoin} width="30%" hspace="10" alt="" /></a><a href="/" title="Thoát"><img src={btn_thoat} width="30%" alt="" /></a></p>
								</div>

								</div>
							</div>
						</div>

						{/* <!-- The Modal Thông báo chúc mừng--> */}
						<div class="modal" id="myModalchucmung" data-keyboard="false" data-backdrop="static" style={{zIndex:9999999}}>
							<div class="modal-dialog">
								<div class="modal-content bg-transparent border-0">

								{/* <!-- Modal body --> */}
								<div class="modal-body bg-chucmung_m justify-content-center">
									<div class="card bg-transparent border-0">
									<div class="card-body content-chucmung_m mx-auto">
										<div class="text-chucmung_m text-center">
											<span class="text-shadow font-weight-bold font-size-18_m">Bạn đã đoạt giải Săn Quà</span>
										</div>
										<p class="pt-2 mb-2 text-center text-shadow" style={{fontSize:14}}>(Phần thưởng đã được chuyển vào tủ đồ sự kiện) <br /></p>
										<button type="button" class="btn btn-danger btn-sm btn-block text-center font-size-14_m" data-dismiss="modal" onClick={this.exit}>Xác nhận</button>
									</div>
									</div>
									
								</div>

								</div>
							</div>
						</div>

						{/* <!-- The Modal Quảng cáo--> */}
						<div class="modal" id="myModalads" style={{zIndex:99999999}}>
							<div class="modal-dialog modal-dialog-centered mt-1 w-50" style={{maxWidth: 400}}>
								<div class="modal-content bg-transparent border-0">

								<div class="modal-header border-0 p-0 text-dark" style={{zIndex: 100}}>
									<button type="button" class="close" data-dismiss="modal">&times;</button>
								</div>

								<div class="modal-body text-center mt-n3 p-0 bg-white border">
									{(!isVideo)?(<a href="https://bit.ly/39cqLve" title="Đấu trường tam quốc" target="_blank" onClick={this.closeAds}><img src={km_dttq} class="img-fluid" /></a>):(<div>
										<video id="myvideo" class="img-fluid" autoPlay playsinline loop muted controls>
											<source src="http://171.244.14.44:3003/dautruongtamquoc.mp4" type="video/mp4"></source>
											Your browser does not support the video tag.
										</video>
										<a class="font-size-14 text-primary pb-2 d-block" href="https://bit.ly/39cqLve" title="Đấu trường tam quốc" target="_blank">&raquo; Truy cập ngay &laquo;</a>
									</div>)}
								</div>

								</div>
							</div>
						</div>
						
				</div>
			)
	}
}

const mapStateToProps = state => ({
	dataLuckySanqua:state.lucky.dataLuckySanqua,
	dataProfile: state.profile.data,
	dataLuckyInfo: state.lucky.dataLuckyInfo,
	dataLuckyItems:state.lucky.dataLuckyItems,
	dataSesions: state.lucky.dataSesions,
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
	getMoreSessions,
	pickCard,
	getInfoUser,
	getItemAward,
	getHistoryTuDo,
	getTuDo,
	getLuckyInfo,
	getLuckyItems,
	userLogout,
	gds,
	getLuckyInfoSanQua
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)
