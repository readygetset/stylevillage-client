import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getWishAPICall, getPopularClothesAPICall } from '../../hooks/api/wish/wish';
import { UserClothes } from '../../hooks/api/user/user';
import { GetArrivedAppliesResponse, getArriveAppliesAPICall } from '../../hooks/api/apply/apply';
import SearchBar from '../../components/SearchBar';
import ClothPreviewCard from '../../components/ClothesPreviewCard';
import ArrivedApplyCard from '../../components/ArrivedApplyCard';

export function MainPage() {
  const token = sessionStorage.getItem('accessToken');
  const getuserId = sessionStorage.getItem('userId');
  const userId = Number(getuserId);
  const isAuthenticated = !!token;
  const [applies, setApplies] = useState<GetArrivedAppliesResponse[] | null>(null);
  const [wishlist, setWishlist] = useState<UserClothes[] | null>(null);
  const [popularlist, setPopularlist] = useState<UserClothes[] | null>(null);
  const getApplies = async () => {
    try {
      const response = await getArriveAppliesAPICall(token ?? '');
      setApplies(response);
    } catch (error) {
      //
    }
  };
  const getWishes = async () => {
    try {
      const response = await getWishAPICall(token ?? '');
      setWishlist(response);
    } catch (error) {
      //
    }
  };
  const getPopularClothes = async () => {
    try {
      const response = await getPopularClothesAPICall(token ?? '');
      setPopularlist(response);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        getApplies();
        getWishes();
        getPopularClothes();
      } catch (error) {
        //
      }
    };

    fetchData();
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
        <SearchBar searchKeyWord={''} categorySelected={[]} seasonSelected={[]} filterSelected={[]} />
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
      {!!isAuthenticated && (
        <Box>
          <Typography variant="h6" sx={{ mt: 10, ml: 5, fontWeight: 'bold', marginBottom: 2 }}>
            내가 찜한 옷이에요
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {wishlist?.map((cloth) => (
          <Box key={cloth.id} sx={{ ml: 5, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ClothPreviewCard
              clothesId={cloth.id ?? 0}
              clothesname={cloth.name}
              imgsrc={cloth.image || 'placeholder-image-url'}
              status={cloth.status || '상태 없음'}
              userid={userId || 0}
              username={cloth.ownerNickname}
              isWished={false}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mt: 10, ml: 5, fontWeight: 'bold', marginBottom: 2 }}>
          지금 인기있는 옷이에요
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {popularlist?.map((cloth) => (
          <Box key={cloth.id} sx={{ ml: 5, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ClothPreviewCard
              clothesId={cloth.id ?? 0}
              clothesname={cloth.name}
              imgsrc={cloth.image || 'placeholder-image-url'}
              status={cloth.status || '상태 없음'}
              userid={userId || 0}
              username={cloth.ownerNickname}
              isWished={false}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}
