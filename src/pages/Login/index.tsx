import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

import { LOGIN_MESSAGE } from '../../data/messages';

export function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: null,
    password: null,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
  };
  async function Login() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values);
      if (response.status === 200) {
        const { nickname, isBannded, accessToken } = response.data;
        sessionStorage.setItem('accessToken', accessToken);
        enqueueSnackbar(`${nickname}님 안녕하세요 :)`, { variant: 'success' });
        if (isBannded === true) {
          enqueueSnackbar(`현재 ${nickname}님의 계정은 사용 정지되었습니다.`, { variant: 'warning' });
        }
        navigate('/');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? LOGIN_MESSAGE.LOGIN_FAIL, { variant: 'error' });
      } else {
        enqueueSnackbar(LOGIN_MESSAGE.LOGIN_FAIL, { variant: 'error' });
      }
    }
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Login();
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
        onSubmit={handleSubmit}
      >
        <Box marginBottom={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            StyleVillage에
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            로그인하세요
          </Typography>
        </Box>
        <TextField
          id="username"
          name="username"
          type="username"
          label="아이디"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          size="small"
          fullWidth
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2, width: 120, borderRadius: 100, backgroundColor: 'black' }}
        >
          로그인
        </Button>
        <Typography component={Link} to="/register" sx={{ marginTop: 1.5, color: 'black', textDecoration: 'none' }}>
          회원이 아니신가요?
        </Typography>
      </Box>
    </Box>
  );
}
