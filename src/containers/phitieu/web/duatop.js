import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { render } from 'react-dom';
// import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
import { connect } from 'react-redux'
import './css/style_web.css';
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
} from '../../../modules/profile';


import icon_clock from './images/icon-clock.png';
import line_timing from './images/line-timing.png';
import phitieu from './images/phitieu.png';
import dart_player from './images/dart-player.png';
import img_checkbox_none from './images/img-checkbox-none.png';
import img_checkbox_checked from './images/img-checkbox-checked.png';
import btn_thoat from './images/btn-thoat.png';

import ReactResizeDetector from 'react-resize-detector'
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};


var startX=430, endX=805, startY=190, endY=560;

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

			itemOfSpin:[],
			luckySpin:{},

			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listHistory:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
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
			linkLiveStream:'',
			isLive:false,
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
			score_text:{}

		};
	}
	componentWillMount(){
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth})
	}

	componentDidUpdate(oldProps) {
		// if (oldProps.src !== this.props.src) {
		//   this.loadImage();
		// }
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
	
	}

	getStatus=(luckySpin)=>{
		var StartDate=luckySpin.StartDate;
		var EndDate=luckySpin.EndDate;
		var start=StartDate.substring(StartDate.indexOf("(") +1,StartDate.indexOf(")"));
		var end=EndDate.substring(EndDate.indexOf("(")+1,EndDate.indexOf(")"));
		// console.log(start, end)
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



	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};



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
		// console.log(current)
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


	touchStart=()=>{
		const {stage, layer, darthVaderImg, dartFlightImg, score_text}=this.state;
		if(JSON.stringify(dartFlightImg) !== '{}'){
			dartFlightImg.remove();
		}

		if(JSON.stringify(score_text) !== '{}'){
			score_text.remove();
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
		const {stage, layer, darthVaderImg, dartPositionY, dartFlightImg}=this.state;
		var touchPos = stage.getPointerPosition();
		curFrame=0
		darthVaderImg.hide();
		if(dartPositionY >touchPos.y){
			this.draw(touchPos.x, touchPos.y)
			// console.log('touchPosX:', touchPos.x, 'touchPosY:',touchPos.y)
			this.fireDart(touchPos.x, touchPos.y-heightFrame/2 + 12)
		}else{
			alert("vuốt lên để phi tiêu")
		}
		
	}

	touchMove=()=>{
		const {stage, layer, darthVaderImg}=this.state;
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
		this.showScore(totalScore)
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
		
		const {checkboxImg, uncheckboxImg, auto_play, dartFlightImg}=this.state;
		curFrame=0;
		if(JSON.stringify(dartFlightImg) !== '{}'){
			dartFlightImg.remove();
		}
		var x=this.getRandomInt(startX, endX);
		var y=this.getRandomInt(startY, endY);
		this.draw(x,y);
		this.fireDart(x, y-heightFrame/2 + 12)
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
			score_text.remove()
			clearInterval(inter)
		}, 1000);
		this.setState({score_text:score_text})
	}




	render() {
		const {user, image, auto_play, timing}=this.state;


		return (<div class="bg-page-duatop position-relative">
		<div class="phitieu">
			<div class="img-phitieu"></div>
		</div>
		<div class="tongdiem">
			<h2 class="font-size-16 text-uppercase font-weight-bold text-center mb-1 text-shadow">Tổng điểm</h2>
			<h4 class="font-size-18 text-uppercase text-center text-shadow">699669</h4>
		</div>
		<div class="phongtudong font-size-18 font-weight-bold text-uppercase text-shadow">
			Phóng phi tiêu tự động
		</div>
		<div class="timing">
			<div class="media">
				<img src={icon_clock} class="align-self-center mt-n1" width="32" alt="clock" />
				<div class="media-body">
					<div class="bg-line-timing">
						<span style={{background:"#f5950a", width: timing, height: "12px", display: "block", borderRadius: 4}}>&nbsp;</span>
					</div>
					<h6 class="text-yellow font-size-16 mt-n1 pl-1 text-shadow">Còn: 2 ngày 10:22:11</h6>
				</div>
			</div>
		</div>
		<div class="account-name">
			<p class="font-size-16 text-white mb-0 text-center">Đặng Lê</p>
			<h2 class="font-size-14 text-warning m-0 text-center"> VIP Kim Cương</h2>
		</div>

		<div class="phitieu-status marquee">
			<div class="marquee_inner">            
				<span class="m-0 font-size-16 font-weight-bold text-shadow pr-5">Số phi tiêu còn lại: <strong>9999</strong></span>		
				<span class="m-0 font-size-16 font-weight-bold text-shadow pr-5">Nhanh tay giật giải IP12 trị giá 50 củ</span>	
			 </div>    	
		</div>
		<div class="diemcaonhat">
			<h2 class="font-size-16 text-uppercase font-weight-bold text-center mb-1 text-shadow">Điểm cao nhất</h2>
			<h4 class="font-size-18 text-uppercase text-center text-shadow">699669</h4>
		</div>
		{(auto_play)?(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}}></div>):(<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}} onMouseDown={this.touchStart} onMouseUp={this.touchEnd} onMouseMove={this.touchMove}></div>)}
					
					<div id="div_checkbox" style={{position:'absolute', top:"90%", left:"37%", zIndex:999999}} onMouseDown={this.check_auto}></div>
					<div id="div_exit" style={{position:'absolute', top:0, left:"83%", zIndex:999999}} onMouseDown={this.exit}></div>
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
