import React, {useContext, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {UserContext} from "../../context/UserContext";

function BlogPost(props) {
    let [likes, setLikes] = useState(props.likes);
    const {user, setUser} = useContext(UserContext);
    let [isLiked, setIsLiked] = useState((user == null || user) ? user?.likedPostsId.includes(props.id) : false);

    useEffect(()=>{
        setIsLiked((user == null || user) ? user?.likedPostsId.includes(props.id) : false);
    },[user])
    function toggleLike() {
        if(user==null){
            return console.log("devi essere loggato!!")
        }
        props.dislike?.(props.id);
        const headers = {
            'x-auth-token': localStorage.getItem("jwtToken")
        }

        axios.get("http://localhost:5000/api/v1/post/liketoggle/" + props.id, {headers: headers})
            .then((data) => {
                setLikes(data.data.likes);
                setIsLiked(!isLiked);
                updateUser(); //update user liked posts

            }).catch(err => console.log(err));

    }

    function updateUser() {
        axios.get("http://localhost:5000/api/v1/users/me",
            {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
            .then((res) => {
                setUser(res.data);
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <Paper elevation={10} className={"p-5 m-4"}>
                <h3 className={"border-bottom pb-3 text-center"}>{props.title}</h3>
                <p className={"text-left"}>{props.content}</p>
                <p className={"float-right"}>, {props.date}</p>
                <p className={'float-right'}>created by <span className={"font-weight-bold"}>{props.username}</span></p>

                <Button onClick={toggleLike} startIcon={<ThumbUpIcon
                    color={isLiked ? "primary" : "inherit"}/>}>{likes}</Button>
            </Paper>
        </div>
    );
}

export default BlogPost;
