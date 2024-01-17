import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { getSearchAPICall } from '../../hooks/api/search/search';
import SearchBar from '../../components/SearchBar';
import ClothesPreviewCard from '../../components/ClothesPreviewCard';

interface Owner {
  id: number;
  nickname?: string;
  location?: string;
}
interface SearchClothesRes {
  id: number;
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

// TODO: 사용자 페이지 링크 추가
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryString = location.search;
  const url = `/search/${queryString}`;

  const searchKeyWord = searchParams.get('keyWord') || '';
  const categorySelected = searchParams.getAll('category');
  const seasonSelected = searchParams.getAll('season');
  const filterSelected = searchParams.getAll('filter');

  const emptySearchArray: SearchClothesRes[] = [];
  const [searchedClothes, setSearchedClothes] = useState(emptySearchArray);

  const getSearch = async () => {
    try {
      const result = await getSearchAPICall(url);
      if (result) setSearchedClothes(result.clothes);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getSearch();
  }, []);

  const clothesCards = searchedClothes
    ? searchedClothes.map((clothes: SearchClothesRes) => {
        const { id, name, image, status, owner, isWished } = clothes;
        return (
          <ClothesPreviewCard
            key={id}
            clothesId={id}
            clothesname={name}
            imgsrc={image}
            status={status}
            userid={owner.id || 0}
            username={owner.nickname}
            isWished={isWished}
          />
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
        />
      </Box>
      {clothesCards}
    </>
  );
}
