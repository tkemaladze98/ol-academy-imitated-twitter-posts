import React, { useEffect, useState } from "react";

function useFetchImagesData(id) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?id=" + id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return { data };
}

export default useFetchImagesData;
