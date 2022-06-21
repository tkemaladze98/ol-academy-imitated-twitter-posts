import React, { useEffect, useState } from "react";

function useFetchPostsData(id) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?id=" + id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return { data };
}

export default useFetchPostsData;
