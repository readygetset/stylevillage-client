import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('accessToken');
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };
  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/profile');
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '10%',
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
        <Box>
          <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }}>마이페이지</Button>
          <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} onClick={handleProfile}>
            프로필
          </Button>
          <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} onClick={handleLogout}>
            로그아웃
          </Button>
        </Box>
      ) : (
        <Button sx={{ color: 'black', fontSize: 20, fontWeight: 'bold', mr: 2 }} component={Link} to="/login">
          로그인
        </Button>
      )}
    </Box>
  );
}
