import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, [url]);
  return data;
}

export default useFetch;
