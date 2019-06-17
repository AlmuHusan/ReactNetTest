import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Add extends Component {
    render() {
        return (
            <div>
                <h1>Add a Row</h1>
                <form>
                    <label>Date: </label>
                    <input type="text"></input>
                    <br/>
                    <label>Temp. C: </label>
                    <input type="text"></input>
                    <br />
                    <label>Summary: </label>
                    <input type="text"></input>
                    <br />
                    <button type="submit">Create!</button>

                </form>
            </div>


        );
    }
}

