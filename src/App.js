import React, { Component, useEffect, useState } from 'react';
import Main from './components/MainComponent';
import Weather from './components/weather';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
export default function App() {

const store = ConfigureStore();

const [lat, setLat ] = useState([]);
const [long, setLong] = useState([]);
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      console.log(result);
    });
  }
  fetchData();
},

  [lat, long])

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
            {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }};
}
