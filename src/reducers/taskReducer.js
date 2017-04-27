export function TaskReducer ( state = { userID: "", tasks: "" }, action ) {
  switch(action.type) {
  	case "SET_USER_ID_FOR_TASK": {
  		return Object.assign({}, state, {userID: action.payload})
  	}
  	case "SET_USER_TASKS": {
  		return Object.assign({}, state, {tasks: action.payload})
  	}
  	default: {
  		return {...state}
  	}
  }
  return state;
}