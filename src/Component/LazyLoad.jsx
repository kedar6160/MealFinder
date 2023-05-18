import React, { useEffect, useState, useRef } from "react";
import Image from "./Image";
import "./LazyLoad.css";

function LazyLoad() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const loader = useRef(null);

  async function fetchData() {
    setLoading(true);
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}&p=${currentPage}&pageSize=${pageSize}`
    );
    const data = await resp.json();
    const requiredData = data.meals || [];
    setResults((prevResults) => [...prevResults, ...requiredData]);
    setTotalResults(data.totalResults);
    setLoading(false);
  }

  function loadMore() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handleSearch() {
    setCurrentPage(1);
    setResults([]);
    fetchData();
  }

  useEffect(() => {
    if (value) {
      fetchData();
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  function handleObserver(entities) {
    const target = entities[0];
    if (target.isIntersecting && !isFetching) {
      setIsFetching(true);
    }
  }

  useEffect(() => {
    if (isFetching) {
      loadMore();
      setIsFetching(false);
    }
  }, [isFetching]);

  return (
    <>
    <div className="container">
      <form>
        <input
          type="text"
          placeholder="Search Your Food...."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleSearch();
          }}
        />
      </form>
      <div className="search-results">
        {results.map((ele, index) => (
          <Image className="ele" key={index} ele={ele} />
        ))}
        <div className="loading" ref={loader}>
          {loading && <p>Loading...</p>}
        </div>
      </div>
      </div>
    </>
  );
}

export default LazyLoad;
