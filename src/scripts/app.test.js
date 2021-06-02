import App from './App';
import renderer from 'react-test-renderer';

jest.mock('@material-ui/core', () => ({
  AppBar: 'AppBar',
  Container: 'Container',
  CssBaseline: 'CssBaseline',
  Slide: 'Slide',
  Toolbar: 'Toolbar',
  Typography: 'Typography',
  useScrollTrigger: jest.fn()
}));
jest.mock('./components/transactions-table', () => 'TransactionsTable');

describe('App', () => {
  it('renders correctly', () => {
    expect(renderer.create(<App />)).toMatchSnapshot();
  });
});
