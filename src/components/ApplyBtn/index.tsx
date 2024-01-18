import { Button } from '@mui/material';

interface ApplyBtnProp {
  status: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function ApplyBtn({ status, onClick }: ApplyBtnProp) {
  if (status === '대여가능') {
    return (
      <Button sx={{ borderRadius: 10, width: 250, backgroundColor: 'black', color: 'white' }} onClick={onClick}>
        대여 신청하기
      </Button>
    );
  }
  if (status === '대여불가능') {
    return (
      <Button disabled sx={{ borderRadius: 10, width: 250, backgroundColor: 'red', color: 'white' }}>
        대여가 불가능한 옷이에요
      </Button>
    );
  }
  if (status === '대여중') {
    return (
      <Button disabled sx={{ borderRadius: 10, width: 250, backgroundColor: 'orange', color: 'white' }}>
        지금 대여 중인 옷이에요
      </Button>
    );
  }
  return null;
}
