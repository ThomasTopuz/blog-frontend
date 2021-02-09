import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import BlogPost from "./BlogPost";
import {UserContext} from "../../context/UserContext";

function Dashboard(props) {
    let [blogPosts, setBlogPosts] = useState();
    let [loading, setLoading] = useState(true);
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        //fetch all posts
        axios.get('http://localhost:5000/api/v1/post')
            .then((res) => {
                setBlogPosts(res.data)
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div>
            <h1 className={"m-4"}>Dashboard - all posts</h1>
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {blogPosts?.map((item) => {
                            return <BlogPost key={item._id} title={item.title} content={item.content} date={item.date}
                                             likes={item.likes}
                                             id={item._id} username={item.username}/>
                        })}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Dashboard;
