import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { browserHistory, Link } from "react-router";
import Coverflow from 'react-coverflow';
import * as Blueprint from "@blueprintjs/core";
import ProjectForm from './ProjectForm.jsx';

class ProjectList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };

    this.profile = this.profile.bind(this);
    this.updateProjectList = this.updateProjectList.bind(this);
  }

  componentDidMount() {
      axios.get('/populate').then(res=> {
        console.log(res)
        let teams = res.data.reverse().map(obj => obj);
        this.setState({ teams });
        console.log("populate teams",teams);
      });
  }

  updateProjectList(){
    axios.get('/populate').then((data) => {
      let teams = data.data.reverse().map(obj => obj);
        this.setState({ teams });
    });
  }

  profile(event){
    let id = event.target.getAttribute('data-id');
    browserHistory.push('/profile/' + id)
  }

  render() {

    let nothing = null;
    const size = 5

    return (
      <div className='container'>

        <Coverflow width="1400" height="400"
          displayQuantityOfSide={2}
          navigation={true}
          enableScroll={false}
          clickable={true}
          active={2}
          >

            {this.state.teams.slice(0, size).map((team, i) =>
              <div className='coverflowdiv' key={i}>
                <Link to={'/newproject/' + team._id}>
                <span><h1 className='coverflow_h1' data-mid={team._id}>{team.teamname}</h1></span>
                <div className="coverflowdiv2">
                  <h4>
                    {team.adminName}
                  </h4>
                  <span><img className='navbar-profilepic img-circle' src={team.adminAvatar ? team.adminAvatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span>

                </div>
                </Link>
              </div>
            )}

        </Coverflow>

        <ProjectForm
          open={this.props.openModalT}
          close={this.props.closeModalT}
          show={this.props.teamModal}
          create={this.props.createTeam}
          router={this.props.router}
          user={this.props.CheckSeshUser}
          update={this.updateProjectList}
        />

        <div className="docs-card-example">

          <div className='row teamRow'>

            {this.state.teams.map((team, i) =>
              <div className='col-md-4 col-lg-3 col-sm-6' key={i}>
                <div className="pt-card pt-elevation-2 pt-interactive" >
                  <Link to={'/newproject/' + team._id}>
                    <h3 className="pt-card-h3" data-mid={team._id}>{team.teamname}</h3>
                  </Link>
                  <p><strong>Admin:</strong> {team.adminName}<span><img data-id={team.Admin} className='navbar-profilepic img-circle' src={team.adminAvatar ? team.adminAvatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span>
                  </p>
                  <p data-mid={team._id} className='techStack'><strong>Tech Stack</strong>: {team.tech}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectList;
