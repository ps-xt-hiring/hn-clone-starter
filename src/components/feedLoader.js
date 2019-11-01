import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core/';
import Header from './header';

const FeedLoader = () => (
  <Container maxWidth="lg">
    <Header />
    <Table aria-label="news list table" className="newsList">
      <TableBody>
        <TableRow className="emptyTableRow" />
        {[...Array(20).keys()].map(value => (
          <TableRow key={value} height={20}>
            <TableCell />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

export default FeedLoader;
