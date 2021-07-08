import React from 'react';
import { Route } from 'react-router-dom'
import '../../styles/main.css';
import MenuAppBar from '../phitieu/MenuAppBar';
import Home_Web from '../phitieu/web/home'
import SanQua_Web from '../phitieu/web/sanqua'
import DuaTop_Web from '../phitieu/web/duatop'
import Home_Mobile from '../phitieu/mobile/home'
import SanQua_Mobile from '../phitieu/mobile/test'
import DuaTop_Mobile from '../phitieu/mobile/duatop'
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
		};
	}

	render() {
		return (
			<div style={{ backgroundColor: this.state.backgroundColor }}>
				{/* <div style={{maxWidth:"1200px", margin:"auto", background: this.state.backgroundColor }}> */}
				{(isMobile)?(<div>
					<MenuAppBar pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Home_Mobile} />
						<Route exact path="/sanqua" component={SanQua_Mobile} />
						<Route exact path="/duatop" component={DuaTop_Mobile} />
					</main>
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