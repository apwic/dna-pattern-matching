import React,{Component} from "react";
import { render } from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal, Button, Row, Col, Form }  from "react-bootstrap";
import { useState } from "react";

export class addDiseaseModal extends Component{
  constructor(props){
    super(props);
  };

  render(){
    return (
    <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Disease
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          To add Disease
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
  }
}
