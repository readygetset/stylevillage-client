import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, Stack, Typography } from '@mui/material';

import { User } from '../../models/user';

export function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { age } = useParams();

  async function getUsers() {
    try {
      const { data: userResponse, status } = await axios.get(`${process.env.REACT_APP_API_URL}/user/${age}`);
      if (status === 200) {
        setUsers(userResponse);
      } else {
        throw new Error();
      }
    } catch {
      console.error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Box paddingX={3} paddingY={5}>
      <Box>
        <Typography variant="h4">04년생 목록</Typography>
      </Box>
      <Box mt={4}>
        <Stack spacing={4}>
          {users.map((user) => (
            <UserCard key={user.id} firstName={user.firstName} lastName={user.lastName} age={user.age} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

interface UserCardProps {
  firstName: string;
  lastName: string;
  age: number;
}
function UserCard({ firstName, lastName, age }: UserCardProps) {
  return (
    <Card>
      <Box padding={2}>
        <Typography variant="h6">
          이름: {lastName} {firstName}
        </Typography>
        <Typography variant="h6">나이: {age}</Typography>
      </Box>
    </Card>
  );
}
