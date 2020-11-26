import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

import { fireEvent, cleanup } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';


import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Stocks from '../views/Stocks/Stocks';
import axios from 'axios';


jest.mock('axios', () => ({

    create: jest.fn().mockResolvedValue({ data: {} }),
    // Criando mock do método GET para listagem de usuários. O objeto
    //dentro do método mockResolvedValue será o “response”

    //var bestStocks = response.data.finance.result[0].quotes

    request: jest.fn().mockResolvedValue({
        data: {
            finance: {
                result: [
                    {
                        quotes: [
                            {
                                symbol: "symbol",
                                longName: "longName",
                                regularMarketPrice: "regular"
                            }
                        ]
                    }
                ]
            }
        }
    }),
    // Criando mock do método POST para cadastro de usuário
    //post: jest.fn().mockResolvedValue({ data: {} })
}))

// Reseta o render do component após cada teste
afterEach(cleanup)

it('nome do teste', async () => {
    const { getByTestId, getByText } = render(<Stocks />);
    // ...
    // Confere resultado. Deve esperar a “resposta” do mock antes de
    //verificar qualquer atualização na tela
    await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(1))
    const teste1 = getByText(/symbol/i);
    expect(teste1).toBeInTheDocument();

    const teste2 = getByText(/longName/i);
    expect(teste2).toBeInTheDocument();

    const teste3 = getByText(/regular/i);
    expect(teste3).toBeInTheDocument();
});


// it("should render text", () => {
//     const page = mount(<Stocks/>)

//     expect(page.find("h1").at(0).text()).toEqual("stockMERN")
// })

// test("should render text", () => {
//     render(<Stocks />)

//     const header = screen.getByText("stockMERN");
//     expect(header).toBeInTheDocument();
// })

// test("should render label", () => {
//     render(<Stocks />)

//     const label = screen.getByText("Search for stock");
//     expect(label).toBeInTheDocument();
// })

// test("should have trending stocks", () => {
//     render(<Stocks />)

//     const trending = screen.getByText("Trending Stocks");
//     expect(trending).toBeInTheDocument();
// })


// test("should have info Price/Earnings of the stock", () => {
//     render(<Stocks />)

//     const trending = screen.getByText("Forward P/E:");
//     expect(trending).toBeInTheDocument();
// })


// test("should have info profit margin of the stock", () => {
//     render(<Stocks />)

//     const trending = screen.getByText("Margem de Lucro:");
//     expect(trending).toBeInTheDocument();
// })

