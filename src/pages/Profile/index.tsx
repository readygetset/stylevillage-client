import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, Button, TextField, Typography } from '@mui/material';

import { getuserProfile, changePasswordAPICALL, updateProfileAPICALL } from '../../hooks/api/profile/profile';

// Assuming you have the appropriate API calls for profile and password change

export function ProfilePage() {
  const navigate = useNavigate();
  const [profValues, setProfValues] = useState({
    username: '',
    nickname: '',
    location: '',
    phoneNumber: '',
  });
  const [pswValues, setPswValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmnewPassword: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getuserProfile();
        if (profileData) {
          setProfValues(profileData);
        }
      } catch (error) {
        enqueueSnackbar('유저정보불러오기 실패하였습니다.', { variant: 'error' });
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newProfValues = {
      ...profValues,
      [event.target.name]: event.target.value,
    };
    setProfValues(newProfValues);
  };

  const handlePswChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newPswValues = {
      ...pswValues,
      [event.target.name]: event.target.value,
    };
    setPswValues(newPswValues);
  };

  const handleUpdateProfile = async () => {
    try {
      const updateProfile = await updateProfileAPICALL(profValues);
      if (updateProfile) {
        enqueueSnackbar('업데이트 성공', { variant: 'success' });
        navigate('/');
      }
    } catch (error) {
      enqueueSnackbar('업데이트 실패', { variant: 'error' });
    }
  };

  const handleChangePassword = async () => {
    try {
      const changePassword = await changePasswordAPICALL(pswValues);
      if (changePassword) {
        alert('비밀번호가 성공적으로 변경되었습니다!');
        navigate('/');
      }
    } catch (error) {
      enqueueSnackbar('비밀번호 변경 실패', { variant: 'error' });
    }
  };

  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent="center">
      {/* Profile Update Module */}
      <Box
        component="form"
        width={300}
        marginTop={15}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { margin: 1 },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          프로필 수정
        </Typography>
        <TextField
          id="username"
          name="username"
          type="text"
          label="아이디"
          size="small"
          fullWidth
          value={profValues?.username || ''}
        />
        <TextField
          id="nickname"
          name="nickname"
          type="text"
          label="닉네임"
          size="small"
          fullWidth
          value={profValues?.nickname || ''}
          onChange={handleProfChange}
        />
        <TextField
          id="location"
          name="location"
          type="text"
          label="거주지"
          size="small"
          fullWidth
          value={profValues?.location || ''}
          onChange={handleProfChange}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          label="전화번호"
          size="small"
          fullWidth
          value={profValues?.phoneNumber || ''}
          onChange={handleProfChange}
          inputProps={{ maxLength: 11 }}
        />
        <Button
          type="button"
          variant="contained"
          sx={{ marginTop: 2, width: 150, borderRadius: 100, backgroundColor: 'black' }}
          onClick={handleUpdateProfile}
        >
          프로필 변경하기
        </Button>
      </Box>

      {/* Password Change Module */}
      <Box
        component="form"
        width={300}
        marginTop={15}
        marginLeft={15}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { margin: 1 },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          비밀번호 변경
        </Typography>
        <TextField
          id="currentPassword"
          name="currentPassword"
          type="password"
          label="현재 비밀번호"
          size="small"
          fullWidth
          onChange={handlePswChange}
        />
        <TextField
          id="newPassword"
          name="newPassword"
          type="password"
          label="새로운 비밀번호"
          size="small"
          fullWidth
          onChange={handlePswChange}
        />
        <TextField
          id="confirmnewPassword"
          name="confirmnewPassword"
          type="password"
          label="비밀번호 확인"
          size="small"
          fullWidth
          onChange={handlePswChange}
        />
        <Button
          type="button"
          variant="contained"
          sx={{ marginTop: 2, width: 150, borderRadius: 100, backgroundColor: 'black' }}
          onClick={handleChangePassword}
        >
          비밀번호 변경하기
        </Button>
      </Box>
    </Box>
  );
}
