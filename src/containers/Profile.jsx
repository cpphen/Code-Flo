import React, { Component } from 'react';

import { browserHistory } from 'react-router';
import SkillEdit from '../components/forms/skillEditForm.jsx';

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

		return (

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 holder">
              <img className="img-circle" src={ avatar ? avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } />
              <hr />
              <h2>{name}</h2>
              <hr />
              <h3>GitHub ID: <span className="gitname">{username}</span></h3>
              <hr />

                <h4><SkillEdit {...this.props} />Skills</h4>
                <h6 className="skills">  {skills} </h6>

              <hr />
              <br />
              <div className="icons-holder">
                <a target='_blank' href={"http://www.github.com/" + username}>
                  <img src="/assets/icons/github.png" className="profIcons"/>
                </a>
              </div>
              <div className="buttons-holder">
                  <button type="button" className="btn btn-success actionButtons" onClick={this.getPhoto}>Import GitHub Photo</button>
              </div>
          </div>
          <div className="col-md-3"></div>
        </div>



    );
  }
}

export default Profile;
