import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BlogPost from "../components/BlogPost";
import { UserContext } from "../context/UserContext";
import Alert from "@material-ui/lab/Alert";
import BASE_URL from "../BaseUrl";
import CircularProgress from "@material-ui/core/CircularProgress";

function Feed() {
  let [blogPosts, setBlogPosts] = useState([]);
  const [lodaing, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    //fetch all posts
    axios
      .get(BASE_URL + "/post")
      .then((res) => {
        setBlogPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div>
      {(user == null || user) && (
        <div>
          <h1 className={"m-4"}>News Feed</h1>
          <div>
            <div className="row justify-content-center">
              <div className="col-md-6">
                {!lodaing ? (
                  <div>
                    {blogPosts?.length > 0 ? (
                      blogPosts.map((item) => {
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
                      <Alert severity="info">No posts.</Alert>
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
