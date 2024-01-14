import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CategoryChips from '../CategoryChips';
import { Item } from '../../models/item';
import { getSearchAPICall } from '../../hooks/api/search/search';
import { Categories, Seasons } from '../../data/enumLists';

interface Props {
  searchKeyWord: string;
  categorySelected: string[];
  seasonSelected: string[];
}

export default function SearchBar(props: Props) {
  const navigate = useNavigate();
  const emptyStrArray: string[] = [];
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [categorySelected, setCategorySelected] = useState(emptyStrArray);
  const [seasonSelected, setSeasonSelected] = useState(emptyStrArray);
  const [filterSelected, setFilterSelected] = useState(emptyStrArray);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchKeyWord(event.target.value);
  };

  const handleChipState = (category: string, label: string, isSelected: boolean) => {
    switch (category) {
      case '카테고리':
        setCategorySelected(isSelected ? [...categorySelected, label] : categorySelected.filter((c) => c !== label));
        break;
      case '계절':
        setSeasonSelected(isSelected ? [...seasonSelected, label] : seasonSelected.filter((c) => c !== label));
        break;
      case '필터':
        setFilterSelected(isSelected ? [...filterSelected, label] : filterSelected.filter((c) => c !== label));
        break;
      default:
        break;
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const values = {
      categories: categorySelected,
      seasons: seasonSelected,
      text: searchKeyWord,
    };
    getSearchAPICall(values).then(() => {
      navigate('/');
    });
  };

  const initCategories = Categories.map((value) => {
    if (props.categorySelected.includes(value)) {
      const item: Item = { label: value, isSelected: true };
      return item;
    }
    const item: Item = { label: value, isSelected: false };
    return item;
  });
  const initSeasons = Seasons.map((value) => {
    if (props.seasonSelected.includes(value)) {
      const item: Item = { label: value, isSelected: true };
      return item;
    }
    const item: Item = { label: value, isSelected: false };
    return item;
  });
  const initFilter: Item[] = [{ label: '대여 가능', isSelected: false }];

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box
        component="form"
        position="relative"
        width={800}
        height="50px"
        marginTop={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& .MuiTextField-root': { margin: 1 },
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
          sx={{ border: 'none', borderRadius: 100, margin: 0, backgroundColor: 'white' }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            position: 'absolute',
            paddingInline: 0,
            border: 'none',
            backgroundColor: 'white',
            right: 10,
          }}
        >
          <SearchIcon
            sx={{
              color: 'black',
            }}
          ></SearchIcon>
        </Button>
      </Box>
      <Box
        width={800}
        height="150px"
        marginTop={1}
        marginLeft={5}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'left'}
        sx={{
          '& .MuiTextField-root': { margin: 1 },
        }}
      >
        <CategoryChips onClickHandler={handleChipState} category="카테고리" items={initCategories} />
        <CategoryChips onClickHandler={handleChipState} category="계절" items={initSeasons} />
        <CategoryChips onClickHandler={handleChipState} category="필터" items={initFilter} />
      </Box>
    </Box>
  );
}
