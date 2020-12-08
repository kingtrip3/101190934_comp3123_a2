import React from 'react';
import UserLocation from './components/UserLocation.js';
import './App.css';
import Axios from 'axios';

class App extends React.Component {


  state = {
    userPosition: {
      latitude: 35,
      longitude: 139
    },
    weather: {},
  }

  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ userPosition: pos });

        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=afda6a280da4d5b78f8aca36cc2cb4ab=${this.state.userPosition.latitude},${this.state.userPosition.longitude}`).then(res => {

          let userWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            feelslike: res.data.current.feelslike,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }

          this.setState({ weather: userWeather });
        })
      })
    }
  }

  changeLocation = (e) => {

    e.preventDefault()

    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=afda6a280da4d5b78f8aca36cc2cb4ab=${this.state.regionInput}`).then(res => {

      let userWeather = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        feelslike: res.data.current.feelslike,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }

      this.setState({ weather: userWeather });

    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <UserLocation weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default App;

//reference https://www.youtube.com/watch?v=M-0V5ROegYg&ab_channel=Scriptnation