import React, {useState} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {InputTextarea} from 'primereact/inputtextarea';
import axios from "axios";

function EditableBlogPost(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(props.content);

    function updateContent(updatedContent) {
        setContent(updatedContent);
        axios.put('http://localhost:5000/api/v1/post/' + props.id, {title: props.title, content: updatedContent},
            {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
            .then((res) => {
                setIsEditing(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <Accordion elevation={10}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <h5>{props.title}</h5>
                <div className={"float-right w-100"}>
                    <Button className={"float-right"} startIcon={<ThumbUpIcon/>}>
                        {props.likes}
                    </Button>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="container">
                    <div className={"row"}>
                        <div className={"col-10"}>
                            {isEditing ? (
                                <div>
                                    <InputTextarea rows={5} className="w-100" value={content}
                                                   onChange={(e) => setContent(e.target.value)}/>
                                </div>
                            ) : (
                                <Typography>{content}</Typography>
                            )}
                        </div>
                        <div className={"col-2 p-0"}>
                            <Button
                                className={"float-right mb-4"}
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                }}
                                startIcon={<BorderColorIcon color={"inherit"}/>}
                            />
                            <Button
                                className={"float-right"}
                                onClick={() => props.deletePost(props.id)}
                                startIcon={<DeleteIcon color={"inherit"}/>}
                            />
                        </div>
                    </div>
                    {isEditing && <Button
                        variant={"contained"}
                        color={"secondary"}
                        className={"float-left"}
                        onClick={() => updateContent(content)}
                    >Submit</Button>}
                </div>
            </AccordionDetails>
        </Accordion>

    );
}

export default EditableBlogPost;
