import React from "react";
import Weather from "./Weather";
import Form from "./Form";
// import SWeather from "./components/stateless_weather";
// import SForm from "./components/stateless_form"
import Title from "./Title";

const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends React.Component {

  state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();   
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();
    console.log(response);
    if(city && country){
      try{
        this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }
    catch{
      this.setState({
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "There is an error with your search. Please input search values..."
      })
    }
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  render() {

    return (


            <div className="container clearfix">
              <div className="row">
                <Title />
                </div>
                <div>
                <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                
              </div>
            </div>


    )
  }
}
export default App;