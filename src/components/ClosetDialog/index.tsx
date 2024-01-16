import { useState } from 'react';
import { Box, Dialog, TextField } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

import CancelSubmitBtns from '../CancelSubmitBtn';

interface ClosetDialogProps {
  submitBtnText?: string;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const ClosetDialog: React.FC<ClosetDialogProps> = ({ submitBtnText, handleSubmit, handleCancel, isOpen }) => {
  const [, setClosetName] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setClosetName(event.target.value);
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
        <StorefrontIcon fontSize="large" />
        <TextField
          id="text"
          name="text"
          type="text"
          fullWidth
          placeholder="옷장 이름을 입력하세요."
          onChange={handleChange}
          sx={{ backgroundColor: 'white', borderRadius: 1, margin: 3 }}
        />
        <CancelSubmitBtns handleSubmit={handleSubmit} handleCancel={handleCancel} submitBtnText={submitBtnText} />
      </Box>
    </Dialog>
  );
};

export default ClosetDialog;
