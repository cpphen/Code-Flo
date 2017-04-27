

export function teamUpdateReducer(state={teams: ""}, action) {

  switch(action.type) {
    case "UPDATE_TEAMS": {
      console.log("UPDATE_TEAMS", action.payload);

      return {
        ...state,
        teams: action.payload
      }
    }
    return state;
  };
}
