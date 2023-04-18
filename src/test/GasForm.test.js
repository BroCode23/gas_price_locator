import { screen } from '@testing-library/react'
import { render, unmountComponentAtNode } from "react-dom";
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { act } from "react-dom/test-utils";

import store from '../util/store';
import GasForm from '../pages/GasForm'

const ERROR_CLASS = "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-filledError MuiAlert-filled css-15zbdqc-MuiPaper-root-MuiAlert-root";
const SUCCESS_CLASS = "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-filledSuccess MuiAlert-filled css-1wv8gsa-MuiPaper-root-MuiAlert-root";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('Shows error for empty name and address boxes', async () => {
    // ARRANGE
    act(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<GasForm />} />
                    </Routes>
                </Router>
            </Provider>, container);
    });

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "2.25")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(ERROR_CLASS);
});

test('Shows error for non number input', async () => {
    // ARRANGE
    act(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<GasForm />} />
                    </Routes>
                </Router>
            </Provider>, container);
    });

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "ABCDEF")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(ERROR_CLASS);
});

test('Shows error for empty ppg box', async () => {
    // ARRANGE
    act(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<GasForm />} />
                    </Routes>
                </Router>
            </Provider>, container);
    });

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Gas Station Name" }), "ABCDEF")
    await userEvent.paste(screen.getByRole("textbox", { name: "Street Address" }), "ABCDEF")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(ERROR_CLASS);
});

test('Shows success when submitted correctly', async () => {
    // ARRANGE
    act(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<GasForm />} />
                    </Routes>
                </Router>
            </Provider>, container);
    });

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "2.25")
    await userEvent.paste(screen.getByRole("textbox", { name: "Gas Station Name" }), "ABCDEF")
    await userEvent.paste(screen.getByRole("textbox", { name: "Street Address" }), "ABCDEF")
    await userEvent.click(screen.getByRole("button", { name: "Submit Price" }))

    // ASSERT
    expect(screen.getByRole("alert", { name: "" })).toBeDefined()
    expect(screen.getByRole("alert", { name: "" }).className).toEqual(SUCCESS_CLASS);
});

test('Shows no alert before submitted', async () => {
    // ARRANGE
    act(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<GasForm />} />
                    </Routes>
                </Router>
            </Provider>, container);
    });

    // ACT
    await userEvent.paste(screen.getByRole("textbox", { name: "Price Per Gallon" }), "2.25")
    await userEvent.paste(screen.getByRole("textbox", { name: "Gas Station Name" }), "ABCDEF")
    await userEvent.paste(screen.getByRole("textbox", { name: "Street Address" }), "ABCDEF")

    // ASSERT
    expect(screen.queryByRole("alert", { name: "" })).toBeNull();
});

