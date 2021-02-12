import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import BlogPost from "./BlogPost";
import {UserContext} from "../../context/UserContext";

function Feed() {
    let [blogPosts, setBlogPosts] = useState();
    const {user} = useContext(UserContext);

    useEffect(() => {
        //fetch all posts
        axios.get('http://localhost:5000/api/v1/post')
            .then((res) => {
                setBlogPosts(res.data)
            })
            .catch(err => console.log(err));
    }, [user])

    return (
        <div>
            {(user == null || user) &&
            <div>
                <h1 className={"m-4"}>News Feed</h1>
                <div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            {blogPosts?.map((item) => {
                                return <BlogPost key={item._id} title={item.title} content={item.content}
                                                 date={item.date}
                                                 likes={item.likes}
                                                 id={item._id} username={item.username}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Feed;