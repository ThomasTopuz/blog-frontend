import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BlogPost from "../components/BlogPost";
import { UserContext } from "../context/UserContext";
import Alert from "@material-ui/lab/Alert";
import BASE_URL from "../BaseUrl";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField } from "@material-ui/core";

function Feed() {
  let [blogPosts, setBlogPosts] = useState([]);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([]);
  const [lodaing, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const onSearchFilter = (event) => {
    const filterInput = event.target.value;
    if (filterInput.length > 0) {
      console.log(filterInput);
      const filteredBlogPosts = blogPosts.filter((post) => {
        if (
          post.title.includes(filterInput) ||
          post.content.includes(filterInput)
        )
          return post;
      });
      setFilteredBlogPosts(filteredBlogPosts);
    } else {
      setFilteredBlogPosts(blogPosts);
    }
  };
  useEffect(() => {
    //fetch all posts
    axios
      .get(BASE_URL + "/post")
      .then((res) => {
        setBlogPosts(res.data);
        setFilteredBlogPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div>
      {(user == null || user) && (
        <div>
          <div className="row align-items-center w-100">
            <h1 className={"m-4"}>News Feed</h1>
          </div>

          <div>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <TextField
                  id="filled-basic"
                  onChange={onSearchFilter}
                  label="Search for a post"
                  variant="filled"
                  fullWidth
                />
                {!lodaing ? (
                  <div>
                    {filteredBlogPosts?.length > 0 ? (
                      filteredBlogPosts.map((item) => {
                        return (
                          <BlogPost
                            key={item._id}
                            title={item.title}
                            content={item.content}
                            date={item.date}
                            likes={item.likes}
                            id={item._id}
                            username={item.username}
                          />
                        );
                      })
                    ) : (
                      <Alert className="mt-3" severity="info">
                        No posts.
                      </Alert>
                    )}
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
      )}
    </div>
  );
}

export default Feed;
