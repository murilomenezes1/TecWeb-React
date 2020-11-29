import React from "react";
import { render, screen } from "@testing-library/react";

import { fireEvent, cleanup } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

import Trending from "../views/Trending/Trending";
import axios from "axios";

jest.mock("axios", () => ({
  create: jest.fn().mockResolvedValue({ data: {} }),

  request: jest.fn().mockResolvedValue({
    data: {
      finance: {
        result: [
          {
            quotes: [
              {
                symbol: "AAPL",
                longName: "Apple, Inc",
                regularMarketPrice: "116.00",
              },

              {
                symbol: "TSLA",
                longName: "Tesla, Inc",
                regularMarketPrice: "580.05",
              },

              {
                symbol: "MSFT",
                longName: "Microsoft Corporation",
                regularMarketPrice: "213.00",
              },
            ],
          },
        ],
      },
    },
  }),
}));

afterEach(cleanup);

it("should render Apple trending stock", async () => {
  const { getByText } = render(<Trending />);

  await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(1));

  const apple1 = getByText(/AAPL/i);
  expect(apple1).toBeInTheDocument();

  const apple2 = getByText(/Apple, Inc/i);
  expect(apple2).toBeInTheDocument();

  const apple3 = getByText(/116.00/i);
  expect(apple3).toBeInTheDocument();
});

it("should render Tesla trending stock", async () => {
  const { getByText } = render(<Trending />);

  await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(2));

  const tesla1 = getByText(/TSLA/i);
  expect(tesla1).toBeInTheDocument();

  const tesla2 = getByText(/Tesla, Inc/i);
  expect(tesla2).toBeInTheDocument();

  const tesla3 = getByText(/580.05/i);
  expect(tesla3).toBeInTheDocument();
});

it("should render Microsoft trending stock", async () => {
  const { getByText } = render(<Trending />);

  await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(3));

  const microsoft1 = getByText(/MSFT/i);
  expect(microsoft1).toBeInTheDocument();

  const microsoft2 = getByText(/Microsoft Corporation/i);
  expect(microsoft2).toBeInTheDocument();

  const microsoft3 = getByText(/213.00/i);
  expect(microsoft3).toBeInTheDocument();
});

it("should render the title of the page", () => {
  const { getByText } = render(<Trending />);

  const testeTitle = getByText("Trending Stocks");
  expect(testeTitle).toBeInTheDocument();
});
