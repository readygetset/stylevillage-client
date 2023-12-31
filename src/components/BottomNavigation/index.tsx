/**
 * 아이콘 목록은 아래 링크에서 확인 가능.
 * 버튼 누르면 바로 복사해서 사용할 수 있음.
 * https://mui.com/material-ui/material-icons/
 */

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '10%' }}>
      <BottomNavigation showLabels sx={{ height: '100%', backgroundColor: 'aliceblue' }}>
        <BottomNavigationAction label="내 정보" icon={<FormatListBulletedIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction label="유저 추기" icon={<AccountCircleIcon />} onClick={() => navigate('/register')} />
        <BottomNavigationAction label="설정" icon={<SettingsIcon />} onClick={() => navigate('/settings')} />
      </BottomNavigation>
    </Box>
  );
}
