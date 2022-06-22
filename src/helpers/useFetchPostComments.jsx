import React, { useState, useEffect } from "react";

function useFetchPostComments(id) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, [id]);
  return data;
}

export default useFetchPostComments;
