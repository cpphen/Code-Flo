import React, { Component } from 'react';

import { browserHistory } from "react-router";

class Profile extends Component {

  constructor(props){
    super(props)

    this.getPhoto = this.getPhoto.bind(this);
  }

  getPhoto() {
    this.props.getPhoto(this.props.CheckSeshUser.username, this.props.CheckSeshUser._id);
  }

  render() {
    const { username, name, skills, avatar } = this.props.CheckSeshUser
    // let skillsArr = skills.split(",");
    // let skillList = null;
    // if(skillsArr){
    //   // var newarr = skillsArr.split(",");
    //   skillList = skillsArr.map((item, index) =>
    //       <li key={index}>{item}</li>
    //     )
    //   console.log("SKILLS", skillsArr);
    // }
    // let empty = null;

		return (

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 holder">
              <img className="img-circle" src={ avatar ? avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } />
              <hr />
              <h2>{name}</h2>
              <hr />
              <h3><span className="glyphicon glyphicon-pencil editUsername"></span>GitHub ID: <span>{username}</span></h3>
              <hr />

                <h4><span className="glyphicon glyphicon-pencil editSkills"></span>Skills</h4>
                <h6>{skills}</h6>

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
              <div className="buttons-holder">
                  {/*<button type="button" className="btn btn-danger actionButtons">Add to Team</button>
                  <button type="button" className="btn btn-success actionButtons">Connect</button>*/}
                  <button type="button" className="btn btn-success actionButtons" onClick={this.getPhoto}>Import GitHub Photo</button>
                  {/*<button type="button" className="btn btn-warning actionButtons">Send Message</button>*/}
              </div>
          </div>
          <div className="col-md-3"></div>
        </div>



    );
  }
}

export default Profile;
