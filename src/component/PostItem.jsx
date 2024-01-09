import React, { useState, useRef } from "react";
import axios from "axios";
import lodash from "lodash";
// import { useToasts } from "react-toast-notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Spinner, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { API } from "./config";

function PostItem() {
  const Navigate = useNavigate();
  const [show, setShow] = useState(true);
  //   const { addToast } = useToasts();
  const token = window.localStorage.getItem("token");
  const [loading, setloading] = useState(false);

  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [type, settype] = useState("");
  const fileInputRef = useRef(null);
  const [files, setFile] = useState([]);
  const [image, setImage] = useState([]);
  // const [src,set] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // setImage(reader.result);
      setImage((image) => [...image, reader.result]);
      // console.log(reader.result);
    };
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);

    selectedFiles.map((file) => {
      console.log(file);
      previewFiles(file);
      return null; // Map function expects a return value
    });

    // console.log(e.target.files);
    // setFile(e.target.files);
    // files.map((file)=>{
    //   console.log(file.name);
    // //   previewFiles(file);
    // })
    // var file = e.target.files[0];
    // setFile(file);
    // previewFiles(file);
  };

  const handleSubmit = () => {
    setloading(true);
    // console.log(image);
    // set(image[0]);
    

    if (itemname && description && type) {
      const user = localStorage.getItem('lfsuserid');
      const newPayload = {
        name:itemname,
        description:description,
        type:type,
        question:itemquestion,
        createdBy:user,
        imgsrc:image
      }
      console.log(newPayload);

      axios({
        url: `${API}/postitem`,
        method: "POST",
        data: newPayload,
      })
        .then((response) => {
          // console.log(response);
          toast("Wohoo 🤩! Item listed successfully.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setitemname("");
          setdescription("");
          settype("");
          setitemquestion("");
          setitemimage([]);
          // fileInputRef.current.value = '';
          // console.log("Executed");
          Navigate('/feed');
          setloading(false);
          setShow(false);
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
          toast("Oops 😞! Check internet connection or try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      // console.log("required field missed");
      toast("you missed some required fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div>
    {/* <img src={src}/> */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                Item name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Description<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter a question based on the item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex:- What is the color of the phone ?"
                value={itemquestion}
                onChange={(e) => setitemquestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>image input</Form.Label>

              <Form.Control
                type="file"
                id="formimage"
                accept="image/jpg, image/png, image/jpeg"
                name="itemPictures"
                required
                multiple
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Item type<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose..."
                onChange={(e) => settype(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default PostItem;
