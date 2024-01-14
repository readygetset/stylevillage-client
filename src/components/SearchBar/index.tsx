import { Link, useNavigate } from 'react-router-dom';
import { useState, useSearchParams } from 'react';
import axios, { AxiosError } from 'axios';
import { Typography, Box } from '@mui/material';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  // const [searchParams, setSearchParams] = useSearchParams();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchKeyWord(event.target.value);
  };

  async function Search() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/search/`, searchKeyWord);
      if (response.status === 200) {
        const { name, image, owner } = response.data; // isWished도 필요
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
    <Box sx={{ width: '100%', height: '25%', bgcolor: 'white', marginTop: 1 }}>
      <Typography
        component={Link}
        to="/"
        variant="h4"
        sx={{ paddingLeft: 3, fontWeight: 'bold', color: 'black', textDecoration: 'none' }}
      >
        StyleVillage
      </Typography>
    </Box>
  );
}
