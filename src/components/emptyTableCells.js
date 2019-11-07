import React from 'react';
import { TableCell, TableRow } from '@material-ui/core/';

const EmptyTableCells = () => [...Array(20).keys()].map(value => (
  <TableRow key={value} height={20}>
    <TableCell />
  </TableRow>
));

export default EmptyTableCells;
