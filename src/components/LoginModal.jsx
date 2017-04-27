import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.handleForm = this.handleForm.bind(this);

  }


  handleForm(e){
    // console.log("NAAAAAAAAAME", this.refs.name.value)
    var loginInput = {
      username: this.refs.email.value,
      password: this.refs.password.value
    }

    console.log("LOG IN FORMMMM INPUTTTT", loginInput);

    this.props.logg(loginInput);
  }

  close() {
    this.props.close()
  }

  open() {
    this.props.open()
  }

  render() {

      return (
        <div>

          <button type="button" className="pt-button pt-large pt-intent-warning" onClick={this.open}>
    			 <span className="pt-icon-standard pt-icon-log-in"></span>
    			 Login
    			 {/* <span className="pt-pt-align-right"></span> */}
    			</button>


          <Modal show={this.props.show} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <form className="form-signin">

                <div className="form-group">
                  <label htmlFor="inputEmail" className="sr-only">Email</label>
                  <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email" />
                </div>

                <div className="form-group">
                  <label htmlFor="inputPassword" className="sr-only">Password</label>
                  <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" />
                </div>

              </form>


          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleForm}>Login</button>
            <button className="btn btn-lg btn-warning btn-block" type="button" onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>






      );
    }

}

export default LoginModal;
