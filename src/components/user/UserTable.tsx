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
import { User } from '@/types/User';
import FlipMove from 'react-flip-move';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

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
    id: number | null;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
}

function UserTable({ userData }: UserTableProps) {
  const router = useRouter();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [sortedData, setSortedData] = useState<User[]>(userData ?? []);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);

    const sorted = [...sortedData].sort((a, b) => {
      const fieldA = String(a[field as keyof User]).toLowerCase();
      const fieldB = String(b[field as keyof User]).toLowerCase();

      if (fieldA < fieldB) return isAsc ? 1 : -1;
      if (fieldA > fieldB) return isAsc ? -1 : 1;
      return 0;
    });

    setSortedData(sorted);
  };

  const handleRowClick = (rowId: number | null) => {
    router.push(`/users/${rowId}`);
  };
  const handleCreateUser = () => {
    router.push(`/users/create`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSortedData(userData ?? []);
  }, [userData]);

  useEffect(() => {
    const filteredData = userData?.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSortedData(filteredData);
  }, [searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <div className="p-3">
        <div className="lg:col-span-2 col-span-6 bg-white w-full p-4 rounded shadow">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <input
              type="text"
              placeholder="Search for users..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded mb-2 md:mb-0"
            />
            <Button
              variant="outlined"
              onClick={handleCreateUser}
              className="w-full md:w-auto"
            >
              Create User
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
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
                  <StyledTableCell className="hidden md:table-cell">
                    <TableSortLabel
                      direction={orderBy === 'first_name' ? order : 'asc'}
                      onClick={() => handleSort('first_name')}
                    >
                      First Name
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell className="hidden md:table-cell">
                    <TableSortLabel
                      direction={orderBy === 'last_name' ? order : 'asc'}
                      onClick={() => handleSort('last_name')}
                    >
                      Last Name
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell className="hidden md:table-cell">
                    Avatar
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <FlipMove typeName={null} duration={500} easing="ease-in">
                  {sortedData?.map((row) => (
                    <StyledTableRow
                      className="cursor-pointer"
                      onClick={() => handleRowClick(row.id)}
                      key={row.id}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell className="hidden md:table-cell">
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell className="hidden md:table-cell">
                        {row.last_name}
                      </StyledTableCell>
                      <StyledTableCell className="hidden md:table-cell">
                        <Image
                          src={row.avatar}
                          width={40}
                          height={40}
                          alt="user avatar"
                        ></Image>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </FlipMove>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UserTable;
