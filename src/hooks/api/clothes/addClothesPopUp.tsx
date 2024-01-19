import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
  Box,
  Select,
  Divider,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { getClosetListAPICall, GetClosetListResponse } from '../closet/closet';
import { CategoryEnums } from '../../../models/enum';
import CancelSubmitBtns from '../../../components/CancelSubmitBtn';

import { postClothesAPICall, putClothesAPICall, ClothesInput, Clothes } from './addClothes';

const ImageUpload: React.FC<{ setUploadImgUrl: React.Dispatch<React.SetStateAction<string>> }> = ({
  setUploadImgUrl,
}) => {
  const onchangeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const uploadFile = files?.[0];

    if (uploadFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        const { result } = reader;
        if (result && typeof result === 'string') {
          setUploadImgUrl(result);
        } else enqueueSnackbar('사진의 URL 주소를 받을 수 없습니다.', { variant: 'error' });
      };
    } else {
      enqueueSnackbar('파일이 선택되지 않았습니다.', { variant: 'error' });
    }
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AddAPhotoIcon
          style={{
            fontSize: '2.7rem',
            border: '0.05rem solid #ccc',
            padding: 3,
            borderRadius: 8,
            boxSizing: 'border-box',
          }}
        />
        <input type="file" id="fileInput" accept="image/*" onChange={onchangeImageUpload} style={{ display: 'none' }} />
      </label>
    </>
  );
};

type OnCloseFunction = () => void;
type ClothesDataInput = ClothesInput | null;

