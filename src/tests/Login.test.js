import React from 'react';
import { render, screen } from '@testing-library/react';

import Login from '../views/Login/Login';

test("should render button", () => {
    render(<Login/>)

    const button = screen.getByText("Sign In");
    expect(button).toBeInTheDocument();
})