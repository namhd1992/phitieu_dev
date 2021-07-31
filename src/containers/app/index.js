import React from 'react';
import { Route } from 'react-router-dom'
import '../../styles/main.css';
import MenuAppBar from '../phitieu/MenuAppBar';
import Home_Web from '../phitieu/web/home'
import SanQua_Web from '../phitieu/web/sanqua'
import DuaTop_Web from '../phitieu/web/duatop'
import Home_Mobile from '../phitieu/mobile/home'

import SanQua_Mobile_Android from '../phitieu/mobile/android/sanqua'
import DuaTop_Mobile_Android from '../phitieu/mobile/android/duatop'

import SanQua_Mobile_IOS from '../phitieu/mobile/ios/sanqua'
import DuaTop_Mobile_IOS from '../phitieu/mobile/ios/duatop'
import SanQua_Mobile_IOS_Vertical from '../phitieu/mobile/ios/vertical/sanqua'
import DuaTop_Mobile_IOS_Vertical from '../phitieu/mobile/ios/vertical/duatop'
import {
	isAndroid,
	isIOS,
	isMobile
  } from "react-device-detect";
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			main: null,
			backgroundColor:'#fff',
			horizontal:false,
		};
	}

	componentWillMount(){
		var width=window.screen.width, height=window.screen.height;
		var x=Math.sqrt(width*width + height*height);
		if(x>800){
			this.setState({horizontal:false})
		}else{
			this.setState({horizontal:true})
		}
	}

	render() {
		const {horizontal}=this.state;
		return (
			<div style={{ backgroundColor: this.state.backgroundColor }}>
				{/* <div style={{maxWidth:"1200px", margin:"auto", background: this.state.backgroundColor }}> */}
				{(isMobile)?(<div>
					{(isAndroid)?(<div><MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Home_Mobile} />
						<Route exact path="/sanqua" component={SanQua_Mobile_Android} />
						<Route exact path="/duatop" component={DuaTop_Mobile_Android} />
					</main></div>):(<div>
						<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Home_Mobile} />
						<Route exact path="/sanqua" component={SanQua_Mobile_IOS} />
						<Route exact path="/duatop" component={DuaTop_Mobile_IOS} />
					</main></div>)}
					
				</div>):(<div>
					<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Home_Web} />
						<Route exact path="/sanqua" component={SanQua_Web} />
						<Route exact path="/duatop" component={DuaTop_Web} />
					</main>
				</div>)}
				
			</div>
		)
	}
}


export default App;


// return (
// 	<div style={{ backgroundColor: this.state.backgroundColor }}>
// 		{/* <div style={{maxWidth:"1200px", margin:"auto", background: this.state.backgroundColor }}> */}
// 		{(isMobile)?(<div>
// 			{(isAndroid)?(<div><MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Mobile} />
// 				<Route exact path="/sanqua" component={SanQua_Mobile_Android} />
// 				<Route exact path="/duatop" component={DuaTop_Mobile_Android} />
// 			</main></div>):(<div>
// 				{(horizontal)?(<div>
// 				<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Mobile} />
// 				<Route exact path="/sanqua" component={SanQua_Mobile_IOS} />
// 				<Route exact path="/duatop" component={DuaTop_Mobile_IOS} />
// 			</main></div>):(<div>
// 				<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Mobile} />
// 				<Route exact path="/sanqua" component={SanQua_Mobile_IOS_Vertical} />
// 				<Route exact path="/duatop" component={DuaTop_Mobile_IOS_Vertical} />
// 			</main></div>)}
// 			</div>
// 				 )}
			
// 		</div>):(<div>
// 			<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
// 				data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
// 			<main ref={(c) => this.main = c}>
// 				<Route exact path="/" component={Home_Web} />
// 				<Route exact path="/sanqua" component={SanQua_Web} />
// 				<Route exact path="/duatop" component={DuaTop_Web} />
// 			</main>
// 		</div>)}
		
// 	</div>
// )