'use client';
import { useState, useEffect } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import TableSortLabel from '@mui/material/TableSortLabel';
import { User } from '../types/User';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const theme = createTheme({
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

interface UserTableProps {
  userData: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
}

function UserTable({ userData }: UserTableProps) {
  console.log('userData', userData);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [sortedData, setSortedData] = useState<User[]>(userData ?? []);

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);

    const sorted = [...sortedData].sort((a, b) => {
      const fieldA = String(a[field]).toLowerCase();
      const fieldB = String(b[field]).toLowerCase();

      if (fieldA < fieldB) return isAsc ? 1 : -1;
      if (fieldA > fieldB) return isAsc ? -1 : 1;
      return 0;
    });

    setSortedData(sorted);
  };

  useEffect(() => {
    setSortedData(userData ?? []);
  }, [userData]);

  return (
    <ThemeProvider theme={theme}>
      <div className="p-3">
        <div className="lg:col-span-2 col-span-6 bg-white w-full p-4 rounded shadow">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <TableSortLabel
                      direction={orderBy === 'email' ? order : 'asc'}
                      onClick={() => handleSort('email')}
                    >
                      Email
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TableSortLabel
                      direction={orderBy === 'first_name' ? order : 'asc'}
                      onClick={() => handleSort('first_name')}
                    >
                      First Name
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TableSortLabel
                      direction={orderBy === 'last_name' ? order : 'asc'}
                      onClick={() => handleSort('last_name')}
                    >
                      Last Name
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell>Avatar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData && sortedData.length > 0 ? (
                  sortedData.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell>{row.first_name}</StyledTableCell>
                      <StyledTableCell>{row.last_name}</StyledTableCell>
                      <StyledTableCell>
                        <Image
                          src={row.avatar}
                          width={40}
                          height={40}
                          alt="user avatar"
                        ></Image>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <h1>No data was found</h1>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UserTable;
