import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ConfirmDialog from '../ConfirmDialog';

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('accessToken');
  const userNickname = sessionStorage.getItem('userNickname');

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.removeItem('accessToken');
    setIsOpen(false);
    navigate('/');
  };
  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/profile');
  };
  const handleMyPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/mypage/closet');
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          height: '70px',
          borderBottom: 1,
          borderColor: 'black',
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          component={Link}
          to="/"
          variant="h4"
          sx={{ paddingLeft: 3, fontWeight: 'bold', color: 'black', textDecoration: 'none' }}
        >
          StyleVillage
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ mr: 0.5 }} />
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', mr: 2 }}>{userNickname} 님</Typography>
            <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} onClick={handleMyPage}>
              마이페이지
            </Button>
            <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} onClick={handleProfile}>
              프로필
            </Button>
            <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} onClick={() => setIsOpen(true)}>
              로그아웃
            </Button>
          </Box>
        ) : (
          <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} component={Link} to="/login">
            로그인
          </Button>
        )}
      </Box>
      <ConfirmDialog
        message="정말 로그아웃하시겠습니까?"
        handleSubmit={handleLogout}
        handleCancel={handleCancel}
        isOpen={isOpen}
      />
    </>
  );
}
