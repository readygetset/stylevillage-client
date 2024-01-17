import { Box, Typography } from '@mui/material';

import SearchBar from '../../components/SearchBar';
import LendCard from '../../components/LendCard';

interface LendInfo {
  lendId: number;
  clothesId: number;
  clothesName: string;
  clothesImage: string;
  price: number;
  startDate: Date;
  endDate: Date;
  lenderName: string;
  lenderNickName?: string;
  loaneeName: string;
  loaneeNickName?: string;
  review?: string;
}

const lendInfo: LendInfo = {
  lendId: 1,
  clothesId: 1,
  clothesName: '옷옷옷',
  clothesImage: 'https://cdn.pixabay.com/photo/2015/06/10/13/23/clothesline-804812_1280.jpg',
  price: 10000,
  startDate: new Date(2024, 0, 1),
  endDate: new Date(2024, 1, 2),
  lenderName: 'lender',
  lenderNickName: '감자',
  loaneeName: 'loaneetest',
  // review:
  //   '리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 ',
};

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
      <LendCard isLoanee={true} lendInfo={lendInfo} />
      <SearchBar searchKeyWord={''} categorySelected={[]} seasonSelected={[]} />
    </Box>
  );
}
