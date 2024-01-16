import { Link } from 'react-router-dom';
import { Typography, Box, Chip } from '@mui/material';

interface ApplyInfo {
  clothesName: string;
  clothesImage: string;
  ownerName: string;
  ownerNickName?: string;
  isAccepted: boolean;
  isRejected: boolean;
  detail: string;
}

interface ApplyCardProps {
  applyInfo: ApplyInfo;
}

export default function ApplyCard(props: ApplyCardProps) {
  const { clothesName, clothesImage, ownerName, ownerNickName, isAccepted, isRejected, detail } = props.applyInfo;

  let statusBox = <Chip label="대기중" color="default" />;
  if (isAccepted) statusBox = <Chip label="승인됨" color="success" />;
  if (isRejected) statusBox = <Chip label="거절됨" color="error" />;

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
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                textDecoration: 'none',
                mr: 1.5,
                whiteSpace: 'nowrap',
              }}
            >
              {clothesName}
            </Typography>
            <Typography
              component={Link}
              to="/" /* TODO 사용자 상세 페이지로 link */
              sx={{ fontSize: 17, color: 'gray', textDecoration: 'none', paddingTop: '11px', whiteSpace: 'nowrap' }}
            >
              {ownerNickName || ownerName}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 'bold',
                color: 'black',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                width: '29.4px',
                mr: 1.5,
              }}
            >
              내용
            </Typography>
            <Typography
              sx={{ fontSize: 17, color: 'black', textDecoration: 'none', height: '60px', mb: 1.5, overflow: 'hidden' }}
            >
              {detail}
            </Typography>
          </Box>
          {statusBox}
        </Box>
      </Box>
    </>
  );
}
