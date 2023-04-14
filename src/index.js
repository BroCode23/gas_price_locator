import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, brown } from '@mui/material/colors';

import { Provider } from 'react-redux';
import store from './util/store';
import GasForm from './pages/GasForm';
import ContactUs from './pages/ContactUs';
import Report from './pages/Report';
import Homepage from './pages/Homepage';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: brown[400],
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
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
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
