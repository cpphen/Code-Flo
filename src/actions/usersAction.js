import axios from 'axios';
import fetch from 'isomorphic-fetch'
import { browserHistory } from "react-router";


export function addMember(userid, teamid) {
	return function(dispatch) {
		console.log("USER ID TEAMUPDATE", userid);
		console.log("TEAM ID TEAMUPDATE", teamid);
		return axios.post(`/updatemember/${userid}/${teamid}`).then((data) => {
					console.log("got to addMember", data);

		})

	}
}

export function createUser(formData) {
	return function(dispatch) {
		axios.post('/register', formData).then((data) => {
			console.log("RETURN DATA FROM AXIOS REGISTER POST", data);
			console.log('\n\n');
			console.log("RETURNed DATA ERRORS", data.data);
			console.log('\n\n');
			if(data.data.length > 0){
				dispatch({ type: "SUCC_CLR_ERRS" });
				dispatch({ type: "ERROR_MSGS", payload: data.data })
			}else{
				dispatch({ type: "SESSION_EXIST", payload: {
						checkSessionId: data.data.sessionUserId,
						checkSessionUser: data.data.sessionInfo
					}
				});
				dispatch({ type: "SUCC_CLR_ERRS" });
				dispatch({ type: "CLOSE_MODAL", payload: false });
			}
		});
	}
}

export function createTeam(formData) {
	return function(dispatch) {
		console.log("FORM DATA IN CREATE TEAM ACTION", formData)
		return axios.post('/teams', formData).then((data) => {
			console.log("RETURN DATA FROM AXIOS TEAM POST", data);
			console.log('\n\n');
			// console.log("RETURNed DATA ERRORS", data.data);
			console.log('\n\n');
			var teamnames = [];
			var techs = [];
			var descriptions = [];
			teamnames.push(data.data.teamname);
			techs.push(data.data.tech);
			descriptions.push(data.data.description);
			dispatch({type: "TEAM_CREATE", payload: {teamname: teamnames, tech: techs, description: descriptions}})
			dispatch({ type: "CLOSE_MODAL_TEAM", payload: false });
			teamnames = [];
			techs = [];
			descriptions = [];
			return data;
			// browserHistory.push('/newproject');
		});
	}
};

export function checkSession() {
	return function(dispatch) {
		axios.get('/checkssion').then((data) => {
			console.log("CHECK SESSION DATA", data);
			if(data.data.sessionUserId){
				console.log("INSIDE IF CHECK SESSION DATA", data);
				dispatch({ type: "SESSION_EXIST", payload: {
						checkSessionId : data.data.sessionUserId,
						checkSessionUser: data.data.sessionUserInfo
					}
				});
			}else{
				dispatch({ type: "NO_SESSION" })
				browserHistory.push('/');
			}
		});
	}
}

export function login(loginInput) {
	return function(dispatch) {
		axios.post('/login', loginInput).then((data) => {
			console.log("USER AFTER LOGIN", data);
			if(data){
				dispatch({ type: "SESSION_EXIST", payload: {
		            checkSessionId: data.data.sessionUserId,
				    checkSessionUser: data.data.sessionInfo
				    }
				});
				dispatch({ type: "CLOSE_MODAL_LOG", payload: false})
			}else{
				dispatch({ type: "NO_SESSION" })
			}
		});
	}
}

export function logout(){
	return function(dispatch) {
		console.log("INSIDE LOG OUT ACTION");
		axios.get('/logout').then((data) => {
			console.log("DATA AFTER SERVER LOG OUT", data)
			dispatch({ type: "NO_SESSION" });
			browserHistory.push('/');
		});
	}
}


export function openModal() {
	return {
		type: "OPEN_MODAL",
		payload: true
	}
}

export function closeModal() {
	return {
		type: "CLOSE_MODAL",
		payload: false
	}
}

export function openModalL() {
	return {
		type: "OPEN_MODAL_LOG",
		payload: true
	}
}

