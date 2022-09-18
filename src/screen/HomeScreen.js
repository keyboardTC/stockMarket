import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';

import Header from '../components/Header';
import { generateStock, prediction, socialMediaCount } from '../controllers/StockController';
import StockContext from '../context/StockContext';
import RNText from '../components/RNText';

const HomeScreen = () => {
    // Instance of StockContext
    const stock = useContext(StockContext);

    // MARK: state Variables
    const [inputStockSymbol, setInputStockSymbol] = useState('');
    const [inputTimeWindow, setInputTimeWindow] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [mediaCount, setMediaCount] = useState(0);
    const [dateStatus, setDateStatus] = useState({ buyDate: undefined, sellDate: undefined, sellDayIndex: 0, buyDayIndex: 0 });


    // MARK: UseEffect Method
    useEffect(() => {
        setInputTimeWindow(Math.floor(inputTimeWindow));
        console.log('Time Window ', inputTimeWindow);

    }, [inputTimeWindow]);

    // MARK: Search Botton Action
    const onPressSearch = () => {
        const stackOdj = generateStock(inputTimeWindow, inputStockSymbol);
        if (stackOdj) {
            stock.addStock(stackOdj);
            setDateStatus(prediction(stackOdj));
            setMediaCount(socialMediaCount(stackOdj));
            console.log('CONTEXT STOCK ', stock.stock);
            console.log("Search pressed : ", dayjs().format('DD/MM/YYYY'));
            setIsEmpty(false)
        } else {
            setIsEmpty(true)
        }
    }

    return (
        <>
            <Header text="Stock Market Recommender" style={{ backgroundColor: 'green' }} textStyle={{ color: 'white' }} />
            <View>
                <View style={{ padding: 20 }}>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputStockSymbol}
                            placeholder="Enter Stock Symbol (e.g x)"
                            value={inputStockSymbol}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputTimeWindow}
                            placeholder="Enter Time Window (e.g x)"
                            value={inputTimeWindow}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <Button
                            onPress={() => onPressSearch()}
                            title="Search"
                            color="green"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{ paddingHorizontal: 20, paddingVertical: 10 }}
                >
                    <View style={{}}>
                        <View style={{ backgroundColor: '#d7e0da', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 }}>
                            <RNText style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: 'black'
                            }}>Stock {inputStockSymbol} Ratings</RNText>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            {stock.stock?.interval && !isEmpty ?
                                <>
                                    <View style={{ marginVertical: 20, }}>
                                        <RNText style={styles.h2}>Time Window</RNText>
                                        <View style={{ marginVertical: 5 }} />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <RNText>Start Date: {stock.stock?.interval[0].day}</RNText>
                                            <View style={{ marginHorizontal: 20 }}></View>
                                            <RNText>End Date: {stock.stock?.interval[stock.stock.interval.length - 1].day}</RNText>
                                        </View>
                                        <View style={{ marginVertical: 5 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <RNText style={styles.h2}>Social Media Count:</RNText>
                                            <RNText style={{ marginHorizontal: 5, fontSize: 18, }}>{mediaCount}</RNText>
                                        </View>
                                    </View>
                                    <View style={[styles.rateBox, styles.buy]}>
                                        <RNText style={[styles.h2]}>Buy on : <RNText>{dateStatus.buyDate}</RNText></RNText>
                                        <RNText style={[styles.h2]}>Price: ${stock.stock?.interval[dateStatus.buyDayIndex].price}</RNText>
                                    </View>
                                    <View style={[styles.rateBox, styles.sell]}>
                                        <RNText style={[styles.h2]}>Sell on : <Text>{dateStatus.sellDate}</Text></RNText>
                                        <RNText style={[styles.h2]}>Price: ${stock.stock?.interval[dateStatus.sellDayIndex].price}</RNText>
                                    </View>
                                </>
                                :
                                <RNText style={styles.titleText}>
                                    EMPTY
                                </RNText>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 38,
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 10,
        marginHorizontal: 20
    },
    rateBox: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        marginVertical: 5
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    buy: {
        backgroundColor: '#d7e0da',
    },
    sell: {
        backgroundColor: '#f7c5c5',
    }
});

export default HomeScreen;