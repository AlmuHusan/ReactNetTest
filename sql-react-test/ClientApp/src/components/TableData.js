import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export class TableData extends Component {
    static displayName = TableData.name;
    
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }
    deleteId = async (id) => {
     
        await axios.put(`api/SampleData/SQLWeatherForecastsDelete/${id}`);
        window.location.reload();

    }

    renderForecastsTable(forecasts) {
        
        return (
            <div>
                <Link to="/add" style={{spacing:"10px"}}className="btn btn-primary">Add</Link>
                
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.id}>
                            <td>{forecast.dateFormatted}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                            <td><button onClick={() => this.deleteId(forecast.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
                </table>
                </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response2 = await fetch('api/SampleData/SQLWeatherForecasts');
        console.log(response2);
        const data2 = await response2.json();
        console.log(data2);
        this.setState({ forecasts: data2, loading: false });
    }
}
