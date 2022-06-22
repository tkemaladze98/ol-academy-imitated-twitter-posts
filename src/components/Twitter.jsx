import React, { useEffect, useState } from "react";
import useFetchPostsData from "../helpers/useFetchPostsData";
import useFetchPostComments from "../helpers/useFetchPostComments";
import Comments from "./Comments";
import PostCard from "./PostCard";
import "../styles/twitter.scss";
import { IoArrowBackOutline } from "react-icons/io5";

function Twitter() {
  const [clickedMenuId, setClickedMenuId] = useState("");
  const [postId, setPostId] = useState("");
  const data = useFetchPostsData(postId);
  const commentsData = useFetchPostComments(postId);

  const clickedMenu = (id) => {
    setClickedMenuId(id);
  };

  const handlePostId = (id) => {
    setPostId(id);
  };

  return (
    <div id="twitter-main-div">
      {data.length > 1 &&
        data.map((post) => {
          return (
            <PostCard
              randomColor={Math.floor(Math.random() * 16777215).toString(16)}
              key={post.id}
              post={post}
              clickedMenu={clickedMenu}
              clickedMenuId={clickedMenuId}
              handlePostId={handlePostId}
            />
          );
        })}
      {typeof data === "object" && (
        <PostCard
          randomColor={Math.floor(Math.random() * 16777215).toString(16)}
          key={data.id}
          post={data}
          clickedMenu={clickedMenu}
          clickedMenuId={clickedMenuId}
          handlePostId={handlePostId}
        />
      )}
      {commentsData.length >= 1 && postId !== "" && (
        <div className="comment-section">
          {commentsData.map((comment) => {
            return (
              comment.postId === postId && (
                <Comments randomColor={Math.floor(Math.random() * 16777215).toString(16)} comment={comment} key={comment.id} />
              )
            );
          })}
        </div>
      )}
      {postId !== "" && (
        <div className="arrow-back" onClick={() => setPostId("")}>
          <IoArrowBackOutline className="arrow" />
        </div>
      )}
    </div>
  );
}

export default Twitter;
