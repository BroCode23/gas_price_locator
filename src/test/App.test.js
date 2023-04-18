import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, brown } from "@mui/material/colors";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import store from "../util/store";
import GasForm from "../pages/GasForm";
import ContactUs from "../pages/ContactUs";
import Report from "../pages/Report";
import Homepage from "../pages/Homepage";

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

test("Renders the App correctly", () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: brown[400],
      },
    },
  });

  act(() => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="gas-form" element={<GasForm />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="report" element={<Report />} />
            </Routes>
          </Router>
        </Provider>
      </ThemeProvider>,
      container
    );
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