const ClothesPopup: React.FC<{ onClose: OnCloseFunction; open: boolean; value?: ClothesDataInput }> = ({
  onClose,
  open,
  value,
}) => {
  const [uploadImgUrl, setUploadImgUrl] = value && value.image ? useState(value.image) : useState<string>('');
  const [name, setName] = value && value.name ? useState(value.name) : useState('');
  const [category, setCategory] = value && value.category ? useState(value.category) : useState('');
  const [season, setSeason] = value && value.season ? useState(value.season) : useState('');
  const [isOpen, setIsOpen] = value && !value.isOpen ? useState(false) : useState<boolean>(true);
  const [status, setStatus] = value && value.status ? useState(value.status) : useState('대여불가능');
  const [description, setDescription] = value && value.description ? useState(value.description) : useState('');
  const [tags, setTags] = value && value.tag ? useState(value.tag) : useState('');
  const [selectedClosetId, setSelectedClosetId] =
    value && value.closet !== undefined ? useState<number>(value.closet) : useState<number>(0);
  const [closetList, setClosetList] = useState<GetClosetListResponse | null>(null);
  const [closet, setCloset] = value && value.closet ? useState<number | null>(value.closet) : useState<number | null>();

  const token = sessionStorage.getItem('accessToken') ?? '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const closetListData = await getClosetListAPICall({ token });
        setClosetList(closetListData);
        if (selectedClosetId === 0) {
          setCloset(null);
        } else {
          setCloset(selectedClosetId);
        }
      } catch (error) {
        enqueueSnackbar('옷장이 제대로 선택되지 않았습니다.', { variant: 'error' });
      }
    };
    fetchData();
  }, [selectedClosetId]);

  const handleClosetChange = (newClosetId: number) => {
    setSelectedClosetId(newClosetId);
  };

  const reset = () => {
    if (!value) {
      setUploadImgUrl('');
      setName('');
      setCategory('');
      setSeason('');
      setIsOpen(true);
      setStatus('대여불가능');
      setCloset(null);
      setSelectedClosetId(0);
      setDescription('');
      setTags('');
    }
  };

  const handleSubmit = async () => {
    try {
      const clothes: Clothes = {
        closet,
        description,
        category,
        season,
        status,
        isOpen,
        name,
        tag: tags,
        image: uploadImgUrl,
      };

      const clothesId = value ? value?.id : -1;

      if (clothes.name === '') {
        enqueueSnackbar('의류 명이 입력되지 않았습니다.', { variant: 'error' });
      } else {
        const isPosted = value
          ? await putClothesAPICall({ clothesId, clothes, token })
          : await postClothesAPICall({ clothes, token });
        if (isPosted) {
          reset();
          onClose();
        }
      }
    } catch (error) {
      enqueueSnackbar('옷 등록에 실패하였습니다.', { variant: 'error' });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCategoryMenuClick = (selected: string) => {
    setCategory(selected);
  };

  const handleSeasonClick = (selected: string) => {
    setSeason(selected);
  };

  const handleIsOpenClick = (selected: boolean) => {
    setIsOpen(selected);
  };

  const handleStatusClick = (selected: string) => {
    setStatus(selected);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>옷 추가하기</DialogTitle>
      <Divider />
      <DialogContent>
        <ImageUpload setUploadImgUrl={setUploadImgUrl} />
        {uploadImgUrl && <img src={uploadImgUrl} alt="img" style={{ maxWidth: '50%', maxHeight: '50%' }} />}
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>이름</Typography>
        <input
          autoComplete="off"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          style={{
            borderRadius: 8,
            border: '1px solid black',
            width: '50%',
            height: '1.5rem',
            paddingLeft: '0.5rem',
          }}
        />
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>카테고리</Typography>
        <Select
          id="category"
          name="category"
          value={category}
          onChange={(e) => handleCategoryMenuClick(e.target.value as string)}
          style={{ width: '50%', marginBottom: '0.2rem', borderRadius: 8, border: '1px solid black' }}
          sx={{ height: '1.5rem' }}
          inputProps={{ sx: { textAlign: 'center' } }}
        >
          {CategoryEnums.map((CategoryEnum) => (
            <MenuItem key={CategoryEnum} value={CategoryEnum}>
              {CategoryEnum}
            </MenuItem>
          ))}
        </Select>
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>계절</Typography>
        <Box display="flex">
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleSeasonClick('봄')}
              sx={{
                backgroundColor: season === '봄' ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                mr: 1,
              }}
            />
            <Typography>봄</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleSeasonClick('여름')}
              sx={{
                backgroundColor: season === '여름' ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                mr: 1,
              }}
            />
            <Typography>여름</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleSeasonClick('가을')}
              sx={{
                backgroundColor: season === '가을' ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                mr: 1,
              }}
            />
            <Typography>가을</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleSeasonClick('겨울')}
              sx={{
                backgroundColor: season === '겨울' ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                mr: 1,
              }}
            />
            <Typography>겨울</Typography>
          </Box>
        </Box>

        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>공개 여부</Typography>
        <Box display="flex">
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleIsOpenClick(true)}
              sx={{
                backgroundColor: isOpen ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                borderRadius: 100,
                mr: 1,
              }}
            />
            <Typography>공개</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleIsOpenClick(false)}
              sx={{
                backgroundColor: isOpen ? 'white' : 'black',
                width: 10,
                height: 10,
                border: '1px solid black',
                borderRadius: 100,
                mr: 1,
              }}
            />
            <Typography>비공개</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>대여 가능 여부</Typography>
        <Box display="flex">
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleStatusClick('대여가능')}
              sx={{
                backgroundColor: status === '대여가능' ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                borderRadius: 100,
                mr: 1,
              }}
            />
            <Typography>대여 가능</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 2 }}>
            <Box
              onClick={() => handleStatusClick('대여불가능')}
              sx={{
                backgroundColor: status === '대여불가능' ? 'black' : 'white',
                width: 10,
                height: 10,
                border: '1px solid black',
                borderRadius: 100,
                mr: 1,
              }}
            />
            <Typography>대여 불가능</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>옷장 선택</Typography>
        <Select
          id="closet"
          name="closet"
          value={selectedClosetId}
          onChange={(e) => handleClosetChange(e.target.value as number)}
          style={{ width: '50%', marginBottom: '0.2rem', borderRadius: 8, border: '1px solid black' }}
          sx={{ height: '1.5rem' }}
          inputProps={{ sx: { textAlign: 'center' } }}
        >
          <MenuItem value={0}>전체 옷장</MenuItem>
          {closetList?.closets.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>

        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>옷 상세 설명</Typography>
        <textarea
          placeholder="옷의 상태 등에 대해 설명해주세요."
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          style={{
            borderRadius: 8,
            border: '1px solid black',
            height: '4em',
            width: '100%',
            resize: 'none',
          }}
        />
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>태그</Typography>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="#"
          value={tags}
          onChange={handleTagsChange}
          style={{
            borderRadius: 8,
            border: '1px solid black',
            width: '100%',
            height: '1.5rem',
          }}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', margin: 12 }}>
        <CancelSubmitBtns handleSubmit={handleSubmit} handleCancel={handleCancel} submitBtnText="등록" />
      </DialogActions>
    </Dialog>
  );
};

export default ClothesPopup;
