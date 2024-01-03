'use client';
import UserDetails from '@/components/user/UserDetails';
import { usePathname } from 'next/navigation';
import { getUser } from '@/api/apiUsers'; // Import the getUser function
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { User } from '@/types/User';

function UserDetailPage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // New loading state
  const pathName = usePathname();
  const emptyUser: User = {
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
        if (userId) {
          const user = await getUser(userId);
          setUserData(user.data);
        }
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
  ) : userData ? (
    <UserDetails userDetails={userData} />
  ) : (
    <div>No user data available</div>
  );
}

export default UserDetailPage;
