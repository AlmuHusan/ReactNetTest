import React, { Component } from 'react';
import axios from 'axios';

export default class Add extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            validTemp: false,
        };
        this.onFormChange = this.onFormChange.bind(this);

    }

    onFormSubmit = async(event)=> {
        event.preventDefault();
        var weather = {
            DateFormatted: event.target.date.value,
            TemperatureC: parseInt(event.target.temp.value),
            Summary: event.target.summary.value
        }
        var weatherJSON = JSON.stringify(weather);
        weatherJSON=encodeURIComponent(weatherJSON)
        //console.log( (weatherJSON));
        await axios.put(`api/SampleData/SQLWeatherForecastsAdd/${weatherJSON}`);
        await axios.put(`api/SampleData/SQLWeatherForecastsAdd/%7B"DateFormatted"%3A"1%2F21%2F19"%2C"TemperatureC"%3A23A%2C"Summary"%3A"Coldddddddddddddddddddddssssssss
fffffffffffffffffffggggggggggggggggggggjjjjjjjjjjjjjjaaaaaaaaaaaaaaaaaaad"%7D`);
        this.props.history.push('/table-data');
    }

    isTempValid(number) {
        if (!isNaN(number)) {
            return true;
        }
        return false
    }

    onFormChange(event) {
        event.persist()
        //console.log(event);
        if (event.target.name === "temp") {
            console.log(event.target.value);
            this.setState({ validTemp: this.isTempValid(event.target.value)})
        }
    }


    render() {
        //this.handlePasswordChange.bind(this)
        return (
            <div>
                <h1>Add a Row</h1>
                <form onSubmit={this.onFormSubmit} onChange={this.onFormChange} >
                    <label>Date: (in mm/dd/yy) </label>
                    <input type="text" name="date" ></input>
                    <br/>
                    <label>Temp. C: </label>
                    <input type="text" name="temp" ></input>
                    <br />
                    <label>Summary: </label>
                    <input type="text" name="summary" maxLength="30" ></input>
                    <br />
                    {!this.state.validTemp ? <div className="text-danger">WARNING: Your input is currently not valid</div>:<div/>}
                    <button type="submit" valid={`${this.state.validForm}`} className="btn btn-primary ">Create!</button>

                </form>
            </div>


        );
    }
}

