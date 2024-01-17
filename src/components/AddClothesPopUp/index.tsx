import React, { useState } from 'react';
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

import CancelSubmitBtns from '../CancelSubmitBtn';
import { CategoryEnums } from '../../models/enum';
import { postClothesAPICall, Clothes } from '../../hooks/api/clothes/addClothes';

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

const ClothesPopup: React.FC<{ onClose: OnCloseFunction; open: boolean }> = ({ onClose, open }) => {
  const [uploadImgUrl, setUploadImgUrl] = useState<string>('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [springOpen, setSpringOpen] = useState(false);
  const [summerOpen, setSummerOpen] = useState(false);
  const [fallOpen, setFallOpen] = useState(false);
  const [winterOpen, setWinterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const token = sessionStorage.getItem('accessToken') ?? '';

  const handleSubmit = async () => {
    try {
      const [season, setSeason] = useState('');
      if (springOpen) setSeason('봄');
      else if (summerOpen) setSeason('여름');
      else if (fallOpen) setSeason('가을');
      else if (winterOpen) setSeason('겨울');
      // TODO : season 여러개 선택할 수 있도록, clothes 관련 api 수정(Season[]를 받도록)
      const clothes: Clothes = {
        description,
        category,
        season,
        status: status ? '대여가능' : '대여불가능',
        isOpen,
        name,
        tag: tags,
        image: uploadImgUrl,
      };
      const isPosted = await postClothesAPICall({ clothes, token });
      if (isPosted) {
        onClose();
      }
    } catch (error) {
      enqueueSnackbar('옷 등록에 실패하였습니다.', { variant: 'error' });
    }
  };

  const handleCancel = () => {
    setUploadImgUrl('');
    setName('');
    setCategory('');
    setSpringOpen(false);
    setSummerOpen(false);
    setFallOpen(false);
    setWinterOpen(false);
    setIsOpen(true);
    setStatus(false);
    setDescription('');
    setTags('');

    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCategoryMenuClick = (selected: string) => {
    setCategory(selected);
  };
  interface SeasonBoxProps {
    notClicked: boolean;
    onClick: () => void;
  }

  const SeasonBox: React.FC<SeasonBoxProps> = ({ notClicked, onClick }) => (
    <Box display={'flex'} alignItems={'center'} sx={{ mr: 1 }}>
      <Box
        onClick={onClick}
        sx={{
          backgroundColor: notClicked ? 'black' : 'white',
          width: 10,
          height: 10,
          border: '1px solid black',
        }}
      />
    </Box>
  );

  const handleSeasonClick = (season: string) => {
    switch (season) {
      case '봄':
        setSpringOpen(!springOpen);
        break;
      case '여름':
        setSummerOpen(!summerOpen);
        break;
      case '가을':
        setFallOpen(!fallOpen);
        break;
      case '겨울':
        setWinterOpen(!winterOpen);
        break;
      default:
        break;
    }
  };

  const handleIsOpenClick = (selected: boolean) => {
    setIsOpen(selected);
  };

  const handleStatusClick = (selected: boolean) => {
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
        <Typography sx={{ fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '0.2rem' }}>계절(중복가능)</Typography>
        <Box display="flex">
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 4 }}>
            <SeasonBox notClicked={springOpen} onClick={() => handleSeasonClick('봄')} />
            <Typography>봄</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 4 }}>
            <SeasonBox notClicked={summerOpen} onClick={() => handleSeasonClick('여름')} />
            <Typography>여름</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 4 }}>
            <SeasonBox notClicked={fallOpen} onClick={() => handleSeasonClick('가을')} />
            <Typography>가을</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mr: 4 }}>
            <SeasonBox notClicked={winterOpen} onClick={() => handleSeasonClick('겨울')} />
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
              onClick={() => handleStatusClick(true)}
              sx={{
                backgroundColor: status ? 'black' : 'white',
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
              onClick={() => handleStatusClick(false)}
              sx={{
                backgroundColor: status ? 'white' : 'black',
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
