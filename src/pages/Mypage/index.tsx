import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { userAtom } from '../../recoil/atom';

export default function MyPage() {
  const navigate = useNavigate();

  const userState = useRecoilValue(userAtom);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} justifyContent="center">
        <Box sx={{ width: '100%', bgcolor: '#E6E6E6' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 10, mt: 5 }}>
            <Typography variant="h3" sx={{ p: 2, fontWeight: 'bold' }}>
              마이페이지
            </Typography>
            <Button
              sx={{
                mt: 3,
                color: 'black',
                fontSize: 15,
              }}
              onClick={() => handleNavClick('/profile')}
            >
              내 정보 수정하기
            </Button>
          </Box>
          <Typography variant="body1" sx={{ ml: 12, fontweight: 'bold' }}>
            {userState.nickname}님의 대여 내역을 확인할 수 있습니다.
          </Typography>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Button
              sx={{
                mb: 2,
                mr: 8,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
              onClick={() => handleNavClick('/mycloset')}
            >
              내 옷장
            </Button>
            <Button
              sx={{
                mb: 2,
                mr: 8,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
              onClick={() => handleNavClick('/myapplys')}
            >
              대여 신청 내역
            </Button>
            <Button
              sx={{
                mb: 2,
                mr: 8,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
              onClick={() => handleNavClick('/mylends')}
            >
              대여 내역
            </Button>
            <Button
              sx={{
                mb: 2,
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
              }}
              onClick={() => handleNavClick('/mywishes')}
            >
              찜한 옷
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'white', padding: 2 }}>
          <Typography variant="h3" sx={{ p: 2, fontWeight: 'bold' }}>
            마이페이지
          </Typography>
        </Box>
      </Box>
    </>
  );
}
