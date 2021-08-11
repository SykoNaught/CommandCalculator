import React from 'react';
import {Modal} from 'react-bootstrap';

const MyModal = (props) => {
  return(
    <Modal
      {...props}
      size={props.size}
      centered
    >
      <Modal.Header closeButton>{props.header && <Modal.Title>{props.header}</Modal.Title>}</Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
    </Modal>
  )
}

export default MyModal