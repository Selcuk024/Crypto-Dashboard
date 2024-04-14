import { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import Chart from "./Chart.jsx";
import Piechart from "./Piechart.jsx";
import Searchbar from "./Searchbar.jsx";

function Dashboard() {
  const [Coins, setCoins] = useState([]);
  const [Bitcoin, setBitcoin] = useState({});

  const fetchData = async () => {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    const allCoins = await axios.get("https://api.coincap.io/v2/assets?limit=5");
    setCoins(allCoins.data.data);

    const btc = response.data.data.find((coin) => coin.id === "bitcoin");
    setBitcoin(btc);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <img src="images/logo.png" className="logo" />
          <p className="name">S.D Investments</p>
        </div>
        <div className="column">
          <div className="chart">
            <div className="chart-info">
              <p className="asset-name">{Bitcoin.name} Price:</p>
              <p className="price">
                ${parseFloat(Bitcoin.priceUsd).toFixed(2)}
              </p>
            </div>
            <div className="chart-big">
            <Chart />
            </div>
          </div>
          <div className="circle-chart">
            <Piechart />
          </div>
          <div className="search-assets">
           <Searchbar />
          </div>
        </div>

        <div className="column">
          <div className="market-overview">
            <p className="market">Market Overview</p>
            <div className="coin">
              <div className="name-section">
                <p>Name</p>

                {Coins &&
                  Coins.map((coin) => (
                    <div className="image-name coin-name">
                      <img
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        className="icon"
                      />
                      <p key={coin.id}>{coin.name}</p>
                    </div>
                  ))}
              </div>
              <div className="column2">
                <div className="row">
                  <div className="priceBlock">
                    <p>Price</p>
                  </div>
                  <div className="priceBlock">
                    <p>24h Change</p>
                  </div>
                  <div className="priceBlock">
                    <p>24h Volume</p>
                  </div>

                  <p className="market-cap">Market-Cap</p>
                </div>
                <div className="row">
                  <div className="priceBlock">
                    {Coins &&
                      Coins.map((coin) => (
                        <p key={coin.id} className="coin-name">
                          ${parseFloat(coin.priceUsd).toFixed(2)}
                        </p>
                      ))}
                  </div>
                  <div className="priceBlock">
                    {Coins &&
                      Coins.map((coin) => (
                        <p key={coin.id} className="coin-name">
                          ${parseFloat(coin.vwap24Hr).toFixed(2)}
                        </p>
                      ))}
                  </div>
                  <div className="priceBlock">
                    {Coins &&
                      Coins.map((coin) => (
                        <p key={coin.id} className="coin-name">
                          ${parseFloat(coin.volumeUsd24Hr).toFixed(2)}
                        </p>
                      ))}
                  </div>
                  <div className="priceBlock">
                    {Coins &&
                      Coins.map((coin) => (
                        <p key={coin.id} className="coin-name">
                          ${parseFloat(coin.marketCapUsd).toFixed(2)}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="balance">
            <p className="balance-text">Your Balance</p>
            <p className="balance-money">$0</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
