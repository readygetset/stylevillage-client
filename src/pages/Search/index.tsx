import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getSearchAPICall } from '../../hooks/api/search/search';
import SearchBar from '../../components/SearchBar';
import ClothesPreviewCard from '../../components/ClothesPreviewCard';

interface Owner {
  id?: number;
  nickname?: string;
  location?: string;
}
interface SearchClothesRes {
  id?: number;
  closetId: number;
  category?: string;
  season?: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag?: string;
  image?: string;
  owner: Owner;
  isWished: boolean;
}

export function SearchPage() {
  const [searchParams] = useSearchParams();
  // const location = useLocation();
  // const queryString = location.search;
  // const url = `/search${queryString}`;

  const searchKeyWord = searchParams.get('text') || '';
  const categorySelected = searchParams.getAll('category');
  const seasonSelected = searchParams.getAll('season');
  const filterSelected = searchParams.getAll('status');

  const defaultResult: JSX.Element = (
    <Typography width="100%" textAlign="center" sx={{ mt: '50px', color: 'gray', fontSize: 20 }}>
      검색 결과가 없어요
    </Typography>
  );

  const emptySearchArray: SearchClothesRes[] = [];
  const [searchedClothes, setSearchedClothes] = useState(emptySearchArray);
  const handleSearch = async (query: string) => {
    try {
      const result = await getSearchAPICall(query);
      if (result) {
        setSearchedClothes(result);
      } else setSearchedClothes(emptySearchArray);
    } catch (error) {
      //
    }
  };
  // handleSearch(url);

  const clothesCards = searchedClothes
    ? searchedClothes.map((clothes: SearchClothesRes) => {
        const { id, name, status, owner, isWished } = clothes;
        return (
          <Box sx={{ margin: 3, display: 'inline-block' }}>
            <ClothesPreviewCard
              key={id}
              clothesId={id || 0}
              clothesname={name}
              imgsrc={''}
              status={status}
              userid={owner.id || 0}
              username={'닉네임'}
              isWished={isWished}
            />
          </Box>
        );
      })
    : [];

  return (
    <>
      <Box sx={{ paddingTop: '24px', backgroundColor: '#E9E9E9' }}>
        <SearchBar
          searchKeyWord={searchKeyWord}
          categorySelected={categorySelected}
          seasonSelected={seasonSelected}
          filterSelected={filterSelected}
          handleSearch={handleSearch}
        />
      </Box>
      {clothesCards && clothesCards.length > 0 ? clothesCards : defaultResult}
    </>
  );
}
