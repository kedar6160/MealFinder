import React, { useState } from 'react';
import './Image.css'; // Import the CSS file for Image component

function Image(props) {
  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      togglePopup();
    }
  }

  return (
    <div className="image-container">
      <div className="image-wrapper">
        <img className="image" src={props.ele.strMealThumb} alt="" onClick={togglePopup} />
      </div>
      <div className="info-container">
        <h3 className="meal-name">{props.ele.strMeal}</h3>
      </div>
      {showPopup && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="popup">
            <button className="close-button" onClick={togglePopup}>X</button>
            <p className="popup-text">{props.ele.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Image;
