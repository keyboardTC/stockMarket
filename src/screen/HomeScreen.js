import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';

import Header from '../components/Header'
import { generateStock, prediction } from '../controllers/StockController';
import StockContext from '../context/StockContext';
import RNText from '../components/RNText';

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    // Instance of StockContext
    const stock = useContext(StockContext)

    // MARK: state Variables
    const [inputStockSymbol, setInputStockSymbol] = useState('');
    const [inputTimeWindow, setInputTimeWindow] = useState('');
    const [dateStatus, setDateStatus] = useState({ buyDate: undefined, sellDate: undefined, sellDayIndex: 0, buyDayIndex: 0 });
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // MARK: UseEffect Method
    useEffect(() => {
        setInputTimeWindow(Math.floor(inputTimeWindow))
        console.log('Time Window ', inputTimeWindow);

    }, [inputTimeWindow]);

    // MARK: Search Botton Action
    const onPressSearch = () => {
        const stackOdj = generateStock(5, 'x');
        stock.addStock(stackOdj);
        setDateStatus(prediction(stackOdj))
        // prediction(stackOdj);
        // genStock();
        console.log('CONTEXT STOCK ', stock.stock);
        console.log("Search pressed : ", dayjs().format('DD/MM/YYYY'))
    }

    // const genStock = async () => {
    //     try {
    //         await generateStock(5, 'x')
    //             .then((stackOdj) => {
    //                 stock.addStock(stackOdj);
    //                 setDateStatus(prediction(stackOdj))
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <Header text="Stock Market Recommender" style={{ backgroundColor: 'green' }} textStyle={{ color: 'white' }} />
            <View>
                <View style={[{ padding: 20 }]}>
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
                    <View style={{ marginHorizontal: 20 }}>
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
                    style={[backgroundStyle, { padding: 20 }]}
                >
                    <View style={{}}>
                        <View style={{ backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 }}>
                            <RNText style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: 'black'
                            }}>Stock X Ratings</RNText>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            {stock.stock?.interval ?
                                <>
                                    <View style={{ marginVertical: 20, }}>
                                        <RNText style={{
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                            color: 'black',
                                        }}>Time Window</RNText>
                                        <View style={{ marginVertical: 5 }} />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <RNText>Start Date: {stock.stock?.interval[0].day}</RNText>
                                            <View style={{ marginHorizontal: 20 }}></View>
                                            <RNText>End Date: {stock.stock?.interval[stock.stock.interval.length - 1].day}</RNText>
                                        </View>


                                    </View>
                                    <View style={{ backgroundColor: '#ccc', paddingHorizontal: 30, paddingVertical: 5, marginVertical: 5 }}>
                                        <RNText>Buy on Day: <RNText>{dateStatus.buyDate}</RNText></RNText>
                                        <RNText>Price: {stock.stock?.interval[dateStatus.buyDayIndex].price}</RNText>
                                    </View>
                                    <View style={{ backgroundColor: '#ccc', paddingHorizontal: 30, paddingVertical: 5, marginVertical: 5 }}>
                                        <RNText>Sell on Day: <Text>{dateStatus.sellDate}</Text></RNText>
                                        <RNText>Price: {stock.stock?.interval[dateStatus.sellDayIndex].price}</RNText>
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

export default HomeScreen

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

})