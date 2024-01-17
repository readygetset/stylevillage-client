import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Dialog, TextField, Typography } from '@mui/material';

import CancelSubmitBtns from '../CancelSubmitBtn';
import { Lend, acceptApplyAPICall } from '../../hooks/api/apply/apply';

interface CreateLendDialogProps {
  applyId?: number;
  clothesId?: number;
  loaneeId?: number;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}
const CreateLendDialog: React.FC<CreateLendDialogProps> = ({ applyId, clothesId, loaneeId, handleCancel, isOpen }) => {
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [lend, setLend] = useState<Lend>({
    clothes: clothesId,
    lender: Number(sessionStorage.getItem('userId')),
    loanee: loaneeId,
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newLend = {
      ...lend,
      [event.target.name]: event.target.value,
    };
    setLend(newLend);
  };
  const handleStartDateChange = (value: Date | null) => {
    if (value !== null) {
      const newLend = {
        ...lend,
        startDate: value,
      };
      setLend(newLend);
    }
  };
  const handleEndDateChange = (value: Date | null) => {
    if (value !== null) {
      const newLend = {
        ...lend,
        startDate: value,
      };
      setLend(newLend);
    }
  };
  const handleSubmit = () => {
    acceptApplyAPICall({ applyId, lend, token });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <Dialog open={isOpen}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ padding: 3 }}>
        <Typography variant="h6" fontWeight={'bold'}>
          대여 승인을 위해
        </Typography>
        <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 3 }}>
          추가 정보를 입력해주세요
        </Typography>
        <DatePicker
          name="startDate"
          label="대여 시작일"
          slotProps={{ textField: { size: 'small' } }}
          onChange={handleStartDateChange}
          sx={{ mb: 2 }}
        />
        <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          name="endDate"
          label="대여 마감일"
          onChange={handleEndDateChange}
          sx={{ mb: 2 }}
        />
        <TextField
          id="price"
          name="price"
          type="text"
          label="가격"
          size="small"
          fullWidth
          onChange={handleChange}
          sx={{ mb: 2 }}
        ></TextField>
        <CancelSubmitBtns handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </Box>
    </Dialog>
  );
};

export default CreateLendDialog;
