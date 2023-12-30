import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import { User } from '../../models/user';

function MainPage() {
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: '이웹',
    lastName: '케',
    age: 21,
  });

  async function getUser() {
    try {
      const { data: userResponse, status } = await axios.get('http://localhost:3000/?id=1');
      if (status === 200) {
        setUser(userResponse);
      } else {
        throw new Error();
      }
    } catch {
      console.error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box paddingX={3} paddingY={5}>
      <Box>
        <Typography variant="h4">사용자 정보</Typography>
      </Box>
      <Box height={40} />
      <Box>
        <Typography variant="h6">이름: {user.firstName}</Typography>
        <Typography variant="h6">성: {user.lastName}</Typography>
        <Typography variant="h6">나이: {user.age}</Typography>
      </Box>
    </Box>
  );
}

export default MainPage;
