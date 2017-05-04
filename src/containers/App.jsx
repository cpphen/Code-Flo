import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionsCreators from '../actions/usersAction';
import Main from './Main.jsx';
// import { createUser } from '../actions/usersAction'
/*******************/
// Connects a React component to a Redux store. connect is a facade around connectAdvanced, providing a
// convenient API for the most common use cases.

// It does not modify the component class passed to it; instead, it returns a new, connected component class
// for you to use.
function mapStateToProps (state) {

	//the property names in the return data, have to be the same names as NAME OF THE REDUCER FUNCTION.

	//The state parameter in the mapStateToProps is being brought in from the inital states defined
	//in the reducers.
	// console.log("mapStateToProps DATA", state)
	return {
		allData: state,
		errorMsgs: state.regErrReducer.errorMsgs,
		isLoggedInCheck: state.checkSession.isLoggedIn,
		CheckSeshUserID: state.checkSession.sessionUserID,
		CheckSeshUser: state.checkSession.sessionUser,
		showModal: state.modalReducer.showModal,
		loginModal: state.modalReducer.loginModal,
		teamModal: state.modalReducer.teamModal,
		taskModal: state.modalReducer.taskModal,
		skillModal: state.modalReducer.skillModal,
		team: {
			teamname: state.teamCreateReducer.teamnames,
			tech: state.teamCreateReducer.techs,
			description: state.teamCreateReducer.descriptions
		},
		userIDforTask: state.TaskReducer.userID,
		userTasks: state.TaskReducer.tasks,
		// allteams: state.teamUpdateReducer.teams,
		teamDet: {
			teamInfo: state.teamDetailsReducer.teamInfo,
			admin: state.teamDetailsReducer.admin,
			adminID: state.teamDetailsReducer.adminID,
			members: state.teamDetailsReducer.teamMembers
		},
		dynamicUser: state.profiletwoReducer.member

	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(actionsCreators, dispatch);
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
