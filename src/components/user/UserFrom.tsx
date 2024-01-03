import React from 'react';
import TextField from '@mui/material/TextField';

interface UserFormProps {
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserForm({ user, handleInputChange }: UserFormProps) {
  return (
    <>
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        label="First Name"
        name="first_name"
        value={user.first_name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        label="Last Name"
        name="last_name"
        value={user.last_name}
        onChange={handleInputChange}
      />
    </>
  );
}

export default UserForm;
