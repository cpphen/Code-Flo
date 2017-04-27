import React, { Component } from 'react';

import { browserHistory } from "react-router";

class ProfileTwo extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    let userID = this.props.router.params.id

    console.log("PROFILE TWO COMPONENT WILL MNT USERID", userID)

    this.props.dynamicProfile(userID);
  }

  render() {
    const { dynamicUser } = this.props

    return (

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 holder">
              <img className="img-circle" src={ dynamicUser.avatar ? dynamicUser.avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } />
              <hr />
              <h2>{name}</h2>
              <hr />
              <h3>GitHub ID: <span>{dynamicUser.username}</span></h3>
              <hr />

                <h4>Skills</h4>
                <h6>{dynamicUser.skills}</h6>

              <hr />
              <br />

              <div className="icons-holder">
                <a target='_blank' href="http://www.github.com">
                  <img src="/assets/icons/github.png" className="profIcons"/>
                </a>
                <a target='_blank' href="http://www.linkedin.com">
                  <img src="/assets/icons/linkedin.png" className="profIcons"/>
                </a>
              </div>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }
}

export default ProfileTwo;
