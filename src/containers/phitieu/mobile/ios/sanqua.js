import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { render } from 'react-dom';
// import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
import { connect } from 'react-redux'
import '../css/style.css';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
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


import icon_clock from '../images/icon-clock.png';
import line_timing from '../images/bg-line-timing.png';
import btn_fullscreen from '../images/btn-fullscreen.png';
import phitieu from '../images/phitieu.png';
import dart_player from '../images/dart-player.png';
import img_checkbox_none from '../images/img-checkbox-none.png';
import img_checkbox_checked from '../images/img-checkbox-checked.png';
import btn_thoat from '../images/btn-thoat.png';
import btn_duatop from '../images/btn-duatop.png';
import vip_kimcuong from '../images/vip-kimcuong.png';
import vip_bachkim from '../images/vip-bachkim.png';
import vip_vang from '../images/vip-vang.png';
import vip_bac from '../images/vip-bac.png';
import vip_dong from '../images/vip-dong.png';
import rotate from '../images/rotate.png';

import bg_page_sanqua from '../images/bg-page-sanqua.png';



import ReactResizeDetector from 'react-resize-detector'
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

var startX=370, endX=587, startY=170, endY=387;
var img_w=960;
var img_h=450
var award_open=true;
var n=0;
var animId;
var dartTimerId = 1;
var FLIGHT_ANIM_DELAY = 20;
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

var Dart_Center_X=478;
var Dart_Center_Y=280;
var radius=108;

var SEGMENT_SIZE = Math.PI/10.0;
var SEGMENTS = [4, 9, 57, 67, 99, 108];
var SEGMENT_NAMES = ['50','25','value','tripple','value','double','out'];
var SCORE_VALUES = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6];

var segmentIndex = 0; // index vysece
var segmentType = 0;  // typ policka
var segment = 0;
var width_bgImg=0;

