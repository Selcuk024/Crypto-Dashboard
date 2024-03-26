import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Label, Tooltip, ResponsiveContainer } from "recharts";

const Piechart = () => {
    const [topCoins, setTopCoins] = useState([]);

    useEffect(() =>{
        axios.get('https://api.coincap.io/v2/assets?limit=5').then(function(response){
            setTopCoins(response.data.data)
        });
    },[]);  
    const COLORS = ['#F7931A', '#37367b', '#26A17B', '#F3BA2F', '#F3BA2F']; // Predefined set of colors

    return (
        <ResponsiveContainer>
        <PieChart width={400} height={400}>
            
            <Pie
                data={topCoins.map(coin => ({
                    name: coin.name,
                    value: parseFloat(coin.priceUsd)
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                fill="#8884d8"
            >
            <Label value="Top 5 Coins In $" position="center" />
                {topCoins.map((coin, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip/>
        </PieChart>
        </ResponsiveContainer>
    );
};

export default Piechart;
