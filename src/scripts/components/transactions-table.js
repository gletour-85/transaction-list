import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import React from 'react';
import classnames from 'classnames';
import useTransactions from '../hooks/use-transactions';

// Internal
// --------

function TransactionsTable () {
  const {
    error,
    isLoading,
    transactions
  } = useTransactions();

  //
  // Methods

  function getTotal () {
    const amounts = transactions.map((transaction) => transaction.Amount);
    return amounts.reduce((a, b) => parseFloat(a) + parseFloat(b));
  }

  //
  // Render

  if (isLoading) {
    return (
      <CircularProgress className="transactions-table--loading" size={ 100 } />
    );
  }

  if (error) {
    return (
      <div>
        { `Unable to load transactions, error: ${ error.message }` }
      </div>
    );
  }

  return (
    <TableContainer component={ Paper }>
      <Table aria-label="transactions table" className="transactions-table">
        <TableHead className="transactions-table__header">
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>{ `$${ getTotal() }` }</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="transactions-table__body">
          { transactions.map((row, index) => (
            <TableRow key={ `${ row.Company }-${ index }` }>
              <TableCell className="transactions-table__muted-cell">{ row.Date }</TableCell>
              <TableCell>{ row.Company }</TableCell>
              <TableCell className="transactions-table__muted-cell">{ row.Ledger }</TableCell>
              <TableCell className={ classnames({ 'transactions-table__credit-cell': row.Amount > 0 }) }>
                { row.Amount }
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Exports
// -------

export default TransactionsTable;
