import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

export function RegisterPage() {
  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">회원 가입</Typography>
      </Box>
      <Box>
        <Stack spacing={3}>
          <TextField required id="id" label="아이디" />
          <TextField required id="password" label="비밀번호" />
          <TextField required id="password-check" label="비밀번호 확인" />
        </Stack>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={2}>
          <TextField required id="last-name" label="성" />
          <TextField required id="first-name" label="이름" />
          <TextField required id="age" label="나이" type="number" />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <Button variant="outlined" color="primary">
            이전
          </Button>
          <Button variant="contained" color="primary">
            회원 가입
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
