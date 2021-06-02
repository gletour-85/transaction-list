import React from 'react';
import renderer from 'react-test-renderer';
import TransactionsTable from './transactions-table';

import mocked_useTransactions from '../hooks/use-transactions';

// Mocks
// -----

jest.mock('@material-ui/core', () => ({
  CircularProgress: 'CircularProgress',
  Paper: 'Paper',
  Table: 'Table',
  TableBody: 'TableBody',
  TableCell: 'TableCell',
  TableContainer: 'TableContainer',
  TableHead: 'TableHead',
  TableRow: 'TableRow'
}));
jest.mock('../hooks/use-transactions');

// Setup
// -----

function getComponent() {
  return renderer.create(<TransactionsTable />);
}

// Tests
// -----

describe('TransactionsTable', () => {
  let component;

  describe('rendering', () => {
    describe('when transactions are loading', () => {
      beforeEach(() => {
        mocked_useTransactions.mockReturnValue({
          isLoading: true
        });

        component = getComponent();
      });

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });
    });

    describe('when transactions failed to load', () => {
      beforeEach(() => {
        mocked_useTransactions.mockReturnValue({
          error: { message: 'request has timed out' },
          isLoading: false
        });

        component = getComponent();
      });

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });
    });

    describe('when transactions have loaded', () => {
      beforeEach(() => {
        mocked_useTransactions.mockReturnValue({
          isLoading: false,
          transactions: [
            { Date: '2021-05-23', Company: 'mock-company-1', Ledger: 'mock-debit-1', Amount: '-5.00' },
            { Date: '2021-05-24', Company: 'mock-company-2', Ledger: 'mock-debit-2', Amount: '-10.25' },
            { Date: '2021-05-25', Company: 'mock-company-3', Ledger: 'mock-credit-1', Amount: '5.00' },
            { Date: '2021-05-26', Company: 'mock-company-4', Ledger: 'mock-credit-2', Amount: '20.50' }
          ]
        });

        component = getComponent();
      });

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });
    });
  });
});
