import { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios';
import Chart from './Chart.jsx'
import Piechart from './Piechart.jsx';

function Dashboard(){
    const [Coins, setCoins] = useState([]);
    const [Bitcoin, setBitcoin] = useState({});
    const [Ethereum, setEtherium] = useState({});
    
    //axios.get('')
    //.then(function(response){
    //    setBitcoin(response)
    //})


    useEffect(() => {

        axios.get('https://api.coincap.io/v2/assets').then(function (response){
            setCoins(response.data.data);
            const eth = response.data.data.find(coin => coin.id === "ethereum")
            setEtherium(eth)
            // console.log(eth)

       
        });
    },[]);
    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets').then(response => {
            const btc = response.data.data.find(coin => coin.id === 'bitcoin');
            setBitcoin(btc);
            // console.log(Bitcoin)
    });
},[]);

    return(
        <>
        {/* <ul> 
            {Coins && Coins.map((coin) => <li key={coin.id}>{coin.name}</li>)}
    </ul> }
        {Bitcoin ? (
                <div className="bitcoin-info">
                    <h2>{Bitcoin.name}</h2>
                    <img src={Bitcoin.baseSymbol}  /> 
                    <p>Price: ${parseFloat(Bitcoin.priceUsd).toFixed(2)}</p>
                    <p>Market Cap: ${parseFloat(Bitcoin.marketCapUsd).toFixed(2)}</p>
                    <p>Change (24h): {parseFloat(Bitcoin.changePercent24Hr).toFixed(2)}%</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}*/}
        <div className="container">
            <div className="logo-container">
                <img src="images/logo.png" className='logo' />
                <p className="name">S.D Investments</p>
            </div>
            <div className="column">
                
                <div className="chart">
                    <div className="chart-info">
                    <p className="asset-name">
                        {Bitcoin.name} Price:
                    </p>
                    <p className="price">${parseFloat(Bitcoin.priceUsd).toFixed(2)}</p>
                    </div>
                    <div className="chart-big">
                        <Chart />
                    </div>
                </div>
                <div className="circle-chart">
                    <Piechart />            
                </div>
                <div className="search-assets">
                    <input type="text" className='asset-search' />
                </div>
            </div>
            
            <div className="column">
                <div className="market-overview">
                    <p className="market">
                        Market Overview
                    </p>
                    <div className="coin">
                        <div className="name-section">
                        <p>Name</p>
                        {Bitcoin.name}
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
                        
                        <p className='market-cap'>Market-Cap</p>
                        </div>
                        <div className="row">
                            <div className="priceBlock">
                        <p>{parseFloat(Bitcoin.priceUsd).toFixed(2)}</p>
                        </div>
                        <div className="priceBlock">
                        <p>{parseFloat(Bitcoin.vwap24Hr).toFixed(2)}</p>
                        </div>
                        <div className="priceBlock">
                        <p>{parseFloat(Bitcoin.volumeUsd24Hr).toFixed(2)}</p>
                        </div>
                        <div className="priceBlock">
                        <p>{parseFloat(Bitcoin.marketCapUsd).toFixed(2)}</p>
                        </div>

                        </div>
                        </div>
                    </div>
                </div>
                <div className="balance">
                    <p className="balance-text">
                        Your Balance
                    </p>
                    <p className="balance-money">
                        $0
                    </p>
                </div>
            </div>
        </div>
        </>
    )

}

export default Dashboard