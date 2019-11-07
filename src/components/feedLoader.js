import React from 'react';
import {
  Container, Table, TableBody, TableRow,
} from '@material-ui/core/';
import Header from './header';
import EmptyTableCells from './emptyTableCells';

const FeedLoader = () => (
  <Container maxWidth="lg">
    <Header />
    <Table aria-label="news list table" className="news-list">
      <TableBody>
        <TableRow className="empty-table-row" />
        <EmptyTableCells />
      </TableBody>
    </Table>
  </Container>
);

export default FeedLoader;
