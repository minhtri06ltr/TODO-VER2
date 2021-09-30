import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

function UpdatePostModal() {
  //context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);
  //state
  //updatedPost is post's data server response
  const [updatedPost, setUpdatedPost] =
    useState(post);

  const { title, description, url, status } =
    updatedPost;
  //update postState
  //[post]: when user click other post => post change => call Effect
  useEffect(() => setUpdatedPost(post), [post]);
  const onChangeUpdatedPostForm = (event) => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  };
  const closeDialog = () => {
    //when user change data and close or cancel
    //then choose that post to edit again
    //it just show anh hide modal
    //it dont call findPost to get data from server and fill old value
    //it fill data with previous value user fill and close
    //we must attach old post user editing again
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(
      updatedPost,
    );

    setShowUpdatePostModal(false);
    //send message and type toast to PostContext
    setShowToast({
      show: true,
      message: message,
      type: success ? "info" : "danger",
    });
  };

  return (
    <Modal
      show={showUpdatePostModal}
      onHide={closeDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Making progress?
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              aria-describedby="title-help"
              value={title}
              required
              onChange={onChangeUpdatedPostForm}
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
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Url"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="To learn">
                To learn
              </option>
              <option value="Learning">
                Learning
              </option>
              <option value="Learned">
                Learned
              </option>
            </Form.Control>
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

export default UpdatePostModal;
