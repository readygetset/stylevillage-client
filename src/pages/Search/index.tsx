import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { getSearchAPICall } from '../../hooks/api/search/search';
import SearchBar from '../../components/SearchBar';
import ClothesPreviewCard from '../../components/ClothesPreviewCard';

interface Owner {
  id?: number;
  username: string;
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

  const searchKeyWord = searchParams.get('text') || '';
  const categorySelected = searchParams.getAll('category');
  const seasonSelected = searchParams.getAll('season');
  const filterSelected = searchParams.getAll('status');

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
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ mt: 5 }}>
        {searchedClothes?.length ? (
          <Box display={'flex'} width={1200}>
            <Grid container spacing={3} justifyContent={'flex-start'} display={'flex'} flexDirection={'row'}>
              {searchedClothes.map((clothes) => (
                <Grid item key={clothes.id}>
                  <ClothesPreviewCard
                    key={clothes.id}
                    clothesId={clothes.id || 0}
                    clothesname={clothes.name}
                    imgsrc={clothes.image || ''}
                    status={clothes.status}
                    userid={clothes.owner.id || 0}
                    username={clothes.owner.nickname || clothes.owner.username}
                    isWished={clothes.isWished}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography variant="h6" sx={{ color: 'gray', mt: 5 }}>
              검색 결과에 맞는 옷이 없어요
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
