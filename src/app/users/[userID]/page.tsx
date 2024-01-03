'use client';
import UserDetails from '@/components/UserDetails';
import { usePathname } from 'next/navigation';
import { getUser } from '@/api/apiUsers'; // Import the getUser function
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function UserDetailPage() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const pathName = usePathname();
  const emptyUser = {
    id: null,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };

  const getIdFromPath = (path: string) => {
    const pathSegments = path.split('/');
    const pathID = Number(pathSegments[pathSegments.length - 1]);
    if (typeof pathID !== 'number') {
      setUserData(emptyUser);
      return;
    }
    return pathID;
  };

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true); // Start loading
      try {
        const userId = getIdFromPath(pathName);
        const user = await getUser(userId);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchUsers();
  }, []);

  return loading ? (
    <CircularProgress />
  ) : (
    <UserDetails userDetails={userData?.data} />
  );
}

export default UserDetailPage;
