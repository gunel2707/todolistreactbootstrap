import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ReactBootstrap.css"
const ReactBootstrap = () => {
  const [show, setShow] = useState(false);
  const [input, setinput] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [array, setarray] = useState([]);
  function addNew() {
    array.push(input);
    setarray([...array]);
  }

  return (
    <>
      <h1>To Do List</h1>
      <button onClick={addNew}>Add new</button>
      <input
        type="text"
        placeholder="Add Text"
        onChange={(e) => setinput(e.target.value)}
      />
      <ul>
        {array.map((item, index) => {
          return (
            <li key={index}>
              {item} <button variant="primary" onClick={handleShow}  >EDit</button> <button>Delete</button>
            </li>
          );
        })}
      </ul>
      {/* <Button variant="primary" onClick={handleShow}>
       Edit
      </Button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReactBootstrap;
