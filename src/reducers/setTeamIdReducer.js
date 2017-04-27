export function setTeamIdReducer ( state = { teamID: "" }, action) {

	switch(action.type){
		case "SET_PROJECT_ID_URL": {
			return {
				...state,
				teamID: action.payload
			}
		}
		default: {
			return { ...state }
		}
	}
	return state;
}