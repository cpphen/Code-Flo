import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';


//Importing all actions inside the userAction file. That way I can have multiple exports in userAction
//file and use specific ones with dot notation kind of like an object. E.g: if userAction file had
//a function called getUsers, I can invoke/call that function by doing user.getUsers();
//To import just one action from the file just do: import { getUser } from '../actions/usersAction'
//then call the function directly without the dot notation like so getUser();
// import * as user from '../actions/usersAction'
// import { createUser } from '../actions/usersAction';

class Register extends Component {

	constructor(props) {
		super(props);



		this.open = this.open.bind(this)
		this.close = this.close.bind(this)

		this.handleForm = this.handleForm.bind(this);
	}




	handleForm(e){
		console.log("NAAAAAAAAAME", this.refs.name.value)
		var formInput = {
			name: this.refs.name.value,
			username: this.refs.username.value,
			skills: this.refs.skills.value,
			password: this.refs.password.value,
			password2: this.refs.password2.value,
			email: this.refs.email.value
		}

		console.log("FORMMMM INPUTTTT", formInput);


		this.props.create(formInput);
	}
	close() {
		this.props.close()
	}

	open() {
		this.props.open()
	}

	render() {
		console.log("ERROR MESSAGES", this.props.regErr);

		const errs = this.props.regErr;

		let success = null;
		let msg = null;
		// console.log("errrs", errs)
		if(errs){
			//if putting curly brackets after the arrow function, remember to return the dom elements, in this
			//case the div messages. If no curly brakcets are used, the items return directly. Either way is
			//okay, it is preference.
			msg = this.props.regErr.map((item, index) =>
			 <div key={index} className="alert alert-warning">{item.msg}</div>
			);
		}
		// console.log('msg', msg)

			// can also directly put the messages inline the return below instead of mapping and assigning it
			// to an variable (msg);

			// {errs ? this.state.errArr.map((item, index) =>
			//  <div key={index} className="alert alert-warning">{item.msg}</div>
			// ) : success}

		return ( <div>
			<button type="button" className="pt-button pt-large pt-intent-primary" onClick={this.open}>
			 <span className="pt-icon-standard pt-icon-swap-horizontal"></span>
			 Register
			 {/* <span className="pt-pt-align-right"></span> */}
			</button>



			<Modal show={this.props.show} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Register</Modal.Title>
				</Modal.Header>
					<Modal.Body>


					<form className="form-signin">
						{errs ? msg[0] : success}
						<div className="form-group">
						    <label htmlFor="inputName" className="sr-only">Name</label>
						    <input type="text" ref="name" id="inputName" className="form-control" placeholder="Name" />
						</div>
						{errs ? msg[1] : success}
						<div className="form-group">
						    <label htmlFor="inputUsername" className="sr-only">GitHub Username</label>
						    <input type="text" ref="username" id="inputUsername" className="form-control" placeholder="GitHub Username" />
						</div>
						<div className="form-group">
						    <label htmlFor="skills" className="sr-only">Skills (optional)</label>
						    <input type="text" ref="skills" id="skills" className="form-control" placeholder="Skills (separate with commas)" />
						</div>
						{errs ? msg[4] : success}
						<div className="form-group">
						    <label htmlFor="inputPassword" className="sr-only">Password</label>
						    <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" />
						 </div>

						 <div className="form-group">
						    <label htmlFor="inputPassword2" className="sr-only">Password</label>
						    <input type="password" ref="password2" id="inputPassword2" className="form-control" placeholder="Password" />
						 </div>
						 {errs ? msg[2] : success}
						 {errs ? msg[3] : success}
						 <div className="form-group">
						    <label htmlFor="inputEmail" className="sr-only">Email</label>
						    <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email" />
						 </div>
					</form>

					</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleForm}>Register</button>
					<button className="btn btn-lg btn-warning btn-block" type="button" onClick={this.close}>Close</button>
				</Modal.Footer>
			</Modal>

		</div>
		);
	}
}

export default Register;
