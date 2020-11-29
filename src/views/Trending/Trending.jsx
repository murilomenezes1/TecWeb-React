import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ListGroup } from 'react-bootstrap';

import './styles.css';

export default class Trending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list_stocks: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const popular = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved',
            params: { scrIds: 'day_gainers', count: '25' },
            headers: {
                'x-rapidapi-key':
                    '65ff027d5amshf60ee263329666bp1cb1f9jsnad077b89cf91',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        axios
            .request(popular)
            .then((response) => {
                var bestStocks = response.data.finance.result[0].quotes;

                this.setState({
                    list_stocks: bestStocks
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        var listItens = this.state.list_stocks.map((stock, index) => {
            return (
                <ListGroup.Item key={index + stock.symbol} className='item'>
                    <h4 className='title'>{stock.symbol}</h4>
                    <p className='description'>{stock.longName}</p>
                    <p className='price-open'>
                        Open:
                        <span className='price'>{stock.regularMarketOpen}</span>
                    </p>
                    <p className='price-now'>
                        Now:
                        <span className='price'>
                            {stock.regularMarketPrice}
                        </span>
                    </p>
                    <button className='btn btn-primary submit-button'>
                        Buy
                    </button>
                </ListGroup.Item>
            );
        });

        return (
            <div className='container'>
                <h1 className='title-page'>Trending Stocks</h1>
                <ListGroup className='list'>{listItens}</ListGroup>
            </div>
        );
    }
}
