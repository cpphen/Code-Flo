import React, { Component } from 'react';

import io from 'socket.io-client';
const clientSocket = io()
class PrivateChat extends Component {
  constructor(props) {
  super(props);

  this.state = {

    message: [],
    enterroom:[]

  };



  clientSocket.on('user joined', (user) => {
    this.updateRoom(user);
    console.log('user: %s',user);
    console.log('this.state.enterroom: %s', this.state.enterroom);
  });
  // clientSocket.on('user left', (user) => {
  //   this.updateLeave(user);
  //
  // });

  clientSocket.on('receive private message', (payload) => {
      this.updateMsg(payload)
  }
  );



  this.handleSend = this.handleSend.bind(this)
  }

  handleSend(ev) {
    ev.preventDefault();
    var chatMessage = {
      message: this.refs.usermsg.value,
      user: this.props.CheckSeshUser.username,
      sid: clientSocket.id
    }
    clientSocket.emit('new message private', {
      room: 'private',
      sender: chatMessage.user,
      sid: chatMessage.sid,
      newMessage: chatMessage.message
    })
    var statearray = this.state.message.slice();
    statearray.push({messageBody: chatMessage.message, messageSender: "Me", messageSID: chatMessage.sid});
    this.setState({message: statearray})
    console.log("handleSend:%s", this.refs.usermsg.value);
    this.refs.usermsg.value = '';

  }

  // updateSID(id) {
  //   this.setState({sid: id})
  //
  // }

  updateRoom(user) {
    var lobbyarray = this.state.enterroom.slice();
    lobbyarray.push({user});
    { this.refs.mountCheck ? this.setState({enterroom: lobbyarray}) : console.log("not mounted yet") }
    console.log(this.state.enterroom);
  }
  // updateLeave(user) {
  //   this.setState({'leftlobby': user})
  // }
  updateMsg(payload) {
    var messagearray = this.state.message.slice();
    messagearray.push({messageBody: payload.newMessage, messageSender: payload.sender, messageSID: payload.sid})
    this.setState({message: messagearray})
    // console.log("messages: ",this.state.message);
  }
  componentDidMount() {
    console.log('SID',clientSocket.id);
    clientSocket.emit('joined room', {room: 'private', user: clientSocket.id})
    // this.props.router.setRouteLeaveHook(this.props.route, () => {
    //       clientSocket.emit('exit lobby', {room: 'lobby', user: clientSocket.id});
    // })
  }
  // componentWillUnmount() {
  //
  //
  // }

  render(){

    return (
      <div ref= "mountCheck">
        <div>
          {this.state.enterroom.map((user, i) =>
            <div className="chatMsg" key={i}><span>{user.user} has joined the room.</span>
            </div>
        )}
        </div>





        <div className='jumbotron'>
        {this.state.message.map((msg, i) =>
          <div className="chatMsg" key={i}><span>{msg.messageSender}({msg.messageSID}): {msg.messageBody} [{(new Date().toLocaleTimeString())}]</span>
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
export default PrivateChat;
