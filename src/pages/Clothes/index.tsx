import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Card, Chip, Divider, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { GetClothesResponse, getClothesAPICall } from '../../hooks/api/clothes/clothes';
import StatusSign from '../../components/StatusSign';

// TODO: 사용자 페이지 링크 추가
export function ClothesPage() {
  const { id } = useParams();
  const clothesId = Number(id);
  const [clothes, setClothes] = useState<GetClothesResponse | null>(null);
  const getClothes = async () => {
    try {
      const result = await getClothesAPICall(clothesId);
      setClothes(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getClothes();
  }, [clothesId]);

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box display={'flex'} sx={{ mt: 4, ml: 7 }} alignItems={'flex-start'}>
        <Box>
          {clothes?.image ? (
            <Box
              component="img"
              sx={{
                width: 250,
                borderRadius: 10,
              }}
              src={clothes.image}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: '#D9D9D9',
                width: 250,
                height: 300,
                borderRadius: 10,
              }}
            />
          )}
        </Box>
        <Box sx={{ mt: 1, ml: 6 }}>
          <Box>
            <StatusSign status={clothes?.status || ''} />
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mt: 1 }}>
            <Typography variant="h5" fontWeight={'bold'} sx={{ mr: 2 }}>
              {clothes?.name}
            </Typography>
            <Typography>{clothes?.category}</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} sx={{ mt: 1 }}>
            <Typography variant="h6" fontWeight={'bold'} sx={{ mr: 1 }}>
              {clothes?.owner.nickname}님
            </Typography>
            <LocationOnIcon fontSize="small" sx={{ color: 'gray' }} />
            <Typography color={'gray'}>{clothes?.owner.location}</Typography>
          </Box>
          <Chip label={clothes?.season} size="small" sx={{ mt: 2 }}></Chip>
          <Card variant="outlined" sx={{ width: 500, height: 200, borderRadius: 5, padding: 2, mt: 2 }}>
            <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
              상품정보
            </Typography>
            <Divider />
            <Typography sx={{ mt: 2 }}>{clothes?.description}</Typography>
          </Card>
          <Card variant="outlined" sx={{ width: 500, height: 200, borderRadius: 5, padding: 2, mt: 2 }}>
            <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
              리뷰
            </Typography>
            <Divider />
            {clothes?.review.map((review) => (
              <Typography sx={{ mt: 2 }}>
                {review.reviewer.nickname} | {review.review}
              </Typography>
            ))}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
