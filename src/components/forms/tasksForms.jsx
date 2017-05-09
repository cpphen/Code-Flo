import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { Modal, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';


class TasksForms extends Component {

      constructor(props) {
        super(props);

        this.close = this.close.bind(this)
        this.handleTask = this.handleTask.bind(this);
    }


    handleTask(event){
        console.log("THE TASK", this.taskss.value)        
        console.log("User ID for TASKSS",this.props.userIDforTask)

        let task = this.taskss.value;
        let userID = this.props.userIDforTask;
        let projectID = this.props.router.params.id

        console.log("PROJECT ID", projectID);

        this.taskss.value = "";

        this.props.updateUserTask(task, userID, projectID);
    }



    close() {
        this.props.closeModalTask()
    }

    render() {

        return (
           <div>
                <Modal show={this.props.taskModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign a Task</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>

                        <FormGroup>
                     
                            <ControlLabel htmlFor="inputTask" className="sr-only">Task to be assigned</ControlLabel>
                            <FormControl type="text" inputRef={ (ref) =>  { this.taskss = ref; } } id="inputTask" className="form-control" placeholder="The Task" />

                        </FormGroup>

                        </Modal.Body>
                    <Modal.Footer>                                                                           
                        <Button className="btn btn-lg btn-primary btn-block" bsStyle="info" type="button" onClick={this.handleTask}>Submit</Button>
                        <Button className="btn btn-lg btn-warning btn-block" bsStyle="danger" type="button" onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
           </div>

    );
  }

};
export default TasksForms;