import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import StockContext from '../context/StockContext'
import dayjs from 'dayjs'


// MARK: Generating random prices 
const getRandomNum = (max) => {
    return Math.floor(Math.random() * max);
}

// MARK: Get the stock
export function generateStock(timeWindow = 10, stockStmbol = 'x') {

    let interval = [
        {
            day: dayjs().format('DD/MM/YYYY'),
            price: (Math.random() * 10).toFixed(6),
            socialCount: Math.floor(Math.random() * 100)
        },
    ]
    for (let index = 1; index < timeWindow; index++) {
        interval[index] = {
            day: dayjs().add(index, 'day').format('DD/MM/YYYY'),
            price: (getRandomNum(10)).toFixed(6),
            socialCount: Math.floor(getRandomNum(10))
        };
    }
    const newStock = {
        symbol: stockStmbol,
        interval: interval
    }

    return newStock;
}

// MARK: Function to predict the stock
export function prediction(stock) {
    // stock = { "interval": [{ "day": "17/09/2022", "price": 5, "socialCount": 62 }, { "day": "18/09/2022", "price": 5, "socialCount": 5 }, { "day": "19/09/2022", "price": 5, "socialCount": 8 }, { "day": "20/09/2022", "price": 5, "socialCount": 0 }, { "day": "21/09/2022", "price": 5, "socialCount": 4 }], "symbol": "x" }
    // [9,8,7,6,5]
    let maxProfit = 0;
    let minPrice = 0;
    let sellDate = undefined;
    let buyDate = undefined;

    for (let buyDay = 0; buyDay < stock.interval.length; buyDay++) {
        // const buyPrice = (stock.interval[buyDay].price + stock.interval[buyDay].socialCount) / 2;
        const buyPrice = stock.interval[buyDay].price;
        if (minPrice >= buyPrice || minPrice == 0) {
            buyDate = stock.interval[buyDay].day
            minPrice = buyPrice
        }

        for (let sellDay = buyDay + 1; sellDay < stock.interval.length; sellDay++) {
            // const sellPrice = (stock.interval[sellDay].price + stock.interval[sellDay].socialCount) / 2;
            const sellPrice = stock.interval[sellDay].price;
            const currentProfit = sellPrice - buyPrice;
            maxProfit = Math.max(maxProfit, currentProfit);
            // minProfit = Math.min(minProfit, currentProfit);
            if (maxProfit <= currentProfit) {
                sellDate = stock.interval[sellDay].day
            }
        }
    }

    if (maxProfit == 0) {
        buyDate = undefined
        sellDate = undefined
    }


    console.log(`${maxProfit} : ${buyDate} : ${sellDate}`)
    // let buySellHold = [{}]

    return { buyDate, sellDate };
}

