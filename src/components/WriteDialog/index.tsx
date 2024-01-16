import { useState } from 'react';
import { Box, Dialog, DialogActions, DialogTitle, TextField, Typography } from '@mui/material';

import CancelSubmitBtns from '../CancelSubmitBtn';

interface WriteDialogProps {
  message: string;
  placeholder: string;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const WriteDialog: React.FC<WriteDialogProps> = ({ message, placeholder, handleSubmit, handleCancel, isOpen }) => {
  const [, setText] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };
  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '30px',
        },
      }}
    >
      <DialogTitle sx={{ mt: '5px' }}>
        <Typography fontSize={20} fontWeight={'bold'}>
          {message}
        </Typography>
      </DialogTitle>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginInline: '24px',
        }}
      >
        <TextField
          id="text"
          name="text"
          type="text"
          multiline
          rows={10}
          fullWidth
          placeholder={placeholder}
          onChange={handleChange}
          sx={{ backgroundColor: 'white', borderRadius: 1 }}
        />
      </Box>
      <DialogActions
        sx={{
          paddingBlock: '16px',
          paddingRight: '24px',
        }}
      >
        <CancelSubmitBtns handleSubmit={handleSubmit} handleCancel={handleCancel} submitBtnText="등록" />
      </DialogActions>
    </Dialog>
  );
};

export default WriteDialog;
