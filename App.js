import { Text, View, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '4c88ba76043a4447561819b128890d6b';

export default function App() {

  const [cidade, setCidade] = useState('São Paulo')
  const [tempo, setTempo] = useState('')
  const [temperatura, setTemperatura] = useState(0)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${apiKey}`)
      .then(res => {
        const clima = res.data.weather[0].description
        const temp = (parseInt(res.data.main.temp) - 273.15).toFixed(1) + '°C'
        setTempo(clima);
        setTemperatura(temp)

      }).catch(error => {
        console.log(error)
        return 'Error'
      })
  }, [cidade]);


  return (
  <ImageBackground source={require('./assets/image/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.cidade}>{cidade}</Text>
        <Text style={styles.info}>{tempo}</Text>
        <Text style={styles.info}>{temperatura}</Text>
          <TextInput 
            style={styles.input}
            placeholder='Search any city'
            value={cidade}
            onChangeText={setCidade}
            onBlur={() => {
              setTemperatura('')
              setTempo('')
            }}
          />

      </View>
    </ImageBackground>
  )
  
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cidade: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff'
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
    color: '#fff',
    
  },
  input: {
    height: 32,
    width: '60%',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#fff'
  },
});