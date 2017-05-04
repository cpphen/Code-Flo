import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { Modal, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';


class SkillEdit extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
    }


    updateSkills(event){
        console.log("THE SKILLS", this.newSkills.value)        
        console.log("User ID for SKILLLS", this.props.CheckSeshUser._id)

        let editedSkills = this.newSkills.value;
        let userID = this.props.CheckSeshUser._id;

        this.newSkills.value = "";

        this.props.editSkills(editedSkills, userID);
    }

    open() {
        this.props.openModalSkill();
    }

    close() {
        this.props.closeModalSkill();
    }

    render() {

        return (
           <span>
                <p className="glyphicon glyphicon-pencil editSkills" onClick={this.open}></p>

                <Modal show={this.props.skillModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Skills</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>


                        <FormGroup>
                     
                            <ControlLabel htmlFor="inputTask" className="sr-only">Add More Skills</ControlLabel>
                            <FormControl type="text" inputRef={ (ref) =>  { this.newSkills = ref; } } id="editSkills" className="form-control" />

                        </FormGroup>

                        </Modal.Body>
                    <Modal.Footer>                                                                           
                        <Button className="btn btn-lg btn-primary btn-block" bsStyle="info" type="button" onClick={this.updateSkills}>Submit</Button>
                        <Button className="btn btn-lg btn-warning btn-block" bsStyle="danger" type="button" onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

           </span>

    );
  }

};
export default SkillEdit;