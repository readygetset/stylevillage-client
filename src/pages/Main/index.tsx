import { Box, Typography } from '@mui/material';

import SearchBar from '../../components/SearchBar';

export function MainPage() {
  return (
    <Box sx={{ marginTop: 0, backgroundColor: '#E9E9E9' }}>
      <Box paddingTop={5} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
          StyleVillage
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'semi-bold', marginBottom: 2 }}>
          스타일을 공유하고 다른 사람의 스타일을 빌려보세요
        </Typography>
      </Box>
      <SearchBar searchKeyWord={''} categorySelected={[]} seasonSelected={[]} />
    </Box>
  );
}
