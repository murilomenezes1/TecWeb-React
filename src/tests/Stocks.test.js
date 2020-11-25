import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Stocks from '../views/Stocks/Stocks';

// it("should render text", () => {
//     const page = mount(<Stocks/>)

//     expect(page.find("h1").at(0).text()).toEqual("stockMERN")
// })

test("should render text", () => {
    render(<Stocks/>)

    const header = screen.getByText("stockMERN");
    expect(header).toBeInTheDocument();
})

test("should render label", () => {
    render(<Stocks/>)

    const label = screen.getByText("Search for stock");
    expect(label).toBeInTheDocument();
})

test("should have trending stocks", () =>{
    render(<Stocks/>)

    const trending = screen.getByText("Trending Stocks");
    expect(trending).toBeInTheDocument();
})


test("should have info Price/Earnings of the stock", () =>{
    render(<Stocks/>)

    const trending = screen.getByText("Forward P/E:");
    expect(trending).toBeInTheDocument();
})

