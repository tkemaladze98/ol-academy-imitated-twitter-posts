import React, { useRef, useState, useEffect } from "react";
import "../styles/twitter.scss";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import useFetchUserData from "../helpers/useFetchUserData";
import useFetchImagesData from "../helpers/useFetchImagesData";
import getRandomColor from "../helpers/utils/getRandomColor";
import PostCardMenu from "./PostCardMenu";

function PostCard(props) {
  const userData = useFetchUserData(props.post.userId);
  const image = useFetchImagesData(props.post.id);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState({});
  const openMenu = useRef();

  useEffect(() => {
    document.addEventListener("click", closeMenuByClickingOutOfComponent);
    return function cleanUp() {
      document.removeEventListener("click", closeMenuByClickingOutOfComponent);
    };
  });

  const closeMenuByClickingOutOfComponent = (e) => {
    if (isMenuClicked && !openMenu.current.contains(e.target)) {
      setIsMenuClicked(false);
    }
  };

  const handleMenu = (e) => {
    if (openMenu.current.contains(e.target)) {
      setIsMenuClicked(true);
    } else {
      if (!isMenuClicked) {
        props.handlePostId(props.post.id);
      }
      setIsMenuClicked(false);
    }
  };
  const toggleLike = () => {
    setIsLike(!isLike);
    setIsMenuClicked(false);
  };

  const seeTweet = () => {
    props.handlePostId(props.post.id);
    setIsMenuClicked(false);
  };

  return (
    <div className="all-posts">
      {isMenuClicked && props.clickedMenuId === props.post.id && (
        <PostCardMenu
          isLike={isLike}
          menuCoordinates={menuCoordinates}
          toggleLike={toggleLike}
          seeTweet={seeTweet}
        />
      )}
      {userData.data.length >= 1 && image.data.length >= 1 && (
        <div className="main-div" onClick={(e) => handleMenu(e)}>
          <div className="avatar">
            <p style={{ backgroundColor: `#${getRandomColor()}` }}>
              {userData.data[0].name[0].toUpperCase()}
            </p>
          </div>
          <div className="post">
            <div className="head-tittle">
              <div>
                <p>
                  {userData.data[0].username} @{userData.data[0].username}
                </p>
                <p>{userData.data[0].address.city}</p>
              </div>
              <button
                onClick={(e) => {
                  setMenuCoordinates({ getX: e.pageX, getY: e.pageY });
                  props.clickedMenu(props.post.id);
                }}
                ref={openMenu}
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
