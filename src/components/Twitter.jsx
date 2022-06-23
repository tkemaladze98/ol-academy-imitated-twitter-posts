import React, {  useState } from "react";
import useFetchPostsData from "../helpers/useFetchPostsData";
import useFetchPostComments from "../helpers/useFetchPostComments";
import Comments from "./Comments";
import PostCard from "./PostCard";
import "../styles/twitter.scss";
import { IoArrowBackOutline } from "react-icons/io5";

function Twitter() {
  const [clickedMenuId, setClickedMenuId] = useState(null);
  const [postId, setPostId] = useState(null);
  const postData = useFetchPostsData(postId);
  const commentsData = useFetchPostComments(postId);

  const clickedMenu = (id) => {
    setClickedMenuId(id);
  };

  const handlePostId = (id) => {
    setPostId(id);
  };

  return (
    <div id="twitter-main-div">
      {postData.length > 1 ? (
        postData.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              clickedMenu={clickedMenu}
              clickedMenuId={clickedMenuId}
              handlePostId={handlePostId}
            />
          );
        })
      ) : (
        <PostCard
          key={postData.id}
          post={postData}
          clickedMenu={clickedMenu}
          clickedMenuId={clickedMenuId}
          handlePostId={handlePostId}
        />
      )}
      {commentsData.length >= 1 && postId !== null && (
        <div className="comment-section">
          {commentsData.map((comment) => {
            return (
              comment.postId === postId && (
                <Comments comment={comment} key={comment.id} />
              )
            );
          })}
        </div>
      )}
      {postId !== null && (
        <div className="arrow-back" onClick={() => setPostId(null)}>
          <IoArrowBackOutline className="arrow" />
        </div>
      )}
    </div>
  );
}

export default Twitter;
