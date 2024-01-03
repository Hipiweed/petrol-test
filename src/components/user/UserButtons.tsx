import React from 'react';
import Button from '@mui/material/Button';

interface UserButtonsProps {
  handleUpdate: (userId: number | undefined, localUser) => void;
  handleDelete: (userId: number) => void;
  handleBack: () => void;
  userId: number | undefined;
  userDetails: {
    id: number;
  };
}

function UserButtons({
  handleUpdate,
  handleDelete,
  handleBack,
  userId,
  userDetails,
}: UserButtonsProps) {
  return (
    <div className="grid gap-2">
      <Button
        variant="outlined"
        color="success"
        onClick={() => handleUpdate(userId, userDetails)}
      >
        Save Changes
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleDelete(userId)}
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
  );
}

export default UserButtons;
