import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogPost from "./BlogPost";

function LikedPosts() {
    let [LikedPosts, setLikedPosts] = useState();
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        //fetch all posts
        axios.get('http://localhost:5000/api/v1/post/liked', {headers: {'x-auth-token': localStorage.getItem("jwtToken")}})
            .then((res) => {
                setLikedPosts(res.data)
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div>
            <h1 className={"m-4"}>Liked Posts</h1>
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {LikedPosts?.map((item) => {
                            return <BlogPost key={item._id} title={item.title} content={item.content} date={item.date}
                                             likes={item.likes}
                                             id={item._id} username={item.username}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikedPosts;
