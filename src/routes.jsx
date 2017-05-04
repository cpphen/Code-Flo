import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store.js';
import App from './containers/App.jsx';

import Home from './containers/Home.jsx';
import Profile from './containers/Profile.jsx';
import ProfileTwo from './containers/Profile2.jsx';

import Register from './containers/Register.jsx';
import NewProject from './containers/NewProject.jsx';


import ProjectDetails from './containers/ProjectDetails.jsx'
import { checkSession } from './actions/usersAction';



const checkSesh = () => {
	console.log("INSIDE CHECK SESH FUNCTION");
	store.dispatch(checkSession());
}


const theRoutes = (
   	<Provider store={store}>
	  	<Router history={history}>
		    <Route path="/" component={App}>
			    <IndexRoute onEnter={checkSesh} component={Home}/>
			    <Route path="/profile" onEnter={checkSesh} component= {Profile} />
			    <Route path="/profile/:id" onEnter={checkSesh} component= {ProfileTwo} />
			    <Route path="/newproject/:id" onEnter={checkSesh} component= {ProjectDetails} />
			    <Route path="/newproject" onEnter={checkSesh} component= {NewProject} />
		    </Route>
		</Router>
	</Provider>
  );

export default theRoutes;