import React, { useEffect, useState } from "react";

function useFetchPostsData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return data;
}

export default useFetchPostsData;
