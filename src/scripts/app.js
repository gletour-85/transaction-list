import '../styles/app.scss';

import {
  AppBar,
  Container,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@material-ui/core';
import React from 'react';
import TransactionsTable from './components/transactions-table';

// Internal
// --------

function App () {
  return (
    <React.Fragment>
      <CssBaseline />
      <Slide appear={ false } direction="down" in={ !useScrollTrigger() }>
        <AppBar className="page-header">
          <Toolbar className="page-header">
            <Typography className="text--centered" variant="h5">Bench Test</Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Container className="main" component="main" role="main">
        <TransactionsTable />
      </Container>
    </React.Fragment>
  );
}

// Exports
// -------

export default App;
