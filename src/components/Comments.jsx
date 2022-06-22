import React from "react";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BiDownvote } from "react-icons/bi";
import "../styles/comments.scss";

function Comments(props) {
  return (
    <div className="comments-div">
      <div className="user-image">
        <h3 style={{ backgroundColor: `#${props.randomColor}` }}>
          {props.comment.email[0].toUpperCase()}
        </h3>
      </div>
      <div className="comment-body">
        <div className="comment-head">
          <p>{props.comment.email}</p>
          <p>...</p>
        </div>
        <div className="comment-text">
          <p>{props.comment.body}</p>
        </div>
        <div className="comment-footer">
          <FaRegComment />
          <FaRetweet />
          <AiOutlineHeart />
          <BiDownvote />
          <FiShare />
        </div>
      </div>
    </div>
  );
}

export default Comments;
