import React from 'react';
import renderer from 'react-test-renderer';
import useFetch from './use-fetch';

// Setup
// -----

// TODO: centralize this logic
function ComponentThatUsesFetch({ url, options }) {
  const skill = useFetch(url, options);

  return (
    <samp data-provided-data={ skill } />
  );
}

async function getResult(props) {
  let component;
  await renderer.act(async () => (
    component = renderer.create(<ComponentThatUsesFetch { ...props } />)
  ));

  return component.root.findByType('samp').props['data-provided-data'];
}

// Tests
// -----

describe('useFetch', () => {
  let result;

  describe('result', () => {
    describe('when the response returns without error', () => {
      beforeEach(async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: async () => ({ success: true }),
          ok: true
        });

        result = await getResult({ url: 'mock-url', options: { headers: 'mock-headers' } });
      });

      it('calls fetch with given url and options', () => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('mock-url', { headers: 'mock-headers' });
      });

      it('returns the expected result', () => {
        expect(result.response).toEqual({ success: true });
      });
    });

    describe('when fetch fails', () => {
      beforeEach(async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject({ message: 'fetch call failed' }));

        result = await getResult();
      });

      it('returns the expected result', () => {
        expect(result.error).toEqual({ message: 'fetch call failed' });
      });
    });
  });
});
