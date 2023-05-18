import React, { useEffect, useState } from "react";
import Image from "./Image";
import "./From.css";

function Form() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchData() {
    setLoading(true);
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const data = await resp.json();
    const requiredData = data.meals || [];
    setResults(requiredData);
    
    const totalResults = requiredData.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    
    setTotalPages(totalPages);
    setLoading(false);
  }
  

  function handleSearch() {
    setCurrentPage(1);
    fetchData();
  }

  function loadNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    if (value) {
      fetchData();
    }
  }, [currentPage, pageSize]);

  const renderGrid = () => {
    const gridItems = [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentResults = results.slice(startIndex, endIndex);

    for (let i = 0; i < currentResults.length; i += 3) {
      const rowItems = currentResults
        .slice(i, i + 3)
        .map((meal) => (
          <Image className="grid-item" key={meal.idMeal} ele={meal} />
        ));
      gridItems.push(<div className="grid-row">{rowItems}</div>);
    }

    return gridItems;
  };

  return (
    <div className="container">
      <form>
        <input
          type="text"
          placeholder="Search Your Recipes...."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleSearch();
          }}
        />
      </form>
      <div className="grid">{renderGrid()}</div>
      {loading && <p>Loading...</p>}
      {!loading && currentPage < totalPages && (
        <button className="load-more-button" onClick={loadNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}

export default Form;
