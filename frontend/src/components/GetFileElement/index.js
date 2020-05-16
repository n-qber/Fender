import React from 'react';

import './index.css';

const {backend} = require('../../constants');

export default class GetFileElement extends React.Component{
    constructor(props){
        super(props)

        this.state = props
        this.setState({value: ""})

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){

        return(
            <div className="file">
                <form action={backend.get} method="GET" target="_blank" autoComplete="off">
                    <input placeholder="Put your file ID" name="fileID" value={this.state.value} onChange={this.handleChange}></input>
                    <input placeholder="password (if there's none just leave it)" name="twoFactor"></input>
                    <button className="download" disabled={!this.state.value}>Download</button>
                </form>
            </div>
        )
    }
}
