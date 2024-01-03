import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled, createTheme } from '@mui/material/styles';
import TableRow from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const theme = createTheme({
  components: {
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'inherit',
            '&& $icon': {
              opacity: 1,
            },
          },
          '&.Mui-active': {
            color: 'inherit',
            '&& $icon': {
              color: 'inherit',
            },
          },
          '&:focus': {
            color: 'inherit',
          },
        },
      },
    },
  },
});
