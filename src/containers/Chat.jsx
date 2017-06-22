
import React, { Component } from 'react';
import ChatBox2 from '../components/ChatBox2.jsx'
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import * as Blueprint from "@blueprintjs/core";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import io from 'socket.io-client';
const clientSocket = io();

class Chat extends Component {
// socket = {};
	constructor(props) {
     super(props);

	 clientSocket.on('sockusers', (payload1, payload2, payload3) => {
		console.log('Sockusers, avatars received');
		console.log(payload1, payload2, payload3);
		this.updateSockusers(payload1, payload2, payload3);
	 })


	 this.state = { showChat: false, sockusers: [], avatars: [], usernames: [] }
     this.open = this.open.bind(this)
     this.close = this.close.bind(this)
	 this.updateSockusers = this.updateSockusers.bind(this);
	}

	componentWillUnmount() {
		clientSocket.emit('disconnect', this.props.CheckSeshUser);
	}


	close() {
	    this.setState({ showChat: false });
		clientSocket.emit('chat closed', this.props.CheckSeshUser);
	}

	open() {
		this.setState({ showChat: true});
		clientSocket.emit('chat opened', this.props.CheckSeshUser);
		clientSocket.emit('get sockusers', this.props.CheckSeshUserID);
	}

	updateSockusers(payload1, payload2, payload3) {
		this.setState({sockusers: payload1, avatars: payload2, usernames: payload3});
		console.log('sockusers state updated: %s', this.state.sockusers);
	}


	render() {

	   return(
			 <div>

				 <button type="button" className="pt-button pt-large pt-intent-danger" onClick={this.open}>
				  <span className="pt-icon-standard pt-icon-chat"></span>
				  Enter Chat
				  <span className="pt-icon-standard pt-icon-cross pt-align-right"></span>
				 </button>


				 <Modal show={this.state.showChat} onHide={this.close}>
				           <Modal.Header closeButton>
				             <Modal.Title>
								{this.state.avatars.map((avatar, i) =>
									<Popover key={i}
										 content={(
												<div>
													<h5>User: {this.state.usernames[i]}</h5>
												</div>
											)}
										 interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}
										 openOnTargetFocus= {true}
										 popoverClassName="pt-popover-content-sizing"
                			             position={Position.BOTTOM}
										 inline={true}
									>

										<img className='img-circle' src={avatar} key={i} alt={`${this.state.usernames[i]}`} />
									</Popover>

								)}
							</Modal.Title>
				           </Modal.Header>
				           <Modal.Body>
				        		<ChatBox2 {...this.props}
									clientSocket={clientSocket}
								/>
				           </Modal.Body>
				           <Modal.Footer>
				             <Button onClick={this.close}>Close</Button>
				           </Modal.Footer>
				 </Modal>
		 	 </div>
	   )
   }
}

export default Chat;