import React, {useContext, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {UserContext} from "../context/UserContext";
import Typography from "@material-ui/core/Typography";
import Popover from '@material-ui/core/Popover';

function BlogPost(props) {
    let [likes, setLikes] = useState(props.likes);
    const {user, setUser} = useContext(UserContext);
    let [isLiked, setIsLiked] = useState((user == null || user) ? user?.likedPostsId.includes(props.id) : false);

    useEffect(() => {
        setIsLiked((user == null || user) ? user?.likedPostsId.includes(props.id) : false);
    }, [user])

    function toggleLike(event) {
        if (user == null) {
            setAnchorEl(event.currentTarget);
            return console.log("devi essere loggato!!");
        }
        props.dislike?.(props.id);
        const headers = {
            'x-auth-token': localStorage.getItem("jwtToken")
        }

        axios.get("http://localhost:5000/api/v1/post/liketoggle/" + props.id, {headers: headers})
            .then((res) => {
                setLikes(res.data.likes);
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

    /*popover*/
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Paper elevation={10} className={"p-5 m-4"}>
                <h3 className={"border-bottom pb-3 text-center"}>{props.title}</h3>
                <p className={"text-left"}>{props.content}</p>
                <p className={"float-right"}>, {props.date.slice(0, 10)}</p>
                <p className={'float-right'}>created by <span className={"font-weight-bold"}>{props.username}</span></p>

                <Button onClick={toggleLike} startIcon={<ThumbUpIcon
                    color={isLiked ? "primary" : "inherit"}/>}>{likes}</Button>
            </Paper>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={"p-2"}>You must login to give likes</Typography>
            </Popover>
        </div>
    );
}

export default BlogPost;
