import React, { useEffect, useState } from "react";

function useFetchPostsData(id) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, [id]);

  return data;
}

export default useFetchPostsData;
