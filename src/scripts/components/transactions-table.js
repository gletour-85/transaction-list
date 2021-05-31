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
import useTransactions from '../hooks/use-transactions';

// Internal
// --------

function TransactionsTable () {
  const {
    error,
    isLoading,
    transactions
  } = useTransactions();

  if (isLoading) {
    return (
      <CircularProgress />
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
            <TableCell>The Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { transactions.map((row, index) => (
            <TableRow key={ `${ row.Company }-${ index }` }>
              <TableCell>{ row.Date }</TableCell>
              <TableCell>{ row.Company }</TableCell>
              <TableCell>{ row.Ledger }</TableCell>
              <TableCell>{ row.Amount }</TableCell>
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
