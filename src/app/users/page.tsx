'use client';
import React, { useEffect, useState } from 'react';
import UserTable from '@/components/user/UserTable';
import { getUsers } from '@/api/apiUsers'; // Import the getUsers function

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();
        setUserData(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  return <UserTable userData={userData?.data} />;
}

export default Users;
