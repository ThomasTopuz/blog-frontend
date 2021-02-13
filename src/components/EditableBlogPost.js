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
import {Badge, IconButton} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

function EditableBlogPost(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(props.content);

    function updateContent(updatedContent) {
        setContent(updatedContent);
        axios.put('http://138.68.75.217:5000/api/v1/post/' + props.id, {title: props.title, content: updatedContent},
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
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h5>{props.title}</h5>
                    <div className={"d-flex"}>
                        <p className={"m-0 p-0 mr-4"}>{props.date.slice(0, 10)}</p>
                        <div>

                            <Badge badgeContent={props.likes} color="primary" className={"flex-1"}>
                                <ThumbUpIcon fontSize={"medium"}/>
                            </Badge>
                        </div>
                    </div>
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

                            {props.username &&
                            <p className={'float-left mt-5'}>created by <span
                                className={"font-weight-bold"}>{props.username}</span></p>
                            }
                            <div>
                            </div>
                        </div>
                        <div className={"col-2 p-0"}>
                            <div className={"d-flex float-right flex-column w-10"}>
                                {props.editable &&
                                <IconButton className={"mb-2"}
                                            onClick={() => {
                                                setIsEditing(!isEditing);
                                            }}>
                                    <BorderColorIcon style={{'color': "orange"}}/>
                                </IconButton>}
                                <IconButton className={"mt-2"}
                                            onClick={() => props.deletePost(props.id)}>
                                    <DeleteIcon style={{'color': "red"}}/>
                                </IconButton>

                            </div>
                        </div>
                        {isEditing && <Button
                            variant={"contained"}
                            color={"secondary"}
                            className={"float-left"}
                            onClick={() => updateContent(content)}
                        >Submit</Button>}

                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

    );
}

export default EditableBlogPost;
