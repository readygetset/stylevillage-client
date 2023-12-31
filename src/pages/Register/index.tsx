import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

export function RegisterPage() {
  const [input, setInput] = useState({
    lastName: '',
    firstName: '',
    age: 0,
  });

  const navigate = useNavigate();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;

    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  async function handleRegister() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        window.alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (e) {
      window.alert('회원가입에 실패했습니다.');
    }
  }

  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">회원 가입</Typography>
      </Box>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={2}>
          <TextField required id="lastName" label="성" onChange={handleInput} />
          <TextField required id="firstName" label="이름" onChange={handleInput} />
          <TextField required id="age" label="나이" type="number" onChange={handleInput} />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            이전
          </Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            회원 가입
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
