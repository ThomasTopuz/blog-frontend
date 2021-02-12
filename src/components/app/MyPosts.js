import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import EditableBlogPost from "./EditableBlogPost";
import {UserContext} from "../../context/UserContext";
import Button from "@material-ui/core/Button";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreatePost from "./CreatePost";

function MyPosts() {
    let [createdPosts, setCreatedPosts] = useState();
    const {user} = useContext(UserContext);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        //fetch all posts
        axios.get('http://localhost:5000/api/v1/post/created', {headers: {'x-auth-token': localStorage.getItem("jwtToken")}})
            .then((res) => {
                setCreatedPosts(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    function deletePost(id) {
        let updateCreatedPosts = createdPosts.filter(function (item) {
            return item._id !== id;
        });
        setCreatedPosts(updateCreatedPosts);
        axios.delete('http://localhost:5000/api/v1/post/' + id, {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
            .catch(err => console.log(err));
    }

    function createPost(data) {
        axios.post('http://localhost:5000/api/v1/post', data, {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
            .then(res => setCreatedPosts([...createdPosts, res.data]))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Button
                onClick={() => setIsCreating(true)}
                className={"mr-4 float-right"}
                variant={"contained"}
                color={"secondary"}
                startIcon={<AddCircleIcon/>}
            >
                Create
            </Button>
            <h1 className={"m-4"}>Your Posts</h1>

            <CreatePost show={isCreating}
                        onHide={() => setIsCreating(false)}
                        createpost={createPost}
            />
            <div className="row justify-content-center">
                <div className="col-md-6">


                    <div>
                        {createdPosts?.length > 0 ? createdPosts?.map((item) => {
                                return <EditableBlogPost key={item._id} title={item.title} content={item.content}
                                                         date={item.date}
                                                         likes={item.likes}
                                                         id={item._id} username={item.username}
                                                         deletePost={deletePost}
                                />
                            }) :
                            createdPosts?.length <= 0 && user && <Alert severity="info">No posts created.</Alert>}
                    </div>

                </div>

            </div>
        </div>
    );
}


export default MyPosts;
