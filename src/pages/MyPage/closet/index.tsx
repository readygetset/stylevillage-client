import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';

import { MyPageHeader } from '../myPageHeader';
import {
  getClosetListAPICall,
  GetClosetListResponse,
  AddClosetAPICall,
  editClosetAPICall,
  deleteClosetAPICall,
} from '../../../hooks/api/closet/closet';
import ConfirmDialog from '../../../components/ConfirmDialog';
import ClosetPreviewCard from '../../../components/ClosetPreviewCard';
import ClosetDialog from '../../../components/ClosetDialog';
import CancelSubmitBtns from '../../../components/CancelSubmitBtn';

export default function MyPageCloset() {
  const nickname = sessionStorage.getItem('userNickname');
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [closetList, setClosetList] = useState<GetClosetListResponse | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isClosetDialogOpen, setIsClosetDialogOpen] = useState(false);
  const handleCreate = () => {
    setIsOpen(true);
  };
  const [selectedClosetId, setSelectedClosetId] = useState<number>();

  const handleSubmit = async (name: string) => {
    try {
      if (name === '') {
        enqueueSnackbar('옷장 명이 입력되지 않았습니다.', { variant: 'error' });
      } else {
        const isAdded = await AddClosetAPICall({ name, token });
        if (isAdded !== null) setIsOpen(false);
      }
    } catch (error) {
      enqueueSnackbar('옷장 생성에 실패하였습니다.', { variant: 'error' });
    }
  };
  const handleEdit = (name: string) => {
    editClosetAPICall({ closetId: selectedClosetId, name, token });
  };
  const handleDelete = () => {
    deleteClosetAPICall({ closetId: selectedClosetId, token });
  };
  const handleCancel = () => {
    setIsOpen(false);
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
  }, [isOpen]);

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
            <CancelSubmitBtns
              submitBtnText="수정"
              cancelBtnText="삭제"
              handleSubmit={() => {
                setIsClosetDialogOpen(true);
                setSelectedClosetId(c.id);
              }}
              handleCancel={() => {
                setIsConfirmDialogOpen(true);
                setSelectedClosetId(c.id);
              }}
            />
          </Box>
        ))}
      </Box>
      <ClosetDialog handleSubmit={handleSubmit} handleCancel={handleCancel} submitBtnText="등록" isOpen={isOpen} />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        message="정말 삭제하시겠습니까?"
        handleSubmit={handleDelete}
        handleCancel={() => setIsConfirmDialogOpen(false)}
      />
      <ClosetDialog
        isOpen={isClosetDialogOpen}
        submitBtnText="수정"
        handleCancel={() => setIsClosetDialogOpen(false)}
        handleSubmit={handleEdit}
      />
      <Box height={50} />
    </Box>
  );
}
