import React, { Component } from 'react';

import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default class Stocks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [{ symbol: '--', shortName: '--' }],
            timeseries: [{ close: [0, 1, 2, 3] }],
            timestamps: [{ series: [0, 1, 2, 3] }],
            stock: '',
            searching: false,
            previsaoDeFechamento: '',
            lista_de_noticias: []
        };

        this.handleChange = this.handleChange.bind(this);

        this.search = this.search.bind(this);
    }

    render() {
        var stockinfo = this.state.list;
        var chartinfo = this.state.timeseries[0].close;
        var chartTimestamps = this.state.timestamps;
        var noticias = this.state.lista_de_noticias.slice(1, 6);

        const graph = {
            labels: chartTimestamps,
            datasets: [
                {
                    label: 'Stock Price',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(44,130,201,1)',
                    borderwidth: 2,
                    data: chartinfo
                }
            ]
        };

        var infolist = stockinfo.map((stock) => {
            return (
                <p key={stock.symbol}>
                    {' '}
                    Ticker: {stock.symbol} Company: {stock.shortName}
                </p>
            );
        });

        var stockdit = stockinfo.map((stock) => {
            return (
                <p key={stock.regularMarketPrice}>
                    {' '}
                    Price: {stock.regularMarketPrice} {stock.financialCurrency}{' '}
                    | 52-week low: {stock.fiftyTwoWeekLow}{' '}
                    {stock.financialCurrency} | 52-week high:{' '}
                    {stock.fiftyTwoWeekHigh} {stock.financialCurrency}
                </p>
            );
        });
        var regularmarket = stockinfo.map((stock) => {
            return (
                <p key={stock.regularMarketDayOpen}>
                    {' '}
                    Open: {stock.regularMarketOpen} {stock.financialCurrency} |
                    Volume: {stock.regularMarketVolume} | Mkt Cap:{' '}
                    {stock.marketCap}
                </p>
            );
        });

        var liNoticias = noticias.map((noticia) => {
            var titulo = noticia.titulo;
            var imagem = noticia.imagem;
            var resumo = noticia.resumo;
            var link = noticia.link;

            console.log('LINK ', link);
            return (
                <div>
                    ----------------------------------------------------------------------------
                    <h3>{titulo}</h3>
                    <a href={link}>
                        <img
                            src={imagem}
                            style={{ width: '400px', height: '300px' }}></img>
                    </a>
                    <p>{resumo}</p>
                </div>
            );
        });

        return (
            <div>
                <header>
                    <h1>stockMERN</h1>
                </header>

                <ul>
                    <input
                        name='stock'
                        value={this.state.stock}
                        onChange={this.handleChange}
                    />
                    <br></br>

                    <button onClick={this.search}> Search </button>
                </ul>

                <ul>
                    {' '}
                    {infolist}
                    <Line
                        data={graph}
                        options={{
                            title: {
                                display: true,
                                text: this.state.stock + ' price over time',
                                fontSize: 10
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            },
                            scales: {
                                xAxes: [
                                    {
                                        ticks: {
                                            display: false
                                        }
                                    }
                                ]
                            },
                            elements: {
                                point: {
                                    radius: 0
                                },
                                responsive: true,
                                maintainAspectRatio: true
                            }
                        }}
                    />
                    {stockdit}
                    {regularmarket}
                    <p>
                        Previsão de fechamento:{' '}
                        {this.state.previsaoDeFechamento}
                    </p>
                    <h2>Notícias relacionadas: </h2>
                    {liNoticias}
                    <form action='/'>
                        <input type='submit' value='Logout' />
                    </form>
                </ul>
            </div>
        );
    }
    search() {
        const options = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote',
            params: { symbols: this.state.stock },
            headers: {
                'x-rapidapi-key':
                    '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        const chartoptions = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/' +
                this.state.stock,
            headers: {
                'x-rapidapi-key':
                    '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        const previsaoDeFechamento = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark',
            params: { symbols: this.state.stock },
            headers: {
                'x-rapidapi-key':
                    '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        const noticias = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v2/finance/news',
            params: { symbols: this.state.stock },
            headers: {
                'x-rapidapi-key':
                    '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        axios
            .request(noticias)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    var lista_noticias = response.data['Content']['result'];
                    console.log('NOTICIAS =--------------', lista_noticias);
                    var lista_resposta = [];

                    for (var i = 0; i < lista_noticias.length; i++) {
                        console.log('A LISTA ------', lista_noticias[i]);
                        var json_para_adicionar = {};

                        json_para_adicionar.titulo = lista_noticias[i].title;
                        json_para_adicionar.imagem =
                            lista_noticias[i].thumbnail;
                        json_para_adicionar.resumo = lista_noticias[i].summary;
                        json_para_adicionar.link = lista_noticias[i].url;

                        lista_resposta.push(json_para_adicionar);
                    }

                    console.log('LISTA DE NOTICIAS', lista_resposta);
                    this.setState({ lista_de_noticias: lista_resposta });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(previsaoDeFechamento)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        previsaoDeFechamento:
                            response.data[this.state.stock].chartPreviousClose +
                            ' USD'
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(options)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({ list: response.data.quoteResponse.result });
                    // this.state.list.shortName = response.data.quoteResponse.result[0].shortName;
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(chartoptions)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        timeseries:
                            response.data.chart.result[0].indicators.quote,
                        timestamps: response.data.chart.result[0].timestamp
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    handleChange(event) {
        var handleState = (state, event) => {
            state[event.target.name] = event.target.value;
            return state;
        };
        this.setState(handleState(this.state, event));
    }
}
