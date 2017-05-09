import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MainFooter from '../components/MainFooter.jsx';

class Main extends Component {

  render() {

    return (
      <div className="Main">

         <Header
           {...this.props}
           logout={this.props.logout}
           logCheck={this.props.isLoggedInCheck}
           logRegCheck={this.props.isLoggedInReg}
           router={this.props.router}
           avatar={this.props.CheckSeshUser.avatar}
         />
         <iframe width="560" height="315" src="http://www.youtube.com/embed/OcRtcjGYU8g?autoplay=1&loop=1&playlist=OcRtcjGYU8g" frameborder="0"></iframe>
        <div className="container Main-content">
          {React.cloneElement(this.props.children, this.props)}
        </div>

        <MainFooter {...this.props}/>

      </div>

    );

  }
}

export default Main;