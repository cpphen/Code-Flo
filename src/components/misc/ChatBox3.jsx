
import React, { Component } from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';
class ChatBox2 extends Component {
  constructor(props) {
  super(props);

  this.state = {

    message: [],
    enterlobby:[],
    leftlobby:'',
    allUsers:[]
  };

  this.props.clientSocket.on('sending id', (log, id) => {
    console.log(log, id);
    // this.updateSID(id);
    console.log('this.state.sid: %s', this.state.sid);

  });
  this.props.clientSocket.on('return clients', (msg, clients) => {
    console.log(msg);
    console.log(clients);
    this.updateClients(clients);
  })

  this.props.clientSocket.on('user joined', (user) => {
    this.updateLobby(user);
    console.log('user: %s',user);
    console.log('this.state.enterlobby: %s', this.state.enterlobby);
  });
  this.props.clientSocket.on('user left', (user) => {
    this.updateLeave(user);

  });

  this.props.clientSocket.on('receive lobby message', (payload) => {
      this.updateMsg(payload)
  }
  );

  this.props.clientSocket.on('received private invite', (payload) => {
    console.log('received private invite from %s', payload)
  });


  this.privateRequest = this.privateRequest.bind(this)
  this.handleSend = this.handleSend.bind(this)
  }

  updateClients(clients) {
    var array = [];
    array = clients;
    array.splice(array.indexOf(this.props.clientSocket.id), 1);
    // console.log(array);
    this.setState({allUsers: array})
    console.log(this.state.allUsers);
  }

  privateRequest() {
    console.log('button clicked.');
    this.props.clientSocket.emit('private invitation',
      this.props.clientSocket.id
    )

  }
  handleSend(ev) {
    ev.preventDefault();
    var chatMessage = {
      message: this.refs.usermsg.value,
      user: this.props.CheckSeshUser.username,
      sid: this.props.clientSocket.id
    }
    this.props.clientSocket.emit('new message lobby', {
      room: 'lobby',
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

  componentWillUnmount() {
    this.props.clientSocket.close();
    this.props.clientSocket.disconnect();

  }
  componentWillMount() {
    this.props.clientSocket.connect();
  }

  updateLobby(user) {
    var lobbyarray = this.state.enterlobby.slice();
    lobbyarray.push({user});
    { this.refs.mountCheck ? this.setState({enterlobby: lobbyarray}) : console.log("not mounted yet") }
    console.log(this.state.enterlobby);
  }
  updateLeave(user) {
    this.setState({'leftlobby': user})
  }
  updateMsg(payload) {
    var messagearray = this.state.message.slice();
    messagearray.push({messageBody: payload.newMessage, messageSender: payload.sender, messageSID: payload.sid})
    this.setState({message: messagearray})
    // console.log("messages: ",this.state.message);
  }
  componentDidMount() {
    console.log('SID',this.props.clientSocket.id);
    this.props.clientSocket.emit('joined lobby', {room: 'lobby', user: this.props.clientSocket.id})

   //  this.props.clientSocket.emit('get clients', this.props.clientSocket.id);
  }
  // componentWillUnmount() {
  //
  //
  // }

  render(){

    return (
      <div ref= "mountCheck">
        {/* <Link to={`/chat/private/${this.props.clientSocket.id}`} onClick={this.privateRequest}>Private</Link> */}
        {/* <button className='btn btn-primary' onClick={this.privateRequest}>Invite</button> */}
        <br/>
        <div className="onlineUsers">
          {this.state.allUsers.map((user, i) =>
            <img key={i} className="userCircle img-circle" id={user} src='https://placehold.it/50x50' />
          )}
        </div>
        <div className='row'>
          <div className='col-md-6'>
          {this.state.enterlobby.map((user, i) =>
            <div className="chatMsg" key={i}><span>{user.user} has joined the room.</span>
            </div>
        )}

          </div>
          <div className='col-md-6'>
            <div className="chatMsg"><span>{this.state.leftlobby}</span>
            </div>
        )}

          </div>
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
export default ChatBox2;
