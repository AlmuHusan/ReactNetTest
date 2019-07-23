import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const deleteForecast = ({ id }) => axios.put(`api/SampleData/SQLWeatherForecastsDelete/${id}`);
const getForecasts = () => axios.get('api/SampleData/SQLWeatherForecasts');


export function LiveTableData(props) {
    return (
        <TableData
            // [See](https://zhenyong.github.io/react/docs/transferring-props.html)
            {...props}
            onDelete={deleteForecast}
            getForecasts={getForecasts}
        />
    );
}

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
     
        await this.props.onDelete({ id });
        await this.populateWeatherData();

    }

    renderForecastsTable(forecasts) {
        
        return (
            <div>
                <Link to="/add" style={{stdhrfd:"500px"}}className="btn btn-primary">Add</Link>
                
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
        const { data } = await this.props.getForecasts();
        this.setState({ forecasts: data, loading: false });
    }
}
