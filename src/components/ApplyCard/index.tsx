import { Link } from 'react-router-dom';
import { Typography, Box, Chip } from '@mui/material';

interface ApplyInfo {
  clothesId?: number;
  clothesName?: string;
  clothesImage?: string;
  ownerId?: number;
  ownerName?: string;
  ownerNickName?: string;
  isAccepted: boolean;
  isRejected: boolean;
  detail?: string;
}

interface ApplyCardProps {
  applyInfo: ApplyInfo;
}

export default function ApplyCard(props: ApplyCardProps) {
  const { clothesId, clothesName, clothesImage, ownerId, ownerName, ownerNickName, isAccepted, isRejected, detail } =
    props.applyInfo;

  let statusBox = <Chip sx={{ overflow: 'static' }} label="대기중" color="default" />;
  if (isAccepted) statusBox = <Chip sx={{ overflow: 'static' }} label="승인됨" color="success" />;
  if (isRejected) statusBox = <Chip label="거절됨" color="error" />;

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        sx={{
          width: '100%',
          minHeight: '200px',
          border: 'none',
          padding: 3,
          overflow: 'hidden',
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
        <Box sx={{ minHeight: '150px', ml: 3, overflow: 'hidden', zIndex: 2 }}>
          <Box display={'flex'} flexDirection={'row'} sx={{ mb: 1 }}>
            <Typography
              component={Link}
              to={clothesId ? `/clothes/${clothesId}` : '/apply'}
              sx={{
                fontSize: 25,
                fontWeight: 'bold',
                color: clothesName ? 'black' : 'gray',
                textDecoration: 'none',
                mr: 1.5,
                whiteSpace: 'nowrap',
              }}
            >
              {clothesName || '삭제된 옷이에요'}
            </Typography>
            <Typography
              component={Link}
              to={ownerId ? `/user/${ownerId}` : '/apply'}
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
              sx={{
                fontSize: 17,
                color: 'black',
                textDecoration: 'none',
                minHeight: '60px',
                mb: 1.5,
              }}
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