export function closeModalL() {
	return {
		type: "CLOSE_MODAL_LOG",
		payload: false
	}
}
export function openModalT() {
	return {
		type: "OPEN_MODAL_TEAM",
		payload: true
	}
}

export function closeModalT() {
	return {
		type: "CLOSE_MODAL_TEAM",
		payload: false

	}
}

export function openModalTask() {
	return {
		type: "OPEN_MODAL_TASK",
		payload: true
	}
}

export function closeModalTask() {
	return {
		type: "CLOSE_MODAL_TASK",
		payload: false
	}
}

export function openModalSkill() {
	return {
		type: "OPEN_MODAL_SKILL",
		payload: true
	}
}

export function closeModalSkill() {
	return {
		type: "CLOSE_MODAL_SKILL",
		payload: false
	}
}

export function taskAssignUser(id) {
	console.log("TASK ASSIGN ID",id)
	return {
		type: "SET_USER_ID_FOR_TASK",
		payload: id
	}
}

export function getPhoto(username, id){
	console.log("username", username)
	return function (dispatch) {
		fetch(`https://api.github.com/users/${username}`).then(function(response){
			return response.json()
		}).then(function(json){
			console.log(json.avatar_url);
			let avatar_url = json.avatar_url;
			console.log(avatar_url)
			if(avatar_url){
				axios.post('/savepic/' + id, { avatarURL: avatar_url }).then((data) => {
					console.log(data);
					dispatch({ type: "SESSION_EXIST", payload: {
			            checkSessionId: data.data.sessionUserId,
					    checkSessionUser: data.data.sessionInfo
					    }
					});

				});
			}else{
				return;
			}
		});
	}
}

export function editSkills(skills, id){

	let skillInfo = {
		skills,
		id
	}

	return function(dispatch){
		axios.post('/edit/skills', skillInfo).then((data) => {
			console.log("EDIT SKILLS DATA", data);
			dispatch({ type: "SESSION_EXIST", payload: {
			            checkSessionId: data.data.sessionUserId,
					    checkSessionUser: data.data.sessionInfo
					    }
					});
			dispatch({ type: "CLOSE_MODAL_SKILL", payload: false })
		});
	}
}

export function teamDetails(id) {
	return function(dispatch) {
		console.log("IDDDD IN ACTION", id)
	return axios.get('/getteaminfo/' + id)
      .then(res => {
        console.log("response team details", res);

        dispatch({ type: "SET_TEAM_DETAILS", payload: {
        		teamInfo: res.data.teamInfo,
        		admin: res.data.admin,
        		adminID: res.data.teamInfo.teamAdmin,
        		teamMembers: res.data.teamInfo.teamMembers
        	} 
        });

      });
	}
}


export function updateUserTask(task, userID, projectID){

	var info = {
		task,
		userID,
		projectID
	}

	return function(dispatch){
		axios.post('/assignTask', info).then((res) => {
			console.log("DATA IN ASSIGN TASK AXIOS", res)
			axios.get('/populate-tasks/' + projectID + '/' + userID).then((res) => {
				dispatch({ type: "SET_USER_TASKS", payload: res.data.task });
			});
		});
	}
}

export function populateTasks(projectID, userID){
	return function(dispatch){
	//Had to return this axios request so that in the component ShowTasks, I can attach a then()
		//after this action creator gets called. See ****** in the comp0nent
		return axios.get('/populate-tasks/' + projectID + '/' + userID).then((res) => {
			console.log("RESPONSE IN POPULATE TASKS ACTIONS", res)
			dispatch({ type: "SET_USER_TASKS", payload: res.data.task });
		});
	}
}

export function dynamicProfile(userID){
	return function (dispatch){
		axios.get('/profile-two/' + userID).then((data) => {
			console.log("USER DATA PROFILETWO", data);
			dispatch({ type: "SET_DYNAMIC_PROFILE_INFO", payload: data.data });
		});
	}
}