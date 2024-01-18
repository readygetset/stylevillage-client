import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { GetArrivedAppliesResponse, getArriveAppliesAPICall } from '../../hooks/api/apply/apply';
import SearchBar from '../../components/SearchBar';
import ArrivedApplyCard from '../../components/ArrivedApplyCard';
import ClothesPopup from '../../components/AddClothesPopUp';

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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <div>
        <button onClick={handleOpen}>옷 추가하기</button>
        <ClothesPopup open={open} onClose={handleClose} />
      </div>
    </>
  );
}
