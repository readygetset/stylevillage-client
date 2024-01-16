import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { userAtom } from '../../recoil/atom';

interface DescriptionProps {
  description: string;
}

export function MyPageHeader({ description }: DescriptionProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const userState = useRecoilValue(userAtom);
  if (!userState) {
    const setUserState = useSetRecoilState(userAtom);
    setUserState({ id: 3, nickname: 'hi' });
  }
  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/mypage/closet':
        setSelectedTab(0);
        break;
      case '/mypage/lend/lending':
        setSelectedTab(1);
        break;
      case '/mypage/lend/lent':
        setSelectedTab(2);
        break;
      case '/mypage/wish':
        setSelectedTab(3);
        break;
      default:
        setSelectedTab(0);
    }
  }, [location.pathname]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{
        width: '100%',
        height: '40%',
        backgroundColor: '#D9D9D94D',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: '4vw 0 0 5vw' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            mb: 1,
            fontSize: '2.2rem',
            fontWeight: 'bold',
          }}
        >
          마이페이지
        </Typography>

        <Typography
          component={Link}
          to="/register"
          sx={{
            color: 'black',
            textDecoration: 'none',
            fontSize: '1.0rem',
            fontWeight: 'bold',
            margin: '0.7vw 0 0 1.5vw',
          }}
        >
          내 정보 수정하기
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'left'}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontSize: '1.0rem',
            fontWeight: 'bold',
            marginLeft: '5vw',
            marginBottom: '2vw',
            color: '#7F7F7F',
          }}
        >
          {userState.nickname}
          {description}
        </Typography>

        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          aria-label="토글 버튼 그룹"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'bottom',
            '& .MuiToggleButton-root': {
              border: 'none',
              margin: '0 10vw',
              borderRadius: '2vw !important',
              fontSize: '1.2vw',
              fontWeight: 'bold',
              height: '2.5vw',
              outline: 'none !important',
              '&:hover': {
                borderRadius: '2vw',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&.Mui-selected': {
                outline: 'none !important',
              },
            },
          }}
        >
          <ToggleButton
            component={Link}
            to="/mypage/closet"
            disabled={selectedTab === 0}
            value={0}
            aria-label="내 옷장"
          >
            내 옷장
          </ToggleButton>
          <ToggleButton
            component={Link}
            to="/mypage/lend/lending"
            disabled={selectedTab === 1}
            value={1}
            aria-label="대여 신청 내역"
          >
            대여 신청 내역
          </ToggleButton>
          <ToggleButton
            component={Link}
            to="/mypage/lend/lent"
            disabled={selectedTab === 2}
            value={2}
            aria-label="대여 내역"
          >
            대여 내역
          </ToggleButton>
          <ToggleButton component={Link} to="/mypage/wish" disabled={selectedTab === 3} value={3} aria-label="찜한 옷">
            찜한 옷
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
