import TestRenderer from 'react-test-renderer';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import GasForm from './GasForm'
import ContactUs from './ContactUs'
import Report from './Report'
import App from './App';

test('Snapshot Testing', () => {
  const tree = TestRenderer
    .create(<React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="gas-form" element={<GasForm />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="report" element={<Report />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
