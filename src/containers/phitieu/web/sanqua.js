import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { render } from 'react-dom';
// import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
import { connect } from 'react-redux'
import './css/style.css';
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
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile';


import icon_clock from './images/icon-clock.png';
import line_timing from './images/line-timing.png';
import btn_thoat from './images/btn-thoat.png';
import phitieu from './images/phitieu.png';
import dart_player from './images/dart-player.png';
import dart_flight from './images/dart-flight.gif';

import ReactResizeDetector from 'react-resize-detector'
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

var award_open=true;
var n=0;
var animId;
var dartTimerId = 1;
var FLIGHT_ANIM_DELAY = 20;
var width = window.innerWidth;
var height = window.innerHeight;



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
			orientation:'',
			dartPositionY:0

		};
	}
	componentWillMount(){
		this.onResize();
		window.addEventListener("resize", this.setScreenOrientation);
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({innerWidth:window.innerWidth})
		this.loadImage();
	}

	componentDidUpdate(oldProps) {
		if (oldProps.src !== this.props.src) {
		  this.loadImage();
		}
	  }

	componentWillUnmount() {
		this.image.removeEventListener('load', this.handleLoad);
	  }

	  componentWillUnmount() {
		this.image.removeEventListener('load', this.handleLoad);
	  }


	componentDidMount(){
		var stage = new Konva.Stage({
			container: 'canvas',
			width: width,
			height: height,
		});
		var layer = new Konva.Layer();

		this.setState({stage:stage, layer:layer})
		var _this=this
		var imageObj = new Image();
		imageObj.onload = function () {
			var darthVaderImg = new Konva.Image({
				image: imageObj,
				x: 300,
				y: 280,
				width: 200,
				height: 137,
				draggable: true,
				visible:false
				});
		
				layer.add(darthVaderImg);
				stage.add(layer);
				_this.setState({darthVaderImg:darthVaderImg})
		};
		imageObj.src = phitieu;

		var dartFlight = new Image();
		dartFlight.onload = function () {
			var dartFlightImg = new Konva.Image({
				image: dartFlight,
				x: 300,
				y: 280,
				width: 200,
				height: 137,
				visible:false
				});
		
				layer.add(dartFlightImg);
				stage.add(layer);
				_this.setState({dartFlightImg:dartFlightImg})
		};
		dartFlight.src = dart_player;


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
		console.log(start, end)
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


	start=()=>{
	
	}

	btnStart=()=>{

	}

	startSpin=()=>{

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


	loadImage() {
		// save to "this" to remove "load" handler on unmount
		this.image = new window.Image();
		this.image.src = "https://konvajs.org/assets/yoda.jpg";
		this.image.addEventListener('load', this.handleLoad);
	  }

	  handleLoad = () => {

		this.setState({
		  image: this.image
		});
	  };

	touchStart=()=>{
		const {stage, layer, darthVaderImg, dartFlightImg}=this.state;
		dartFlightImg.hide();
		var touchPos = stage.getPointerPosition();
		var x= touchPos.x-100;
		var y= touchPos.y-80;
		darthVaderImg.x(x);
		darthVaderImg.y(y);
		darthVaderImg.show();
		this.setState({dartPositionY:touchPos.y})
	}

	touchEnd=()=>{
		const {stage, layer, darthVaderImg, dartFlightImg, dartPositionY}=this.state;
		var touchPos = stage.getPointerPosition();
		darthVaderImg.hide();
		if(dartPositionY >touchPos.y){
			dartFlightImg.x(touchPos.x)
			dartFlightImg.y(touchPos.y)
			dartFlightImg.show();
		}else{
			alert("vuốt lên để phi tiêu")
		}
		

	}

	touchMove=()=>{
		const {stage, layer, darthVaderImg}=this.state;
		var touchPos = stage.getPointerPosition();
		var x= touchPos.x-100;
		var y= touchPos.y-80;
		darthVaderImg.x(x);
		darthVaderImg.y(y);
	}

	doFlightAnim=(step)=>{
		// Stop the last animation
		dartTimerId = clearTimeout(animId);

		if (step <= 20) {

				// showcell(step, 0, 'dart');
				dartTimerId = setTimeout(this.doFlightAnim(step + 1), FLIGHT_ANIM_DELAY);

		}
	}

	render() {
		const {user, image}=this.state;

		return (
			<DeviceOrientation lockOrientation={'landscape'}>
				<Orientation orientation='landscape' alwaysRender={false}>
					<div class="bg-page-sanqua position-relative">
						
						<div class="phitieu">
							<div class="img-phitieu"></div>
						</div>
						<div class="tongdiem">
							<h2 class="font-size-2vw text-uppercase font-weight-bold text-center mb-1 text-shadow">Tổng điểm</h2>
							<h4 class="font-size-2vw text-uppercase text-center text-shadow">699669</h4>
						</div>
						<div class="phongtudong font-size-2vw font-weight-bold text-uppercase text-shadow">
							<input type="checkbox" id="check1" name="option1" value="something" /> Phóng phi tiêu tự động
						</div>
						<div class="timing">
							<div class="media">
							<img src={icon_clock} class="align-self-center mt-n1" width="13%" alt="clock" />
							<div class="media-body">
								<img class="m-0 p-0 mt-n3" src={line_timing} width="90%" alt="Line" />
								<h6 class="text-yellow font-size-1vw mt-n1n pl-1 text-shadow">Còn: 2d 10h 22p 11s</h6>
							</div>
							</div>
						</div>
						<div class="account-name">
							<p class="font-size-1vw text-white mb-0 text-center">Đặng Lê</p>
							<h2 class="font-size-1vw text-warning m-0 text-center">VIP Kim Cương</h2>
						</div>
						<div class="btn-login">
							<img src={btn_thoat} width="100%" alt="" />
						</div>
						<div class="phitieu-status marquee">
							<div class="marquee_inner">            
								<span class="m-0 font-size-2vw font-weight-bold text-shadow pr-5">Số phi tiêu còn lại: <strong>9999</strong></span>		
								<span class="m-0 font-size-2vw font-weight-bold text-shadow pr-5">Nhanh tay giật giải IP12 trị giá 50 củ</span>	
							</div>    	
						</div>
						<div class="toplist-account text-center">
							<h2 class="font-size-2vw m-0 font-weight-bold text-shadow">Danh sách TOP</h2>
							<ul class="list-group font-size-1vw mt-2">
							<li class="list-group-item bg-transparent p-0 text-shadow">FirstitemFirstitem</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">Second item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">Third item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">First item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">Second item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">Third item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">First item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">Second item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">First item</li>
							<li class="list-group-item bg-transparent p-0 text-shadow">Second item</li>
							</ul> 
						</div>
						<div id="canvas" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}></div>
					</div>
				</Orientation>
				<Orientation orientation='portrait'>
					<div>
						<p>Vui lòng xoay màn hình để chơi!</p>
						<div id="canvas" />
					</div>
				</Orientation>
			</DeviceOrientation>
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

{/* <Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					<Image
						x={150}
						y={150}
						image={image}
						ref={node => {
							this.imageNode = node;
						  }}
						  draggable
						fill={this.state.isDragging ? 'green' : 'black'}
						onDragStart={() => {
						this.setState({
							isDragging: true
						});
						}}
						onDragEnd={e => {
						this.setState({
							isDragging: false,
							x: e.target.x(),
							y: e.target.y()
						});
						}}
					/>
					<Text
						text="Draggable Text"
						x={this.state.x}
						y={this.state.y}
						draggable
						fill={this.state.isDragging ? 'green' : 'black'}
						onDragStart={() => {
						this.setState({
							isDragging: true
						});
						}}
						onDragEnd={e => {
						this.setState({
							isDragging: false,
							x: e.target.x(),
							y: e.target.y()
						});
						}}
					/>
				</Layer>
			</Stage> */}