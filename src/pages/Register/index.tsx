import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

import { ResgisterAPICall, isduplicated } from '../../hooks/api/auth/Register';

export function RegisterPage() {
  const navigate = useNavigate();
  let checkduplicated = true;
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    gender: '',
    location: '',
    phoneNumber: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
  };

  const handleCheckDuplicate = async () => {
    try {
      checkduplicated = await isduplicated(values.username);
      if (checkduplicated) {
        enqueueSnackbar('중복된 아이디 입니다.', { variant: 'error' });
      } else {
        enqueueSnackbar('사용가능한 아이디 입니다.', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('아이디 중복 검사 실패', { variant: 'error' });
    }
  };

  // const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   checkduplicated = await isduplicated(values.username);
  //   if (checkduplicated) {
  //     enqueueSnackbar('아이디 중복 체크를 해주세요', { variant: 'error' });
  //   } else {
  //     const registrationSuccess = await ResgisterAPICall(values);
  //     if (registrationSuccess) {
  //       navigate('/login');
  //     }
  //   }
  // };

  const handleRegister = async () => {
    try {
      if (checkduplicated) {
        enqueueSnackbar('아이디 중복 체크를 해주세요', { variant: 'error' });
      } else {
        const registrationSuccess = await ResgisterAPICall(values);
        if (registrationSuccess) {
          navigate('/login');
        }
      }
    } catch (error) {
      enqueueSnackbar('회원가입 실패', { variant: 'error' });
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
        <Box marginBottom={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            StyleVillage의
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            회원이 되어주세요
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" marginBottom={0}>
          <TextField
            id="username"
            name="username"
            type="text"
            label="아이디"
            size="small"
            fullWidth
            onChange={handleChange}
          />
          <Button
            type="button"
            variant="contained"
            onClick={handleCheckDuplicate}
            sx={{ marginTop: 0, width: 120, borderRadius: 100, backgroundColor: 'black' }}
          >
            중복확인
          </Button>
        </Box>
        <TextField
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="비밀번호 확인"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="nickname"
          name="nickname"
          type="text"
          label="닉네임"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField id="gender" name="gender" select label="성별" size="small" fullWidth onChange={handleChange}>
          <MenuItem value="남성">남성</MenuItem>
          <MenuItem value="여성">여성</MenuItem>
        </TextField>
        <TextField id="location" name="location" select label="거주지" size="small" fullWidth onChange={handleChange}>
          <MenuItem value="서울">서울</MenuItem>
          <MenuItem value="인천">인천</MenuItem>
          <MenuItem value="대전">대전</MenuItem>
          <MenuItem value="부산">부산</MenuItem>
          <MenuItem value="대구">대구</MenuItem>
          <MenuItem value="광주">광주</MenuItem>
          <MenuItem value="세종">세종</MenuItem>
          <MenuItem value="울산">울산</MenuItem>
        </TextField>
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          label="전화번호"
          size="small"
          fullWidth
          onChange={handleChange}
          inputProps={{ maxLength: 11 }}
        />
        <Button
          type="button"
          variant="contained"
          sx={{ marginTop: 2, width: 120, borderRadius: 100, backgroundColor: 'black' }}
          onClick={handleRegister}
        >
          회원가입
        </Button>
        <Typography component={Link} to="/login" sx={{ marginTop: 1.5, color: 'black', textDecoration: 'none' }}>
          이미 회원이신가요?
        </Typography>
      </Box>
    </Box>
  );
}
