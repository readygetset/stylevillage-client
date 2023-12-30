/**
 * 아이콘 목록은 아래 링크에서 확인 가능.
 * 버튼 누르면 바로 복사해서 사용할 수 있음.
 * https://mui.com/material-ui/material-icons/
 */

import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function BottomNav() {
  return (
    <Box sx={{ width: '100%', height: '10%' }}>
      <BottomNavigation showLabels sx={{ height: '100%', backgroundColor: 'aliceblue' }}>
        <BottomNavigationAction label="목록" icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction label="대화" icon={<ChatBubbleOutlineIcon />} />
        <BottomNavigationAction label="내 정보" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
}
