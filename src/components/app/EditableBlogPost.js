import React, {useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

function EditableBlogPost(props) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Accordion elevation={24}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <h5>{props.title}</h5>
                <div className={'float-right w-100'}>
                    <Button className={'float-right'} startIcon={<DeleteIcon
                        color={"inherit"}/>}/>
                    <Button className={'float-right'} onClick={() => {
                        console.log(isEditing);
                        setIsEditing(!isEditing);
                        console.log(isEditing);
                        console.log(" ")
                    }}
                            startIcon={<BorderColorIcon
                                color={"inherit"}/>}/>
                    <Button className={'float-right'} startIcon={<ThumbUpIcon/>}>{props.likes}</Button>

                </div>
            </AccordionSummary>
            <AccordionDetails>
                {isEditing ? <div>
                        <TextareaAutosize className={"p-2 rounded"} aria-label="empty" cols={125} value={props.content} placeholder="Empty"/>
                        <Button variant="contained" color="secondary" className={'float-right'} startIcon={<DoneOutlineIcon/>}>Submit</Button>
                    </div>
                    :
                    <Typography>
                        {props.content}
                    </Typography>
                }
            </AccordionDetails>
        </Accordion>
    );
}

export default EditableBlogPost;
