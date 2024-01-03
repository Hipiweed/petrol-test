'use client';
import React, { useEffect, useState } from 'react';
import UserTable from '@/components/user/UserTable';
import { getUsers } from '@/api/apiUsers'; // Import the getUsers function
import { User } from '@/types/User';

function Users() {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();
        setUserData(users?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  return <UserTable userData={userData} />;
}

export default Users;
