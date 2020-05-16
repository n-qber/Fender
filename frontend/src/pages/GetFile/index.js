import React from 'react';

import './index.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Ad from '../../components/Ad';

import GetFileElement from '../../components/GetFileElement';

export default class GetFile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            files: [0, 1]
        }
    }

    renderFields(download){
        return this.state.files.map(key => <GetFileElement key={key} number={key} master={this} download={download}/>)
    }

    deleteComponent(number){
        this.setState({
            files: this.state.files.filter(key => {
                return key !== number
            })
        })
    }

    render() {

        return (<div>
                <Header page="getfile"/>
                <div className="line">
                    <Ad/>
                    <article>
                        <h2>Get your File</h2>
                        <section>
                            {this.renderFields(this)}
                        </section>
                        <button onClick={(e) => {console.log(this.state.files); this.setState({files: this.state.files.concat([this.state.files.length])})}}>Add Fields</button>
                        <button id="get-files" onClick={() => this.setState({files:[0]})}>Delete All (almosts)</button>
                    </article>
                    <Ad/>
                </div>
                <Footer/>                
            </div>)
    }
}