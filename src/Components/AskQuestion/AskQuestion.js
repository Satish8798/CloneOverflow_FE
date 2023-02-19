import React, { useState } from "react";
import "./AskQuestion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const userId = user["_id"];
  const userName = user["name"];
  const userEmail = user["email"];

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://cloneoverflow.onrender.com/questions/create-question",
        {
          title,
          description,
          tags,
          user: userId,
          userName,
          userEmail,
          date: new Date(),
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      if (response.data.msg) {
        setTitle("");
        setDescription("");
        setTags([]);
        alert("question created successfully");
        navigateTo("/");
      }
    } catch (error) {
      console.log(error);
      alert("Enter data correctly");
    }
  }

  const onDescription = (value) => {
    console.log(description);
    setDescription(value);
  };

  return (
    <div className="container-fluid ms-md-5">
      <ArrowCircleLeftIcon
        style={{
          marginLeft: "5%",
          marginBottom: "10px",
          fontSize: "40px",
        }}
        onClick={() => {
          navigateTo(-1);
        }}
      />
      <div className="row ms-5 mt-2">
        <div className="col-12">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="ms-auto"
          >
            <div className="question-title-form p-2">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Can we create stackoverflow clone using nodejs and react"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="question-description-form p-2">
              <label className="form-label">
                Explain more about the doubt or problem
              </label>
              <ReactQuill
              className="react-quill-custom"
                theme="snow"
                value={description}
                onChange={onDescription}
                
                modules={modules}
              />
            </div>
            <div className="question-tags-form p-2 mt-3">
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeHolder="enter tags"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary rounded-0 w-25">
              post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
