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
import line_timing from '../images/line-timing.png';
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
var award_open=true;
var n=0;
var animId;
var dartTimerId = 1;
var FLIGHT_ANIM_DELAY = 20;
var SEGMENT_COUNT = 20;
var width = window.screen.width;
var height = window.screen.height;
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
		var delta=window.screen.width/img_w;
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
		console.log("startX:", startX)
		const {horizontal}=this.state;
		this.toggleFullScreen()
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

		}


		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({user:user})

		this.props.getLuckyInfo(1, user.Token).then(()=>{
			var data=this.props.dataLuckyInfo;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({data:data.Data, countDart: data.Data.AddInfo.Darts, points_sanqua: data.Data.AddInfo.Points, listTop:data.Data.AddInfo.TopUsers, sessionId: data.Data.SessionId})
					console.log(data.Data)
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
		this.toggleFullScreen() 
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
		var StartDate=luckySpin.StartTime;
		var EndDate=luckySpin.EndTime;
		var start=StartDate.substring(StartDate.indexOf("(") +1,StartDate.indexOf(")"));
		var end=EndDate.substring(EndDate.indexOf("(")+1,EndDate.indexOf(")"));
		var time=Date.now();

		var n=end-start;
		var m=end-time;
		var timing=m/n * 100
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

	touchStart=()=>{
		const {stage, layer, darthVaderImg, dartFlightImg, score_text, text_warning}=this.state;
		if(JSON.stringify(dartFlightImg) !== '{}'){
			dartFlightImg.remove();
		}

		if(JSON.stringify(score_text) !== '{}'){
			score_text.remove();
		}

		if(JSON.stringify(text_warning) !== '{}'){
			text_warning.remove();
		}
		
		var touchPos = stage.getPointerPosition();
		var x= touchPos.x-20;
		var y= touchPos.y-80;
		darthVaderImg.x(x);
		darthVaderImg.y(y);
		darthVaderImg.show();
		this.setState({dartPositionY:touchPos.y})
		
	}

	touchEnd=()=>{
		const {stage, layer, darthVaderImg, dartPositionY, dartFlightImg, isPlay, countDart}=this.state;
		var _this=this;
		if(isPlay){
			if(countDart>0){
				var touchPos = stage.getPointerPosition();
				curFrame=0
				if(dartPositionY >touchPos.y){
					this.draw(touchPos.x, touchPos.y)
					this.fireDart(touchPos.x, touchPos.y-heightFrame/2 + 12)
				}else{
					this.showTextWarning()
					// alert("vuốt lên để phi tiêu")
				}
				this.setState({isPlay:false})
			}else{
				$('#ThongBao').modal('show');
			}
		}
		darthVaderImg.hide();

		setTimeout(()=>{
			_this.setState({isPlay:true})
		}, 1500);
		
		
	}

	touchMove=()=>{
		const {stage, layer, darthVaderImg, isPlay}=this.state;
		if(JSON.stringify(darthVaderImg) !== '{}'){
			var touchPos = stage.getPointerPosition();
			var x= touchPos.x-20;
			var y= touchPos.y-100;
			darthVaderImg.x(x);
			darthVaderImg.y(y);
		}
	}
	updateFrame=()=>{
		srcX=curFrame*widthFrame;
		srcY=0;
		curFrame=++curFrame;
	}

	draw=(x, y)=>{
		const {dartFlightImg}=this.state;
		var _this=this
		const {stage, layer}=this.state;
		var touchPos = stage.getPointerPosition();
		this.updateFrame();
		var dartFlight = new Image();
		dartFlight.onload = function () {
			var dartFlightImg = new Konva.Image({
				image: dartFlight,
				x: x - widthFrame/2,
				y: y - heightFrame/2,
				width: widthFrame,
				height: heightFrame,
				// visible:false
				});
				
			dartFlightImg.crop({x:srcX, y:srcY, width: widthFrame, height: heightFrame})
			layer.add(dartFlightImg);
			stage.add(layer);
			if(curFrame <= 12){
				setTimeout(()=>{
					_this.draw(x,y) 
					dartFlightImg.remove(); 
				}, 23);
			}
			
			_this.setState({dartFlightImg:dartFlightImg})
		};
		dartFlight.src = dart_player;
		
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
		const {sessionId} =this.state;
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

		this.props.getDartScore(1, totalScore,sessionId, user.Token).then(()=>{
			var data=this.props.dataUserSpin;
			if(data.Status===0){
				this.setState({countDart: data.Darts, points_sanqua: data.Points, listTop:data.TopList})
			}else if(data.Status===2){
				this.setState({listTop:data.Data, msg:'Quà đã có chủ, phiên chơi kết thúc, mời bạn sang tham gia Đua TOP'}, ()=>{
					$('#Modalnone').modal('show');
				})
				
			}
		})

		setTimeout(()=>{
			this.showScore(totalScore)
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
				this.draw(x,y+heightFrame/2);
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

		return (
				<div id="game" style={{overflowBlock:'hidden'}}>
					{(horizontal)?(<div class="bg-page-sanqua_m position-relative">
						<div class="tongdiem_m">
							<h2 class="font-size-2vw_m text-uppercase font-weight-bold text-center mb-1 text-shadow_m">Tổng điểm</h2>
							<h4 class="font-size-2vw_m text-uppercase text-center text-shadow_m">{points_sanqua}</h4>
						</div>
						<div class="phongtudong_m font-size-2vw_m font-weight-bold text-uppercase text-shadow_m">
							 Phóng phi tiêu tự động
						</div>

						<div class="timing_m">
							<div class="media">
								<img src={icon_clock} class="align-self-center mt-n1" width="13%" alt="clock"/>
								<div class="media-body">
									<div class="bg-line-timing_m">
									<span style={{background:"#f5950a", width: timing, height: 8, display:"block", borderRadius: 4}}>&nbsp;</span>
									</div>
									<h6 class="text-yellow font-size-1vw_m pl-1 text-shadow">Còn: {day>0 ? `${day} ngày ${hour}:${minute}:${second}` : `${hour}:${minute}:${second}`}</h6>
								</div>
							</div>
						</div>
						<div class="account-name_m">
							<p class="font-size-1vw_m text-white mb-0 text-center">{user.Username}</p>
							{(user.VipLevel===1)?(<h2 class="font-size-1vw_m text-warning m-0 text-center">VIP Đồng <img src={vip_dong} alt="VIP Đồng" width="16" /></h2>):(<div></div>)}
							{(user.VipLevel===2)?(<h2 class="font-size-1vw_m text-warning m-0 text-center">VIP Bạc <img src={vip_bac} alt="VIP Bạc" width="16" /></h2>):(<div></div>)}
							{(user.VipLevel===3)?(<h2 class="font-size-1vw_m text-warning m-0 text-center">VIP Vàng <img src={vip_vang} alt="VIP Vàng" width="16" /></h2>):(<div></div>)}
							{(user.VipLevel===4)?(<h2 class="font-size-1vw_m text-warning m-0 text-center">VIP Bạch kim <img src={vip_bachkim} alt="VIP Bạch kim" width="16" /></h2>):(<div></div>)}
						</div>

						<div class="phitieu-status_m marquee_m">
							<div class="marquee_inner_m">            
								<span class="m-0 font-size-1vw_m font-weight-bold text-shadow_m pr-5">Số phi tiêu còn lại: <strong>{countDart}</strong></span>		
								<span class="m-0 font-size-1vw_m font-weight-bold text-shadow_m pr-5">Nhanh tay giật giải IP12 trị giá 50 củ</span>	
							</div>    	
						</div>

						
						
						<div class="toplist-account_m">
							<h2 class="font-size-2vw_m m-0 font-weight-bold text-shadow text-center">Danh sách TOP</h2>
							<table class="table table-borderless font-size-3vw_m mb-0 mt-1" style={{tableLayout: "fixed", borderCollapse: "collapse", lineHeight: "100%"}}>
								<tbody>
									{listTop.map((obj, key) => (
										<tr class="bg-border-bottom_m" key={key}>
											<td class="p-0 w-50 font-size-1vw_m text-shadow">{obj.Username}</td>
											<td class="p-0 w-50 font-size-1vw_m text-shadow pl-2">{obj.Points}</td>                
										</tr>
									))}		
								</tbody>
							</table>
    					</div>

						{/* {(auto_play)?(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}}></div>):(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}} onMouseDown={this.touchStart} onMouseUp={this.touchEnd} onMouseMove={this.touchMove}></div>)} */}
						<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}></div>
						<div id="div_checkbox" style={{position:'absolute', top:"72%", left:"1%", zIndex:999999}} onTouchStart={this.check_auto}></div>
						<div id="div_exit" style={{position:'absolute', top:0, left:"85%", zIndex:999999}} onTouchStart={this.exit}></div>
					</div>):(<div>
						<img src={rotate} width="100%" alt="" />
					</div>)}

						{/* <!-- The Modal Thông báo--> */}
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
