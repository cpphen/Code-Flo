import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// import users from "./userReducer";


import { regErrReducer } from "./regErrReducer";
import { checkSession } from "./checkSession";
import { modalReducer } from "./modalReducer";
// import { todosReducer } from "./todosReducer";
// import { loginReducer } from "./loginReducer";
import { teamCreateReducer } from "./teamCreateReducer";
// import { teamUpdateReducer } from "./teamUpdateReducer";
import { teamDetailsReducer } from "./teamDetails.js";
import { TaskReducer } from "./taskReducer";
// import { setTeamIdReducer } from "./setTeamIdReducer.js";
import { profiletwoReducer } from "./profiletwoReducer.js";

const rootReducer = combineReducers({
	regErrReducer,
	modalReducer,
	checkSession,
	teamCreateReducer,
	teamDetailsReducer,
	TaskReducer,
	profiletwoReducer,
	routing: routerReducer
});
export default rootReducer;
