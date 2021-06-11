import React from 'react';
import { Route } from 'react-router-dom'
import '../../styles/main.css';
import MenuAppBar from '../phitieu/MenuAppBar';
import Lucky_Rotation from '../phitieu/home'
// import SanQua from '../phitieu/sanqua'
// import DuaTop from '../phitieu/duatop'

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
				<div>
				<MenuAppBar isMobile={this.state.isMobile} pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>
					<main ref={(c) => this.main = c}>
						<Route exact path="/" component={Lucky_Rotation} />
						{/* <Route exact path="/sanqua" component={SanQua} />
						<Route exact path="/duatop" component={DuaTop} /> */}
					</main>
				</div>
			</div>
		)
	}
}


export default App;