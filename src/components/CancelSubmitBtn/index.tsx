import { Button, Stack } from '@mui/material';

interface CancelSubmitBtnsProps {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  submitBtnText?: string;
  cancelBtnText?: string;
}

const CancelSubmitBtns: React.FC<CancelSubmitBtnsProps> = ({
  handleSubmit,
  handleCancel,
  submitBtnText = '확인',
  cancelBtnText = '취소',
}: CancelSubmitBtnsProps) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: 10, color: 'white', backgroundColor: 'black', borderRadius: 10 }}
      >
        {submitBtnText}
      </Button>
      <Button
        variant="outlined"
        sx={{ width: 10, color: 'black', borderColor: 'black', borderRadius: 10 }}
        onClick={handleCancel}
      >
        {cancelBtnText}
      </Button>
    </Stack>
  );
};

export default CancelSubmitBtns;
