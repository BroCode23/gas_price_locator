import TestRenderer from 'react-test-renderer';
import App from './App';
import GasForm from './GasForm'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

test('Snapshot Testing', () => {
  const tree = TestRenderer
    .create(<Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="gas-form" element={<GasForm />} />
      </Routes>
    </Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
