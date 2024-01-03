'use client';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import Image from 'next/image';
import FlipMove from 'react-flip-move';
import Snackbar from '@mui/material/Snackbar';
import { deleteUser, updateUser, createUser } from '@/api/apiUsers';
import { useRouter } from 'next/navigation';
import { User } from '@/types/User';

interface UserDetailsProps {
  userDetails: {
    id: number | null;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
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

  const handleDelete = async (userId: number | null) => {
    try {
      if (!userId) throw new Error('User ID is null');
      const user = await deleteUser(userId);
      if (user === '') {
        setSnackbarOpen(true);
        setSnackbarMessage('User deleted successfully');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdate = async (userId: number | null, localUser: User) => {
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
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={localUser?.email}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={localUser?.first_name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={localUser?.last_name}
                  onChange={handleInputChange}
                />
                <div className="grid gap-2">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleUpdate(localUser.id, localUser)}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(localUser.id)}
                    disabled={userDetails?.id == null}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={userDetails?.id == null}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </div>
              </div>
            ) : (
              <div key="non-edit-mode" className="mt-4 grid gap-3 items-center">
                {userDetails?.avatar && userDetails?.avatar !== '' && (
                  <div className="rounded-full overflow-hidden w-40 h-40 mx-auto">
                    <Image
                      src={userDetails?.avatar}
                      width={200}
                      height={200}
                      alt="User Avatar"
                    />
                  </div>
                )}
                <p className="text-gray-700 text-lg">
                  <strong>Email:</strong> {localUser?.email}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>First Name:</strong> {localUser?.first_name}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>Last Name:</strong> {localUser?.last_name}
                </p>
                <Button variant="outlined" onClick={handleEdit}>
                  Edit Details
                </Button>
              </div>
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
