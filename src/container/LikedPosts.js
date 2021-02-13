import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogPost from "../components/BlogPost";
import Alert from "@material-ui/lab/Alert";
import BASE_URL from "../BaseUrl";

function LikedPosts() {
    let [LikedPosts, setLikedPosts] = useState();
    useEffect(() => {
        //fetch all liked posts
        axios.get(BASE_URL+'/post/liked', {headers: {'x-auth-token': localStorage.getItem("jwtToken")}})
            .then((res) => {
                setLikedPosts(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    function dislike(id) {
        console.log(id);
        let updatedLikedPosts = LikedPosts.filter(post => {
            return post._id !== id;
        });
        setLikedPosts(updatedLikedPosts);
        console.log(updatedLikedPosts);
    }

    return (
        <div>
            <h1 className={"m-4"}>Liked Posts</h1>
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {(LikedPosts?.length > 0) ? LikedPosts?.map((item) => {
                                return <BlogPost key={item._id} title={item.title} content={item.content} date={item.date}
                                                 likes={item.likes}
                                                 id={item._id} username={item.username}
                                                 dislike={dislike}
                                />
                            }) :
                            <Alert severity="info">No posts Liked.</Alert>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikedPosts;
