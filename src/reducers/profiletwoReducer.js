export function profiletwoReducer( state={member: ""}, action){
	
	switch(action.type){
		case "SET_DYNAMIC_PROFILE_INFO": {
			return {
				...state,
				member: action.payload
			}
		}
		default: {
			return { ...state }
		}
	}

	return state;
}