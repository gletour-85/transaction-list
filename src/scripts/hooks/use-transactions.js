import React from 'react';
import useFetch from './use-fetch';

// Exports
// -------

export default function useTransactions () {
  const {
    error: metaCallError,
    response
  } = useFetch(`${ process.env.REACT_APP_TRANSACTION_API_URL }/1.json`);

  const [ error, setError ] = React.useState();
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ transactions, setTransactions ] = React.useState();

  //
  // Internal

  async function fetchRemainingTransactions () {
    const pagesRemaining = Math.ceil(response.totalCount / response.transactions.length) - 1;
    const promisesArray = [ ...Array(pagesRemaining).keys() ].map(
      (index) => fetch(
        `${ process.env.REACT_APP_TRANSACTION_API_URL }/${ index + 2 }.json`
      ).then((resp) => resp.json())
    );

    try {
      Promise.all(promisesArray).then((json) => {
        const remainingTransactions = json.map((res) => {
          return res.transactions;
        }).flat(1);

        setTransactions([ ...response.transactions, ...remainingTransactions ]);
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
    }
  }

  //
  // Side-Effects

  React.useEffect(() => {
    if (metaCallError) {
      setError(metaCallError);
      setIsLoading(false);
      return;
    }

    if (!response) {
      return;
    }

    // Have we gotten all the transactions?
    if (response.transactions.length === response.totalCount) {
      setIsLoading(false);
      return;
    }

    fetchRemainingTransactions();
  }, [ fetchRemainingTransactions, metaCallError, response ]);

  //
  // Response

  return { error, isLoading, transactions };
};
