import React from 'react';
import { TableCell, TableRow } from '@material-ui/core/';

const EmptyTableCells = () => [...Array(20).keys()].map(value => (
  <TableRow key={value}>
    <TableCell />
  </TableRow>
));

export default EmptyTableCells;
