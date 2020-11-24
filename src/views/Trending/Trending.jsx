import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ListGroup } from 'react-bootstrap';

import "./styles.css";

export default class Trending extends Component{
    constructor(props){
        super(props);

        this.state = {
            list_stocks: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    componentDidMount(){
        const popular = {
            method: 'GET',
            url: 'https://yahoo-finance-low-latency.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved',
            params: {scrIds: 'day_gainers', count: '25'},
            headers: {
                'x-rapidapi-key': 'a9bb09d058msh685a37cdd810d4fp1bca9ajsnefe368829089',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        }

        axios.request(popular)
        .then((response) => {
            var bestStocks = response.data.finance.result[0].quotes

            this.setState({
                list_stocks: bestStocks
            })
            
        }).catch(function (error) {
            console.error(error);
        });
    }

    render(){

        var listItens = this.state.list_stocks.map((stock) => {
            return(
                <ListGroup.Item className="item">
                    <h4 className="title" >{stock.symbol}</h4>
                    <p className="description" >{stock.longName}</p>
                    <p className="price-open">
                        Open: 
                        <p className="price">{stock.regularMarketOpen}</p>
                    </p>
                    <p className="price-now">
                        Now: 
                        <p className="price">{stock.regularMarketPrice}</p>
                    </p>
                    <button className="btn btn-primary submit-button">Buy</button>
                </ListGroup.Item>
            )
        })

        return(
            <div className="container">
                <h1 className="title-page">
                    Trending Stocks
                </h1>
                <ListGroup className="list">
                    {listItens}
                    
                </ListGroup>
            </div>
        );
    }
}