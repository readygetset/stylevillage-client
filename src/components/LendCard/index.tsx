import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Typography, Box, Chip, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import WriteDialog from '../WriteDialog';
import ConfirmDialog from '../ConfirmDialog';
import { deleteReviewAPICall, modifyReviewAPICall } from '../../hooks/api/review/review';

interface LendInfo {
  lendId: number;
  clothesId?: number;
  clothesName?: string;
  clothesImage?: string;
  price: number;
  startDate: string;
  endDate: string;
  lenderName?: string;
  lenderNickName?: string;
  loaneeName?: string;
  loaneeNickName?: string;
  review?: string;
}

interface LendCardProps {
  isLoanee: boolean;
  lendInfo: LendInfo;
}

interface TitleProps {
  title: string;
}
function Title(props: TitleProps) {
  return (
    <Typography
      sx={{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        width: '64px',
        minWidth: '64px',
        mr: 2,
      }}
    >
      {props.title}
    </Typography>
  );
}

export default function LendCard(props: LendCardProps) {
  const { isLoanee } = props;
  const {
    lendId,
    clothesId,
    clothesName,
    clothesImage,
    price,
    startDate,
    endDate,
    lenderName,
    lenderNickName,
    loaneeName,
    loaneeNickName,
    review,
  } = props.lendInfo;
  const startDateString = `${startDate.substring(0, 4)}.${startDate.substring(5, 7)}.${startDate.substring(8, 10)}`;
  const endDateString = `${endDate.substring(0, 4)}.${endDate.substring(5, 7)}.${endDate.substring(8, 10)}`;

  const token = sessionStorage.getItem('accessToken') ?? '';
  const [writeDialogIsOpen, setWriteDialogIsOpen] = useState(false);
  const [ConfirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);

  // 리뷰 작성/수정/삭제 클릭
  const handleClickCreate = () => {
    setWriteDialogIsOpen(true);
  };
  const handleClickModify = () => {
    setWriteDialogIsOpen(true);
  };
  const handleClickDelete = () => {
    setConfirmDialogIsOpen(true);
  };

  // ConfirmDialog (리뷰 삭제) 확인/취소
  const handleConfirmSubmit = () => {
    deleteReviewAPICall({ lendId, token });
    setConfirmDialogIsOpen(false);
  };
  const handleConfirmCancel = () => {
    setConfirmDialogIsOpen(false);
  };

  // WriteDialog (리뷰 작성/수정) 확인/취소
  const handleWriteSubmit = (text: string) => {
    modifyReviewAPICall({ lendId, text, token });
    setWriteDialogIsOpen(false);
  };
  const handleWriteCancel = () => {
    setWriteDialogIsOpen(false);
  };

  let reviewContent = <Chip icon={<AddCircleIcon />} label="리뷰 작성하기" size="small" onClick={handleClickCreate} />;
  if (review && isLoanee)
    reviewContent = (
      <>
        <Typography sx={{ mr: '5px' }}>내가 작성한 리뷰: {review}</Typography>
        <Chip label="수정" size="small" onClick={handleClickModify} sx={{ mr: '3px' }} />
        <Chip label="삭제" size="small" onClick={handleClickDelete} />
      </>
    );
  if (review && !isLoanee)
    reviewContent = (
      <Typography>
        {loaneeNickName || loaneeName}: {review}
      </Typography>
    );
  if (!review && !isLoanee)
    reviewContent = <Typography sx={{ color: 'gray' }}>아직 리뷰가 작성되지 않았어요</Typography>;

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        sx={{
          width: '100%',
          minHeight: '200px',
          maxHeight: 'none',
          border: 'none',
          padding: 3,
          overflow: 'hidden',
          color: 'black',
        }}
      >
        <Box sx={{ height: '150px', width: '150px', zIndex: 2 }}>
          {clothesImage ? (
            <Box
              component="img"
              sx={{
                height: '150px',
                width: '150px',
                borderRadius: 10,
              }}
              src={clothesImage}
            ></Box>
          ) : (
            <Box
              sx={{
                backgroundColor: '#D9D9D9',
                width: '150px',
                height: '150px',
                borderRadius: 10,
              }}
            ></Box>
          )}
        </Box>
        <Box sx={{ ml: 3, zIndex: 2 }}>
          <Box display={'flex'} flexDirection={'row'} sx={{ mb: 1 }}>
            <Typography
              component={Link}
              to={clothesId ? `/clothes/${clothesId}` : `/lend`}
              sx={{
                fontSize: 23,
                fontWeight: 'bold',
                color: clothesName ? 'black' : 'gray',
                textDecoration: 'none',
                mr: 1.5,
                whiteSpace: 'nowrap',
              }}
            >
              {clothesName || '삭제된 옷이에요'}
            </Typography>
          </Box>
          <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="대여 기간" />
              <Typography sx={{ whiteSpace: 'nowrap' }}>
                {startDateString} - {endDateString}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="거래자" />
              <Typography sx={{ whiteSpace: 'nowrap' }}>
                {lenderNickName || lenderName || '알 수 없음'} → {loaneeNickName || loaneeName || '알 수 없음'}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="가격" />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{price}원/일</Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <Title title="리뷰" />
              {reviewContent}
            </Box>
          </Grid>
        </Box>
      </Box>
      <WriteDialog
        message={`${clothesName}에 대한 리뷰를 작성해 주세요`}
        placeholder={'옷의 상태, 색상 등에 대해 작성해 주세요.'}
        defaultValue={review}
        handleSubmit={handleWriteSubmit}
        handleCancel={handleWriteCancel}
        isOpen={writeDialogIsOpen}
      />
      <ConfirmDialog
        message={'정말 삭제하시겠습니까?'}
        handleSubmit={handleConfirmSubmit}
        handleCancel={handleConfirmCancel}
        isOpen={ConfirmDialogIsOpen}
      />
    </>
  );
}
