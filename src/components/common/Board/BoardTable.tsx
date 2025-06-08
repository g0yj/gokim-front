import { BoardTableProps } from '@/types/common/board';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';


import React, { cloneElement } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'center',
  },
}));

const BoardTable = <T extends Record<string, unknown>>({
  columns,
  rows,
  getRowKey,
  getRowLink,
}: BoardTableProps<T>) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map((col) => (
                <StyledTableCell
                  key={String(col.key)}
                  style={{width: col.width}}
                  align={col.align ?? 'center'}
                >
                  {col.label}
                </StyledTableCell>
              ))
            
            }
          </TableRow>
        </TableHead>

        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardTable;