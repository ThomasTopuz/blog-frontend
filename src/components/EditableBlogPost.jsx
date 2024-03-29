import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { Badge, IconButton } from "@material-ui/core";
import BASE_URL from "../BaseUrl";
import UndoIcon from "@material-ui/icons/Undo";

function EditableBlogPost(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(props.content);

  function updateContent(updatedContent) {
    setContent(updatedContent);
    axios
      .put(
        BASE_URL + "/post/" + props.id,
        { title: props.title, content: updatedContent },
        { headers: { "x-auth-token": localStorage.getItem("jwtToken") } }
      )
      .then((res) => {
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Accordion elevation={10}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <div className="d-flex align-items-center justify-content-between w-100">
          <h5>{props.title}</h5>
          <div className={"d-flex"}>
            <p className={"m-0 p-0 mr-4"}>{props.date.slice(0, 10)}</p>
            <div>
              <Badge
                badgeContent={props.likes > 0 ? props.likes : "0"}
                color="primary"
                className={"flex-1"}
              >
                <ThumbUpIcon fontSize={"default"} />
              </Badge>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container">
          <div className={"row"}>
            <div className={"col-12"}>
              {isEditing ? (
                <div>
                  <InputTextarea
                    rows={5}
                    className="w-100"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              ) : (
                <Typography
                  style={{ borderBottom: "1px solid #bbb", paddingBottom: 4 }}
                >
                  {content}
                </Typography>
              )}
            </div>
          </div>
          {props.username && (
            <p className={"float-left mt-3"}>
              created by{" "}
              <span className={"font-weight-bold"}>{props.username}</span>
            </p>
          )}
          <div className={"d-flex float-right flex-row w-10"}>
            {props.editable && (
              <div>
                {!isEditing ? (
                  <IconButton
                    className="mr-2"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    <BorderColorIcon
                      style={{ color: "orange", fontSize: 30 }}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    className="mr-2"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    <UndoIcon
                      style={{
                        color: "orange",
                        fontSize: 30,
                        transform: [{ scaleX: -1 }],
                      }}
                    />
                  </IconButton>
                )}
              </div>
            )}
            <IconButton onClick={() => props.deletePost(props.id)}>
              <DeleteIcon style={{ color: "#f00", fontSize: 30 }} />
            </IconButton>
          </div>

          {isEditing && (
            <Button
              variant={"contained"}
              color={"secondary"}
              className={"float-left"}
              onClick={() => updateContent(content)}
            >
              Submit
            </Button>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditableBlogPost;
