import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';

import { MyPageHeader } from '../myPageHeader';
import { getClosetListAPICall, GetClosetListResponse } from '../../../hooks/api/closet/closet';
import ClosetPreviewCard from '../../../components/ClosetPreviewCard';

export default function MyPageCloset() {
  const nickname = sessionStorage.getItem('userNickname');
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [closetList, setClosetList] = useState<GetClosetListResponse | null>(null);
  const handleCreate = () => {
    console.log('Create button clicked');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const closetListData = await getClosetListAPICall({ token });
        setClosetList(closetListData);
      } catch (error) {
        enqueueSnackbar('옷장 목록을 불러오지 못했습니다.', { variant: 'error' });
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <MyPageHeader nickname={nickname} description="님의 옷장을 관리할 수 있어요" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="button"
          onClick={handleCreate}
          sx={{
            color: 'black',
            fontWeight: 'Bold',
            margin: 4,
            width: 120,
            borderRadius: 100,
            backgroundColor: '#D9D9D9',
            mr: 10,
          }}
        >
          +옷장 추가하기
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Box key={0} sx={{ ml: 10, mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ClosetPreviewCard closetid={0} closetname={'전체 옷장'} />
        </Box>

        {closetList?.closets.map((c) => (
          <Box key={c.id} sx={{ ml: 10, mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ClosetPreviewCard closetid={c.id ? c.id : -1} closetname={c.name} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
