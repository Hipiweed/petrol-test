'use client';
import React, { useState, useEffect } from 'react';
import UserForm from '@/components/user/UserTable';
import UserButtons from '@/components/user/UserButtons';
import UserDetailsDisplay from '@/components/user/UserDetailsDisplay';
import { Alert } from '@mui/material';
import Image from 'next/image';
import FlipMove from 'react-flip-move';
import Snackbar from '@mui/material/Snackbar';
import { deleteUser, updateUser, createUser } from '@/api/apiUsers';
import { useRouter } from 'next/navigation';

interface UserDetailsProps {
  userDetails: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  updateUser: (updatedUser: typeof user) => void;
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [localUser, setLocalUser] = useState(userDetails);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (userDetails?.id == null) setEditing(true);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUser({ ...localUser, [event.target.name]: event.target.value });
  };

  const handleEdit = () => {
    setLocalUser(userDetails);
    setEditing(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleDelete = async (userId: number) => {
    try {
      const user = await deleteUser(userId);
      if (user === '') {
        setSnackbarOpen(true);
        setSnackbarMessage('User deleted successfully');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdate = async (userId: number | undefined, localUser) => {
    try {
      setEditing(false);
      let user;
      if (userId) user = await updateUser(userId, localUser);
      if (!userId) user = await createUser(localUser);
      if (user) {
        setLocalUser(user);
        setSnackbarOpen(true);
        if (userId) setSnackbarMessage('User updated successfully');
        if (!userId) {
          setSnackbarMessage('User created successfully');
          setTimeout(() => {
            router.push(`/users`);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleBack = () => {
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <h2 className="text-gray-800 text-2xl font-semibold">User Details</h2>
          <FlipMove>
            {editing ? (
              <div key="edit-mode" className="space-y-5 pb-2">
                {userDetails?.avatar && userDetails?.avatar !== '' && (
                  <div className="rounded-full overflow-hidden w-40 h-40 mx-auto">
                    <Image
                      src={userDetails?.avatar}
                      width={200}
                      height={200}
                      alt="user avatar"
                    ></Image>
                  </div>
                )}
                <UserForm
                  user={localUser}
                  handleInputChange={handleInputChange}
                />
                <UserButtons
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  handleBack={handleBack}
                  userId={localUser.id}
                  userDetails={userDetails}
                />
              </div>
            ) : (
              <UserDetailsDisplay
                userDetails={userDetails}
                localUser={localUser}
                handleEdit={handleEdit}
              />
            )}
          </FlipMove>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserDetails;
