/**
 * 아이콘 목록은 아래 링크에서 확인 가능.
 * 버튼 누르면 바로 복사해서 사용할 수 있음.
 * https://mui.com/material-ui/material-icons/
 */

import { Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ width: '100%', height: '10%', borderBottom: 1, borderColor: 'black', bgcolor: 'white' }}>
      <Typography variant="h4" sx={{ padding: 1.5, paddingLeft: 3, fontWeight: 'bold' }}>
        StyleVillage
      </Typography>
    </Box>
  );
}
