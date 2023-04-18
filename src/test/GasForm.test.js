import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import store from '../util/store';
import GasForm from '../pages/GasForm'

const ERROR_CLASS = "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-filledError MuiAlert-filled css-15zbdqc-MuiPaper-root-MuiAlert-root";
const SUCCESS_CLASS = "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-filledSuccess MuiAlert-filled css-1wv8gsa-MuiPaper-root-MuiAlert-root";

test('Shows Error for Empty Name and Address Boxes', async () => {
    // ARRANGE
    render(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<GasForm />} />
                </Routes>
            </Router>
        </Provider>);

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "2.25")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(ERROR_CLASS);
});

test('Shows Error for Non Number Input', async () => {
    // ARRANGE
    render(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<GasForm />} />
                </Routes>
            </Router>
        </Provider>);

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "ABCDEF")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(ERROR_CLASS);
});

test('Shows Error for Empty ppg box', async () => {
    // ARRANGE
    render(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<GasForm />} />
                </Routes>
            </Router>
        </Provider>);

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Gas Station Name" }), "ABCDEF")
    await userEvent.paste(screen.getByRole("textbox", { name: "Street Address" }), "ABCDEF")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(ERROR_CLASS);
});

test('Shows Success when Submitted Correctly', async () => {
    // ARRANGE
    render(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<GasForm />} />
                </Routes>
            </Router>
        </Provider>);

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "2.25")
    await userEvent.paste(screen.getByRole("textbox", { name: "Gas Station Name" }), "ABCDEF")
    await userEvent.paste(screen.getByRole("textbox", { name: "Street Address" }), "ABCDEF")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(SUCCESS_CLASS);
});

