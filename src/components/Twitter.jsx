import React from "react";
import useFetchPostsData from "../helpers/useFetchPostsData";
import PostCard from "./PostCard";

function Twitter() {
  const data = useFetchPostsData();
  return (
    <div>
      {data.map((post) => {
        return (
          <PostCard
            randomColor={Math.floor(Math.random() * 16777215).toString(16)}
            key={post.id}
            post={post}
          />
        );
      })}
    </div>
  );
}

export default Twitter;
