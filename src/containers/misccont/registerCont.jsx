// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import * as actionsCreators from '../actions/usersAction';
// import Register from './Register.jsx';

// function mapStateToProps(state) {
// 	return {
// 		allData: state,
// 		errorMsgs: state.regErrReducer.errorMsgs,
// 		userAfReg: state.registerReducer.user,
// 		sessionUserId: state.registerReducer.sessionUserID,
// 		isLoggedInReg: state.registerReducer.isLoggedIn,
// 		isLoggedInCheck: state.checkSession.isLoggedIn,
// 		CheckSeshUserID: state.checkSession.sessionUserID,
// 		Modal: state. modalReducer.showModal
// 	}
// }

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(actionsCreators, dispatch);
// }

// const regisCont = connect(mapStateToProps, mapDispatchToProps)(Register);

// export default regisCont;