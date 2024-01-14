import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

export function MyPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<object>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const commentContents = [
    '님의 옷장을 관리할 수 있어요',
    '님의 대여 신청 내역을 확인할 수 있어요',
    '님의 대여 내역을 확인할 수 있어요',
    '님이 찜한 옷이에요',
  ];

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{
        width: '100%',
        height: '40%',
        backgroundColor: 'gainsboro',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: '70px 0 0 70px' }}>
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
            fontSize: '0.9rem',
            margin: '15px 0 0 25px',
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
            marginLeft: '70px',
            marginBottom: '40px',
            color: 'gray',
          }}
        >
          {commentContents[selectedTab]}
        </Typography>

        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          onChange={handleChange}
          aria-label="토글 버튼 그룹"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'bottom',
            '& .MuiToggleButton-root': {
              border: 'none',
              margin: '0 8vw',
              borderRadius: '2vw !important',
              fontSize: '1.3vw',
              fontWeight: 'bold',
              '&:hover': {
                borderRadius: '2vw',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        >
          <ToggleButton disabled={selectedTab === 0} value={0} aria-label="내 옷장">
            내 옷장
          </ToggleButton>
          <ToggleButton disabled={selectedTab === 1} value={1} aria-label="대여 신청 내역">
            대여 신청 내역
          </ToggleButton>
          <ToggleButton disabled={selectedTab === 2} value={2} aria-label="대여 내역">
            대여 내역
          </ToggleButton>
          <ToggleButton disabled={selectedTab === 3} value={3} aria-label="찜한 옷">
            찜한 옷
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
