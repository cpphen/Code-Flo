
import React, { Component } from 'react';

import io from 'socket.io-client';
const socket = io()
class ChatBox extends Component {
  constructor(props) {
  super(props);

  this.state = {message:[], currentusers:[]};

  // socket.on('receive socket', (payload) => {
  //   console.log('socket received: %s', payload);
  //   this.updateUsers(payload);
  // })
  socket.on('new user', (payload) => {
    console.log('new user');
    this.updateUsers(payload);
  })

  socket.on('receive message', (payload) => {
    console.log('message received by ChatBox: %s', payload);
    this.updateMessages(payload)
  })
  this.handleSend = this.handleSend.bind(this)
  }

  componentCleanup() {
    console.log('running cleanup');
    socket.emit('leave room', {
      room: 'lobby'
    })
    socket.emit('unuser', {
      user: this.props.CheckSeshUser.name
    })
  }

  updateMessages(payload) {
    var statearray = this.state.message.slice();
    statearray.push({messageBody: payload.newMessage, messageSender: payload.sender});
    this.setState({message: statearray})
    console.log(this.state.message);
  }
  updateUsers(payload) {
    console.log('payload:', payload);
    var usersarray = this.state.currentusers.slice();
    const objects = payload.map(obj => obj);
    // usersarray.push({
    //   userName: payload.username,
    //   id: payload.id,
    //   sid: payload.sid
    // })
    this.setState({currentusers: objects})
    console.log(this.state.currentusers);
  }
  handleSend(ev) {
    ev.preventDefault();
    var chatMessage = {
      message: this.refs.usermsg.value,
      user: this.props.CheckSeshUser.username,
      sid: this.state.currentusers.sid
    }
    socket.emit('new message', {
      room: 'lobby',
      sender: chatMessage.user,
      newMessage: chatMessage.message
    })
    var statearray = this.state.message.slice();
    statearray.push({messageBody: chatMessage.message, messageSender: "Me"});
    this.setState({message: statearray})
    console.log("handleSend:%s", this.refs.usermsg.value);
    this.refs.usermsg.value = '';
    // console.log(this.refs.usermsg.value);
  }
	componentDidMount() {
    const userID = this.props.CheckSeshUserID;
		socket.emit('room', {room: 'lobby'})
    console.log("ComponentDidMount from Chat:" + this.props.CheckSeshUserID);
    socket.emit('user', {user: this.props.CheckSeshUser, sid: this.state.currentusers})
    window.onbeforeunload = () => { // run cleanup when page refreshes
          this.componentCleanup();
    }


	}
  componentWillUnmount() {
    this.componentCleanup();
     window.onbeforeunload = null; // remove the event handler for normal unmounting

    }

	render(){
    return (
      <div>

        <div className='jumbotron'>

          {this.state.message.map((msg,i) =>
         <div className="chatMsg" key={i}>
          <span>{msg.messageSender}({(new Date().toLocaleTimeString())}): {msg.messageBody}</span>
          <br />
        </div>
          )}




        </div>
        <div className='jumbotron'>
          {this.state.currentusers.map((user,i) =>
         <div className="user" key={i}>
          <span>{user.userName}({user.sid})</span>
          <br />
        </div>
          )}
        </div>
      <form name="message">

          <input name="usermsg" type="text" ref="usermsg" size="63" />
          <button className="btn btn-primary" onClick={this.handleSend}>SEND</button>

      </form>
      </div>

    )
  }
}
export default ChatBox;
