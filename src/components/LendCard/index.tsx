import { Link } from 'react-router-dom';
import { Typography, Box, Chip, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface LendInfo {
  clothesName: string;
  clothesImage: string;
  price: number;
  startDate: Date;
  endDate: Date;
  lenderName: string;
  lenderNickName?: string;
  loaneeName: string;
  loaneeNickName?: string;
  review?: string;
}

interface LendCardProps {
  isLoanee: boolean;
  lendInfo: LendInfo;
  handleClick: () => void;
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
        mr: 2,
      }}
    >
      {props.title}
    </Typography>
  );
}

export default function LendCard(props: LendCardProps) {
  const { isLoanee, handleClick } = props;
  const {
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
  const startDateString = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDay()}`;
  const endDateString = `${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDay()}`;

  const handleClickModify = () => {};
  const handleClickDelete = () => {};
  let reviewContent = <Chip icon={<AddCircleIcon />} label="리뷰 작성하기" size="small" onClick={handleClick} />;
  if (review && isLoanee)
    reviewContent = (
      <>
        <Typography>내가 작성한 리뷰: {review}</Typography>
        <Chip label="수정" size="small" onClick={handleClickModify} />
        <Chip label="삭제" size="small" onClick={handleClickDelete} />
      </>
    );
  if (review && !isLoanee)
    reviewContent = (
      <Typography>
        {loaneeNickName || loaneeName}: {review}
      </Typography>
    );

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        sx={{
          width: '100%',
          height: '200px',
          border: 'none',
          padding: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ height: '150px', width: '150px', zIndex: 2 }}>
          <img src={clothesImage} height="150px" width="150px" />
        </Box>
        <Box sx={{ height: '150px', ml: 3, overflow: 'hidden', zIndex: 2 }}>
          <Box display={'flex'} flexDirection={'row'} sx={{ mb: 1 }}>
            <Typography
              component={Link}
              to="/" /* TODO 옷 상세 페이지로 link */
              sx={{
                fontSize: 23,
                fontWeight: 'bold',
                color: 'black',
                textDecoration: 'none',
                mr: 1.5,
                whiteSpace: 'nowrap',
              }}
            >
              {clothesName}
            </Typography>
          </Box>
          <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="대여 기간" />
              <Typography>
                {startDateString} - {endDateString}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="거래자" />
              <Typography>
                {lenderNickName || lenderName} → {loaneeNickName || loaneeName}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="가격" />
              <Typography>{price}원/일</Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
              <Title title="리뷰" />
              {reviewContent}
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
