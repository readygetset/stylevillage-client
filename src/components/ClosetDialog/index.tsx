import { useState } from 'react';
import { Box, Dialog, TextField } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';

import CancelSubmitBtns from '../CancelSubmitBtn';

interface ClosetDialogProps {
  submitBtnText?: string;
  handleSubmit: (closetName: string) => void;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const ClosetDialog: React.FC<ClosetDialogProps> = ({ submitBtnText, handleSubmit, handleCancel, isOpen }) => {
  const [closetName, setClosetName] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setClosetName(event.target.value);
  };

  const handleWriteSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleSubmit(closetName);
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="xs"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '30px',
        },
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBlock: '24px',
          marginInline: '40px',
        }}
      >
        <CheckroomIcon fontSize="large" />
        <TextField
          id="text"
          name="text"
          type="text"
          fullWidth
          placeholder="옷장 이름을 입력하세요."
          onChange={handleChange}
          sx={{ backgroundColor: 'white', borderRadius: 1, margin: 3 }}
        />
        <CancelSubmitBtns handleSubmit={handleWriteSubmit} handleCancel={handleCancel} submitBtnText={submitBtnText} />
      </Box>
    </Dialog>
  );
};

export default ClosetDialog;
