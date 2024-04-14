import React, { useState } from "react";
import axios from "axios";

function Searchbar(){
    const [SearchedItem, setSearchedItem] = useState({});

    const getCoin = (SearchedItem) => {
      axios.get(`https://api.coincap.io/v2/assets/${SearchedItem}`).then(function (response) {
          setSearchedItem(response.data.data);
        });
    };

    return(
        <>
        <input
        type="text"
        className="asset-search"
        placeholder="Search for Asset"
        onChange={(e) => getCoin(e.target.value)}
      />
      <div className="column-place">
        <h2>Name</h2>
        <h2>Price</h2>
      </div>
      <div className="AIO">
        <div className="left">
          <p>{SearchedItem.name}</p>
          <p>{SearchedItem.symbol}</p>
        </div>
        <div className="right">
          <p>${parseFloat(SearchedItem.priceUsd).toFixed(2)}</p>
        </div>
      </div>
      </>
    )
}

export default Searchbar