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
import $ from 'jquery';
import 'bootstrap';

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
			fullScreen:false,

		};
	}

    componentDidMount(){
		const {horizontal}=this.state;
		var deltal_img=img_w/img_h;
		var deltal_device=width/height;
		var bg_x=0, bg_y=0;
		var list_top_user=[];

		// this.toggleFullScreen();
		if(width/height > 2){
			bg_x=width;
			bg_y=height*deltal_img/deltal_device;
		}else{
			bg_x=width;
			bg_y=height*deltal_device/deltal_img;
		}
		width_bgImg=bg_y;

        var stage = new Konva.Stage({
            container: 'canvas',
            width: width,
            height: height,
        });
        var layer = new Konva.Layer();

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
        stage.add(layer);
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
    
        var touchPos = e.touches[0];
        var imageObj = new Image();
        imageObj.onload = function () {
            var darthVaderImg = new Konva.Image({
                image: imageObj,
                x: touchPos.clientX-20,
                y: touchPos.clientY-80,
                width: 28,
                height: 120,
                draggable: true,
                });
        
                layer.add(darthVaderImg);
                stage.add(layer);
                _this.setState({darthVaderImg:darthVaderImg})
        };
        imageObj.src = phitieu;
        
        this.setState({dartPositionY:touchPos.clientY})
        
    }
    
    touchEnd=(e)=>{
        console.log("touchEnd", e.touches)
        const {stage, layer, darthVaderImg, dartPositionY, dartFlightImg, isPlay, countDart}=this.state;
        var _this=this;
        // if(isPlay){
        //     if(countDart>0){
        //         var touchPos = stage.getPointerPosition();
        //         console.log(touchPos)
        //         curFrame=0
        //         if(dartPositionY >touchPos.y){
        //             this.draw(touchPos.x, touchPos.y)
        //             this.fireDart(touchPos.x, touchPos.y-heightFrame/2 + 12)
        //         }else{
        //             this.showTextWarning()
        //             // alert("vuốt lên để phi tiêu")
        //         }
        //         this.setState({isPlay:false})
        //     }else{
        //         $('#ThongBao').modal('show');
        //     }
        // }

        var touchPos = stage.getPointerPosition();
                console.log(touchPos)
                curFrame=0
                if(dartPositionY >touchPos.y){
                    this.draw(touchPos.x, touchPos.y)
                    // this.fireDart(touchPos.x, touchPos.y-heightFrame/2 + 12)
                }else{
                    this.showTextWarning()
                    // alert("vuốt lên để phi tiêu")
                }
                this.setState({isPlay:false})
        darthVaderImg.hide();
        setTimeout(()=>{
            _this.setState({isPlay:true})
        }, 1500);
        
        
    }
    
    touchMove=(e)=>{
        // console.log("touchMove",e.touches)
        const {stage, layer, darthVaderImg, isPlay}=this.state;
        if(JSON.stringify(darthVaderImg) !== '{}'){
            var touchPos = e.touches[0];
            var x= touchPos.clientX-20;
            var y= touchPos.clientY-100;
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
                }, 5);
            }
            
            _this.setState({dartFlightImg:dartFlightImg})
        };
        dartFlight.src = dart_player;
        
    }

    render() {

		const {msg, user, fullScreen, image, horizontal, auto_play, timing, day, hour, minute, second, data, countDart, points_sanqua, listTop, isPlay}=this.state;

		return (
				<div id="game">
					<div id="canvas" style={{position:'absolute', top:0, left:0, zIndex:99999}} onTouchStart={(e) =>this.touchStart(e)} onTouchEnd={(e)=>this.touchEnd(e)} onTouchMove={(e)=>this.touchMove(e)}></div>
				
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
	
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)
