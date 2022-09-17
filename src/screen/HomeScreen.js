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

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    // Instance of StockContext
    const stock = useContext(StockContext)

    // MARK: state Variables
    const [inputStockSymbol, setInputStockSymbol] = useState('');
    const [inputTimeWindow, setInputTimeWindow] = useState('');
    const [dateStatus, setDateStatus] = useState({ buyDate: undefined, sellDate: undefined });
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
        // console.log("Search pressed : ", (Math.random() * 100).toFixed(6))
        const stackOdj = generateStock(5, 'x');
        stock.addStock(stackOdj);
        // prediction(stackOdj);
        setDateStatus(prediction(stackOdj))
        console.log('CONTEXT STOCK ', stock.stock);
        console.log("Search pressed : ", dayjs().format('DD/MM/YYYY'))
    }

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
                    <View style={{ borderWidth: 1, }}>
                        <View style={{ backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: 'black'
                            }}>Stock X Ratings</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ marginVertical: 20, }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: 'black'
                                }}>Time Window</Text>
                                <Text>
                                    {
                                        stock.stock?.symbol
                                    }
                                </Text>
                                {stock.stock?.interval ?
                                    <>
                                        <Text>Start Date: {stock.stock?.interval[0].day}</Text>
                                        <Text>End Date: {stock.stock?.interval[stock.stock.interval.length - 1].day}</Text>
                                    </> :
                                    null
                                }

                            </View>
                            <View style={{ backgroundColor: 'yellow', paddingHorizontal: 30, paddingVertical: 5, marginVertical: 5 }}>
                                <Text>Buy on Day: <Text>{dateStatus.buyDate}</Text></Text>
                                <Text>Price: 0</Text>
                            </View>
                            <View style={{ backgroundColor: 'yellow', paddingHorizontal: 30, paddingVertical: 5, marginVertical: 5 }}>
                                <Text>Sell on Day: <Text>{dateStatus.sellDate}</Text></Text>
                                <Text>Price: 0</Text>
                            </View>
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
})