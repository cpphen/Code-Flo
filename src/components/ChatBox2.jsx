
import React, { Component } from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';

class ChatBox2 extends Component {
  constructor(props) {
  super(props);

  this.state = {
    message: []
  };

  this.props.clientSocket.on('receive lobby message', (payload) => {
      this.updateMsg(payload)
  }
  );

  this.updateMsg = this.updateMsg.bind(this)
  this.handleSend = this.handleSend.bind(this)
}

   handleSend(ev) {
     ev.preventDefault();
     var chatMessage = {
       message: this.refs.usermsg.value,
       user: this.props.CheckSeshUser.name,
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

   updateMsg(payload) {
     var messagearray = this.state.message.slice();
     messagearray.push({messageBody: payload.newMessage, messageSender: payload.sender, messageSID: payload.sid})
     this.setState({message: messagearray})
     // console.log("messages: ",this.state.message);
   }


  render(){

    return (
      <div ref= "mountCheck">
         <div className='jumbotron chatJumbo'>
         {this.state.message.map((msg, i) =>
           <p className="chatMsg bubble" id={msg.messageSender} key={i}>
             <span className={`Msg ${msg.messageSender}`}>{msg.messageSender}: {msg.messageBody}</span>
         </p>
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
