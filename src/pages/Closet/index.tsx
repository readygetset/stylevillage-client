import { useParams, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Typography, Button } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';

import { UserClothes, getUserClothesAPICall } from '../../hooks/api/user/user';
import { deleteClothesAPICall } from '../../hooks/api/clothes/clothes';
import {
  getClosetAPICall,
  getClosetListAPICall,
  GetClosetResponse,
  GetClosetListResponse,
} from '../../hooks/api/closet/closet';
import ConfirmDialog from '../../components/ConfirmDialog';
import ClothPreviewCard from '../../components/ClothesPreviewCard';

export function ClosetPage() {
  const { id } = useParams();
  const closetId = Number(id);
  const navigate = useNavigate();
  const userId = Number(sessionStorage.getItem('userId'));
  const userNickname = sessionStorage.getItem('userNickname');
  const token = sessionStorage.getItem('accessToken') ?? '';

  const [selectedClosetId, setSelectedClosetId] = useState<number>(closetId);
  const [closetList, setClosetList] = useState<GetClosetListResponse | null>(null);
  const [closet, setCloset] = useState<GetClosetResponse | null>(null);
  const [clothes, setClothes] = useState<UserClothes[] | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedClothIdToDelete, setSelectedClothIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const closetListData = await getClosetListAPICall({ token });
        setClosetList(closetListData);
        if (closetId === 0) {
          const clothesData = await getUserClothesAPICall(userId);
          setClothes(clothesData);
        } else {
          const closetData = await getClosetAPICall({ closetId: selectedClosetId, token });
          setCloset(closetData);
        }
      } catch (error) {
        // 에러핸들러
      }
    };

    fetchData();
  }, [closetId, selectedClosetId]);

  const handleClosetChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newClosetId = event.target.value as number;
    setSelectedClosetId(newClosetId);
    navigate(`/closet/${newClosetId}`);
  };

  const handleCreate = () => {
    console.log('Create button clicked');
  };

  const handleModify = (clothId: number) => {
    console.log(`Modify button clicked for cloth with ID: ${clothId}`);
  };

  const handleDelete = (clothId: number) => {
    setSelectedClothIdToDelete(clothId);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDialogSubmit = async () => {
    if (selectedClothIdToDelete !== null) {
      try {
        await deleteClothesAPICall({ clothesId: selectedClothIdToDelete, token });
        setIsConfirmDialogOpen(false);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting cloth:', error);
      }
    }
  };

  const handleConfirmDialogCancel = () => {
    setSelectedClothIdToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
        <TextField
          select
          label="옷장 선택"
          fullWidth
          value={selectedClosetId}
          onChange={handleClosetChange}
          sx={{
            width: 200,
            height: 100,
            ml: 5,
            mt: 5,
            mb: 5,
          }}
        >
          <MenuItem value={0}>전체 옷장</MenuItem>
          {closetList?.closets.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <Typography ml={2} mb={5}>
          문을 열었어요!
        </Typography>

        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            type="button"
            variant="contained"
            onClick={handleCreate}
            sx={{ mb: 6, mr: 5, width: 120, borderRadius: 100, backgroundColor: 'black' }}
          >
            +옷 추가하기
          </Button>
        </Box>
      </Box>

      {((closetId === 0 ? clothes : closet?.clothes) || []).length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          <CheckroomIcon sx={{ fontSize: 100 }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            빈 옷장입니다
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {(closetId === 0 ? clothes : closet?.clothes)?.map((cloth) => (
            <Box key={cloth.id} sx={{ ml: 5, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ClothPreviewCard
                clothesId={cloth.id ?? 0}
                clothesname={cloth.name}
                imgsrc={cloth.image || 'placeholder-image-url'}
                status={cloth.status || '상태 없음'}
                userid={userId || 0}
                username={userNickname || '사용자 없음'}
                isWished={false}
              />

              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => cloth.id !== undefined && handleModify(cloth.id)}
                  sx={{ mr: 2, borderRadius: 100, color: 'black', backgroundColor: 'white' }}
                >
                  수정
                </Button>

                <Button
                  variant="contained"
                  onClick={() => cloth.id !== undefined && handleDelete(cloth.id)}
                  sx={{ borderRadius: 100, backgroundColor: 'black' }}
                >
                  삭제
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <ConfirmDialog
        message="옷을 정말 삭제하시겠습니까?"
        handleSubmit={handleConfirmDialogSubmit}
        handleCancel={handleConfirmDialogCancel}
        isOpen={isConfirmDialogOpen}
      />
    </Box>
  );
}
