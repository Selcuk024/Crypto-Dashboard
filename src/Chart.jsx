import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const [bitcoinData, setBitcoinData] = useState([]);

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1').then(response => {
            const bitcoinHistory = response.data.data.map(entry => ({
                date: new Date(entry.date).toLocaleDateString(),
                price: parseFloat(entry.priceUsd)
            }));
            setBitcoinData(bitcoinHistory);
        }).catch(error => {
            console.error('Error fetching Bitcoin data:', error);
        });
    }, []);

    return (
        
        <div className='chrt'>
            <ResponsiveContainer>
                <LineChart
                    data={bitcoinData}
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid stroke="#fff" />
                    <Legend />
                    <Tooltip  />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
    );
};

export default Chart;
