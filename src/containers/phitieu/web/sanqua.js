import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { render } from 'react-dom';
// import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
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
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	getDartScore,
} from '../../../modules/lucky'
import {
	getData
} from '../../../modules/profile';


import icon_clock from './images/icon-clock.png';
import line_timing from './images/line-timing.png';
import phitieu from './images/phitieu.png';
import dart_player from './images/dart-player.png';
import img_checkbox_none from './images/img-checkbox-none.png';
import img_checkbox_checked from './images/img-checkbox-checked.png';
import btn_thoat from './images/btn-thoat.png';
import btn_duatop from './images/btn-duatop.png';
import vip_kimcuong from './images/vip-kimcuong.png';
import vip_bachkim from './images/vip-bachkim.png';
import vip_vang from './images/vip-vang.png';
import vip_bac from './images/vip-bac.png';
import vip_dong from './images/vip-dong.png';
import btn_nap_scoin from './images/btn-nap-scoin.png';

import ReactResizeDetector from 'react-resize-detector'
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

var startX=500, endX=745, startY=250, endY=490;

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
var spriteWidth = 598; 
var spriteHeight = 200; 
var widthFrame = spriteWidth/frameCount; 
var heightFrame = spriteHeight; 
var srcX=0; 
var srcY=0; 

var Dart_Center_X=619;
var Dart_Center_Y=375;
var radius=134;

