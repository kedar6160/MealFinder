import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LazyLoad from "./Component/LazyLoad";
import Form from "./Component/From";
import Header from "./Component/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar">
              <Link to="/" className="nav-link"><Header/></Link>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lazyload" element={<LazyLoad />} />
          <Route path="/from" element={<Form />} />
        </Routes>
      </div>
      <div> <p>So as per given in instruction I have prepared two pages</p>
        <p> First will take you to lazy Loading which will allow you to see all Live results being loaded with the scroll</p> 
        <p> Second will take you to pagination where you will be allowed to view the Live results being loaded in 3 X 3 Grid and will be seeing results by load more</p>
        <p>Please Feel free to tap on any recipe For any upcoming food ventures that you have:P</p></div>

    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
     
      <Link to="/lazyload">
        <button className="home-button">Go to Lazy Load Page</button>
      </Link>
      <Link to="/from">
        <button className="home-button">Go to Pagination Page</button>
      </Link>
    </div>
  );
}

export default App;
