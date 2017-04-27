//DO SOMETHING HERE

export function teamCreateReducer(state={teamnames: "", techs: "", descriptions: ""}, action) {

  switch(action.type) {
    case "TEAM_CREATE": {
      console.log("TEAM CREATE", action.payload);

      return {
        ...state,
        teamnames: action.payload.teamname,
        techs: action.payload.tech,
        descriptions: action.payload.description
      }
    }
    default: {
      return {...state}
    }
    return state;
  }
}
