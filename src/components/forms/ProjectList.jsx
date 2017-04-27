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
    // axios.get('/teams')
    //   .then(res => {
    //     const teams2 = res.data.map(obj => obj);
    //     console.log('teams', teams2);
    //     // const members = res.data.
    //   });

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
    // let username = event.target.getAttribute('data-username');

    console.log("ID", id);

    browserHistory.push('/profile/' + id)
  }



  render() {
    // const reverseState = this.state.teams.reverse()
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
        {/* CARDS */}
        <div className="docs-card-example">


          {/* // {(i%3=0) ? <div className='row'> : null} */}
          <div className='row teamRow'>

            {/* <div className='col-md-4 col-lg-3 col-sm-6'>
              <div className="pt-card pt-elevation-2 pt-interactive">

                <ProjectForm {...this.props} />
              </div>
            </div> */}
            {this.state.teams.map((team, i) =>
              <div className='col-md-4 col-lg-3 col-sm-6' key={i}>
                <div className="pt-card pt-elevation-2 pt-interactive" >
                  <Link to={'/newproject/' + team._id}>
                    <h3 className="pt-card-h3" data-mid={team._id}>{team.teamname}</h3>
                  </Link>
                  <p><strong>Admin:</strong> {team.adminName}<span><img data-id={team.Admin} className='navbar-profilepic img-circle' src={team.adminAvatar ? team.adminAvatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span>
                  </p>
                  <p data-mid={team._id} className='techStack'><strong>Tech Stack</strong>: {team.tech}</p>
                  {/* <p data-mid={team._id}><br /><strong>Description:</strong>: {team.description}</p> */}
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
