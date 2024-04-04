import { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios';
import Chart from './Chart.jsx'
import Piechart from './Piechart.jsx';

function Dashboard(){
    const [Coins, setCoins] = useState([]);
    const [Bitcoin, setBitcoin] = useState({});
    const [Ethereum, setEtherium] = useState({});
    const [Bnb, setBnb] = useState({});
    const [SearchedItem, setSearchedItem] = useState({});
    //axios.get('')
    //.then(function(response){
    //    setBitcoin(response)
    //})

      
    const getCoin =(SearchedItem)=>{
        axios.get(`https://api.coincap.io/v2/assets/${SearchedItem}`).then(function (response){
            setSearchedItem(response.data.data)
            console.log(response.data.data)
        
        });
    }
    useEffect(() => {

        axios.get('https://api.coincap.io/v2/assets?limit=5').then(function (response){
            setCoins(response.data.data);

            // console.log(eth)

       
        });
        axios.get('https://api.coincap.io/v2/assets').then(function (response){
            const eth = response.data.data.find(coin => coin.id === "ethereum")
            const bnb = response.data.data.find(coin => coin.id === "binance-coin")
            setEtherium(eth)
            setBnb(bnb)
            // console.log(eth)

       
        });

    },[]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/assets');
                const btc = response.data.data.find(coin => coin.id === 'bitcoin');
                setBitcoin(btc);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data initially
        fetchData();

        // Fetch data every 30 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        // Clean up interval
        return () => clearInterval(interval);
    }, []);


    return(
        <>

        {/*         <ul> 
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
                    <input type="text" className='asset-search' placeholder='Search for Asset' onChange={(e)=>getCoin(e.target.value)} />
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

                        {Coins && Coins.map((coin) => <div className='image-name coin-name'><img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} className='icon'/><p key={coin.id} >{coin.name}</p></div>)}

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
                        {Coins && Coins.map((coin) =><p key={coin.id} className='coin-name'>${parseFloat(coin.priceUsd).toFixed(2)}</p>)}
                        </div>
                        <div className="priceBlock">
                        {Coins && Coins.map((coin) =><p key={coin.id} className='coin-name'>${parseFloat(coin.vwap24Hr).toFixed(2)}</p>)}
                        </div>
                        <div className="priceBlock">
                        {Coins && Coins.map((coin) =><p key={coin.id} className='coin-name'>${parseFloat(coin.volumeUsd24Hr).toFixed(2)}</p>)}
                        </div>
                        <div className="priceBlock">
                        {Coins && Coins.map((coin) =><p key={coin.id} className='coin-name'>${parseFloat(coin.marketCapUsd).toFixed(2)}</p>)}
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