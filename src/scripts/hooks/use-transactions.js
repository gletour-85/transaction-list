import React from 'react';
import useFetch from './use-fetch';

// Exports
// -------

export default function useTransactions () {
  const {
    error,
    isLoading,
    response
  } = useFetch(`${ process.env.REACT_APP_TRANSACTION_API_URL }/1.json`);

  //
  // Response

  return { transactions: response?.transactions, error, isLoading };
};
