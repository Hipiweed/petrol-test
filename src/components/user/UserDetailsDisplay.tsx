import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';

interface UserDetailsDisplayProps {
  userDetails: {
    avatar: string;
  };
  localUser: {
    email: string;
    first_name: string;
    last_name: string;
  };
  handleEdit: () => void;
}

function UserDetailsDisplay({
  userDetails,
  localUser,
  handleEdit,
}: UserDetailsDisplayProps) {
  return (
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
  );
}

export default UserDetailsDisplay;
