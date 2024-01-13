import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ width: '100%', height: '8%', borderBottom: 1, borderColor: 'black', bgcolor: 'white', marginTop: 1 }}>
      <Typography
        component={Link}
        to="/"
        variant="h4"
        sx={{ paddingLeft: 3, fontWeight: 'bold', color: 'black', textDecoration: 'none' }}
      >
        StyleVillage
      </Typography>
      <Button component={Link} to="/login">
        로그인
      </Button>
    </Box>
  );
}
