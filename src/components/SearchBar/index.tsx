import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { SEARCH_MESSAGE } from '../../data/messages';

export default function SearchBar() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  // const [searchParams, setSearchParams] = useSearchParams();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchKeyWord(event.target.value);
  };

  async function Search() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/search/`, searchKeyWord);
      if (response.status === 200) {
        const { searchResult } = response.data; // isWished도 필요
        sessionStorage.setItem('searchResult', searchResult);
        navigate('/search');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data?.message ?? SEARCH_MESSAGE.SEARCH_FAIL, { variant: 'error' });
      } else {
        enqueueSnackbar(SEARCH_MESSAGE.SEARCH_FAIL, { variant: 'error' });
      }
    }
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Search();
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box
        component="form"
        width={800}
        height={150}
        marginTop={15}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& .MuiTextField-root': { margin: 1 },
          borderRadius: 100,
          borderColor: 'black',
          wrap: 'nowrap',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="searchKeyWord"
          name="searchKeyWord"
          type="searchKeyWord"
          size="small"
          fullWidth
          placeholder="다른 사람의 옷을 구경해보세요!"
          onChange={handleChange}
          sx={{ border: 'none' }}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2, width: 120, height: 120, border: 'none' }}>
          <SearchIcon></SearchIcon>
        </Button>
      </Box>
    </Box>
  );
}
