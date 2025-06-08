import { BoardTableProps } from '@/types/common/board';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';


import { Link } from 'react-router-dom';

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
          {
            rows.map((row, index) => (
              <TableRow
                key={getRowKey(row)}
                hover
                component={getRowLink ? Link : 'tr'}
                to={getRowLink ? getRowLink(row): undefined}
                style={{
                  cursor: getRowLink ? 'pointer' : undefined,
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                {
                  columns.map((col) => (
                    <StyledTableCell key={String(col.key)} align={col.align ?? 'center'}>
                    {col.render
                      ? col.render(row[col.key as keyof T], row, index)
                      : String(row[col.key as keyof T] ?? '')}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardTable;