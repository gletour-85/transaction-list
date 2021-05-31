import React from 'react';

// Exports
// -------

export default function useFetch (url, options) {
  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState();

  //
  // Internal

  async function fetchData() {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      
      setResponse(json);
    } catch (error) {
      setError(error);
    }
  };

  //
  // Side-Effects

  React.useEffect(() => {
    fetchData();
  }, []);

  //
  // Response

  return { response, error };
};
