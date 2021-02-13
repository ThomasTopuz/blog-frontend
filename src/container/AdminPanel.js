import React, {useEffect, useState} from 'react';
import EditableBlogPost from "../components/EditableBlogPost";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import BASE_URL from "../BaseUrl";
function AdminPanel() {
    let [blogPosts, setBlogPosts] = useState();

    useEffect(() => {
        //fetch all posts
        axios.get(BASE_URL+'/post')
            .then((res) => {
                setBlogPosts(res.data)
            })
            .catch(err => console.log(err));
    }, [])


    function deletePost(id) {
        let updatedPosts = blogPosts.filter(function (item) {
            return item._id !== id;
        });
        setBlogPosts(updatedPosts);
        axios.delete(BASE_URL+'/post/' + id, {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h2 className={"m-2"}>Admin panel</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div>
                        {blogPosts?.length > 0 ? blogPosts?.map((item) => {
                                return <EditableBlogPost key={item._id} title={item.title} content={item.content}
                                                         date={item.date}
                                                         likes={item.likes}
                                                         id={item._id} username={item.username}
                                                         editable={false}
                                                         deletePost={deletePost}
                                />
                            }) :
                            blogPosts?.length <= 0 && <Alert severity="info">No posts.</Alert>}
                    </div>

                </div>

            </div>
        </div>
    )
        ;
}

export default AdminPanel;
