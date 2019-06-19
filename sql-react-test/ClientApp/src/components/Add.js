import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validForm: false,
            validDate: false,
            validTemp: false,
            validSummary: false
        };
    }

    async onFormSubmit(event) {
        event.preventDefault();
        var weather = {
            DateFormatted: event.target.date.value,
            TemperatureC: parseInt(event.target.temp.value),
            Summary: event.target.summary.value
        }
        var weatherJSON = JSON.stringify(weather);
        weatherJSON=encodeURIComponent(weatherJSON)
        console.log( (weatherJSON));
        await axios.put(`api/SampleData/SQLWeatherForecastsAdd/${weatherJSON}`);
        window.location = '/table-data';
    }

  
    onFormChange(event) {
        event.preventDefault();
        
    }


    render() {
        return (
            <div>
                <h1>Add a Row</h1>
                <form onSubmit={this.onFormSubmit} onChange={this.onFormChange}>
                    <label>Date: </label>
                    <input type="text" name="date" ></input>
                    <br/>
                    <label>Temp. C: </label>
                    <input type="text" name="temp" ></input>
                    <br />
                    <label>Summary: </label>
                    <input type="text" name="summary"></input>
                    <br />
                    <button type="submit" valid={`${this.state.validForm}`} className="btn btn-primary ">Create!</button>

                </form>
            </div>


        );
    }
}

