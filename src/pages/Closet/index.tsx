import { useParams, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

import {
  getClosetAPICall,
  getClosetListAPICall,
  GetClosetResponse,
  GetClosetListResponse,
} from '../../hooks/api/closet/closet';
import ClothPreviewCard from '../../components/ClothesPreviewCard';

export function ClosetPage() {
  const { id } = useParams();
  const closetId = Number(id);
  const navigate = useNavigate();
  const userId = Number(sessionStorage.getItem('userId'));
  const userNickname = sessionStorage.getItem('userNickname');

  const [selectedClosetId, setSelectedClosetId] = useState<number>(closetId);
  const [closetList, setClosetList] = useState<GetClosetListResponse | null>(null);
  const [closet, setCloset] = useState<GetClosetResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const closetListData = await getClosetListAPICall({});
        setClosetList(closetListData);

        const closetData = await getClosetAPICall({ closetId: selectedClosetId });
        setCloset(closetData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [closetId, selectedClosetId]);

  const handleClosetChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newClosetId = event.target.value as number;
    setSelectedClosetId(newClosetId);
    navigate(`/closet/${newClosetId}`);
  };

  return (
    <Box>
      <TextField select label="옷장 선택" fullWidth value={selectedClosetId} onChange={handleClosetChange}>
        <MenuItem value={0}>전체 옷장</MenuItem>
        {closetList?.closets.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      {closet?.clothes.map((cloth) => (
        <ClothPreviewCard
          key={cloth.id}
          clothesId={cloth.id ?? 0}
          clothesname={cloth.name}
          imgsrc={cloth.image || 'placeholder-image-url'} // 대체할 이미지 URL을 지정하세요.
          status={cloth.status || '상태 없음'}
          userid={userId || 0}
          username={userNickname || '사용자 없음'}
          isWished={false} // 여기서는 Wish 상태를 받아오지 않았으므로 false로 지정합니다.
        />
      ))}
    </Box>
  );
}
