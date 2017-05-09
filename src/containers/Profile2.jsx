import React, { Component } from 'react';

import { browserHistory } from "react-router";
import SkillEdit from '../components/forms/skillEditForm.jsx';

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
    let { dynamicUser, CheckSeshUserID, CheckSeshUser } = this.props
    let { skills } = this.props.CheckSeshUser

    console.log("DYNAMIC USER", dynamicUser);

    return (

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 holder">
              <img className="img-circle" src={ dynamicUser.avatar ? dynamicUser.avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } />
              <hr />
              <h2>{name}</h2>
              <hr />
              <h3>GitHub ID: <span className="gitname">{dynamicUser.username}</span></h3>
              <hr />

                <h4>{CheckSeshUserID === dynamicUser._id ? <SkillEdit {...this.props} /> : null}Skills</h4>
                <h6 className="skills">{CheckSeshUserID === dynamicUser._id ? skills : dynamicUser.skills}</h6>

              <hr />
              <br />

              <div className="icons-holder">
                <a target='_blank' href={"http://www.github.com/" + dynamicUser.username}>
                  <img src="/assets/icons/github.png" className="profIcons"/>
                </a>
              </div>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }
}

export default ProfileTwo;
