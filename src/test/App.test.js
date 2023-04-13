import renderer from 'react-test-renderer';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';

import store from '../util/store';
import GasForm from '../pages/GasForm';
import ContactUs from '../pages/ContactUs';
import Report from '../pages/Report';
import Homepage from '../pages/Homepage';

it('renders correctly', () => {
  const tree = renderer
    .create(<React.StrictMode>
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
    </React.StrictMode>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});