var SEGMENT_SIZE = Math.PI/10.0;
var SEGMENTS = [8, 15, 73, 83, 124, 134];
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
			isChangetab:false

		};
	}
	componentWillMount(){
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.addEventListener("visibilitychange", this.visibilityChange);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth})
		console.log("window.screen.height", window.screen.height)
		console.log("window.innerHeight", window.innerHeight)
		
		// if (!this.isConsoleOpen) {
		// 	window.location.replace("/")
		// }
		// this.isConsoleOpen();
	}





	componentDidMount(){
		var stage = new Konva.Stage({
			container: 'canvas',
			width: 1244,
			height: 680,
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
				width: 46,
				height: 200,
				draggable: true,
				visible:false
				});
		
				layer.add(darthVaderImg);
				stage.add(layer);
				_this.setState({darthVaderImg:darthVaderImg})
		};
		imageObj.src = phitieu;

		// var dartFlight = new Image();
		// dartFlight.onload = function () {
		// 	var dartFlightImg = new Konva.Image({
		// 		image: dartFlight,
		// 		x: 0,
		// 		y: 0,
		// 		width: 200,
		// 		height: 137,
		// 		visible:false
		// 		});
		
		// 		layer.add(dartFlightImg);
		// 		stage.add(layer);
		// 		_this.setState({dartFlightImg:dartFlightImg})
		// };
		// dartFlight.src = dart_player;

		var checkbox = new Image();
		checkbox.onload = function () {
			var checkboxImg = new Konva.Image({
				image: checkbox,
				x: 0,
				y: 3,
				width: 20,
				height: 20,
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
				width: 20,
				height: 20,
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
				width: 100,
				height: 40
			});
	
			layer_exit.add(exitImg);
			stage_exit.add(layer_exit);
			_this.setState({exitImg:exitImg})
		};
		btnExit.src = btn_thoat;



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

	getRandomInt=(min, max)=> {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	setScreenOrientation=()=>{
		const {innerWidth}=this.state;
		if(Math.abs(innerWidth - window.innerWidth) >100){
			window.location.reload();
			this.setState({innerWidth:window.innerWidth})
		}

		// if (!this.isConsoleOpen) {
		// 	window.location.replace("/")
		// }
		// this.isConsoleOpen();
	}

	onResize=()=>{

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






	touchStart=()=>{
		const {stage, layer, darthVaderImg, dartFlightImg, text_warning, score_text}=this.state;
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
		var arr=[];
		if(isPlay){
			if(countDart>0){
				var touchPos = stage.getPointerPosition();
				curFrame=0;
				n=0;
				if(dartPositionY >touchPos.y){
					arr=this.getDealtal(touchPos.x, touchPos.y)
					console.log(arr)
					this.draw(touchPos.x, arr[0], touchPos.y, arr[1])
					this.fireDart(touchPos.x + arr[0], touchPos.y-heightFrame/2 + 12 + arr[1])
				}else{
					// alert("vuốt lên để phi tiêu")
					this.showTextWarning();
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
					_this.draw(x,deltalX,y,deltalY) 
					dartFlightImg.remove(); 
					n=n+1
				}, 23);
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

		setTimeout(()=>{
			this.showScore(totalScore);
			this.props.getDartScore(1, totalScore,sessionId, user.Token).then(()=>{
				var data=this.props.dataUserSpin;
				if(data.Status===0){
					if(data.Darts===0){
						$('#ThongBao').modal('show');
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
			x: stage.width() / 2 -120,
			y: stage.height() / 2,
			text: "Vuốt lên để phi tiêu!",
			fontSize: 30,
			fontFamily: 'Calibri',
			text: "Vuốt lên để phi tiêu!",
			fill: 'yellow',
			stroke:'black',
			strokeWidth: 1,
			text: "Vuốt lên để phi tiêu!",
		});


		layer.add(text_warning)
		stage.add(layer)
		setTimeout(()=>{ 
			text_warning.remove();
		}, 2000);

		
		this.setState({text_warning:text_warning})
	}




	render() {
		const {msg, user, image, auto_play, timing, day, hour, minute, second, data, countDart, points_sanqua, listTop, isPlay}=this.state;


		return (<div class="bg-page-sanqua position-relative">
					<div class="phitieu">
						<div class="img-phitieu"></div>
					</div>
					<div class="tongdiem">
						<h2 class="font-size-18 text-uppercase font-weight-bold text-center mb-1 text-shadow">Tổng điểm</h2>
						<h4 class="font-size-18 text-uppercase text-center text-shadow">{points_sanqua}</h4>
					</div>
					<div class="phongtudong font-size-18 font-weight-bold text-uppercase text-shadow">
						Phóng phi tiêu tự động    
					</div>
					{/* <div class="timing">
						<div class="media">
						<img src={icon_clock} class="align-self-center mt-n1" width="32" alt="clock" />
						<div class="media-body">
							<img class="m-0 p-0 mt-n3" src={line_timing} width="200" alt="Line" />
							<h6 class="text-yellow font-size-16 mt-n1n pl-1 text-shadow">Còn: 2d 10h 22p 11s</h6>
						</div>
						</div>
					</div> */}


					<div class="timing">
						<div class="media">
							<img src={icon_clock} class="align-self-center mt-n1" width="32" alt="clock" />
							<div class="media-body">
								<div class="bg-line-timing">
									<span style={{background:"#f5950a", width: timing, height: "12px", display: "block", borderRadius: 4}}>&nbsp;</span>
								</div>
								<h6 class="text-yellow font-size-16 mt-n1 pl-1 text-shadow">Còn: {day>0 ? `${day} ngày ${hour}:${minute}:${second}` : `${hour}:${minute}:${second}`}</h6>
							</div>
						</div>
					</div>
					<div class="account-name">
						<p class="font-size-16 text-white mb-0 text-center">{user.Username}</p>
						{(user.VipLevel===1)?(<h2 class="font-size-14 text-warning m-0 text-center">VIP Đồng <img src={vip_dong} alt="VIP Đồng" width="16" /></h2>):(<div></div>)}
						{(user.VipLevel===2)?(<h2 class="font-size-14 text-warning m-0 text-center">VIP Bạc <img src={vip_bac} alt="VIP Bạc" width="16" /></h2>):(<div></div>)}
						{(user.VipLevel===3)?(<h2 class="font-size-14 text-warning m-0 text-center">VIP Vàng <img src={vip_vang} alt="VIP Vàng" width="16" /></h2>):(<div></div>)}
						{(user.VipLevel===4)?(<h2 class="font-size-14 text-warning m-0 text-center">VIP Bạch kim <img src={vip_bachkim} alt="VIP Bạch kim" width="16" /></h2>):(<div></div>)}
					</div>
					{/* <div class="btn-login">
						<img src={btn_thoat} width="100" alt="" />
					</div> */}
					<div class="phitieu-status marquee">
						<div class="marquee_inner">            
							<span class="m-0 font-size-16 font-weight-bold text-shadow pr-5">Số phi tiêu còn lại: <strong>{countDart}</strong></span>		
							<span class="m-0 font-size-16 font-weight-bold text-shadow pr-5">Nhanh tay giật giải IP12 trị giá 50 củ</span>	
						</div>    	
					</div>
					<div class="toplist-account text-center">
						<h2 class="font-size-18 m-0 font-weight-bold text-shadow text-center">Danh sách TOP</h2>
						<table class="table table-borderless font-size-14 mb-0 mt-1" style={{tableLayout: "fixed", borderCollapse: "collapse", lineHeight: "210%"}}>
							<tbody>
								{listTop.map((obj, key) => (
									<tr class="bg-border-bottom" key={key}>
										<td class="p-0 w-50 font-size-16 text-shadow">{obj.Username}</td>
										<td class="p-0 w-50 font-size-16 text-shadow pl-2">{obj.Points}</td>                
									</tr>
								))}			
							</tbody>
						</table>
					</div>
					<div>{(auto_play)?(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}}></div>):(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}} onMouseDown={this.touchStart} onMouseUp={this.touchEnd} onMouseMove={this.touchMove}></div>)}</div>
					
					
					<div id="div_checkbox" style={{position:'absolute', top:"90%", left:"37%", zIndex:999999}} onMouseDown={this.check_auto}></div>
					<div id="div_exit" style={{position:'absolute', top:0, left:"83%", zIndex:999999}} onMouseDown={this.exit}></div>
					
					{/* <!-- The Modal Thông báo--> */}
					<div class="modal fade" id="Modalnone" data-keyboard="false" data-backdrop="static" style={{zIndex:9999999}}>
						<div class="modal-dialog modal-dangnhap">
							<div class="modal-content bg-transparent border-0">

							<div class="modal-body border-0">
								<h2 class="font-size-16 pt-4 font-weight-bold text-uppercase text-center">{msg}</h2>
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
								<h2 class="font-size-16 pt-5 font-weight-bold text-uppercase text-center">Bạn đã hết Phi Tiêu.</h2>
								<p class="font-size-16 font-weight-bold text-uppercase text-center"> Vui lòng nạp thêm Scoin để nhận Phi Tiêu và tiếp tục chơi.</p>
								<p class="text-center"><a href="https://scoin.vn/" title="Nạp Scoin" target="_blank"><img src={btn_nap_scoin} width="100" hspace="10" alt="" /></a><a title="Thoát" onClick={this.exit}><img src={btn_thoat} width="100" alt="" /></a></p>
							</div>

							</div>
						</div>
					</div>

					<div class="modal" id="myModalchucmung">
						<div class="modal-dialog">
							<div class="modal-content bg-transparent border-0">

							{/* <!-- Modal body --> */}
							<div class="modal-body bg-chucmung justify-content-center">
								<div class="card bg-transparent border-0">
								<div class="card-body content-chucmung mx-auto">
									<div class="text-chucmung text-center">
										<span class="text-shadow font-weight-bold">Bạn đã đoạt giải Săn Quà</span>
									</div>
									<p class="small pt-2 mb-2 text-center text-shadow font-size-14">(Phần thưởng đã được chuyển vào tủ đồ sự kiện)</p>
									<button type="button" class="btn btn-danger btn-sm btn-block text-center font-size-14" data-dismiss="modal">Xác nhận</button>
								</div>
								</div>
								
							</div>

							</div>
						</div>
					</div>
		</div>
	)}
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
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
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
	getHistoryTuDo,
	getData,
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