var totalScore = 0;



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
			none_multi:false
		};
	}
	componentWillMount(){
		console.log(document.fullscreenElement)
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.addEventListener("visibilitychange", this.visibilityChange);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth});
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
	}




	componentDidMount(){
		const {horizontal}=this.state;
		var deltal_img=img_w/img_h;
		var deltal_device=width/height;
		var bg_x=0, bg_y=0;
		var list_top_user=[];
		var user = JSON.parse(localStorage.getItem("user"));

		// this.toggleFullScreen();
		if(width/height > 2){
			bg_x=width;
			bg_y=height*deltal_img/deltal_device;
		}else{
			bg_x=width;
			bg_y=height*deltal_device/deltal_img;
		}
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
				x: bg_x*0.41,
				y: bg_y*0.10,
				text:"Số phi tiêu còn lại: 0",
				fontSize: 14,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 380,
				padding: 10,
				align: 'left',
			 });

			 var giaithuong = new Konva.Text({
				x: bg_x*0.35,
				y: bg_y*0.15,
				text:"Nhanh tay giật giải IP12 trị giá 50 củ",
				fontSize: 14,
				fontFamily: 'Calibri',
				fill: 'yellow',
				width: 380,
				padding: 10,
				align: 'left',
			 });



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
				x: bg_x*0.71,
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

			layer.add(giaithuong)
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
				this.getLuckyInfo(1);
			})
		


			
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

	getLuckyInfo=(type)=>{
		const {tieuconlai, username, vip_level, txt_points, tg_conlai, list_top_user}=this.state;
		console.log(username)
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getLuckyInfo(type, user.Token).then(()=>{
			var data=this.props.dataLuckyInfo;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({data:data.Data, countDart: data.Data.AddInfo.Darts, points_sanqua: data.Data.AddInfo.Points, listTop:data.Data.AddInfo.TopUsers, sessionId: data.Data.SessionId})
					
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
					this.setState({msg:'Hiện tại chưa đến giờ săn quà, mời bạn sang tham gia Đua TOP'})
					$('#Modalnone').modal('show');
				}else if(data.Status===3){
					this.logoutAction();
				}else{
					console.log("Lỗi")
				}
			}
		})
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
		axios.get('https://api.splay.vn/luckywheel/luckywheel/user-signout/', header).then(function (response) {
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
		const {innerWidth}=this.state;
		if(Math.abs(innerWidth - window.innerWidth) >100){
			window.location.reload();
			this.setState({innerWidth:window.innerWidth})
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
		const {tg_conlai, data}=this.state;
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

	touchStart=(e)=>{
		console.log('AAAAAAAAAA')
		// console.log("touchStart",e.touches)
		const {stage, layer, darthVaderImg, dartFlightImg, score_text, text_warning}=this.state;
		var _this=this;
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
			var imageObj = new Image();
			imageObj.onload = function () {
				var darthVaderImg = new Konva.Image({
					image: imageObj,
					x: touchPos.x-widthFrame/2,
					y: touchPos.y-heightFrame/2,
					width: 28,
					height: 120,
					draggable: true,
					});
			
					layer.add(darthVaderImg);
					stage.add(layer);
					_this.setState({darthVaderImg:darthVaderImg})
			};
			imageObj.src = phitieu;
			
			this.setState({dartPositionY:touchPos.y, none_multi:true})
		}else{
			this.setState({none_multi:false})
		}
		
	}
	
	touchEnd=(e)=>{
		// console.log("touchEnd", e.touches)
		const {stage, darthVaderImg, dartPositionY, isPlay, none_multi, countDart}=this.state;
		var _this=this;
		var arr=[];
		if(none_multi){
			if(isPlay){
				if(countDart>0){
					var touchPos = stage.getPointerPosition();
					curFrame=0;
					n=0;
					if(dartPositionY >touchPos.y){
						arr=this.getDealtal(touchPos.x, touchPos.y)
						this.draw(touchPos.x, arr[0], touchPos.y, arr[1])
						this.fireDart(touchPos.x + arr[0], touchPos.y-heightFrame/2 + 12 + arr[1])
					}else{
						this.showTextWarning()
						// alert("vuốt lên để phi tiêu")
					}
					this.setState({isPlay:false})
				}else{
					$('#ThongBao').modal('show');
				}
			}
		}
		
		
		darthVaderImg.hide();
		setTimeout(()=>{
			_this.setState({isPlay:true})
		}, 1500);
	}

	touchMove=(e)=>{
		// console.log("touchMove",e.touches)
		const {stage, layer, darthVaderImg, isPlay, none_multi}=this.state;

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

	// draw=(x, y)=>{
	// 	var _this=this
	// 	const {stage, layer}=this.state;
		
	// 	var dartFlight = new Image();
	// 	dartFlight.onload = function () {
	// 		var dartFlightImg = new Konva.Image({
	// 			image: dartFlight,
	// 			x: x - widthFrame/2,
	// 			y: y - heightFrame/2,
	// 			width: widthFrame,
	// 			height: heightFrame,
	// 			// visible:false
	// 			});
				
	// 		dartFlightImg.crop({x:srcX, y:srcY, width: widthFrame, height: heightFrame})
	// 		layer.add(dartFlightImg);
	// 		stage.add(layer);
	// 		if(curFrame <= 12){
	// 			setTimeout(()=>{
	// 				// dartFlightImg.remove(); 
	// 				_this.draw(x,y) 
	// 			}, 25);
	// 			setTimeout(()=>{
	// 				dartFlightImg.remove(); 
	// 			}, 50);
	// 		}
			
	// 		_this.setState({dartFlightImg:dartFlightImg})
	// 	};
	// 	dartFlight.src = dart_player;
	// 	this.updateFrame();
		
	// }

	draw=(x,deltalX, y, deltalY)=>{
		const {dartFlightImg}=this.state;
		var _this=this;
		

		var newX=x + deltalX/13*n;
		var newY=y + deltalY/13*n;
		console.log("newX:", newX, "newY:",newY)
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
			console.log(dartFlightImg)
			dartFlightImg.crop({x:srcX, y:srcY, width: widthFrame, height: heightFrame})
			layer.add(dartFlightImg);
			stage.add(layer);

			if(curFrame <= 12){
				setTimeout(()=>{
					// dartFlightImg.remove(); 
					_this.draw(x,deltalX,y,deltalY) 
					n=n+1
				}, 25);
				setTimeout(()=>{
					dartFlightImg.remove(); 
				}, 50);
			}
			
			_this.setState({dartFlightImg:dartFlightImg})
		};
		dartFlight.src = dart_player;
	}


	getDealtal=(xpos,ypos)=>{
		var dx = Dart_Center_X - xpos;
		var dy = Dart_Center_Y - ypos;
		var x=0;
		var y=0;

		var delta = Math.sqrt(dx*dx+dy*dy);

		if(delta<10){
			x=this.getRandomInt(25, -25)
			y=this.getRandomInt(25, -25)
		}else if(delta >10 && delta <= 60){
			x=this.getRandomInt(35, -35)
			y=this.getRandomInt(35, -35)
		}else if(delta >60 && delta <= 100){
			x=this.getRandomInt(45, -45)
			y=this.getRandomInt(45, -45)
		}else if(delta >100 && delta <= 130){
			x=this.getRandomInt(50, -50)
			y=this.getRandomInt(50, -50)
		}
		return [x,y];
	}

	fireDart=(tarX, tarY)=> {
		this.computeHit(tarX,tarY);
		this.generateScore();
	}

	
    computeHit=(xpos,ypos)=> {

		var dx = Dart_Center_X - xpos;
		var dy = Dart_Center_Y - ypos;
	
		// var angle = Math.atan2(dx,dy)-angleOffset*2;
		var angle = Math.atan2(dy,dx);
		var delta = Math.sqrt(dx*dx+dy*dy);


		var sg = 0;
		for (var i = 0; i < 6; i++) {
			if (delta > SEGMENTS[i])
			sg = i+1;
		}

		segmentType = sg;
		segmentIndex = Math.round(-angle * (180.0/Math.PI)+180.0);
	
	
		segment = Math.round((segmentIndex)  / (360.0/SEGMENT_COUNT));
	
	
	}

	generateScore=()=> {
		const {tieuconlai, txt_points, sessionId, list_top_user}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this=this;
		if (SEGMENT_NAMES[segmentType] == 'out') {
	
			totalScore = 0; // mimo herni pole
	
		} else
		if (SEGMENT_NAMES[segmentType] == '50') {
	
			totalScore = 50; // cisty stred
	
			} else {
	
			if (SEGMENT_NAMES[segmentType] == '25') {
	
				totalScore = 25; // sirsi stred
	
			} else {
	
				totalScore = SCORE_VALUES[segment];
	
				if (SEGMENT_NAMES[segmentType] == 'double') totalScore *= 2;  // vnejsi okraj - double
				if (SEGMENT_NAMES[segmentType] == 'tripple') totalScore *= 3; // prostredni pole - tripple
			}
		}

		

		setTimeout(()=>{
			this.showScore(totalScore);
			this.props.getDartScore(1, totalScore,sessionId, user.Token).then(()=>{
				var data=this.props.dataUserSpin;
				if(data.Status===0){
					if(data.Darts===0){
						$('#ThongBao').modal('show');
					}
					tieuconlai.text(`Số phi tiêu còn lại: ${data.Darts}`)
					txt_points.text(data.Points)
					var list_top=data.TopList;
					for (let i = 0; i < list_top.length; i++) {
						list_top_user[i].text(this.formatText(list_top[i]))
					}
					this.setState({countDart: data.Darts, points_sanqua: data.Points, listTop:data.TopList})
				}else if(data.Status===2){
					this.setState({listTop:data.Data, msg:'Quà đã có chủ, phiên chơi kết thúc, mời bạn sang tham gia Đua TOP'}, ()=>{
						$('#Modalnone').modal('show');
					})
					
				}
			})
		}, 400);
		
			// console.log('AA:', totalScore)
	}


	check_auto=()=>{
		const {checkboxImg, uncheckboxImg, auto_play, dartFlightImg}=this.state;
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
		const {checkboxImg, uncheckboxImg, auto_play, dartFlightImg, countDart, isChangetab}=this.state;
		curFrame=0;
		if(countDart>0){
			if(JSON.stringify(dartFlightImg) !== '{}'){
				dartFlightImg.remove();
			}
			var x=this.getRandomInt(startX, endX);
			var y=this.getRandomInt(startY, endY);
			if(!isChangetab){
				this.draw(x,0,y+heightFrame/2,0);
			}
			this.fireDart(x, y + 12)
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


	showTextWarning=()=>{
		const {layer, stage}=this.state;
	
		var text_warning = new Konva.Text({
			x: stage.width() / 2 -100,
			y: stage.height() / 2,
			text: "Vuốt lên để phi tiêu!",
			fontSize: 25,
			fontFamily: 'Calibri',
			text: "Vuốt lên để phi tiêu!",
			fill: 'yellow',
			fontStyle:'bold',
			stroke:'black',
			strokeWidth: 1,
			text: "Vuốt lên để phi tiêu!",
		});


		layer.add(text_warning)
		stage.add(layer)
		setTimeout(()=>{ 
			text_warning.remove();
		}, 1000);

		
		this.setState({text_warning:text_warning})
	}

	render() {

		const {msg, user, image, horizontal, auto_play, timing, day, hour, minute, second, data, countDart, points_sanqua, listTop, isPlay}=this.state;

		if(!horizontal){
			return (
				<div>
					<img src={rotate} width="100%" alt="" />
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
									<h2 class="font-size-16 pt-5 font-weight-bold text-uppercase text-center">{msg}</h2>
									<p class="text-center"> <a href="duatop"><img src={btn_duatop} width="120" alt="Active VIP" /></a></p>
								</div>

								</div>
							</div>
						</div>

											
						{/* <!-- The Modal Thông báo--> */}
						<div class="modal fade" id="ThongBao" style={{zIndex:9999999}}>
							<div class="modal-dialog modal-dangnhap">
								<div class="modal-content bg-transparent border-0">

								<div class="modal-body border-0">
									<h2 class="font-size-16 pt-5 font-weight-bold text-uppercase text-center">Bạn đã hết tiêu</h2>
									<p class="text-center"> <a href="duatop"><img src={btn_duatop} width="120" alt="Active VIP" /></a></p>
								</div>

								</div>
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
