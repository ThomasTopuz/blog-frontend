import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import EditableBlogPost from "../components/EditableBlogPost";
import { UserContext } from "../context/UserContext";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreatePost from "../components/CreatePost";
import BASE_URL from "../BaseUrl";
import CircularProgress from "@material-ui/core/CircularProgress";

function MyPosts() {
  let [createdPosts, setCreatedPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    //fetch all posts
    axios
      .get(BASE_URL + "/post/created", {
        headers: { "x-auth-token": localStorage.getItem("jwtToken") },
      })
      .then((res) => {
        setCreatedPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function deletePost(id) {
    let updateCreatedPosts = createdPosts.filter(function (item) {
      return item._id !== id;
    });
    setCreatedPosts(updateCreatedPosts);
    axios
      .delete(BASE_URL + "/post/" + id, {
        headers: { "x-auth-token": localStorage.getItem("jwtToken") },
      })
      .catch((err) => console.log(err));
  }

  function createPost(data) {
    axios
      .post(BASE_URL + "/post", data, {
        headers: { "x-auth-token": localStorage.getItem("jwtToken") },
      })
      .then((res) => setCreatedPosts([...createdPosts, res.data]))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Button
        onClick={() => setIsCreating(true)}
        className={"mr-4 float-right"}
        variant={"contained"}
        color={"secondary"}
        startIcon={<AddCircleIcon />}
      >
        Create
      </Button>
      <h1 className={"m-4"}>Your Posts</h1>

      <CreatePost
        show={isCreating}
        onHide={() => setIsCreating(false)}
        createpost={createPost}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            {!loading ? (
              <div>
                {createdPosts?.length > 0
                  ? createdPosts?.map((item) => {
                      return (
                        <EditableBlogPost
                          key={item._id}
                          title={item.title}
                          content={item.content}
                          date={item.date}
                          likes={item.likes}
                          id={item._id}
                          deletePost={deletePost}
                          editable={true}
                        />
                      );
                    })
                  : createdPosts?.length <= 0 &&
                    user && <Alert severity="info">No posts created.</Alert>}
              </div>
            ) : (
              <div className="row justify-content-center">
                <CircularProgress size={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
