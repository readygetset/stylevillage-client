import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, Button, Typography } from '@mui/material';

import { getWishAPICall, getPopularClothesAPICall } from '../../hooks/api/wish/wish';
import { UserClothes } from '../../hooks/api/user/user';
import { getClosetListAPICall, GetClosetListResponse } from '../../hooks/api/closet/closet';
import { GetArrivedAppliesResponse, getArriveAppliesAPICall } from '../../hooks/api/apply/apply';
import SearchBar from '../../components/SearchBar';
import ClosetPreviewCard from '../../components/ClosetPreviewCard';
import ArrivedApplyCard from '../../components/ArrivedApplyCard';
import ClothPreviewCard from '../../components/ClothesPreviewCard';

export function MainPage() {
  const token = sessionStorage.getItem('accessToken') || undefined;
  const getuserId = sessionStorage.getItem('userId');
  const userId = Number(getuserId);
  const isAuthenticated = !!token;
  const navigate = useNavigate();
  const [applies, setApplies] = useState<GetArrivedAppliesResponse[] | null>(null);
  const [wishlist, setWishlist] = useState<UserClothes[] | null>(null);
  const [popularlist, setPopularlist] = useState<UserClothes[] | null>(null);
  const [closetList, setClosetList] = useState<GetClosetListResponse | null>(null);
  const getApplies = async () => {
    try {
      const response = await getArriveAppliesAPICall(token ?? '');
      setApplies(response);
    } catch (error) {
      //
    }
  };
  const getClosetList = async () => {
    try {
      const closetListData = await getClosetListAPICall({ token });
      setClosetList(closetListData);
    } catch (error) {
      enqueueSnackbar('옷장 목록을 불러오지 못했습니다.', { variant: 'error' });
    }
  };
  const handleCreate = () => {
    navigate('/mypage/closet');
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
        getClosetList();
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
        <Box sx={{ mt: 5 }} display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        {isAuthenticated && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 1150 }}>
            <Typography sx={{ ml: 12, fontWeight: 'bold', fontSize: 25 }}>나의 옷장</Typography>
            <Button
              type="button"
              onClick={handleCreate}
              sx={{
                color: 'black',
                margin: 4,
                width: 120,
                border: 'none',
              }}
            >
              더보기 &gt;
            </Button>
          </Box>
        )}
        {isAuthenticated && (
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 1150 }}>
            <Box key={0} sx={{ ml: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ClosetPreviewCard closetid={0} closetname={'전체 옷장'} />
            </Box>

            {closetList?.closets.map((c) => (
              <Box key={c.id} sx={{ ml: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ClosetPreviewCard closetid={c.id ? c.id : -1} closetname={c.name} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
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
