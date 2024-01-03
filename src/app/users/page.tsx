'use client';
import React, { useEffect, useState } from 'react';
import UserTable from '@/components/user/UserTable';
import { getUsers } from '@/api/apiUsers'; // Import the getUsers function
import { User } from '@/types/User';
import CircularProgress from '@mui/material/CircularProgress';

function Users() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false); // New loading state
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true); // Start loading
        const users = await getUsers();
        setUserData(users?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchUsers();
  }, []);

  return loading || !userData ? (
    <div className="flex justify-center">
      <CircularProgress />
    </div>
  ) : (
    <UserTable userData={userData} />
  );
}

export default Users;
