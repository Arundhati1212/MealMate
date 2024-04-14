import { useEffect, useState } from "react";

export function useFetch(fetchfunc, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);
        const data = await fetchfunc();
        setFetchedData(data);
      } catch (e) {
        console.log("erorrrr 2", fetchedData);
        setErrorMessage({ message: e.message || "Something went wrong:(" });
        setIsFetching(false);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchfunc]);

  return {
    isFetching,
    setIsFetching,
    errorMessage,
    setErrorMessage,
    fetchedData,
    setFetchedData,
  };
}
