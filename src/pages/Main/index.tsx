import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { GetArrivedAppliesResponse, getArriveAppliesAPICall } from '../../hooks/api/apply/apply';
import SearchBar from '../../components/SearchBar';
import LendCard from '../../components/LendCard';
import ArrivedApplyCard from '../../components/ArrivedApplyCard';

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
  clothesId: 9,
  clothesName: '옷옷옷',
  clothesImage: 'https://cdn.pixabay.com/photo/2015/06/10/13/23/clothesline-804812_1280.jpg',
  price: 10000,
  startDate: new Date(2024, 0, 1),
  endDate: new Date(2024, 1, 2),
  lenderName: 'lender',
  lenderNickName: '감자',
  loaneeName: 'test1',
  // review:
  //   '리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 리뷰 테스트 좋아요 굿 ',
};

export function MainPage() {
  const token = sessionStorage.getItem('accessToken');
  const isAuthenticated = !!token;
  const [applies, setApplies] = useState<GetArrivedAppliesResponse[] | null>(null);
  const getApplies = async () => {
    try {
      const response = await getArriveAppliesAPICall(token ?? '');
      setApplies(response);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      getApplies();
    }
  }, [isAuthenticated]);
  return (
    <>
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
      {!!applies && applies.length > 0 && (
        <Box sx={{ mt: 5, mb: 10 }} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Box width={950}>
            <Typography variant="h5" fontWeight={'bold'} sx={{ mb: 3 }}>
              대여 신청이 왔어요!
            </Typography>
          </Box>
          <Box>
            {applies.map((apply) => (
              <ArrivedApplyCard apply={apply} />
            ))}
          </Box>
        </Box>
      )}
      <LendCard isLoanee={true} lendInfo={lendInfo} />
    </>
  );
}
