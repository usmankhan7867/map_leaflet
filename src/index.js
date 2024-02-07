import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles.css";
import axios from "axios";

class App extends Component {
  state = {
    center: [],
    zoom: 13,
    street: "",
    city: "",
    country: ""
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getLang = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const { street, city, country } = this.state;
    const url = 'https://geocode.maps.co/search';
    const params = {
      street: street,
      city: city,
      country: country,
      api_key: '65c3641959506765292730htc29a259' // Replace 'YOUR_API_KEY' with your actual API key
    };
console.log("params:", params)
    axios.get(url, { params })
      .then(response => {
        console.log('Response:', response);
        this.setState({ center: response.data.length > 0 ? [response.data[0].lat, response.data[0].lon] : [] });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <div>

       <form onSubmit={this.getLang} className="form-container">
          <div>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={this.state.street}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={this.state.city}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={this.state.country}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="dark-button" type="submit">Get long/lat</button>
        </form>
        {this.state.center.length > 0 ?
          <Map center={this.state.center} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Marker position={this.state.center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map> :
          <div style={{textAlign:"center"}}>Not Found</div>
        }
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
