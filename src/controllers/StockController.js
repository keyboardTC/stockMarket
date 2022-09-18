import dayjs from 'dayjs'


// MARK: Generating random prices 
const getRandomNum = (max) => {
    // return Math.floor(Math.round(Math.random() * max));
    return parseFloat((Math.random() * max).toFixed(2));
}

// MARK: Generate data for the stock
export function generateStock(timeWindow, stockStmbol) {

    if (timeWindow == '') {
        timeWindow = 10
    }
    if (stockStmbol == '') {
        return undefined
    }

    let interval = [
        {
            day: dayjs().format('DD/MM/YYYY'),
            price: (getRandomNum(10)),
            socialCount: Math.floor(Math.random() * 100)
        },
    ]
    for (let index = 1; index < timeWindow; index++) {
        interval[index] = {
            day: dayjs().add(index, 'day').format('DD/MM/YYYY'),
            price: (getRandomNum(10)),
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
    // stock = { "interval": [{ "day": "17/09/2022", "price": 4, "socialCount": 86 }, { "day": "18/09/2022", "price": 4, "socialCount": 5 }, { "day": "19/09/2022", "price": 9, "socialCount": 8 }, { "day": "20/09/2022", "price": 2, "socialCount": 0 }, { "day": "21/09/2022", "price": 4, "socialCount": 3 }], "symbol": "x" }

    // [9,8,7,6,5]
    // [9, 2, 4, 3, 8, 5]
    // [8, 6, 8, 3, 3, 5]

    let maxProfit = 0;
    let minPrice = stock.interval[0].price;
    let sellDate = undefined;
    let buyDate = undefined;
    let sellDayIndex = 0;
    let buyDayIndex = 0;

    for (let buyDay = 0; buyDay < stock.interval.length; buyDay++) {
        // const buyPrice = (stock.interval[buyDay].price + stock.interval[buyDay].socialCount) / 2;
        const buyPrice = stock.interval[buyDay].price;

        for (let sellDay = buyDay + 1; sellDay < stock.interval.length; sellDay++) {
            // const sellPrice = (stock.interval[sellDay].price + stock.interval[sellDay].socialCount) / 2;
            const sellPrice = stock.interval[sellDay].price;
            const currentProfit = sellPrice - buyPrice;
            maxProfit = Math.max(maxProfit, currentProfit);
            // minProfit = Math.min(minProfit, currentProfit);
            if (maxProfit <= currentProfit) {
                sellDate = stock.interval[sellDay].day
                sellDayIndex = sellDay
            }
        }
    }

    for (let index = 0; index < sellDayIndex; index++) {
        if (minPrice >= stock.interval[index].price) {
            buyDate = stock.interval[index].day
            buyDayIndex = index
            minPrice = stock.interval[index].price
        }
    }

    if (maxProfit == 0) {
        buyDate = undefined
        sellDate = undefined
    }


    console.log(`${maxProfit} : ${buyDate} : ${sellDate}`);

    return { buyDate, sellDate, sellDayIndex, buyDayIndex };
}

// MARK: Count number of Social Media Posts
export function socialMediaCount(stock) {
    let count = 0
    for (let index = 0; index < stock.interval.length; index++) {
        count = count + stock.interval[index].socialCount;
    };

    return count;
}

