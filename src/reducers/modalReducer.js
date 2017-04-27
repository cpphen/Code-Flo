//Make a reducer file for each state in the store (which is like the main database for redux)
//Every reducer runs every time there is an action, whether something actually changes in state is up to
//programmer.

//Reducer does the editing of the state, which is just a slice of data of the entire store.

//Everytime an action is dispatched, every single reducer will run. We control which reducers do something with the action types

export function modalReducer(state={
		showModal: false,
		loginModal: false,
		teamModal: false,
		taskModal: false
	}, action ) {


	switch (action.type) {
		case "OPEN_MODAL": {
			console.log("Opening Modal")
			return {
				...state,
				showModal: action.payload
			}
		}
		case "CLOSE_MODAL": {
			console.log("Closing Modal")
			return {
				...state,
				showModal: action.payload
			}
		}

		case "OPEN_MODAL_LOG": {
			return {
				...state,
				loginModal: action.payload
			}
		}
		case "CLOSE_MODAL_LOG": {
			return {
				...state,
				loginModal: action.payload
			}
		}
		case "OPEN_MODAL_TEAM": {
			return {
				...state,
				teamModal: action.payload
			}
		}
		case "CLOSE_MODAL_TEAM": {
			return {
				...state,
				teamModal: action.payload
			}
		}
		case "OPEN_MODAL_TASK": {
			return {
				...state,
				taskModal: action.payload
			}
		}
		case "CLOSE_MODAL_TASK": {
			return {
				...state,
				taskModal: action.payload
			}
		}
		default: {
			return state;
		}
	}

	return state;
}
