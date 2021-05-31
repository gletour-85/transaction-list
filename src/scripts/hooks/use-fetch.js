import React from 'react';

// Exports
// -------

export default function useFetch (url, options) {
  const [response, setResponse] = React.useState( null );
  const [error, setError] = React.useState( null );
  const [isLoading, setIsLoading] = React.useState( true );

  //
  // Internal

  async function fetchData() {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      
      setResponse( json );
      setIsLoading( false );
    } catch ( error ) {
      setError( error );
    }
  };

  //
  // Side-Effects

  React.useEffect( () => {
    fetchData();
  }, [] );

  //
  // Response

  return { response, error, isLoading };
};
