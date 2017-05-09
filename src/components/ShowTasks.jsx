import React, { Component } from 'react';
import axios from 'axios';
import { Button, Collapse, Well } from 'react-bootstrap';

class Tasks extends Component {
	constructor(props){
		super(props)

		this.state = {
			tasks: []
		}

		this.openCollapse = this.openCollapse.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log("NEXTTT PROPPPPPSSSS", nextProps);
		this.setState({tasks: nextProps.userTasks});
	}

	openCollapse(event) {
	    this.setState({open: !this.state.open});

	    var projectID = this.props.router.params.id;
	    var userID = event.target.getAttribute('data-memberID');

		//can attach a .then to asynchronous actions. Since this action creator 
	    //function this.props.populateTasks returns an axios request, I am able to attach a then() to it
	    //and then set the state.	  
	    this.props.populateTasks(projectID, userID).then(() => {
	    	this.setState({tasks: this.props.userTasks});
	    });
	}

	render(){
		const { members } = this.props;
		console.log("MEMBERS", members);

		let nothing = null;

		return (
				<div className="container">
				  <a className="open-collapse-button action-button shadow animate green" id="showTask" data-memberID={members._id} onClick={this.openCollapse}>View Tasks</a>
			          <Collapse className="task-collapse" in={this.state.open}>
			            <div>
			              <Well className="well">
			              { 
			                this.state.tasks 

			                ?

			                <ol className="taskList">
				                {this.state.tasks.map((task, i) => 				         
				                  <li key={i}>{task.task.toString()}</li>				               
				                )}
			                </ol>

			                :

			                nothing
			              }
			              </Well>
			            </div>
			          </Collapse>
			    </div>
		)
	}
}

export default Tasks;