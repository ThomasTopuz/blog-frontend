import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import PostAddIcon from "@material-ui/icons/PostAdd";

function CreatePost(props) {
  const methods = useForm();
  const { handleSubmit, register, errors } = methods;

  function submitHandler(data) {
    props.onHide();
    props.createpost(data);
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={"mb-3"}>
            <TextField
              error={!!errors.title}
              fullWidth
              label="Title"
              placeholder={"Write blog's title"}
              name="title"
              inputRef={register({
                required: "Title is required",
                minLength: {
                  value: 4,
                  message: "Title's min lenght is 4.",
                },
              })}
              helperText={!!errors.title ? errors.title.message : ""}
            />
            <textarea
              className={"rounded p-2 mt-3 w-100"}
              rows={7}
              placeholder={"Write your post"}
              name="content"
              ref={register({
                required: "Content is required",
                minLength: {
                  value: 4,
                  message: "Title's min lenght is 4.",
                },
              })}
            />
          </div>

          <Button
            type={"submit"}
            className={"float-right"}
            variant="contained"
            color="primary"
            startIcon={<PostAddIcon />}
          >
            Post
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePost;
