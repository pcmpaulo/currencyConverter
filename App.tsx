import React, { useState, useEffect } from 'react';
import {View, Text, TextInput} from 'react-native';
import { Picker } from '@react-native-community/picker';

import axios from 'axios';

export default function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);

  const getExchangeRate = async () => {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    setExchangeRate(response.data.rates[toCurrency]);
    setConvertedValue(inputValue * response.data.rates[toCurrency]);
  };

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  const [inputValue, setInputValue] = useState(0);

  const convertCurrency = (value) => {
    setInputValue(value);
    setConvertedValue(value * exchangeRate);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Currency Converter</Text>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text>From: </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={fromCurrency}
            onValueChange={(value) => {
              setFromCurrency(value);
              getExchangeRate();
            }}
          >
            <Picker.Item label="USD - United States Dollar" value="USD" />
            <Picker.Item label="EUR - Euro" value="EUR" />
            <Picker.Item label="JPY - Japanese Yen" value="JPY" />
            <Picker.Item label="BRL - Brazilian real" value="BRL" />
          </Picker>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text>To: </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={toCurrency}
            onValueChange={(value) => {
              setToCurrency(value);
              getExchangeRate();
            }}
          >
            <Picker.Item label="USD - United States Dollar" value="USD" />
            <Picker.Item label="EUR - Euro" value="EUR" />
            <Picker.Item label="JPY - Japanese Yen" value="JPY" />
            <Picker.Item label="BRL - Brazilian real" value="BRL" />
          </Picker>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>Enter value to convert:</Text>
        <TextInput
          style={{ marginLeft: 10, padding: 5, borderColor: 'gray', borderWidth: 1, borderRadius: 5, width: 100 }}
          keyboardType="numeric"
          onChangeText={(value) => convertCurrency(value)}
          value={inputValue.toString()}
        />
      </View>
      <Text style={{ fontSize: 20 }}>{`${inputValue} ${fromCurrency} = ${convertedValue.toFixed(2)} ${toCurrency}`}</Text>
    </View>
  );
}
