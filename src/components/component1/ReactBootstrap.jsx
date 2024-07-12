import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ReactBootstrap.css";
const ReactBootstrap = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [editItem, setEditItem] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [array, setarray] = useState([]);
  const [SearchItem, setSearchItem] = useState("");

  useEffect(() => {
    let getItemAll = JSON.parse(localStorage.getItem("array"));
    if (getItemAll) {
      setarray(getItemAll);
    }

  }, []);

  function addNew() {
    if (!input) {
      alert("Please, add list!");
    } else {
      setarray([...array, input]);
      setInput("");
      localStorage.setItem("array", JSON.stringify([...array, input]));
    }
  }

  function deleteItem(i) {
    console.log(array.length);
    let arr = array.filter((item, index) => index != i);
    console.log(arr);
    setarray(arr);
  }
  function editItemFunk(i) {
    setEditIndex(i);
    setShow(true);
    const findItem = array.find((item, index) => index == i);
    setEditItem(findItem);
  }
  function SaveEditItem() {
    let updatesArray = array.map((item, index) => {
      if (index == editIndex) {
        return editItem;
      }
      return item;
    });
    setarray(updatesArray);
    setShow(false);
  }

  function SearchFunk(e) {
    console.log(e.target.value);
    setSearchItem(e.target.value);
    console.log(filteredArr);
  }

  const filteredArr = array.filter((item) =>
    item.toLowerCase().includes(SearchItem.toLowerCase())
  );

  return (
    <>
      <p>To Do List</p>
      {SearchItem != false && filteredArr.length == 0 ? (
        <p>There is no such element</p>
      ) : null}
      <button onClick={addNew} className="addnew">
        Add new
      </button>
      <br /> <br></br>
      <input
        type="text"
        placeholder="Add Text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <br></br>
      <input
        type="search"
        placeholder="Search"
        value={SearchItem}
        onChange={SearchFunk}
      />
      <ul className="list">
        {filteredArr.map((item, index) => {
          return (
            <li key={index}>
              {item}
              <div>
                <button
                  variant="primary"
                  onClick={() => editItemFunk(index)}
                  className="edit"
                >
                  Edit
                </button>
                <button className="delete" onClick={() => deleteItem(index)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={editItem}
              onChange={(e) => setEditItem(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={SaveEditItem}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ReactBootstrap;
