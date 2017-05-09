import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router';
import { FormGroup, FormControl, ControlLabel, Button, Collapse, Well } from 'react-bootstrap';
import TasksForms from '../components/forms/tasksForms.jsx';
import Tasks from '../components/ShowTasks.jsx';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleJoin = this.handleJoin.bind(this);
    this.open = this.open.bind(this);
  }

  componentWillMount() {
    var id = this.props.router.params.id;

    this.props.teamDetails(id).then(() => {
      if((this.props.CheckSeshUser.avatar) && (this.props.CheckSeshUserID === this.props.teamDet.adminID)){
        var updateAvatar = {
          avatar: this.props.CheckSeshUser.avatar,
          id
        }
        axios.post('/avatar-projectlist', updateAvatar);
      }
    })
  }

  handleJoin(e) {
    this.props.addMember(this.props.CheckSeshUserID, this.props.teamDet.teamInfo._id)

    this.props.router.push('/newproject');
  }

  open(event) {
    this.props.openModalTask()
    var userID = event.target.getAttribute('data-member-id')

    //sets the userID in the button that opens modal, to the store so that it can be referenced in <TasksForms/>
    this.props.taskAssignUser(userID);
  }

  render() {

    const { members, teamInfo } = this.props.teamDet;
    console.log("TEAM MEMBERS ARRAY", members)

    let nothing = null;
    var adminPresent = false;
    var joined = false;

    if(members.length > 0){

      for(var i = 0; i < members.length ; i++ ){
        console.log("HEEEYYYYYYYYYYYY")
        if(this.props.CheckSeshUserID === members[i]._id){
          console.log("MATCHEDDDD")
          joined = true;
        }
      }

    }

    if(this.props.CheckSeshUserID === this.props.teamDet.adminID){
      adminPresent = true;
    }

    var teamMems = "";

    //What ever html is being created in map, needs to be wrapped inside a html dom element
    if(members.length > 0){
      teamMems = members.map((members, i) =>
        <div key={i} className='container'>
          <Link to={"/profile/" + members._id}>
            <h4> {members.username} <span><img className='navbar-profilepic img-circle' src={members.avatar ? members.avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span></h4>
          </Link>
        {/*put the part where tasks are displayed into an another component Tasks since before
        when it was in this component, the map function would give them all the same onClick function
        that would set the same state to open the Collapse component. By putting it inside its own
        component and then putting the component inside the map function, each component will have its
        own version of the state `open`. That is why clicking on one would now not open all of them.
        It like making a new instance of the Task compoent class with each map and they all have their
        own copies of the variables/states and functions etc*/}

          <Tasks {...this.props} members={members} />
          {

            adminPresent

            ?
              <div>
                <a className="createButton action-button shadow animate blue" data-member-id={members._id} onClick={this.open}>
                  Assign a Task
                </a>
              </div>

            :

            nothing

          }
        </div>

      )
    }


    return (
      //One of the problems was previously I had this.props.teamDetails, but this did not work since I already had an
      //action function called teamDetail. That is why it was not recognizing this.props.teamDetails._id etc,
      //because teamDetails was a function. In the react dev tool it was also showing as a function and not the state
      //properties I needed
      <div className='container'>

            <div className='container project-det'>
              <div>
                <h1>Project Name</h1>
                <hr />
                <h5 className="project-det-h5">{this.props.teamDet.teamInfo.teamname}</h5>
              </div>
              <div>
                <hr />
                <h2>Project Admin</h2>
                <hr />
                  <Link to={"/profile/" + this.props.teamDet.adminID}>
                    <h5 className="project-det-h5">{this.props.teamDet.admin}<span><img className='navbar-profilepic img-circle' src={this.props.teamDet.teamInfo.adminAvatar ? this.props.teamDet.teamInfo.adminAvatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span></h5>
                  </Link>
              </div>
              <div>
                <hr />
                <h2>Technologies and Languages</h2>
                <hr />
                <h5 className="project-det-h5">{this.props.teamDet.teamInfo.tech}</h5>
              </div>
              <div>
                <hr />
                <h2>Project Details</h2>
                <hr />
                <h5 className="project-det-h5">{this.props.teamDet.teamInfo.description}</h5>
              </div>
                <hr />
                <h2>Team Members</h2>
                <hr />

                {teamMems}

                {

                  joined || adminPresent

                  ?

                    nothing

                  :

                    <a className="action-button shadow animate yellow" onClick={this.handleJoin}>Join Team</a>

                }

                <TasksForms {...this.props} />
            </div>

      </div>
    );
  }
}

export default ProjectDetails;
