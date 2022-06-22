import React, { useEffect, useRef, useState } from "react";
import "../styles/twitter.scss";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import useFetchUserData from "../helpers/useFetchUserData";
import useFetchImagesData from "../helpers/useFetchImagesData";

function PostCard(props) {
  const user = useFetchUserData(props.post.userId);
  const image = useFetchImagesData(props.post.id);
  const [menuClicked, setMenuClicked] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [menuX, setMenuX] = useState("");
  const [menuY, setMenuY] = useState("");
  const menu = useRef();
  const post = useRef();
  const contextMenu = useRef();
  const like = useRef();
  const tweet = useRef();

  useEffect(() => {
    document.addEventListener("click", handleMenu);
    return function cleanUp() {
      document.removeEventListener("click", handleMenu);
    };
  });

  const handleMenu = (e) => {
    if (post.current.contains(e.target)) {
      if (menu.current === e.target) {
        setMenuClicked(true);
      } else if (contextMenu.current === e.target) {
        return;
      } else if (like.current === e.target) {
        setIsLike(!isLike);
        setMenuClicked(false);
      } else if (tweet.current === e.target) {
        props.handlePostId(props.post.id);
        setMenuClicked(false);
      } else {
        if (!menuClicked) {
          props.handlePostId(props.post.id);
        }
        setMenuClicked(false);
      }
    } else {
      setMenuClicked(false);
    }
  };

  const menuStyle = {
    position: "absolute",
    top: menuY,
    left: menuX,
  };
  return (
    <div ref={post} className="all-posts">
      {menuClicked && props.clickedMenuId === props.post.id && (
        <article className="contextMenu" style={menuStyle} ref={contextMenu}>
          <button ref={like}>
            {isLike ? (
              <AiFillLike
                onClick={(e) => {
                  e.preventDefault();
                  setIsLike(!isLike);
                }}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <AiOutlineLike
                onClick={(e) => {
                  e.preventDefault();
                  setIsLike(!isLike);
                }}
                style={{ marginRight: "10px" }}
              />
            )}
            {isLike ? "Unlike" : "Like"}
          </button>
          <button ref={tweet}>
            <FaRetweet
              onClick={(e) => {
                e.preventDefault();
                props.handlePostId(props.post.id);
              }}
              style={{ marginRight: "10px" }}
            />
            see tweet
          </button>
        </article>
      )}
      {user.data.length >= 1 && image.data.length >= 1 && (
        <div className="main-div">
          <div className="avatar">
            <p style={{ backgroundColor: `#${props.randomColor}` }}>
              {user.data[0].name[0].toUpperCase()}
            </p>
          </div>
          <div className="post">
            <div className="head-tittle">
              <div>
                <p>
                  {user.data[0].username} @{user.data[0].username}
                </p>
                <p>{user.data[0].address.city}</p>
              </div>
              <button
                onClick={(e) => {
                  setMenuX(e.pageX);
                  setMenuY(e.pageY);
                  props.clickedMenu(props.post.id);
                }}
                ref={menu}
              >
                ...
              </button>
            </div>

            <div className="img-div">
              <img src={image.data[0].url} alt="" />
            </div>

            <div className="comment-div">
              <p className="comment-p">
                <FaRegComment /> 5
              </p>
              <p className="tweet-p">
                <FaRetweet /> 150
              </p>
              <p className="like-p">
                <AiOutlineHeart /> 150
              </p>
              <p className="share-p">
                <FiShare />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
