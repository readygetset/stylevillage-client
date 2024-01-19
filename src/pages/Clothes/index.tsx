import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, Button, Card, Chip, Divider, MenuItem, Select, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { StatusEnums } from '../../models/enum';
import { createWishAPICall, deleteWishAPICall } from '../../hooks/api/wish/wish';
import {
  GetClothesResponse,
  deleteClothesAPICall,
  editClothesAPICall,
  getClothesAPICall,
} from '../../hooks/api/clothes/clothes';
import { createApplyAPICall } from '../../hooks/api/apply/apply';
import { DEFAULT_MESSAGE } from '../../data/messages';
import WriteDialog from '../../components/WriteDialog';
import WishBtn from '../../components/WishBtn';
import StatusSign from '../../components/StatusSign';
import ConfirmDialog from '../../components/ConfirmDialog';
import ApplyBtn from '../../components/ApplyBtn';
import AddClothesBtn from '../../components/AddClothesBtn';

// TODO: 사용자 페이지 링크 추가
export function ClothesPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const clothesId = Number(id);
  const userId = Number(sessionStorage.getItem('userId'));
  const token = sessionStorage.getItem('accessToken') ?? '';
  const isAuthenticated = !!token;
  const [isWish, setIsWish] = useState(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);

  const [clothes, setClothes] = useState<GetClothesResponse | null>(null);
  const getClothes = async () => {
    try {
      const result = await getClothesAPICall({ clothesId, token });
      setClothes(result);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getClothes();
  }, [clothesId]);
  useEffect(() => {
    if (clothes) {
      setIsWish(clothes?.isWished ?? false);
    }
  }, [clothes]);
  const isMyClothes = userId === clothes?.owner.id;
  const handleDeleteBtnClick = () => {
    setConfirmDialogIsOpen(true);
  };
  const handleDelete = () => {
    deleteClothesAPICall({ clothesId, token });
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };
  const handleCancel = () => {
    setConfirmDialogIsOpen(false);
  };
  const handleWish = async () => {
    try {
      if (isWish) {
        const response = await deleteWishAPICall({ clothesId, token });
        if (response?.status === 200) {
          setIsWish(!isWish);
        }
      } else {
        const response = await createWishAPICall({ clothesId, token });
        if (response?.status === 200) {
          setIsWish(!isWish);
        }
      }
    } catch (error) {
      //
    }
  };
  const handleStatusChange = async (value: string) => {
    try {
      await editClothesAPICall({
        clothesId,
        token,
        clothes: {
          category: clothes?.category || '',
          season: clothes?.season || '',
          status: value,
          isOpen: clothes?.isOpen || false,
          name: clothes?.name || '',
          tag: clothes?.tag || '',
        },
      });
      getClothes();
    } catch (error) {
      //
    }
  };
  const handleIsOpenChange = async (value: string) => {
    try {
      await editClothesAPICall({
        clothesId,
        token,
        clothes: {
          category: clothes?.category || '',
          season: clothes?.season || '',
          status: clothes?.status || '',
          isOpen: value === 'true',
          name: clothes?.name || '',
          tag: clothes?.tag || '',
        },
      });
      getClothes();
    } catch (error) {
      //
    }
  };
  const handleCreateApply = async (description: string) => {
    try {
      await createApplyAPICall({ description, token });
      setIsApplyDialogOpen(false);
    } catch (error) {
      //
    }
  };

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box display={'flex'} sx={{ mt: 4, ml: 7 }} alignItems={'flex-start'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {clothes?.image ? (
              <Box
                component="img"
                sx={{
                  width: 350,
                  borderRadius: 10,
                  mb: 2,
                }}
                src={clothes.image}
              />
            ) : (
              <Box
                sx={{
                  backgroundColor: '#D9D9D9',
                  width: 350,
                  height: 400,
                  borderRadius: 10,
                  mb: 2,
                }}
              />
            )}
            {isMyClothes ? (
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <AddClothesBtn
                  BtnText="수정"
                  value={{
                    id: clothes.id,
                    closet: clothes.closetId,
                    description: clothes.description,
                    category: clothes.category,
                    season: clothes.season,
                    status: clothes.status,
                    isOpen: clothes.isOpen,
                    name: clothes.name,
                    tag: clothes.tag,
                    image: clothes.image,
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{ width: 10, color: 'black', borderColor: 'black', borderRadius: 10, ml: 1 }}
                  onClick={handleDeleteBtnClick}
                >
                  삭제
                </Button>
              </Box>
            ) : (
              <ApplyBtn
                status={clothes?.status ?? ''}
                onClick={() => {
                  if (isAuthenticated) {
                    setIsApplyDialogOpen(true);
                  } else {
                    enqueueSnackbar(DEFAULT_MESSAGE.UNAUTHENTICATED, { variant: 'error' });
                  }
                }}
              />
            )}
          </Box>
          <Box sx={{ mt: 1, ml: 6 }}>
            {isMyClothes ? (
              <Box sx={{ mb: 2 }}>
                <Select
                  sx={{ mr: 1 }}
                  value={clothes?.status}
                  id="status"
                  label="status"
                  size="small"
                  onChange={(event) => handleStatusChange(event.target.value)}
                >
                  {StatusEnums.map((StatusEnum) => (
                    <MenuItem value={StatusEnum}>{StatusEnum}</MenuItem>
                  ))}
                </Select>
                <Select
                  value={clothes?.isOpen ? 'true' : 'false'}
                  id="status"
                  label="status"
                  size="small"
                  onChange={(event) => handleIsOpenChange(event.target.value)}
                >
                  <MenuItem value="true">공개</MenuItem>
                  <MenuItem value="false">비공개</MenuItem>
                </Select>
              </Box>
            ) : (
              <StatusSign status={clothes?.status || ''} />
            )}
            <Box display={'flex'} alignItems={'center'} sx={{ mt: 1 }}>
              <Typography variant="h4" fontWeight={'bold'} sx={{ mr: 2 }}>
                {clothes?.name}
              </Typography>
              <Typography sx={{ mr: 1 }}>{clothes?.category}</Typography>
              {!isMyClothes && <WishBtn isWished={isWish} handleWish={handleWish} />}
            </Box>
            {!isMyClothes && (
              <Box display={'flex'} alignItems={'center'} sx={{ mt: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={'bold'}
                  component={Link}
                  to={`/user/${clothes?.owner.id}`}
                  sx={{ mr: 1, textDecoration: 'none', color: 'black' }}
                >
                  {clothes?.owner.nickname}님
                </Typography>
                <LocationOnIcon fontSize="small" sx={{ color: 'gray' }} />
                <Typography color={'gray'}>{clothes?.owner.location}</Typography>
              </Box>
            )}
            {clothes?.season && <Chip label={clothes?.season} size="small" sx={{ mt: 2 }}></Chip>}
            <Card variant="outlined" sx={{ width: 500, height: 200, borderRadius: 5, padding: 2, mt: 2 }}>
              <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
                상품정보
              </Typography>
              <Divider />
              <Typography sx={{ mt: 2, mb: 3 }}>{clothes?.description}</Typography>
              <Typography sx={{ mt: 2, color: 'gray' }}>{clothes?.tag}</Typography>
            </Card>
            <Card variant="outlined" sx={{ width: 500, height: 200, borderRadius: 5, padding: 2, mt: 2 }}>
              <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
                리뷰
              </Typography>
              <Divider />
              {clothes?.review.map((review) => (
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} sx={{ mt: 2, mb: 1 }}>
                  <Typography
                    sx={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
                    component={Link}
                    to={`/user/${review.reviewer.id}`}
                  >
                    {review.reviewer.nickname} |
                  </Typography>
                  <Typography sx={{ ml: 1 }}>{review.review}</Typography>
                </Box>
              ))}
            </Card>
          </Box>
        </Box>
      </Box>
      <ConfirmDialog
        isOpen={confirmDialogIsOpen}
        message="정말 삭제하시겠습니까?"
        handleSubmit={handleDelete}
        handleCancel={handleCancel}
      />
      <WriteDialog
        isOpen={isApplyDialogOpen}
        message="대여 신청 내용을 작성해주세요"
        placeholder="대여 희망 날짜, 요구사항 등을 작성해주세요."
        handleCancel={() => setIsApplyDialogOpen(false)}
        handleSubmit={handleCreateApply}
      />
      <Box height={50} />
    </>
  );
}
