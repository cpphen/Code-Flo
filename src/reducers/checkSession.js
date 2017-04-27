export function checkSession(state = {
		isLoggedIn: false,
		sessionUserID: "",
		sessionUser: ""
	}, action) {

	switch(action.type){
		case "SESSION_EXIST": {
			console.log("ACTION PAYLOAD CHECK SESSION", action.payload);

			return {
				...state,
				isLoggedIn: true,
				sessionUserID: action.payload.checkSessionId,
				sessionUser: action.payload.checkSessionUser
			}
		}
		case "NO_SESSION": {
			return {
				...state,
				isLoggedIn: false,
				sessionUserID: "",
				sessionUser: ""
			}
		}
		default: {
			return state;
		}
	}

	return state;
}
