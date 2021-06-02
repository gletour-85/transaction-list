import ReactDom from 'react-dom';

// Mocks
// -----

jest.mock('./scripts/app', () => 'App');

const reactDomRenderSpy = jest.spyOn(ReactDom, 'render').mockImplementation();

// Tests
// -----

describe('index', () => {
  beforeEach(() => {
    require('./index');
  });

  it('renders app correctly', () => {
    expect(reactDomRenderSpy).toHaveBeenCalledTimes(1);
    expect(reactDomRenderSpy.mock.calls[0][0]).toMatchSnapshot();
  });
});
