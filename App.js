import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '4c88ba76043a4447561819b128890d6b'

export default function App() {
  const [city, setCity] = useState('');
  const [tempo, setTempo] = useState('');
  const [grau, setGrau] = useState('')

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}BR&appid=${apiKey}`)
    .then((response) => {
      setTempo(response.data.main.temp)
      setGrau(response.data.weather[0].description)
    })
  }, [city])

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{city}</Text>
      <Text>{tempo}</Text>
      <Text>{grau}</Text>
      <TextInput 
        placeholder='Search any city'
        onChangeText={setCity(city)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
