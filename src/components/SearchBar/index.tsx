import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CategoryChips from '../CategoryChips';
import { Item } from '../../models/item';
import { Categories, Seasons, Status } from '../../data/enumLists';

interface SearchBarProps {
  searchKeyWord: string;
  categorySelected: string[];
  seasonSelected: string[];
  filterSelected: string[];
  handleSearch?: (a: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const navigate = useNavigate();
  // const emptyStrArray: string[] = [];
  const [searchKeyWord, setSearchKeyWord] = useState(props.searchKeyWord);
  const [categorySelected, setCategorySelected] = useState(props.categorySelected);
  const [seasonSelected, setSeasonSelected] = useState(props.seasonSelected);
  const [filterSelected, setFilterSelected] = useState(props.filterSelected);

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
    const keyWordQueryString = `text=${encodeURIComponent(searchKeyWord)}`;
    const categoryQueryString = categorySelected
      .map((category) => `category=${encodeURIComponent(category)}`)
      .join('&');
    const seasonQueryString = seasonSelected.map((season) => `season=${encodeURIComponent(season)}`).join('&');
    const filterQueryString = filterSelected.map((filter) => `filter=${encodeURIComponent(filter)}`).join('&');
    const queryString = [keyWordQueryString, categoryQueryString, seasonQueryString, filterQueryString]
      .filter((query) => !!query)
      .join('&');
    const url = `/search?${queryString}`;
    navigate(url);
    if (props.handleSearch) props.handleSearch(url);
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
  const initFilter = Status.map((value) => {
    if (props.filterSelected.includes(value)) {
      const item: Item = { label: value, isSelected: true };
      return item;
    }
    const item: Item = { label: value, isSelected: false };
    return item;
  });

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
          sx={{ margin: 0, backgroundColor: 'white', borderRadius: 1 }}
        />
        <IconButton
          type="submit"
          sx={{
            position: 'absolute',
            backgroundColor: 'none',
            right: 10,
          }}
        >
          <SearchIcon
            sx={{
              color: 'black',
            }}
          ></SearchIcon>
        </IconButton>
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
        <CategoryChips handleCategoryChipsClick={handleChipState} category="카테고리" items={initCategories} />
        <CategoryChips handleCategoryChipsClick={handleChipState} category="계절" items={initSeasons} />
        <CategoryChips handleCategoryChipsClick={handleChipState} category="필터" items={initFilter} />
      </Box>
    </Box>
  );
}
