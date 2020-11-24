import React, { Component } from "react";

import axios from "axios";
import { Line } from "react-chartjs-2";

import { ListGroup } from 'react-bootstrap';
import "./styles.css";
export default class Stocks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [{ symbol: "--", shortName: "--" }],
      timeseries: [{ close: [0, 1, 2, 3] }],
      timestamps: [{ series: [0, 1, 2, 3] }],
      stock: "",
      searching: false,
      previsaoDeFechamento: "",
      lista_de_noticias: [],
      description: "",
      profit_margins: "",
      industry: "",
      list_stocks: [],
      forward_pe: "",
    };

    this.handleChange = this.handleChange.bind(this);

    this.search = this.search.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    const popular = {
        method: 'GET',
        url: 'https://yahoo-finance-low-latency.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved',
        params: {scrIds: 'day_gainers', count: '5'},
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

  render() {
    var stockinfo = this.state.list;
    var chartinfo = this.state.timeseries[0].close;
    var chartTimestamps = this.state.timestamps;
    var noticias = this.state.lista_de_noticias.slice(1, 6);

    const graph = {
      labels: chartTimestamps,
      datasets: [
        {
          label: "Stock Price",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(44,130,201,1)",
          borderwidth: 2,
          data: chartinfo,
        },
      ],
    };

    var infolist = stockinfo.map((stock) => {
      return (
        <div key={stock.symbol} className="info-data">
          {" "}
          <h4 className="company-symbol">{stock.symbol}</h4>
          <h4 className="company-name">{stock.shortName}</h4>
          
        </div>
      );
    });

    var stockdit = stockinfo.map((stock) => {
      return (
        <div key={stock.regularMarketPrice} className="dit-data">
          {" "}
          <div className="stock-price">
            <h4 className="price-title">Price:</h4> 
            <p className="price-text">{stock.regularMarketPrice} {stock.financialCurrency}</p>
          </div>
          <div className="low">
            <h5 className="low-title">52-week low:</h5> 
            <p className="low-text">{stock.fiftyTwoWeekLow}{" "}{stock.financialCurrency}</p>
          </div>
          <div className="high">
            <h5 className="high-title">52-week high:</h5>
            <p className="high-text">{stock.fiftyTwoWeekHigh}{" "}{stock.financialCurrency}</p>
          </div>
        </div>
      );
    });
    var regularmarket = stockinfo.map((stock) => {
      return (
        <div key={stock.regularMarketDayOpen} className="regular-data">
          {" "}
          <div className="open">
            <h4 className="open-title">Open:</h4> 
             
            <p className="price-text">{stock.regularMarketOpen} {stock.financialCurrency}</p>
          </div>
          <div className="volume">
            <h4 className="volume-title">Volume:</h4> 
             
            <p className="volume-text">{stock.regularMarketVolume}</p>
          </div>
          <div className="market-cap">
            <h4 className="market-cap-title">Mkt Cap:</h4> 
             
            <p className="market-cap-text">{stock.marketCap}</p>
          </div>
        </div>
      );
    });

    var liNoticias = noticias.map((noticia) => {
      var titulo = noticia.titulo;
      var imagem = noticia.imagem;
      var resumo = noticia.resumo;
      var link = noticia.link;

      console.log("LINK ", link);
      return (
        <div className="news-content">
          <hr className="hr" />
          <h3 className="news-title">{titulo}</h3>
          <br/>
          <a href={link} className="link-news">
            <img src={imagem} className="news-image"></img>
          </a>
          <br/>
          <br/>
          <p className="news-text">{resumo}</p>
        </div>
      );
    });

    var listItens = this.state.list_stocks.map((stock) => {
      return(
          <ListGroup.Item className="item-content">
              <h4 className="title" >{stock.symbol}</h4>
              <p className="description" >{stock.longName}</p>
              <p className="price-now-stocks">
                  Now: 
                  <p className="price">{stock.regularMarketPrice}</p>
              </p>
          </ListGroup.Item>
        )
    })

    return (
      <div className="container">
        <header>
          <h1>stockMERN</h1>
        </header>

        <div className="sub-content">
          <div className="form-group form-container">
            <label htmlFor="" className="labels">
              Search for stock
            </label>
            
            <input
              className="form-control"
              name="stock"
              value={this.state.stock}
              onChange={this.handleChange}
            />
            <button
              type="button"
              className="btn btn-primary search-stock"
              onClick={this.search}
            >
              {" "}
              Search{" "}
            </button>
            <form action="/">
              <input
                type="submit"
                className="btn btn-danger log-out"
                value="Logout"
              />
            </form>
          </div>
          <div className="line">
            <Line
              data={graph}
              options={{
                title: {
                  display: true,
                  text: this.state.stock + " price over time",
                  fontSize: 10,
                },
                legend: {
                  display: false,
                  position: "right",
                },
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        display: false,
                      },
                    },
                  ],
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                  responsive: true,
                  maintainAspectRatio: true,
                },
              }}
            />
          </div>
        </div>
      <div className="second-content">
        <div className="trending">
              <h1 className="title-page">
                  Trending Stocks
              </h1>
              <ListGroup className="list-stocks">
                  {listItens}
                  
              </ListGroup>
          </div>

          <div className="information">
            {" "}
            {infolist}
            {stockdit}
            {regularmarket}
            <div className="fechamento">
              <h5 className="fechamento-title">Previsão de fechamento:</h5> 
              
              <p className="fechamento-text">{this.state.previsaoDeFechamento}</p>
            </div>
            <div className="lucro">
              <h5 className="lucro-title">Margem de Lucro:</h5> 
              <p className="lucro-text">{this.state.profit_margins}</p>
            </div>
            <div className="forward_pe">
              <h5 className="forward_pe-title">Forward P/E:</h5> 
              <p className="forward_pe-text">{this.state.forward_pe}</p>
            </div>
            <div className="industria">
              <h5 className="industry-title">Indústria da empresa:</h5> 
              <p className="industry-text">{this.state.industry}</p>
            </div>
            <div className="descricao">
              <hr className="hr"/>
              <h5 className="descricao-title">Descrição da empresa:</h5> 
              <p className="descricao-text">{this.state.description}</p>
            </div>
            <div className="news">
              <h2 className="news-break">Notícias relacionadas: </h2>
              {liNoticias}
            </div>
          </div>
      </div>
        
      </div>
    );
  }
  search() {
    const options = {
      method: "GET",
      url: "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote",
      params: { symbols: this.state.stock },
      headers: {
        "x-rapidapi-key": "8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    const chartoptions = {
      method: "GET",
      url:
        "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/" +
        this.state.stock,
      headers: {
        "x-rapidapi-key": "8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    const previsaoDeFechamento = {
      method: "GET",
      url: "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark",
      params: { symbols: this.state.stock },
      headers: {
        "x-rapidapi-key": "8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    const description = {
      method: "GET",
      url:
        "https://yahoo-finance-low-latency.p.rapidapi.com/v11/finance/quoteSummary/" +
        this.state.stock,
      params: { modules: "defaultKeyStatistics,assetProfile" },
      headers: {
        "x-rapidapi-key": "8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    const floatShrs = {
      method: "GET",
      url:
        "https://yahoo-finance-low-latency.p.rapidapi.com/v11/finance/quoteSummary/" +
        this.state.stock,
      params: { modules: "defaultKeyStatistics" },
      headers: {
        "x-rapidapi-key": "8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    const noticias = {
      method: "GET",
      url: "https://yahoo-finance-low-latency.p.rapidapi.com/v2/finance/news",
      params: { symbols: this.state.stock },
      headers: {
        "x-rapidapi-key": "8538735e6dmshbf1ef9d8c671ad5p12d290jsn69c781f588b2",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    };

    axios
      .request(noticias)
      .then((response) => {
        if (Math.floor(response.status / 100) === 2) {
          var lista_noticias = response.data["Content"]["result"];
          console.log("NOTICIAS =--------------", lista_noticias);
          var lista_resposta = [];

          for (var i = 0; i < lista_noticias.length; i++) {
            console.log("A LISTA ------", lista_noticias[i]);
            var json_para_adicionar = {};

            json_para_adicionar.titulo = lista_noticias[i].title;
            json_para_adicionar.imagem = lista_noticias[i].thumbnail;
            json_para_adicionar.resumo = lista_noticias[i].summary;
            json_para_adicionar.link = lista_noticias[i].url;

            lista_resposta.push(json_para_adicionar);
          }

          console.log("LISTA DE NOTICIAS", lista_resposta);
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
              response.data.quoteSummary.result[0].defaultKeyStatistics
                .floatShares.longFmt + " de ações",
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
              response.data.quoteSummary.result[0].defaultKeyStatistics
                .profitMargins.fmt,
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
              response.data.quoteSummary.result[0].defaultKeyStatistics
                .floatShares.longFmt + " de ações",
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
              response.data[this.state.stock].chartPreviousClose + " USD",
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
            timeseries: response.data.chart.result[0].indicators.quote,
            timestamps: response.data.chart.result[0].timestamp,
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
                .longBusinessSummary,
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
              response.data.quoteSummary.result[0].assetProfile.industry,
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
