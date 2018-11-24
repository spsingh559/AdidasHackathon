import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, hashHistory} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// <Route path="/dashboard" component={Dashboard} />
		// <Route path="/settings" component={Settings} />
		// <Route path="/analytics" component={Analytic} />
		// <IndexRoute component={MainApp} />

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Home from './components/Home.jsx';
// import Entity from './components/Entity.jsx'
import ParentComponent from './components/UILayout/Parent.jsx';
import Login from './components/Login/Login';
// import Onboarding from './components/Onboarding/Onboarding';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Profile from './components/Profile/Profile';
import Landing from './components/Login/Landing';
import Registration from './components/Login/Registration';
import Adidas from './components/Adidas';
import AdidasContract from './components/AdidasContract/AdidasContract';
import MyContract from './components/MyContract/MyContract';
import CreateRequest from './components/CreateRequest/CreateRequest';
import VoteForPlayer from './components/VoteForPlayer/VoteForPlayer';
import Player from './components/Player/Player';
// import MyPayment from './components/MyPayment/MyPayment';

ReactDOM.render(
	<MuiThemeProvider>
	<Router history ={hashHistory} >
	<Route path="/login" component={Login} />
	<Route path="/landing" component={Landing} />
	
	<Route path="/register" component={Registration} />	
	<Route path="/" component={ParentComponent}>
	<Route path="/adidas" component={Adidas}></Route>
	<Route path="/adidasContract" component={AdidasContract}></Route>
	<Route path="/createRequest" component={CreateRequest} />
	<Route path="/myProfile" component={Profile} />
	<Route path="/voteForPlayer" component={VoteForPlayer} />
	<Route path="/player" component={Player} />
	{/* <Route path="/myPayment" component={MyPayment} /> */}
	<Route path="/myContract" component={MyContract} />
	{/* <Route path="/messaging" component ={Chat} /> */}
		<IndexRoute component={Home} />
		</Route>
	</Router>
	</MuiThemeProvider>,
 document.getElementById('mountapp'));