import React, { Component } from 'react';

import axios from 'axios';
import { Line } from 'react-chartjs-2';

import history from '../../history';

import { ListGroup } from 'react-bootstrap';
import './styles.css';
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
            lista_de_noticias: [],
            description: '',
            profit_margins: '',
            industry: '',
            list_stocks: [],
            forward_pe: '',
            link_empresa: '',
            market: '',
            floatShares: '',
            acao: '',
            pais: '',
            employees: '',
            anotherOptions: [{ exchange: '', exchangeTimezoneName: '' }]
        };

        this.handleChange = this.handleChange.bind(this);

        this.search = this.search.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const popular = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved',
            params: { scrIds: 'day_gainers', count: '5' },
            headers: {
                'x-rapidapi-key':
                    'a9bb09d058msh685a37cdd810d4fp1bca9ajsnefe368829089',
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

        const description = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v11/finance/quoteSummary/' +
                this.state.stock,
            params: { modules: 'defaultKeyStatistics,assetProfile' },
            headers: {
                'x-rapidapi-key':
                    '8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        const floatShrs = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v11/finance/quoteSummary/' +
                this.state.stock,
            params: { modules: 'defaultKeyStatistics' },
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

        const similar = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/recommendationsbysymbol/' +
                this.state.stock,
            headers: {
                'x-rapidapi-key':
                    'a189d94715msh94688240afe7d21p18a442jsn5712d79e456d',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        const anotherOptions = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/v7/finance/options/' +
                this.state.stock,
            headers: {
                'x-rapidapi-key':
                    'a189d94715msh94688240afe7d21p18a442jsn5712d79e456d',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
            }
        };

        axios
            .request(anotherOptions)
            .then(({ data, status }) => {
                const { result, error } = data.optionChain;
                if (Math.floor(status / 100) === 2 && !error) {
                    this.setState({ anotherOptions: [result[0].quote] });
                }
            })
            .catch((e) => console.log(e));

        axios
            .request(similar)
            .then((response) => {
                // console.log("poo")
                // console.log(response.data.finance.result[0].recommendedSymbols[0].symbol)
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        acao:
                            response.data.finance.result[0]
                                .recommendedSymbols[0].symbol
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(noticias)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    var lista_noticias = response.data['Content']['result'];
                    // console.log('NOTICIAS =--------------', lista_noticias);
                    var lista_resposta = [];

                    for (var i = 0; i < lista_noticias.length; i++) {
                        // console.log('A LISTA ------', lista_noticias[i]);
                        var json_para_adicionar = {};

                        json_para_adicionar.titulo = lista_noticias[i].title;
                        json_para_adicionar.imagem =
                            lista_noticias[i].thumbnail;
                        json_para_adicionar.resumo = lista_noticias[i].summary;
                        json_para_adicionar.link = lista_noticias[i].url;

                        lista_resposta.push(json_para_adicionar);
                    }

                    // console.log('LISTA DE NOTICIAS', lista_resposta);
                    this.setState({ lista_de_noticias: lista_resposta });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(floatShrs)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        floatShares:
                            response.data.quoteSummary.result[0]
                                .defaultKeyStatistics.floatShares.longFmt +
                            ' de ações'
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });
        axios
            .request(floatShrs)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        profit_margins:
                            response.data.quoteSummary.result[0]
                                .defaultKeyStatistics.profitMargins.fmt
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(floatShrs)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        floatShares:
                            response.data.quoteSummary.result[0]
                                .defaultKeyStatistics.floatShares.longFmt +
                            ' de ações'
                    });
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
            .request(options)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        market:
                            response.data.quoteResponse.result[0]
                                .fullExchangeName
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
                    this.setState({
                        forward_pe:
                            response.data.quoteResponse.result[0].forwardPE
                    });
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

        axios
            .request(description)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        description:
                            response.data.quoteSummary.result[0].assetProfile
                                .longBusinessSummary
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(description)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        link_empresa:
                            response.data.quoteSummary.result[0].assetProfile
                                .website
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(description)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        industry:
                            response.data.quoteSummary.result[0].assetProfile
                                .industry
                    });
                    return;
                }
            })
            .catch(function (error) {
                console.error(error);
            });

        axios
            .request(description)
            .then((response) => {
                if (Math.floor(response.status / 100) === 2) {
                    this.setState({
                        employees:
                            response.data.quoteSummary.result[0].assetProfile
                                .fullTimeEmployees,
                        pais:
                            response.data.quoteSummary.result[0].assetProfile
                                .country
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

    render() {
        var stockinfo = this.state.list;
        var chartinfo = this.state.timeseries[0].close;
        var chartTimestamps = this.state.timestamps;
        var noticias = this.state.lista_de_noticias.slice(1, 6);
        var anotherOptions = this.state.anotherOptions[0];

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

        var infolist = stockinfo.map((stock, index) => {
            return (
                <div key={stock.symbol} className='info-data'>
                    <h4 className='company-symbol'>{stock.symbol}</h4>
                    <h4 className='company-name'>{stock.shortName}</h4>
                </div>
            );
        });

        var stockdit = (
            <>
                <thead className='columns'>
                    <tr>
                        <th>Price:</th>
                        <th>52-week Low:</th>
                        <th>52-week High:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {stockinfo[0].regularMarketPrice}{' '}
                            {stockinfo[0].financialCurrency}
                        </td>
                        <td>
                            {stockinfo[0].fiftyTwoWeekLow}{' '}
                            {stockinfo[0].financialCurrency}
                        </td>
                        <td>
                            {stockinfo[0].fiftyTwoWeekHigh}{' '}
                            {stockinfo[0].financialCurrency}
                        </td>
                    </tr>
                </tbody>
            </>
        );
        var regularmarket = (
            <>
                <thead className='columns'>
                    <tr>
                        <th>Open:</th>
                        <th>Volume:</th>
                        <th>Market Cap:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {stockinfo[0].regularMarketOpen}{' '}
                            {stockinfo[0].financialCurrency}
                        </td>
                        <td>{stockinfo[0].regularMarketVolume}</td>
                        <td>{stockinfo[0].marketCap}</td>
                    </tr>
                </tbody>
                <thead className='columns'>
                    <tr>
                        <th>Float Shares:</th>
                        <th>Funcionários:</th>
                        <th>País de origem:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.floatShares}</td>
                        <td>{this.state.employees}</td>
                        <td>{this.state.pais}</td>
                    </tr>
                </tbody>
            </>
        );

        const liNoticias = noticias.map((noticia, index) => {
            const titulo = noticia.titulo;
            const imagem = noticia.imagem;
            const resumo = noticia.resumo;
            const link = noticia.link;

            // console.log('LINK ', link);
            return (
                <div key={index} className='news-content'>
                    <h3 className='news-title'>{titulo}</h3>
                    <br />
                    <a href={link} className='link-news'>
                        <img src={imagem} className='news-image' alt=''></img>
                    </a>
                    <br />
                    <br />
                    <p className='news-text'>{resumo}</p>
                </div>
            );
        });

        var listItens = this.state.list_stocks.map((stock, index) => {
            return (
                <ListGroup.Item
                    key={index + stock.symbol}
                    className='item-content'>
                    <h4 className='title'>{stock.symbol}</h4>
                    <div className='list-group-inner'>
                        <span className='description'>{stock.longName}</span>
                        <span className='price-now-stocks'>
                            Now:
                            <span className='price'>
                                {stock.regularMarketPrice}
                            </span>
                        </span>
                    </div>
                </ListGroup.Item>
            );
        });
        const anotherOptionsTable = (
            <>
                <thead className='columns'>
                    <tr>
                        <th>Exchange:</th>
                        <th>Exchange TZ Name:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{anotherOptions.exchange}</td>
                        <td>{anotherOptions.exchangeTimezoneName}</td>
                    </tr>
                </tbody>
            </>
        );

        return (
            <div className='container'>
                <header>
                    <h1>stockMERN</h1>
                </header>

                <div className='sub-content'>
                    <div className='form-group form-container'>
                        <label htmlFor='' className='labels'>
                            Search for stock
                        </label>

                        <input
                            className='form-control'
                            name='stock'
                            value={this.state.stock}
                            onChange={this.handleChange}
                        />
                        <button
                            type='button'
                            className='btn btn-primary search-stock'
                            onClick={() => {
                                this.state.stock && this.search();
                            }}>
                            Search
                        </button>
                        <form action='/'>
                            <input
                                type='submit'
                                className='btn btn-danger log-out'
                                value='Logout'
                            />
                        </form>
                    </div>
                    <div className='line'>
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
                    </div>
                </div>
                <div className='second-content'>
                    <div className='trending'>
                        <h1 className='title-page'>Trending Stocks</h1>
                        <ListGroup
                            className='list-stocks'
                            onClick={() => history.push('/Trending')}>
                            {listItens}
                        </ListGroup>
                    </div>

                    <div className='information-table'>
                        {infolist}
                        <table>
                            {stockdit}
                            {regularmarket}
                            <thead className='columns'>
                                <tr>
                                    <th>Margem de lucro:</th>
                                    <th>Ação similar:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.profit_margins}</td>
                                    <td>{this.state.acao}</td>
                                </tr>
                            </tbody>
                            <thead className='columns'>
                                <tr>
                                    <th>Forward P/E:</th>
                                    <th>Mercado:</th>
                                    <th>Previsão de fechamento:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.forward_pe}</td>
                                    <td>{this.state.market}</td>
                                    <td>{this.state.previsaoDeFechamento}</td>
                                </tr>
                            </tbody>
                            {anotherOptionsTable}
                        </table>

                        <div className='common-text-group'>
                            <p className='title'>Indústria da empresa:</p>
                            <p className='text'>{this.state.industry}</p>
                            <p className='title'>Link da empresa:</p>
                            <p className='text'>
                                <a
                                    className='link-text'
                                    href={`${this.state.link_empresa}`}
                                    target={'_blank'}
                                    rel='noopener noreferrer'>
                                    {this.state.link_empresa}
                                </a>
                            </p>
                        </div>
                        <p className='title'>Descrição da empresa:</p>
                        <p className='text'>{this.state.description}</p>
                        <p className='title'>Notícias relacionadas:</p>
                        {liNoticias}
                    </div>
                </div>
            </div>
        );
    }
}
