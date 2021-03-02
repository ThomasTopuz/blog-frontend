import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogPost from "../components/BlogPost";
import Alert from "@material-ui/lab/Alert";
import BASE_URL from "../BaseUrl";
import CircularProgress from "@material-ui/core/CircularProgress";

function LikedPosts() {
  let [LikedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //fetch all liked posts
    axios
      .get(BASE_URL + "/post/liked", {
        headers: { "x-auth-token": localStorage.getItem("jwtToken") },
      })
      .then((res) => {
        setLikedPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function dislike(id) {
    let updatedLikedPosts = LikedPosts.filter((post) => {
      return post._id !== id;
    });
    setLikedPosts(updatedLikedPosts);
  }

  return (
    <div>
      <h1 className={"m-4"}>Liked Posts</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {!loading ? (
              <div>
                {LikedPosts?.length > 0 ? (
                  LikedPosts?.map((item) => {
                    return (
                      <BlogPost
                        key={item._id}
                        title={item.title}
                        content={item.content}
                        date={item.date}
                        likes={item.likes}
                        id={item._id}
                        username={item.username}
                        dislike={dislike}
                      />
                    );
                  })
                ) : (
                  <Alert severity="info">No posts Liked.</Alert>
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
  );
}

export default LikedPosts;
