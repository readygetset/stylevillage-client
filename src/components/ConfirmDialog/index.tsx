import { Box, Dialog, Typography } from '@mui/material';

import CancelSubmitBtns from '../CancelSubmitBtn';

interface ConfirmDialogProps {
  message: string;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, handleSubmit, handleCancel, isOpen }) => {
  return (
    <Dialog open={isOpen}>
      <Box textAlign="center" sx={{ mt: 3, mb: 3, ml: 5, mr: 5 }}>
        <Typography fontSize={15} fontWeight={'bold'} marginBottom={2}>
          {message}
        </Typography>
        <CancelSubmitBtns handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
