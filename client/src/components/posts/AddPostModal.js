import React, {
  useContext,
  useState,
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

function AddPostModal() {
  //context
  const {
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    setShowToast,
  } = useContext(PostContext);
  //state
  const [newPost, setNewPost] = useState({
    titleTyping: "",
    descriptionTyping: "",
    urlTyping: "",
    statusTyping: "To learn",
  });
  const {
    titleTyping,
    descriptionTyping,
    urlTyping,
  } = newPost;
  const onChangeNewPostForm = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };
  const closeDialog = () => {
    setNewPost({
      titleTyping: "",
      descriptionTyping: "",
      urlTyping: "",
      statusTyping: "To learn",
    });
    setShowAddPostModal(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(
      newPost,
    );
    //send message and type toast to PostContext
    setShowToast({
      show: true,
      message: message,
      type: success ? "info" : "danger",
    });
    closeDialog();
  };

  return (
    <Modal
      show={showAddPostModal}
      onHide={closeDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          What do you want to learn?
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="titleTyping"
              aria-describedby="title-help"
              value={titleTyping}
              required
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              name="descriptionTyping"
              value={descriptionTyping}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Url"
              name="urlTyping"
              value={urlTyping}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn It!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddPostModal;
