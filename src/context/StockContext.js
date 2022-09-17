import React, { createContext, useState } from "react";
import dayjs from "dayjs";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stock, setStock] = useState({});

    const addStock = (newStock) => {
        setStock(newStock)
    }
    // const getStock = (newStock) => {
    //     setStock(newStock)
    // }

    const value = {
        stock, addStock
    }
    // const stocksList = [
    //     {
    //         symbol: 'x',
    //         interval: []

    //     }
    // ]

    return <StockContext.Provider value={value}>
        {children}
    </StockContext.Provider>
}

export default StockContext;